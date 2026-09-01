const { app } = require('@azure/functions');
const { REPO, authorise } = require('./_shared');

/**
 * The ledger, live from the repository, so a run that just finished shows up
 * without republishing the site.
 *
 * Content-hash verification is NOT redone here. Reproducing python's
 * json.dumps byte for byte from parsed JSON is not reliably possible —
 * python writes -0.0 and 1.0 where JavaScript gives 0 and 1, and once parsed
 * a Number cannot tell an int from an integral float. A verifier that
 * disagrees with the writer raises false tamper alarms, which is worse than
 * no verifier. So the answer comes from provenance/verify.py, which the
 * workflow runs after every experiment and commits as verified.json. This
 * endpoint reports that attestation and says when it was made. Chain linkage
 * is checked separately, live, in the browser — that part needs no
 * re-serialisation and so is exact.
 */

async function raw(path) {
  const token = process.env.GH_DISPATCH_TOKEN;
  if (!token) {
    const e = new Error('GH_DISPATCH_TOKEN is not configured on the Static Web App.');
    e.status = 503;
    throw e;
  }
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${path}?ref=main`,
    {
      headers: {
        Accept: 'application/vnd.github.raw',
        Authorization: `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'karenkilroy-quantum',
      },
    }
  );
  if (res.status === 404) return null;
  if (!res.ok) {
    const e = new Error(`GitHub ${res.status} for ${path}`);
    e.status = 502;
    throw e;
  }
  return res.text();
}

app.http('ledger', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'ledger',
  handler: async (request, context) => {
    const { error } = authorise(request);
    if (error) return error;

    try {
      const [jsonl, attestation] = await Promise.all([
        raw('provenance/ledger.jsonl'),
        raw('provenance/verified.json').catch(() => null),
      ]);

      if (jsonl === null) {
        return {
          status: 404,
          jsonBody: { error: 'No ledger yet. Run an experiment to create it.', entries: [] },
        };
      }

      const entries = jsonl
        .split('\n')
        .filter((l) => l.trim())
        .map((l) => JSON.parse(l));

      let content = {
        ok: null,
        problems: ['no verification on record — run an experiment to produce one'],
      };
      let verified_at = null;
      if (attestation) {
        const a = JSON.parse(attestation);
        verified_at = a.verified_at ?? null;
        content =
          a.entries === entries.length
            ? { ok: a.ok, problems: a.problems ?? [] }
            : {
                ok: null,
                problems: [
                  `verification covers ${a.entries} entries but the ledger now has ` +
                    `${entries.length} — re-run provenance/verify.py`,
                ],
              };
      }

      return {
        jsonBody: {
          entries,
          content,
          verified_at,
          mtime: Date.now(),
          source: 'github:' + REPO,
        },
        headers: { 'Cache-Control': 'no-store' },
      };
    } catch (e) {
      context.error(e);
      return { status: e.status || 500, jsonBody: { error: e.message, entries: [] } };
    }
  },
});
