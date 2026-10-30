<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import tickets from '#lib/data/cause-tickets.json';
  import { groupByCause, uniqueById, type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';

  const raw = reports as Report[];
  const unique = uniqueById(raw);
  const merged = unique.filter((r) => r.mergedInto === 4471);
  const groups = groupByCause(merged, tenantOf);
  const ambiguous = merged.filter((r) => notes.oneDayMove.includes(r.id));
  const mismatch = groups.reduce((n, g) => n + g.reports.filter((r) => r.meta.intakeTag !== g.cause).length, 0);
  const issue = (cause: string) => tickets[cause as keyof typeof tickets];
</script>

<p>The export has <strong>{raw.length}</strong> rows, <strong>{unique.length}</strong> distinct report IDs,
  and <strong>{raw.length - unique.length}</strong> repeated rows. Of these, <strong>{merged.length}</strong>
  distinct reports were merged into #4471. They cover <strong>{groups.length}</strong> causes.</p>

<ul>
  {#each groups as g (g.cause)}
    <li><a href={issue(g.cause)}>{g.cause} ticket</a>: <strong>{g.reports.length}</strong> reports,
      {g.tenants} tenants, received {g.firstSeen} through {g.lastSeen}.</li>
  {/each}
</ul>

<p>Intake tags disagree with tenant-based classification for <strong>{mismatch}</strong> reports.
  Browser locale and the tag are intake guesses; look up the tenant's locale and form version.</p>

<p><strong>{ambiguous.length}</strong> reports read as a one-day move:
  {ambiguous.map((r) => r.id).join(', ')}.
  The supplied classifier files these under parser. Keep them in that count, flag the uncertainty,
  and investigate timezone or reminder scheduling before claiming that a parser fix resolves them.
  These symptoms alone do not establish a third cause.</p>
