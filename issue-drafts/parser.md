> *This issue was prepared by Codex with szlapinski from the course export.*

## Problem

The shared parser reads dates month first even when the tenant writes the day first. This is the parser failure path in #4471, separate from the booking-v3 form hint.

## Report count and scope

**379 distinct reports** from source ticket **#4471**. The export contains 427 rows and 412 unique IDs; 15 overlapping rows are excluded. All 412 unique reports are merged into #4471; the cause counts sum to that total.

Day-first tenants using app or email, and booking-v2 form reports. All eleven tenants in this export appear in this group.

Received 2026-04-01 through 2026-10-04; 11 tenants. Intake tags within this cause: parser: 356, hint: 23. Cause comes from tenant locale, form version and channel, using the supplied causes.ts, not from the tag or subject.

## Evidence and reproduction

Use Harbour Dental (en-GB, booking-v2) through the app. Enter 07/04/2026 for 7 April. The report R-41200 describes an invite for 4 July; the expected date is 7 April. This is a trace of the exported classifier and report evidence, not a test against the live product.

Five reports have one-day or scheduling symptoms: R-41202, R-41209, R-41236, R-41344 and R-41620. The supplied classifier includes them in parser. Keep them in this count while investigating timezone/reminder scheduling; do not claim the parser fix resolves those symptoms without evidence.

## Expected correction

Parse using tenant locale or carry an unambiguous date representation across the shared boundary. Cover app, email and booking-v2 form paths, ambiguous dates, and days above twelve. The booking-v3 hint needs its own fix.

## Triage and audit

Merge only reports with a verified common cause. Identical subjects are not sufficient; different subjects can share a cause. Keep unknown tenants and contradictory reports separate for investigation. Decision 0002 supersedes decision 0001 without editing that accepted historical record.

See [the signed review source](https://github.com/szlapinski/mega-s01e03/blob/main/src/routes/kb/incidents/4471-review/+page.svx), [rendered page](https://github.com/szlapinski/mega-s01e03/blob/main/rendered/kb/incidents/4471-review/index.html), and [complete report-ID membership](https://github.com/szlapinski/mega-s01e03/blob/main/evidence/classification.json). Rebuild and reconcile these counts when the desk exports change. Receipt dates and July merge dates measure different events; a queued fix is not a shipped fix. The later course engineering update closed source #4471 on 5 October: parser fixed; hint not planned because booking-v3 was retired. See the issue closure comment and signed review for current disposition.
