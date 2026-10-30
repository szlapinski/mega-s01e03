# kb — the support knowledge base

**kb** = knowledge base. What the support desk knows about how our products break, written
down where the code can keep it honest.

One desk takes reports for every product we run: `sched-prod` (calendar invites for about
300k people) and the rest. When something
goes wrong, the reports reach the desk first. This kb is how the desk triages them, what each
incident turned out to be, and why we decided what we decided.

## What's here

```
src/routes/kb/      the pages (.svx: Markdown with components)
  triage/           how the desk handles incoming reports
  incidents/        one page per big ticket
  decisions/        numbered decision records
src/lib/kb/         components and the logic they run
src/lib/layouts/    the frame every page shares
src/lib/data/       exports from the ticket system
```

## Conventions

- Words in the page, logic in `src/lib` (imported as `#lib/…`). A number that can be computed belongs in a component.
- Every page starts with frontmatter: `title`, `owner`, `status`, `reviewed`.
- A decision is never edited after it is accepted. A new record replaces it.
- A page you add is signed: its frontmatter carries your `signature` and it ends with `<RenderStamp {signature} />`, so the desk knows who wrote it.

## Owners

Support desk. Decision records: whoever signed them.

---

Exported 2026-10-04 from the `support` repo, `apps/kb/` → `src/`.

## S01E03: review and render

The new signed decision is `src/routes/kb/decisions/0002-dedupe-by-cause/+page.svx`.
It supersedes decision 0001, which remains unchanged. Incident and triage prose now follow
the evidence and the replacement rule.

With Node.js 22.18+:

```sh
npm ci
npm run snapshot
npm run build
python3 -m http.server 4173 --directory rendered --bind 127.0.0.1
```

Open `http://127.0.0.1:4173/kb/decisions/0002-dedupe-by-cause/` to see the actual rendered
page, including computed counts, dedupe examples, queue timeline and derived desk reference.
`rendered/` is a complete static site; its `index.html` files are the desk-facing render,
not a Markdown transcription. Keep the generated assets beside the HTML.

`npm run snapshot` runs the supplied cause classifier over deduplicated report IDs and
tenant configuration. It refreshes `evidence/classification.json` and the issue-body drafts.
Refresh the data first when the desk gives a newer export, then update the open GitHub
issues and rebuild the site. Counts in issues describe the corresponding data snapshot.

Public course submission: https://github.com/szlapinski/mega-s01e03
