/**
 * These functions are MANAGED functions: they are deployed inside the Static
 * Web App and have no public hostname of their own. The only way to reach them
 * is through karenkilroy.com, where staticwebapp.config.json already requires
 * the "quantum" role on /api/*. That is what makes the check below sufficient
 * — there is no address an anonymous caller could hit directly, so there is no
 * forgeable-header problem. A linked backend would have had one.
 */

const REPO = 'kilroyblockchain/quantum';
const WORKFLOW = 'run-experiment.yml';
const REQUIRED_ROLE = 'quantum';

/** Decode the principal Static Web Apps forwards, and require the role. */
function principal(request) {
  const header = request.headers.get('x-ms-client-principal');
  if (!header) return null;
  try {
    return JSON.parse(Buffer.from(header, 'base64').toString('utf8'));
  } catch {
    return null;
  }
}

function authorise(request) {
  const p = principal(request);
  if (!p) return { error: { status: 401, jsonBody: { error: 'Not signed in.' } } };
  if (!(p.userRoles || []).includes(REQUIRED_ROLE)) {
    return { error: { status: 403, jsonBody: { error: 'Your account does not have access.' } } };
  }
  return { principal: p };
}

async function github(path, init = {}) {
  const token = process.env.GH_DISPATCH_TOKEN;
  if (!token) {
    const e = new Error('GH_DISPATCH_TOKEN is not configured on the Static Web App.');
    e.status = 503;
    throw e;
  }
  const res = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'karenkilroy-quantum',
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...init.headers,
    },
  });
  if (!res.ok) {
    const body = await res.text();
    const e = new Error(`GitHub ${res.status}: ${body.slice(0, 300)}`);
    e.status = res.status === 404 ? 502 : res.status;
    throw e;
  }
  return res.status === 204 ? null : res.json();
}

module.exports = { REPO, WORKFLOW, authorise, github };
