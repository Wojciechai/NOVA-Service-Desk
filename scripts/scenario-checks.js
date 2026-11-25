/* Replay all original NOVA training scenarios via DOM action dispatch.
 * This is a deterministic simulated-state test, not real end-to-end browser QA.
 */
const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
const html=fs.readFileSync(process.argv[2]||path.join(__dirname,'../NOVA_Service_Desk.html'),'utf8');
const code=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const store=new Map(),els=new Map(),listeners={},windowListeners={};
const element=id=>{if(!els.has(id))els.set(id,{innerHTML:'',value:'',textContent:'',style:{},classList:{toggle(){}},scrollHeight:0,scrollTop:0});return els.get(id)};
const initial={version:'0.2.0',day:10,startDate:'2026-11-24',items:{},earned:{'INC-D500':5000},history:[],selected:'INC-1001',page:'work',tab:'actions'};
store.set('nova-helpdesk-v02',JSON.stringify(initial));
const ctx={document:{hidden:false,hasFocus:()=>true,getElementById:element,querySelector:()=>element('nav'),addEventListener:(e,cb)=>listeners[e]=cb},window:{addEventListener:(e,cb)=>windowListeners[e]=cb},localStorage:{getItem:k=>store.get(k),setItem:(k,v)=>store.set(k,v)},setInterval:()=>1,setTimeout:()=>1,clearTimeout(){},confirm:()=>true,Date,Math,JSON,Blob,URL};
vm.runInNewContext(code,ctx,{timeout:3000});
const state=()=>JSON.parse(store.get('nova-helpdesk-v02'));
const click=dataset=>listeners.click({target:{closest:()=>({dataset})}});
const actions={dns:['config','iptest','dnstest','repair','verify'],account:['identity','logs','repair','verify'],outlook:['web','offline','repair','verify'],printer:['printer','queue','repair','verify'],teams:['permissions','device','repair','verify'],dhcp:['config','gateway','repair','verify'],vpn:['impact','check','escalate','verify'],slow:['taskmgr','startup','repair','verify'],mailbox:['web','quota','repair','verify'],security:['stop','isolate','escalate','verify']};
const cases=[['INC-1001','dns'],['INC-1002','account'],['INC-1003','outlook'],['INC-1004','printer'],['INC-1005','teams'],['INC-1006','dhcp'],['INC-1007','vpn'],['INC-1008','slow'],['INC-1009','mailbox'],['INC-1010','security'],['INC-1011','printer'],['INC-1012','teams']];
for(const [id,kind] of cases){click({ticket:id});click({tab:'actions'});for(const action of actions[kind])click({action});click({tab:'report'});element('notes').value='Diagnoza wykonana, przeprowadzono naprawę i pozytywnie zweryfikowano wynik zgodnie z procedurą.';click({closecase:'1'});assert.strictEqual(state().items[id].status,'resolved',`FAILED case ${id} ${kind}`);}
assert.strictEqual(state().history.length,12);
console.log('PASS all 12 initial scenarios through documented workflow; 12 entries in history.');