/* NOVA v0.7.0 deterministic state-machine regression tests.
 * Run: node scripts/v07-checks.js NOVA_Service_Desk.html
 * Stubbed DOM/localStorage: not a substitute for browser UI testing.
 */
const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('assert');
const html=fs.readFileSync(process.argv[2]||path.join(__dirname,'../NOVA_Service_Desk.html'),'utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert(script,'NOVA application script missing');
const KEY='nova-helpdesk-v02';
function harness({saved=null,random=.95,storage=null,time=null}={}){
 const store=storage||new Map();
 if(saved)store.set(KEY,JSON.stringify(saved));
 const clock=time||{now:1795800000000};
 const els=new Map(),handlers={},wins={};let interval;
 const el=id=>{if(!els.has(id))els.set(id,{innerHTML:'',textContent:'',value:'',style:{},classList:{toggle(){},add(){},remove(){}},scrollTop:0,scrollHeight:0,checked:true,files:[],click(){}});return els.get(id)};
 const FakeDate=class extends Date{static now(){return clock.now}};
 const StableMath=Object.create(Math);StableMath.random=()=>random;
 const ctx={
  document:{getElementById:el,querySelector:()=>el('nav'),addEventListener:(k,fn)=>handlers[k]=fn,hidden:false,hasFocus:()=>true},
  window:{addEventListener:(k,fn)=>wins[k]=fn},
  localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},
  setInterval:fn=>{interval=fn},setTimeout:()=>1,clearTimeout(){},confirm:()=>true,
  Date:FakeDate,Math:StableMath,JSON,Blob,URL
 };
 vm.runInNewContext(script,ctx,{filename:'NOVA-v0.7.0.js',timeout:3500});
 return {
  storage:store,time:clock,handlers,wins,el,
  state:()=>JSON.parse(store.get(KEY)),
  tick:ms=>{clock.now+=ms;interval()},
  click:dataset=>handlers.click({target:{closest:()=>({dataset})}}),
  input:(id,value)=>handlers.input({target:{id,value}}),
  submit:id=>handlers.submit({target:{id},preventDefault(){}}),
  import:async blob=>{
   const text=JSON.stringify(blob);
   handlers.change({target:{id:'importfile',files:[{size:text.length,text:async()=>text}],value:''}});
   await Promise.resolve();await Promise.resolve();await Promise.resolve();
  }
 };
}
function base(day=1){
 return {version:'0.6.0',day,startDate:'2026-11-25',page:'dashboard',selected:'INC-1001',tab:'chat',items:{},earned:{},history:[],extraCases:[],shiftHistory:[],clock:{remainingMs:1440000,manualPaused:false,autoPaused:false,lastTick:0,triggeredDays:[3]}};
}
async function run(){
 // Core regression: all old incident solutions still award XP once.
 const originalSave=base(10);originalSave.earned={'INC-D500':5000};
 const original=harness({saved:originalSave});
 const actions={dns:['config','iptest','dnstest','repair','verify'],account:['identity','logs','repair','verify'],outlook:['web','offline','repair','verify'],printer:['printer','queue','repair','verify'],teams:['permissions','device','repair','verify'],dhcp:['config','gateway','repair','verify'],vpn:['impact','check','escalate','verify'],slow:['taskmgr','startup','repair','verify'],mailbox:['web','quota','repair','verify'],security:['stop','isolate','escalate','verify']};
 const cases=[['INC-1001','dns'],['INC-1002','account'],['INC-1003','outlook'],['INC-1004','printer'],['INC-1005','teams'],['INC-1006','dhcp'],['INC-1007','vpn'],['INC-1008','slow'],['INC-1009','mailbox'],['INC-1010','security'],['INC-1011','printer'],['INC-1012','teams']];
 for(const [id,type] of cases){
  original.click({ticket:id});original.click({tab:'actions'});
  for(const action of actions[type])original.click({action});
  original.click({tab:'report'});
  original.el('notes').value='Zdiagnozowano i rozwiązano problem zgodnie z procedurą, wykonano weryfikację końcową.';
  original.click({closecase:'1'});
  assert.strictEqual(original.state().items[id].status,'resolved',id);
 }
 assert.strictEqual(original.state().history.length,12);
 console.log('PASS original 12/12 incident flows retained');
 // Knowledge base case-aware instructions and filtering.
 const kb=harness();
 kb.click({page:'knowledge'});
 assert(kb.el('knowledgepage').innerHTML.includes('Knowledge Base 2.0'));
 kb.input('kb-search','sterownik');
 assert(kb.el('kb-results').innerHTML.includes('Sterowniki'));
 assert(!kb.el('kb-results').innerHTML.includes('Brak artykułów'));
 console.log('PASS searchable Knowledge Base 2.0');
 // Audio rollback and Wi-Fi install are distinct, stateful cases.
 const drivers=harness();
 drivers.click({nextday:'1'});
 drivers.click({ticket:'INC-DRV-011'});drivers.click({tab:'remote'});
 for(let i=0;i<4;i++)drivers.click({remoteStep:'1'});
 drivers.click({remoteApp:'devmgr'});
 assert(drivers.el('ticketdetail').innerHTML.includes('Menedżer urządzeń'));
 drivers.click({pcAction:'driver-inspect'});drivers.click({pcAction:'driver-version'});
 drivers.click({pcAction:'driver-update'});
 assert.strictEqual(drivers.state().items['INC-DRV-011'].pc.audioDriverOk,false);
 assert(drivers.state().items['INC-DRV-011'].penalties>0);
 drivers.click({pcAction:'driver-rollback'});drivers.click({action:'verify'});
 assert.strictEqual(drivers.state().items['INC-DRV-011'].checks.verify,true);
 drivers.click({endRemote:'1'});drivers.click({tab:'report'});
 drivers.el('notes').value='Po sprawdzeniu historii przywrócono zatwierdzony sterownik audio i potwierdzono test dźwięku.';
 drivers.click({closecase:'1'});
 assert.strictEqual(drivers.state().items['INC-DRV-011'].status,'resolved');
 drivers.click({nextday:'1'});drivers.click({nextday:'1'});
 drivers.click({ticket:'INC-DRV-012'});drivers.click({tab:'remote'});
 for(let i=0;i<4;i++)drivers.click({remoteStep:'1'});
 drivers.click({remoteApp:'devmgr'});drivers.click({pcAction:'driver-inspect'});drivers.click({pcAction:'driver-version'});
 drivers.click({pcAction:'driver-install'});drivers.click({action:'verify'});
 assert.strictEqual(drivers.state().items['INC-DRV-012'].pc.netDriverOk,true);
 assert.strictEqual(drivers.state().items['INC-DRV-012'].checks.verify,true);
 console.log('PASS Device Manager audio rollback, rejected update and network driver installation');
 // Escalation requires diagnostics and preserves assigned L2 queue during mail.
 const l2=harness();
 l2.click({ticket:'INC-1001'});l2.click({tab:'report'});
 l2.el('escalation-team').value='L2';
 l2.el('escalation-reason').value='Badano dostępność sieci, ale nie mamy jeszcze danych potwierdzających diagnozę. Proszę o L2.';
 l2.click({escalateTicket:'1'});
 assert.notStrictEqual(l2.state().items['INC-1001'].status,'escalated');
 l2.click({tab:'actions'});l2.click({action:'config'});l2.click({tab:'report'});
 l2.el('escalation-team').value='L2';
 l2.el('escalation-reason').value='Sprawdzono konfigurację IP/DNS, proszę o dodatkowe testy i opinię zespołu specjalistów.';
 l2.click({escalateTicket:'1'});
 assert.strictEqual(l2.state().items['INC-1001'].status,'escalated');
 l2.click({page:'mail'});l2.click({mailTicket:'INC-1001'});
 l2.el('mail-reply').value='Dzień dobry, zgłoszenie zostało przekazane do zespołu specjalistycznego. Zaktualizuję status.';
 l2.el('mail-wait').checked=true;l2.submit('mailform');
 assert.strictEqual(l2.state().items['INC-1001'].status,'escalated');
 l2.click({nextday:'1'});
 assert.strictEqual(l2.state().items['INC-1001'].status,'progress');
 assert.strictEqual(l2.state().items['INC-1001'].escalation.returnedDay,2);
 console.log('PASS L1->L2 handoff, safe mail behavior and specialist return');
 // Rush is drawn once, spreads messages over simulated active minutes, never ticks while paused.
 const simTime={now:1795800000000};
 const rush=harness({saved:base(3),random:.10,time:simTime});
 rush.tick(110000);
 assert.strictEqual(rush.state().rush.plan.events.length,4);
 const planned=JSON.stringify(rush.state().rush.plan.events);
 rush.tick(110000);rush.tick(110000);
 rush.click({clockToggle:'1'});
 const beforePause=rush.state();
 rush.tick(110000);
 assert.strictEqual(rush.state().clock.remainingMs,beforePause.clock.remainingMs);
 assert.strictEqual(rush.state().rush.plan.next,beforePause.rush.plan.next);
 rush.click({clockToggle:'1'});rush.tick(110000);rush.tick(110000);
 const burst=rush.state();
 assert.strictEqual(burst.rush.plan.tickets,3);
 assert.strictEqual(burst.rush.plan.emails,1);
 assert.strictEqual(burst.extraCases.filter(c=>/^INC-R/.test(c.id)).length,3);
 assert.strictEqual(JSON.stringify(burst.rush.plan.events),planned);
 const savedStore=rush.storage, count=burst.extraCases.length;
 const restored=harness({storage:savedStore,random:.10,time:simTime});
 assert.strictEqual(restored.state().extraCases.length,count);
 assert.strictEqual(restored.state().rush.plan.next,burst.rush.plan.next);
 restored.tick(100000);
 assert.strictEqual(restored.state().extraCases.length,count);
 const backup=restored.state();
 const imported=harness({random:.95});
 await imported.import(backup);
 assert.strictEqual(imported.state().extraCases.length,count);
 assert.strictEqual(imported.state().rush.plan.next,backup.rush.plan.next);
 restored.click({nextday:'1'});
 assert.strictEqual(restored.state().shiftHistory.at(-1).rushTickets,3);
 assert.strictEqual(restored.state().shiftHistory.at(-1).rushEmails,1);
 assert(restored.state().extraCases.every(c=>restored.state().items[c.id].carryCount>=1));
 restored.click({page:'progress'});
 assert(restored.el('progresspage').innerHTML.includes('Rush Hour'));
 restored.tick(1000);
 assert.strictEqual(restored.state().rush.plan,null,'Two day cooldown');
 console.log('PASS staged Rush Hour, pause, refresh, JSON import, carry-over, cooldown and shift report');
 // Previous emergency IDs and sanitized titles still load.
 const old=base(3);old.extraCases=[{id:'INC-E003',day:3,type:'dns',title:'<script>Injected</script>'}];
 const migration=harness({saved:old});
 assert.strictEqual(migration.state().extraCases.length,1);
 assert(migration.state().extraCases[0].title.startsWith('PILNE:'));
 console.log('PASS v0.6 emergency-save migration');
 console.log('ALL v0.7.0 STATE-MACHINE REGRESSION CHECKS PASSED');
}
run().catch(e=>{console.error(e);process.exitCode=1});
