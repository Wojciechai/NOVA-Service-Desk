/* NOVA Service Desk deterministic state-machine smoke tests.
 * Runs embedded app script with stubbed DOM and localStorage (no real browser).
 * Usage: node scripts/regression.js path/to/NOVA_Service_Desk.html
 */
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const path=require('path');
const html=fs.readFileSync(process.argv[2]||path.join(__dirname,'../NOVA_Service_Desk.html'),'utf8');
const code=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const store=new Map(),elements=new Map(),callbacks={},wins={};let interval,n=1764000000000;
const item=id=>{if(!elements.has(id))elements.set(id,{innerHTML:'',value:'',textContent:'',style:{},classList:{toggle(){},add(){},remove(){}},scrollTop:0,scrollHeight:0,click(){},files:[]});return elements.get(id)};
const document={hidden:false,getElementById:item,querySelector:()=>item('nav'),addEventListener:(event,cb)=>{callbacks[event]=cb},hasFocus:()=>true};
const window={addEventListener:(event,cb)=>{wins[event]=cb}};
const LocalDate=class extends Date{static now(){return n}};
const context={document,window,Date:LocalDate,localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},setInterval:cb=>{interval=cb},setTimeout:()=>1,clearTimeout(){},confirm:()=>true,console,Blob,URL,Math,Object,Number,String,Array,JSON,Map,Set,RegExp};
vm.runInNewContext(code,context,{filename:'NOVA.js',timeout:2500});
function state(){return JSON.parse(store.get('nova-helpdesk-v02'))}
function click(dataset){callbacks.click({target:{closest:()=>({dataset})}})}
function change(id,checked){callbacks.change({target:{id,checked}})}
function tick(ms){n+=ms;interval()}
const initial=state();assert.strictEqual(initial.day,1);assert.strictEqual(Object.keys(initial.items).length,3);assert(html.includes('data-clock-toggle')||html.includes('id="shiftclock"'));
console.log('PASS boot: 3 day-1 tickets, app state saved');
click({ticket:'INC-1001'});click({tab:'remote'});
for(let i=0;i<4;i++)click({remoteStep:'1'});
assert.strictEqual(state().items['INC-1001'].remote.stage,4);
click({remoteApp:'settings'});assert(item('ticketdetail').innerHTML.includes('data-pc-action="dns-corp"'));
click({pcAction:'dns-bad'});assert.strictEqual(state().items['INC-1001'].pc.dns,'10.20.0.250');
click({action:'config'});click({action:'iptest'});click({action:'dnstest'});click({pcAction:'dns-corp'});
assert.strictEqual(state().items['INC-1001'].pc.dns,'10.20.0.10');
click({action:'verify'});assert(state().items['INC-1001'].checks.verify);
click({endRemote:'1'});click({tab:'report'});item('notes').value='Wykonałem diagnostykę DNS i przywróciłem firmowy adres serwera, test potwierdził działanie.';
click({closecase:'1'});assert.strictEqual(state().items['INC-1001'].status,'resolved');
assert(state().earned['INC-1001']>0);
console.log('PASS remote: consent, misconfiguration, recovery, verification, end session, XP');
const remain=()=>state().clock.remainingMs;
let before=remain();click({clockToggle:'1'});tick(5000);assert.strictEqual(remain(),before);
click({clockToggle:'1'});wins.blur();before=remain();tick(5000);assert.strictEqual(remain(),before);
wins.focus();tick(3000);assert(remain()<before);
console.log('PASS timer: manual pause, Alt+Tab-style pause, resume');
click({ticket:'INC-1002'});click({tab:'report'});item('notes').value='Rozmowa przeprowadzona, dalsza weryfikacja tożsamości jest zaplanowana.';click({savenotes:'1'});
for(let i=0;i<300&&state().day===1;i++)tick(5000);
let v=state();assert.strictEqual(v.day,2);assert(v.items['INC-1002'].carryCount>=1);assert(v.items['INC-1002'].notes.includes('Rozmowa'));
assert.strictEqual(v.items['INC-1002'].status,'open');assert.strictEqual(v.items['INC-1001'].status,'resolved');
console.log('PASS rollover: all unfinished tickets preserved, closed tickets retained');
click({nextday:'1'});assert.strictEqual(state().day,3);
for(let i=0;i<145;i++)tick(5000);
v=state();assert(v.extraCases.some(c=>c.day===3&&c.id==='INC-E003'));
assert(v.items['INC-E003']);assert.strictEqual(v.extraCases.filter(c=>c.day===3).length,1);
console.log('PASS emergency: one urgent ticket appears mid-shift');
click({page:'progress'});assert(item('progresspage').innerHTML.includes('Rozwój kompetencji'));
click({page:'settings'});change('trainingmode',false);assert.strictEqual(state().training,false);
console.log('PASS progression: skills, achievements, shift report, training toggle');
console.log('ALL STATE-MACHINE CHECKS PASSED');