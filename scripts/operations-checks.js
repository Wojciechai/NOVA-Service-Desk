/* v0.6.0: deterministic simulated-browser regression checks.
 * Usage: node scripts/operations-checks.js NOVA_Service_Desk.html
 * These checks do not replace manual verification in a real browser.
 */
const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
const html=fs.readFileSync(process.argv[2]||path.join(__dirname,'../NOVA_Service_Desk.html'),'utf8');
const code=html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert(code,'Embedded application script not found');
const store=new Map(),elements=new Map(),handlers={},windowHandlers={};
let tick,now=1795700000000;
const el=id=>{if(!elements.has(id))elements.set(id,{innerHTML:'',value:'',textContent:'',style:{},classList:{toggle(){},add(){},remove(){}},scrollTop:0,scrollHeight:0,checked:true});return elements.get(id)};
const FakeDate=class extends Date{static now(){return now}};
const context={
 document:{getElementById:el,querySelector:()=>el('nav'),addEventListener:(key,callback)=>handlers[key]=callback,hidden:false,hasFocus:()=>true},
 window:{addEventListener:(key,callback)=>windowHandlers[key]=callback},
 localStorage:{getItem:key=>store.get(key)||null,setItem:(key,value)=>store.set(key,value)},
 setInterval:callback=>{tick=callback},setTimeout:()=>1,clearTimeout(){},confirm:()=>true,Date:FakeDate,Math,JSON,Blob,URL
};
vm.runInNewContext(code,context,{filename:'NOVA-v0.6.0.js',timeout:3000});
const state=()=>JSON.parse(store.get('nova-helpdesk-v02'));
const click=dataset=>handlers.click({target:{closest:()=>({dataset})}});
assert.strictEqual(state().day,1);
assert.strictEqual(Object.keys(state().items).length,3);
assert(el('dashboardpage').innerHTML.includes('Moja zmiana'));
console.log('PASS dashboard and three starting cases');

click({page:'work'});
handlers.input({target:{id:'queue-search',value:'INC-1001'}});
assert(el('ticketcount').textContent.includes('1 / 3'));
assert.strictEqual(state().queueSearch,'INC-1001');
console.log('PASS queue search and persistence');

click({ticket:'INC-1003'});click({tab:'actions'});
for(const action of ['web','offline','repair','verify'])click({action});
click({tab:'report'});
el('notes').value='Zdiagnozowano i naprawiono tryb offline w Outlooku, wykonano test techniczny bez potwierdzenia klienta.';
el('resolution-evidence').value='technical';click({closecase:'1'});
assert.strictEqual(state().items['INC-1003'].status,'resolved');
assert.strictEqual(state().items['INC-1003'].confirmation,'technical');
const xp=state().earned['INC-1003'];assert(xp>0);
click({closeConfirmed:'1'});assert.strictEqual(state().items['INC-1003'].status,'closed');
click({nextday:'1'});
assert.strictEqual(state().items['INC-1003'].status,'reopened');
assert(!state().items['INC-1003'].checks.fix);
assert(state().notifications.some(n=>n.ticket==='INC-1003'));
console.log('PASS technical-only resolution, formal close and deterministic customer reopen');

click({page:'mail'});click({mailTicket:'INC-1003'});
assert(el('mailpage').innerHTML.includes('Outlook'));
el('mail-reply').value='Dzień dobry, proszę sprawdzić, czy nowa wiadomość pojawia się w skrzynce odbiorczej.';
el('mail-wait').checked=true;
handlers.submit({target:{id:'mailform'},preventDefault(){}});
assert.strictEqual(state().items['INC-1003'].status,'waiting');
assert.strictEqual(state().items['INC-1003'].mailThread.at(-1).direction,'out');
click({nextday:'1'});
assert.strictEqual(state().items['INC-1003'].status,'progress');
assert.strictEqual(state().items['INC-1003'].mailThread.at(-1).direction,'in');
assert.strictEqual(state().earned['INC-1003'],xp,'Reopen must not duplicate XP');
console.log('PASS offline mail reply, waiting status, incoming response and one-time XP');

const oldBackup=state();
assert(Array.isArray(oldBackup.items['INC-1003'].mailThread));
assert(oldBackup.items['INC-1003'].replyGenerated);
assert.strictEqual(typeof tick,'function');
console.log('ALL v0.6.0 OPERATIONS CHECKS PASSED');
