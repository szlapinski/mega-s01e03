import{t as e}from"./DK3Fl9T5.js";import{E as t,I as n,R as r,r as i,t as a,w as o}from"./CHfFqfNT.js";import{t as s}from"./CmxaKl5t.js";import{n as c,r as l,t as u}from"./B7HBHx8W.js";import{t as d}from"./BxJynscm.js";import{t as f}from"./499x6edU.js";var p=e({default:()=>S,metadata:()=>m}),m={layout:`runbook`,title:`#4471 · Engineering closure and cause review`,owner:`szlapinski with Codex`,status:`reviewed`,reviewed:`2026-10-31`,signature:`v1.eyJzdWIiOiIyODkzIiwiYXVkIjoiY2hhbGxlbmdlOndoYXQtaXQtc2hvd3MiLCJpYXQiOjE3OTM0MDM5NDAsImV4cCI6MTc5MzQ5MDM0MH0.rdJePCeTM9fWn4LH2DbJODjI56GjqL6KhXfgHEaMqRg`},{layout:h,title:g,owner:_,status:v,reviewed:y,signature:b}=m,x=t(`<h2>Current disposition</h2> <p>The <a href="https://hq.mega.dev/challenges/what-it-shows" rel="nofollow">course engineering update</a> reports source
ticket #4471 closed on <strong>5 October</strong>. The shared parser is <strong>fixed</strong>: <code>fix(dates): parse dd/mm for eu locales</code>. The booking-v3 hint is <strong>won’t fix</strong> because
the booking-v3 form was retired. Those are different closure outcomes, not two fixes.</p> <p>Our <a href="https://github.com/szlapinski/mega-s01e03/issues/1" rel="nofollow">parser ticket</a> is closed as completed.
Our <a href="https://github.com/szlapinski/mega-s01e03/issues/2" rel="nofollow">hint ticket</a> is closed as not planned.
These dispositions come from the desk’s update, not from a live product test.
They preserve the historical report counts and evidence.</p> <h2>What the export actually shows</h2> <p>The original incident prose called this one known parser bug. Rendered evidence separates
two causes, using tenant locale, booking form version and channel rather than browser-locale
intake tags. Export pages overlap, so count distinct IDs before classifying.</p> <!> <!> <h2>Why these are different problems</h2> <p>The shared parser reads month first even when the tenant’s date order is day first.
Harbour Dental’s app report R-41200 describes 7 April turning into 4 July.
Morrow Tax’s app report R-41205 belongs to parser even though intake tagged it hint.
A parser fix needs tenant-aware or unambiguous date handling across app, email and
booking-v2 inputs.</p> <p>The booking-v3 form prints <code>MM/DD/YYYY</code> but reads input in the day-first tenant’s order.
Copper Studio’s form report R-41230 belongs to hint even though intake tagged it parser.
Alder Physio, Copper Studio and Pale Harbour use this form. Fixing shared parsing alone
does not repair a misleading hint. The desk instead retired the affected form.</p> <p>One-day and scheduling symptoms remain flagged within the classifier’s parser group.
The engineering closure does not independently demonstrate that these particular symptoms
were caused by parsing or that the fix resolved them.</p> <h2>Triage from now on</h2> <p><a href="/kb/decisions/0002-dedupe-by-cause">Decision 0002</a> replaces the subject-only rule in <a href="/kb/decisions/0001-dedupe-by-subject">decision 0001</a>. Both accepted records remain
unchanged as historical decisions.</p> <p>Read the report, resolve tenant configuration, and establish the failure path before
merging. Equal subjects do not prove equal causes; different subjects can share a cause.
Missing tenants, unknown causes and contradictory evidence stay separate for investigation.</p> <!> <h2>Received time is not merge time</h2> <!> <p>Reports begin in April. The large July merge batch is desk processing, not the start of
customer impact. Reports continue after the batch, so a known label and a queued fix were
not proof that the queue was resolved. The later engineering update supplies the closure
outcomes above.</p> <h2>Keeping this page honest</h2> <p>Refresh the exported reports, tenant directory and desk notes, then rebuild the page and
reconcile ticket membership when the desk supplies new evidence. The counts and charts
come from components at render time; issue counts record the corresponding snapshot.
A confirmed new failure path gets its own ticket. Preserve accepted decisions and add
a new record when changing policy.</p> <!>`,1);function S(e,t){let p=a(t,[`children`,`$$slots`,`$$events`,`$$legacy`]);s(e,i(()=>p,()=>m,{children:(e,t)=>{var i=x(),a=r(n(i),10);u(a,{});var s=r(a,2);l(s,{ticket:4471});var p=r(s,16);d(p,{});var m=r(p,4);c(m,{ticket:4471});var h=r(m,8);f(h,{get signature(){return b}}),o(e,i)},$$slots:{default:!0}}))}export{S as n,p as t};