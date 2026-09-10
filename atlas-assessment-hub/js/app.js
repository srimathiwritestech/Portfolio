const app=document.getElementById('app');
const toastEl=document.createElement('div');toastEl.className='notice';document.body.appendChild(toastEl);
const state={
  role:localStorage.getItem('atlasRole')||'SMPO',
  screen:'dashboard',
  selectedOpp:'Northstar Retail Modernization',
  qIndex:0,
  activeGroup:0,
  questionnaires:[
    {name:'Application Discovery',product:'Atlas App Modernizer',progress:'18 / 24',status:'In progress',statusClass:'progress'},
    {name:'Data Integration',product:'Atlas Data Bridge',progress:'24 / 24',status:'Submitted',statusClass:'review'},
    {name:'Security Readiness',product:'Atlas Secure Runtime',progress:'0 / 16',status:'Draft',statusClass:'draft'}
  ]
};
const groups=[
  {name:'Business context',done:'6 / 6'},
  {name:'Application landscape',done:'8 / 10'},
  {name:'Data & integrations',done:'5 / 7'},
  {name:'Security & compliance',done:'4 / 5'}
];
function toast(t){toastEl.textContent=t;toastEl.classList.add('show');setTimeout(()=>toastEl.classList.remove('show'),2500)}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function button(t,c='',fn=''){return `<button class="btn ${c}" onclick="${fn}">${t}</button>`}
function head(k,t,d,a=''){return `<div class="crumb">${k}</div><div class="page-head"><div><h1>${t}</h1><p>${d}</p></div><div class="actions">${a}</div></div>`}
function layout(content){
 app.innerHTML=`<header class="topbar"><div class="product-dot">A</div><div class="brand">Atlas Assessment Hub</div><span class="top-muted">Fictional enterprise assessment platform</span><div class="grow"></div><label class="top-muted">View as</label><select class="role-select" onchange="changeRole(this.value)"><option ${state.role==='SMPO'?'selected':''}>SMPO</option><option ${state.role==='Client'?'selected':''}>Client</option></select><div class="avatar">${state.role==='SMPO'?'SR':'MC'}</div></header>
 <div class="shell"><aside class="sidebar"><div class="org">Acme Corporation</div><div class="workspace"><b>Opportunity</b><br>${esc(state.selectedOpp)}</div>
 <div class="nav-label">Workspace</div><nav>${nav('dashboard','⌂','Home')}${nav('opportunities','◫','Opportunities')}${nav('questionnaires','▤','Questionnaires')}${state.role==='SMPO'?nav('review','✓','SMPO Review'):''}${nav('completed','▣','Completed')}</nav>
 <div class="nav-label">Manage</div><nav>${state.role==='SMPO'?nav('templates','⚙','Templates'):''}${nav('settings','◌','Settings')}</nav></aside><main class="main">${content}</main></div>`;
}
function nav(s,icon,label){return `<button class="nav-item ${state.screen===s?'active':''}" onclick="go('${s}')"><span>${icon}</span>${label}</button>`}
function changeRole(r){state.role=r;state.screen=r==='Client'?'questionnaires':'dashboard';localStorage.setItem('atlasRole',r);render()}
function go(s){state.screen=s;render()}
function render(){const views={dashboard,opportunities,questionnaires,review,completed,templates,settings};layout((views[state.screen]||dashboard)())}
function dashboard(){
return `<div class="page">${head('Workspace / Home',state.role==='SMPO'?'Good morning, Srimathi R':'Welcome, Maya Chen',state.role==='SMPO'?'Here’s what needs your attention today.':'Complete the assessment assigned to your team.',button(state.role==='SMPO'?'+ New opportunity':'Open questionnaire','primary',state.role==='SMPO'?'openOpportunity()':'openQuestionnaire()'))}
<div class="stats"><div class="stat"><div class="stat-label">${state.role==='SMPO'?'Active opportunities':'Open questionnaires'}</div><div class="stat-value">${state.role==='SMPO'?'12':'2'}</div><div class="stat-meta">${state.role==='SMPO'?'↑ 3 this month':'1 due this week'}</div></div>
<div class="stat"><div class="stat-label">${state.role==='SMPO'?'Questionnaires in progress':'Questions completed'}</div><div class="stat-value">${state.role==='SMPO'?'7':'18 / 24'}</div><div class="stat-meta">${state.role==='SMPO'?'4 need attention':'75% complete'}</div></div>
<div class="stat"><div class="stat-label">${state.role==='SMPO'?'Awaiting review':'Last saved'}</div><div class="stat-value">${state.role==='SMPO'?'3':'10:42'}</div><div class="stat-meta">${state.role==='SMPO'?'Oldest: 2 days':'Today'}</div></div>
<div class="stat"><div class="stat-label">Completed assessments</div><div class="stat-value">${state.role==='SMPO'?'28':'1'}</div><div class="stat-meta">↑ 18% this quarter</div></div></div>
<div class="section-title">${state.role==='SMPO'?'Getting started':'Your next step'}</div>
<div class="grid-3"><div class="tile"><div class="tile-icon">01</div><h3>${state.role==='SMPO'?'Create an opportunity':'Continue questionnaire'}</h3><p>${state.role==='SMPO'?'Set up the client, workstream and assessment details before inviting collaborators.':'Pick up where you left off. Two required questions remain.'}</p><br>${button(state.role==='SMPO'?'Create opportunity':'Continue','ghost',state.role==='SMPO'?'openOpportunity()':'openQuestionnaire()')}</div>
<div class="tile"><div class="tile-icon">02</div><h3>${state.role==='SMPO'?'Build a questionnaire':'Understand your progress'}</h3><p>${state.role==='SMPO'?'Choose a template and tailor questions to the products in scope.':'Each section shows how many questions you have completed.'}</p></div>
<div class="tile"><div class="tile-icon">03</div><h3>${state.role==='SMPO'?'Review responses':'Need help?'}</h3><p>${state.role==='SMPO'?'Check submitted answers, add internal notes and complete the assessment.':'Contact the assessment owner if you need clarification.'}</p></div></div>
<div class="section-title">${state.role==='SMPO'?'Needs your attention':'Your questionnaires'}</div>
${state.role==='SMPO'?attentionTable():clientTable()}</div>`
}
function attentionTable(){return `<div class="panel"><table class="table"><thead><tr><th>Opportunity</th><th>Activity</th><th>Status</th><th>Owner</th><th></th></tr></thead><tbody>
<tr><td><b>Northstar Retail Modernization</b><br><small>Application modernization</small></td><td>Client questionnaire</td><td><span class="status progress">In progress</span></td><td>Srimathi R</td><td>${button('Open','ghost','openQuestionnaire()')}</td></tr>
<tr><td><b>Greenline Finance</b><br><small>Data platform</small></td><td>SMPO review</td><td><span class="status review">In review</span></td><td>Marcus Lee</td><td>${button('Review','ghost',"go('review')")}</td></tr></tbody></table></div>`}
function clientTable(){return `<div class="panel"><table class="table"><thead><tr><th>Questionnaire</th><th>Progress</th><th>Status</th><th>Updated</th><th></th></tr></thead><tbody>
<tr><td><b>Application Discovery</b><br><small>Atlas App Modernizer</small></td><td>18 / 24</td><td><span class="status progress">In progress</span></td><td>Today</td><td>${button('Continue','ghost','openQuestionnaire()')}</td></tr>
<tr><td><b>Infrastructure Readiness</b><br><small>Atlas Secure Runtime</small></td><td>36 / 36</td><td><span class="status done">Reviewed</span></td><td>Sep 7</td><td>${button('View','ghost',"go('completed')")}</td></tr></tbody></table></div>`}
function opportunities(){return `<div class="page">${head('Workspace / Opportunities','Opportunities','Create and manage assessments for each client engagement.',button('+ New opportunity','primary','openOpportunity()'))}
<div class="panel" style="margin-top:28px"><table class="table"><thead><tr><th>Opportunity</th><th>Client lead</th><th>Workstream</th><th>Questionnaires</th><th>Status</th><th></th></tr></thead><tbody>
<tr><td><b>Northstar Retail Modernization</b><br><small>Updated today</small></td><td>maya.chen@client.example</td><td>Application modernization</td><td>3</td><td><span class="status progress">Active</span></td><td>${button('Open','ghost',"go('questionnaires')")}</td></tr>
<tr><td><b>Greenline Finance</b></td><td>daniel.rao@client.example</td><td>Data platform</td><td>2</td><td><span class="status review">In review</span></td><td>${button('Open','ghost',"go('review')")}</td></tr>
<tr><td><b>Harbor Health</b></td><td>alex.morgan@client.example</td><td>Cloud readiness</td><td>4</td><td><span class="status progress">Active</span></td><td>${button('Open','ghost',"go('questionnaires')")}</td></tr></tbody></table></div></div>`}
function questionnaires(){return `<div class="page">${head('Northstar / Questionnaires',state.role==='Client'?'Questionnaires assigned to you':'Questionnaires','Track what has been created, sent and completed for this opportunity.',state.role==='SMPO'?button('+ Create questionnaire','primary','createQuestionnaire()'):'')}
<div class="callout"><b>${state.role==='Client'?'18 of 24 questions completed.':'3 questionnaires are linked to this opportunity.'}</b> ${state.role==='Client'?'Two required questions remain before you can submit.':'One questionnaire needs attention before it can be sent to the client.'}</div>
<div class="panel"><table class="table"><thead><tr><th>Questionnaire</th><th>Product</th><th>Progress</th><th>Status</th><th>Last updated</th><th></th></tr></thead><tbody>${state.questionnaires.map((q,i)=>`<tr><td><b>${q.name}</b></td><td>${q.product}</td><td>${q.progress}</td><td><span class="status ${q.statusClass}">${q.status}</span></td><td>${i===0?'Today':'Yesterday'}</td><td>${button(state.role==='Client'&&i===0?'Continue':'Open','ghost','openQuestionnaire()')}</td></tr>`).join('')}</tbody></table></div></div>`}
function review(){return `<div class="page">${head('Workspace / SMPO Review','SMPO Review','Review submitted client responses before marking an assessment complete.','')}
<div class="panel" style="margin-top:28px"><table class="table"><thead><tr><th>Questionnaire</th><th>Opportunity</th><th>Submitted</th><th>Status</th><th></th></tr></thead><tbody>
<tr><td><b>Data Integration</b></td><td>Northstar Retail Modernization</td><td>Sep 9, 2026</td><td><span class="status review">In review</span></td><td>${button('Review','ghost','openReview()')}</td></tr>
<tr><td><b>Cloud Readiness</b></td><td>Greenline Finance</td><td>Sep 8, 2026</td><td><span class="status review">In review</span></td><td>${button('Review','ghost','openReview()')}</td></tr></tbody></table></div></div>`}
function completed(){return `<div class="page">${head('Workspace / Completed','Completed assessments','View finalized questionnaires and export the results.','')}
<div class="panel" style="margin-top:28px"><table class="table"><thead><tr><th>Assessment</th><th>Opportunity</th><th>Reviewed</th><th>Completed</th><th></th></tr></thead><tbody>
<tr><td><b>Infrastructure Readiness</b></td><td>Northstar Retail Modernization</td><td>Sep 7</td><td>Sep 7</td><td>${button('View','ghost','viewCompleted()')} ${button('Export','ghost',"toast('Export prepared as Excel workbook.')")}</td></tr>
<tr><td><b>Application Portfolio</b></td><td>Greenline Finance</td><td>Sep 4</td><td>Sep 4</td><td>${button('View','ghost','viewCompleted()')} ${button('Export','ghost',"toast('Export prepared as Excel workbook.')")}</td></tr></tbody></table></div></div>`}
function templates(){return `<div class="page">${head('Workspace / Templates','Questionnaire templates','Create reusable templates that teams can use when building assessments.',button('Upload template','primary','uploadTemplate()'))}
<div class="panel" style="margin-top:28px"><table class="table"><thead><tr><th>Template</th><th>Questions</th><th>Used in</th><th>Updated</th><th></th></tr></thead><tbody>
<tr><td><b>Application Discovery v2</b></td><td>24</td><td>14 assessments</td><td>Sep 8</td><td>${button('Preview','ghost',"toast('Template preview opened.')")}</td></tr>
<tr><td><b>Security Readiness v1</b></td><td>16</td><td>8 assessments</td><td>Sep 2</td><td>${button('Preview','ghost',"toast('Template preview opened.')")}</td></tr></tbody></table></div></div>`}
function settings(){return `<div class="page">${head('Workspace / Settings','Workspace settings','Manage access, notifications and terminology.','')}
<div class="grid-3" style="margin-top:28px"><div class="tile"><div class="tile-icon">U</div><h3>User management</h3><p>Invite collaborators and assign roles.</p></div><div class="tile"><div class="tile-icon">N</div><h3>Notifications</h3><p>Choose when clients receive updates.</p></div><div class="tile"><div class="tile-icon">T</div><h3>Terminology</h3><p>Keep workstream and assessment names consistent.</p></div></div></div>`}

function modal(title,body,actions){const bg=document.createElement('div');bg.className='modal-bg show';bg.innerHTML=`<div class="modal"><h2>${title}</h2>${body}<div class="modal-actions">${actions}</div></div>`;document.body.appendChild(bg);return bg}
function close(el){el.remove()}
function openOpportunity(){
const m=modal('Create an opportunity',`<p class="sub">Set up the engagement before you invite the client.</p>
<div class="form"><div class="field"><label>Opportunity name <span class="required">*</span></label><input id="oppName" class="input" placeholder="For example, Northstar modernization"></div>
<div class="field"><label>Client lead <span class="required">*</span></label><input class="input" placeholder="name@company.com"><div class="hint">The client lead receives invitations and can submit questionnaires.</div></div>
<div class="field"><label>Workstream <span class="required">*</span></label><select class="input"><option>Application modernization</option><option>Data platform</option><option>Cloud readiness</option></select></div>
<div class="field"><label>Assessment ID <span class="required">*</span></label><input class="input" placeholder="Enter the assessment ID"><div class="hint">Use the ID assigned to this engagement so the assessment can be traced back to its source.</div></div></div>`,button('Cancel','',()=>close(m))+button('Create opportunity','primary',()=>{if(!document.getElementById('oppName').value.trim()){toast('Add an opportunity name to continue.');return}close(m);toast('Opportunity created. Next, choose a questionnaire template.');go('questionnaires')}))}
function createQuestionnaire(){
const m=modal('Create questionnaire',`<p class="sub">Choose what you want the client to assess.</p><div class="form">
<div class="field"><label>Workstream <span class="required">*</span></label><select class="input"><option>Application modernization</option></select></div>
<div class="field"><label>Vendor <span class="required">*</span></label><select class="input"><option>Acme Solutions</option><option>Northstar Systems</option></select></div>
<div class="field"><label>IBM Product <span class="required">*</span></label><select class="input"><option>Atlas App Modernizer</option><option>Atlas Data Bridge</option></select></div>
<div class="field"><label>Questionnaire template <span class="required">*</span></label><select class="input"><option>Application Discovery v2</option></select><div class="hint">24 questions • 6 required</div></div></div>`,button('Cancel','',()=>close(m))+button('Create questionnaire','primary',()=>{close(m);toast('Questionnaire created as a draft.')}))}
function uploadTemplate(){
const m=modal('Upload questionnaire template',`<p class="sub">Add a reusable template. We’ll validate the file before it becomes available.</p><div class="form">
<div class="field"><label>Workstream <span class="required">*</span></label><select class="input"><option>Application modernization</option></select></div>
<div class="field"><label>Description <span class="required">*</span></label><textarea class="input" rows="3" placeholder="Describe what this template helps assess."></textarea></div>
<div class="field"><label>Questionnaire file <span class="required">*</span></label><div class="dropzone"><strong>Drop your CSV or Excel file here</strong>or choose a file from your computer</div><div class="hint">The file is checked before saving. You can preview the questions after processing.</div></div></div>`,button('Cancel','',()=>close(m))+button('Process template','primary',()=>{close(m);toast('Template processed. Preview is ready.')}))}
function openQuestionnaire(){
state.activeGroup=0;
const m=modal('Application Discovery',`<p class="sub">Atlas App Modernizer • Client response</p><div class="callout"><b>18 of 24 questions completed.</b> Two required questions remain.</div>
<div class="tabs">${groups.map((g,i)=>`<button class="tab ${i===0?'active':''}" onclick="switchGroup(this,${i})">${g.name} <small>${g.done}</small></button>`).join('')}</div>
<div id="qbody">${questionBody(0)}</div>`,button('Close','',()=>close(m)));
}
function switchGroup(el,i){document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));el.classList.add('active');document.getElementById('qbody').innerHTML=questionBody(i)}
function questionBody(i){return `<div class="q"><div class="q-title">What best describes the current application landscape? <span class="required">*</span></div><label class="option"><input type="radio" name="a${i}"> Primarily monolithic applications</label><label class="option"><input type="radio" name="a${i}"> Mixed monolith and service-based applications</label><label class="option"><input type="radio" name="a${i}"> Primarily service-based applications</label><div class="hint">Choose the option that most closely reflects the current state.</div></div>
<div class="q"><div class="q-title">What is the biggest modernization constraint?</div><select class="input"><option>Select one</option><option>Limited engineering capacity</option><option>Business continuity requirements</option><option>Legacy dependencies</option><option>Unclear target architecture</option></select></div>
<div class="q"><div class="q-title">Anything else we should know?</div><textarea class="input" rows="4" placeholder="Share context that may help the review team understand your answer."></textarea></div>
<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:20px">${button('Save & continue','primary',"toast('Your answers have been saved.')")}${i===groups.length-1?button('Submit questionnaire','primary',"submitClient()"):''}</div>`}
function submitClient(){toast('Questionnaire submitted. The review team has been notified.')}
function openReview(){
const m=modal('Review: Data Integration',`<p class="sub">Northstar Retail Modernization • Submitted Sep 9, 2026</p><div class="success"><b>24 of 24 questions answered.</b> The client has submitted the questionnaire.</div>
${groups.map((g,i)=>`<div style="padding:15px 0;border-bottom:1px solid #eee"><b>${g.name}</b><span style="float:right" class="status ${i===2?'review':'done'}">${i===2?'Needs attention':'Reviewed'}</span><p class="sub" style="margin-top:7px">${i===2?'Two legacy integrations may affect the migration sequence.':'Responses are complete and consistent with supporting notes.'}</p></div>`).join('')}
<div class="field"><label>Internal review comment <span style="font-weight:400;color:#777">(optional)</span></label><textarea class="input" rows="4" placeholder="This comment is visible only to the internal review team."></textarea></div>`,button('Cancel','',()=>close(m))+button('Submit review','primary',()=>{close(m);toast('Review submitted. Assessment moved to Completed.');go('completed')}))}
function viewCompleted(){const m=modal('Infrastructure Readiness',`<p class="sub">Finalized Sep 7, 2026 • Read-only</p><div class="success"><b>This assessment is complete.</b> Answers can no longer be edited.</div><div class="section-title">Assessment summary</div><p class="sub">36 questions • 36 answered • Reviewed by Srimathi R</p>${['Business context','Application landscape','Security & compliance'].map(x=>`<div style="margin:18px 0"><div style="display:flex;justify-content:space-between"><span>${x}</span><b>Complete</b></div><div class="progress"><span style="width:100%"></span></div></div>`).join('')}`,button('Close','',()=>close(m))+button('Export Excel','primary',()=>toast('Excel export prepared.')))}
render();
