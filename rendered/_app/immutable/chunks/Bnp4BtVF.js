import{t as e}from"./DK3Fl9T5.js";import{E as t,I as n,R as r,r as i,t as a,w as o}from"./CHfFqfNT.js";import{t as s}from"./CmxaKl5t.js";import{n as c,r as l,t as u}from"./B7HBHx8W.js";import{t as d}from"./BxJynscm.js";import{t as f}from"./499x6edU.js";var p=e({default:()=>S,metadata:()=>m}),m={layout:`runbook`,title:`0002 · Split #4471 and merge only by verified cause`,owner:`szlapinski with Codex`,status:`accepted`,reviewed:`2026-10-31`,signature:`szlapinski / Codex / S01E03 / 2026-10-31`},{layout:h,title:g,owner:_,status:v,reviewed:y,signature:b}=m,x=t(`<p><strong>Deciders:</strong> szlapinski with Codex · <strong>Supersedes:</strong> <a href="/kb/decisions/0001-dedupe-by-subject">decision 0001</a>.
The accepted original is preserved as history. This record replaces its subject-only rule.</p> <h2>What the evidence shows</h2> <p>The prose on <a href="/kb/incidents/4471">incident #4471</a> called this one known parser problem.
The live components disagree: tenant configuration and the report’s channel separate two failure paths.
The export is a snapshot, not proof that the desk stopped receiving reports.</p> <!> <!> <h3>Parser: shared parsing ignores the tenant’s date order</h3> <p>For day-first tenants, the shared parser treats a day-first input as month-first.
For example, Harbour Dental’s app report R-41200 describes 7 April becoming 4 July.
R-41205 belongs here despite an intake tag of <code>hint</code>: Morrow Tax runs booking-v2,
and the report came through the app. Fix parsing at the shared boundary using tenant locale
or an unambiguous date representation. Check app, email and booking-v2 form inputs;
test ambiguous dates and dates whose day exceeds twelve.</p> <h3>Hint: booking-v3 tells day-first tenants to enter month first</h3> <p>The booking-v3 form prints <code>MM/DD/YYYY</code>, but interprets what people type in tenant order.
The misleading hint is a separate problem from the shared parser. R-41230 is a Copper Studio
form report and belongs here despite being tagged <code>parser</code>. The affected configuration is a
day-first tenant using booking-v3 through the form: Alder Physio, Copper Studio and Pale Harbour.
Make the displayed hint agree with the form’s interpretation; test both together for each locale.
Changing the shared parser alone does not fix this path.</p> <h2>Decision: one ticket per verified failure path</h2> <ol><li>Deduplicate export rows by report ID before counting.</li> <li>Read the body and look up the tenant. Establish tenant locale, form version and input channel.</li> <li>Merge only when those facts support the same cause. Subject text and browser-locale intake tags
do not establish cause. Different subjects can still describe the same cause.</li> <li>Keep parser and hint reports in separate tickets. Give each ticket its report count and evidence.</li> <li>If a tenant is missing, the cause is unknown, or the body contradicts the classification,
keep the report separate for investigation. Do not merge merely because the subject matches.</li></ol> <!> <h2>What the timeline changes</h2> <!> <p>Received time and merged time are different events. Reports arrived from April onward;
the July merge batch measures desk processing, not the beginning of customer impact.
The queue continues after that batch. A <code>known</code> label and a queued parser fix do not show
that all reports are covered, that the hint has an owner, or that either fix has shipped.</p> <h2>Consequences and upkeep</h2> <p>The parser and hint now have separate issue records linked above. Keep their counts and
membership grounded in distinct report IDs. Investigate the one-day symptoms without silently
subtracting them or inventing a confirmed cause. A future confirmed third cause gets its own ticket.
Rebuild this page after refreshing reports, tenant configuration or desk notes; reconcile open tickets
with the new render. The tables, timeline and desk reference are produced by the supplied components.
Review triage guidance when the rendered evidence changes; preserve accepted decision records.</p> <!>`,1);function S(e,t){let p=a(t,[`children`,`$$slots`,`$$events`,`$$legacy`]);s(e,i(()=>p,()=>m,{children:(e,t)=>{var i=x(),a=r(n(i),6);u(a,{});var s=r(a,2);l(s,{ticket:4471});var p=r(s,14);d(p,{});var m=r(p,4);c(m,{ticket:4471});var h=r(m,8);f(h,{get signature(){return b}}),o(e,i)},$$slots:{default:!0}}))}export{S as n,p as t};