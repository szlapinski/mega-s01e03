> *This issue was prepared by Codex with szlapinski from the course export.*

## Problem

booking-v3 prints MM/DD/YYYY while its form interprets the entered date in tenant order. People following that hint get a different day. This is a separate failure path from the shared parser.

## Report count and scope

**33 distinct reports** from source ticket **#4471**. The export contains 427 rows and 412 unique IDs; 15 overlapping rows are excluded. All 412 unique reports are merged into #4471; the cause counts sum to that total.

Form channel only, booking-v3 and a day-first tenant. Alder Physio (de-DE), Copper Studio (es-ES) and Pale Harbour (pt-PT) are affected. Their app/email reports belong to parser instead.

Received 2026-04-17 through 2026-09-22; 3 tenants. Intake tags within this cause: parser: 15, hint: 18. Cause comes from tenant locale, form version and channel, using the supplied causes.ts, not from the tag or subject.

## Evidence and reproduction

Use a Copper Studio (es-ES, booking-v3) form. Follow its MM/DD/YYYY hint and enter 01/06/2026 for 6 January. The tenant-order interpretation is 1 June, as described in R-41230. Expected: the displayed format and parsing agree. This is a trace of exported logic and report evidence, not a live product test.

Do not classify by browser locale or intakeTag. R-41230 is tagged parser but belongs here because its tenant is day-first and uses booking-v3 through the form.

## Expected correction

Make the hint and form interpretation agree for the tenant locale. Verify both together for all three affected tenants, and preserve booking-v2 behaviour. Changing only the shared parser does not fix this mismatch.

## Triage and audit

Merge only reports with a verified common cause. Identical subjects are not sufficient; different subjects can share a cause. Keep unknown tenants and contradictory reports separate for investigation. Decision 0002 supersedes decision 0001 without editing that accepted historical record.

See [the signed review source](https://github.com/szlapinski/mega-s01e03/blob/main/src/routes/kb/incidents/4471-review/+page.svx), [rendered page](https://github.com/szlapinski/mega-s01e03/blob/main/rendered/kb/incidents/4471-review/index.html), and [complete report-ID membership](https://github.com/szlapinski/mega-s01e03/blob/main/evidence/classification.json). Rebuild and reconcile these counts when the desk exports change. Receipt dates and July merge dates measure different events; a queued fix is not a shipped fix. The later course engineering update closed source #4471 on 5 October: parser fixed; hint not planned because booking-v3 was retired. See the issue closure comment and signed review for current disposition.
