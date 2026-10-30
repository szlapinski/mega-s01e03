import fs from 'node:fs';
import { uniqueById, groupByCause, readAs } from '../src/lib/kb/causes.ts';

const read = (p) => JSON.parse(fs.readFileSync(new URL(p, import.meta.url), 'utf8'));
const raw = read('../src/lib/data/reports-4471.json');
const tenants = fs.readdirSync(new URL('../src/lib/data/tenants', import.meta.url))
  .map((file) => read(`../src/lib/data/tenants/${file}`));
const byHandle = new Map(tenants.map((tenant) => [tenant.handle, tenant]));
const distinct = uniqueById(raw);
const merged = distinct.filter((report) => report.mergedInto === 4471);
const notes = read('../src/lib/data/desk-notes.json');
const groups = groupByCause(merged, (report) => byHandle.get(report.tenant));
const summary = {
  rawRows: raw.length,
  distinctReports: distinct.length,
  repeatedRows: raw.length - distinct.length,
  mergedReports: merged.length,
  groups: groups.map((group) => ({
    ...group,
    reports: group.reports.length,
    reportIds: group.reports.map((report) => report.id),
    oneDaySymptoms: readAs(group, notes.oneDayMove)
  }))
};
if (groups.some((group) => group.cause === 'unplaced')) throw new Error('Unclassified reports require investigation');
if (groups.reduce((n, group) => n + group.reports.length, 0) !== merged.length) throw new Error('Counts do not reconcile');
fs.mkdirSync(new URL('../evidence', import.meta.url), { recursive: true });
fs.mkdirSync(new URL('../issue-drafts', import.meta.url), { recursive: true });
fs.writeFileSync(new URL('../evidence/classification.json', import.meta.url), JSON.stringify(summary, null, 2) + '\n');

const descriptions = {
  parser: {
    title: 'Shared date parser reads day-first tenant dates as month-first',
    problem: 'The shared parser reads dates month first even when the tenant writes the day first. This is the parser failure path in #4471, separate from the booking-v3 form hint.',
    reproduce: 'Use Harbour Dental (en-GB, booking-v2) through the app. Enter 07/04/2026 for 7 April. The report R-41200 describes an invite for 4 July; the expected date is 7 April. This is a trace of the exported classifier and report evidence, not a test against the live product.',
    scope: 'Day-first tenants using app or email, and booking-v2 form reports. All eleven tenants in this export appear in this group.',
    fix: 'Parse using tenant locale or carry an unambiguous date representation across the shared boundary. Cover app, email and booking-v2 form paths, ambiguous dates, and days above twelve. The booking-v3 hint needs its own fix.',
    caveat: 'Five reports have one-day or scheduling symptoms: R-41202, R-41209, R-41236, R-41344 and R-41620. The supplied classifier includes them in parser. Keep them in this count while investigating timezone/reminder scheduling; do not claim the parser fix resolves those symptoms without evidence.'
  },
  hint: {
    title: 'booking-v3 date hint says MM/DD/YYYY for day-first tenants',
    problem: 'booking-v3 prints MM/DD/YYYY while its form interprets the entered date in tenant order. People following that hint get a different day. This is a separate failure path from the shared parser.',
    reproduce: 'Use a Copper Studio (es-ES, booking-v3) form. Follow its MM/DD/YYYY hint and enter 01/06/2026 for 6 January. The tenant-order interpretation is 1 June, as described in R-41230. Expected: the displayed format and parsing agree. This is a trace of exported logic and report evidence, not a live product test.',
    scope: 'Form channel only, booking-v3 and a day-first tenant. Alder Physio (de-DE), Copper Studio (es-ES) and Pale Harbour (pt-PT) are affected. Their app/email reports belong to parser instead.',
    fix: 'Make the hint and form interpretation agree for the tenant locale. Verify both together for all three affected tenants, and preserve booking-v2 behaviour. Changing only the shared parser does not fix this mismatch.',
    caveat: 'Do not classify by browser locale or intakeTag. R-41230 is tagged parser but belongs here because its tenant is day-first and uses booking-v3 through the form.'
  }
};
for (const group of groups) {
  const desc = descriptions[group.cause];
  const body = `> *This issue was prepared by Codex with szlapinski from the course export.*

## Problem

${desc.problem}

## Report count and scope

**${group.reports.length} distinct reports** from source ticket **#4471**. The export contains ${raw.length} rows and ${distinct.length} unique IDs; ${raw.length - distinct.length} overlapping rows are excluded. All ${merged.length} unique reports are merged into #4471; the cause counts sum to that total.

${desc.scope}

Received ${group.firstSeen} through ${group.lastSeen}; ${group.tenants} tenants. Intake tags within this cause: ${Object.entries(group.taggedAs).map(([tag, count]) => `${tag}: ${count}`).join(', ')}. Cause comes from tenant locale, form version and channel, using the supplied causes.ts, not from the tag or subject.

## Evidence and reproduction

${desc.reproduce}

${desc.caveat}

## Expected correction

${desc.fix}

## Triage and audit

Merge only reports with a verified common cause. Identical subjects are not sufficient; different subjects can share a cause. Keep unknown tenants and contradictory reports separate for investigation. Decision 0002 supersedes decision 0001 without editing that accepted historical record.

See [the signed decision source](../blob/main/src/routes/kb/decisions/0002-dedupe-by-cause/+page.svx), [rendered page](../blob/main/rendered/kb/decisions/0002-dedupe-by-cause/index.html), and [complete report-ID membership](../blob/main/evidence/classification.json). Rebuild and reconcile these counts when the desk exports change. Receipt dates and July merge dates measure different events; a queued fix is not a shipped fix.
`;
  fs.writeFileSync(new URL(`../issue-drafts/${group.cause}.md`, import.meta.url), body);
  fs.writeFileSync(new URL(`../issue-drafts/${group.cause}.title`, import.meta.url), desc.title + '\n');
}
console.log(JSON.stringify({ rows: raw.length, distinct: distinct.length, counts: Object.fromEntries(groups.map((g) => [g.cause, g.reports.length])) }));
