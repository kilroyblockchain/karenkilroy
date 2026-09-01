const { app } = require('@azure/functions');
const { REPO, WORKFLOW, authorise, github } = require('./_shared');

app.http('runs', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'runs',
  handler: async (request, context) => {
    const { error } = authorise(request);
    if (error) return error;

    const limit = Math.min(Number(request.query.get('limit') || 8) || 8, 30);
    try {
      const list = await github(
        `/repos/${REPO}/actions/workflows/${WORKFLOW}/runs?per_page=${limit}`
      );
      return {
        jsonBody: {
          runs: (list.workflow_runs || []).map((r) => ({
            id: r.id,
            status: r.status,           // queued | in_progress | completed
            conclusion: r.conclusion,   // success | failure | cancelled | null
            created_at: r.created_at,
            updated_at: r.updated_at,
            url: r.html_url,
            actor: r.triggering_actor?.login ?? null,
            inputs: r.display_title,
          })),
        },
        headers: { 'Cache-Control': 'no-store' },
      };
    } catch (e) {
      context.error(e);
      return { status: e.status || 500, jsonBody: { error: e.message } };
    }
  },
});
