const { app } = require('@azure/functions');
const { REPO, WORKFLOW, authorise, github } = require('./_shared');

const MODES = new Set(['check', 'sim-ideal', 'sim-noisy', 'hardware']);
const BACKEND_RE = /^[a-z0-9_-]{1,64}$/;

app.http('run', {
  methods: ['POST'],
  authLevel: 'anonymous', // Static Web Apps gates this route by role, not by key.
  route: 'run',
  handler: async (request, context) => {
    const { error, principal } = authorise(request);
    if (error) return error;

    let body;
    try {
      body = await request.json();
    } catch {
      return { status: 400, jsonBody: { error: 'Expected a JSON body.' } };
    }

    const mode = String(body.mode || '');
    if (!MODES.has(mode)) {
      return { status: 400, jsonBody: { error: `mode must be one of ${[...MODES].join(', ')}` } };
    }

    const shots = Number(body.shots ?? 5000);
    if (!Number.isInteger(shots) || shots < 1 || shots > 100000) {
      return { status: 400, jsonBody: { error: 'shots must be a whole number from 1 to 100000.' } };
    }

    const backend = body.backend ? String(body.backend) : '';
    if (backend && !BACKEND_RE.test(backend)) {
      return { status: 400, jsonBody: { error: 'That is not a valid backend name.' } };
    }

    // A hardware run spends real IBM Open Plan quota, so it cannot be started
    // by a stray click or a replayed request — the caller has to say so.
    if (mode === 'hardware' && body.confirm !== true) {
      return {
        status: 400,
        jsonBody: { error: 'A hardware run spends quota. Send confirm: true to start one.' },
      };
    }

    const note = String(body.note || '').slice(0, 500);

    // Dispatch inputs go over the wire as strings. The workflow declares these
    // as `type: boolean`, and GitHub coerces "true"/"false" back to booleans —
    // verified, because a string "false" is truthy inside a workflow expression
    // and would silently turn error mitigation off on every run.
    const inputs = {
      mode,
      shots: String(shots),
      raw: body.raw ? 'true' : 'false',
      record: body.record ? 'true' : 'false',
    };
    if (backend) inputs.backend = backend;
    if (note) inputs.note = note;

    context.log(`dispatch ${mode} by ${principal.userDetails}`);

    const before = await github(
      `/repos/${REPO}/actions/workflows/${WORKFLOW}/runs?per_page=1`
    ).catch(() => null);
    const beforeId = before?.workflow_runs?.[0]?.id ?? null;

    try {
      await github(`/repos/${REPO}/actions/workflows/${WORKFLOW}/dispatches`, {
        method: 'POST',
        body: JSON.stringify({ ref: 'main', inputs }),
      });
    } catch (e) {
      context.error(e);
      return { status: e.status || 500, jsonBody: { error: e.message } };
    }

    // A dispatch returns 204 with no run id, so the run has to be looked up.
    // It takes a moment to appear; the client polls /api/runs if this misses.
    let run = null;
    for (let i = 0; i < 8 && !run; i++) {
      await new Promise((r) => setTimeout(r, 1200));
      const list = await github(
        `/repos/${REPO}/actions/workflows/${WORKFLOW}/runs?per_page=1`
      ).catch(() => null);
      const candidate = list?.workflow_runs?.[0];
      if (candidate && candidate.id !== beforeId) run = candidate;
    }

    return {
      status: 202,
      jsonBody: {
        started: true,
        mode,
        inputs,
        run: run && { id: run.id, status: run.status, url: run.html_url, created_at: run.created_at },
        message: run
          ? 'Started.'
          : 'Dispatched. It has not appeared in the run list yet — it will shortly.',
      },
    };
  },
});
