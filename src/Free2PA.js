import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { Download, Upload, ExternalLink } from 'lucide-react';

// ─── Trusted cert (kilroy — signs all RadioHead demo files) ───────────────────
const TRUSTED_CERT_PEM = `-----BEGIN CERTIFICATE-----
MIIBfjCCASWgAwIBAgIUD/oDfVxl43XC4KpWrfqAAUdS2f0wCgYIKoZIzj0EAwIw
HzEMMAoGA1UECgwDZm9qMQ8wDQYDVQQDDAZraWxyb3kwHhcNMjYwMjIwMDkzNTA4
WhcNMzYwMjE4MDkzNTA4WjAfMQwwCgYDVQQKDANmb2oxDzANBgNVBAMMBmtpbHJv
eTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABAmCkYND5f+B3FoOChp/5ED0bmni
TJ6eexTczztVOAgJvC5hwYouRYuc/7vTaPcmGLprqN9wPfJEpPGiea6Vng6jPzA9
MAwGA1UdEwEB/wQCMAAwDgYDVR0PAQH/BAQDAgeAMB0GA1UdDgQWBBSdd2fHYll6
HfGG6o2c58ZVuFMUwDAKBggqhkjOPQQDAgNHADBEAiBF8uhLfAiuLSvZd40nGjWU
OmOSt0j1Azm0h7AKLNodIQIgEwblBtn6mHgMkZYVYMUwVMrELQRW2FCa2MvMVcwN
i1Q=
-----END CERTIFICATE-----`;

// ─── RadioHead files available for download ───────────────────────────────────
const RADIOHEAD_FILES = [
  { name: 'SOUL.md',      label: 'SOUL.md',      desc: 'Personality & values', scenario: 'pass' },
  { name: 'IDENTITY.md',  label: 'IDENTITY.md',  desc: 'Name & role',           scenario: 'pass' },
  { name: 'workflow.md',  label: 'workflow.md',  desc: 'Transcript workflow',   scenario: 'pass' },
  { name: 'MEMORY.md',    label: 'MEMORY.md',    desc: 'Long-term memory',      scenario: 'hash' },
  { name: 'USER.md',      label: 'USER.md',      desc: 'Crew info',             scenario: 'pass' },
  { name: 'AGENTS.md',    label: 'AGENTS.md',    desc: 'Workspace rules',       scenario: 'signature' },
  { name: 'APPS.md',      label: 'APPS.md',      desc: 'App registry',          scenario: 'pass' },
  { name: 'HEARTBEAT.md', label: 'HEARTBEAT.md', desc: 'Periodic checks',       scenario: 'pass' },
  { name: 'tests.md',     label: 'tests.md',     desc: 'System tests',          scenario: 'trust' },
];

const SCENARIO_INFO = {
  pass:      { label: 'PASS',         color: '#22c55e', note: 'All three checks pass — baseline reference.' },
  hash:      { label: 'HASH FAIL',    color: '#fbbf24', note: 'Hash will fail because the .md was edited after signing.' },
  signature: { label: 'SIG FAIL',     color: '#f87171', note: 'Signature has been tampered with inside the sidecar.' },
  trust:     { label: 'TRUST FAIL',   color: '#f472b6', note: 'Signed by a cert outside the default trust store.' },
};


// ─── Crypto helpers ───────────────────────────────────────────────────────────

async function sha256Hex(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function pemToBytes(pem) {
  const b64 = pem.replace(/-----[^-]+-----/g, '').replace(/\s+/g, '');
  const bin = atob(b64);
  return Uint8Array.from(bin, c => c.charCodeAt(0));
}

function derToP256Signature(derBytes) {
  let offset = 0;
  if (derBytes[offset++] !== 0x30) return null;
  let length = derBytes[offset++];
  if (length & 0x80) {
    const bytesNeeded = length & 0x7f;
    length = 0;
    for (let i = 0; i < bytesNeeded; i++) {
      length = (length << 8) | derBytes[offset++];
    }
  }
  if (derBytes[offset++] !== 0x02) return null;
  let rLength = derBytes[offset++];
  let r = derBytes.slice(offset, offset + rLength);
  offset += rLength;
  if (derBytes[offset++] !== 0x02) return null;
  let sLength = derBytes[offset++];
  let s = derBytes.slice(offset, offset + sLength);

  const trim = bytes => {
    let start = 0;
    while (start < bytes.length - 1 && bytes[start] === 0) start++;
    return bytes.slice(start);
  };

  const pad = bytes => {
    const out = new Uint8Array(32);
    if (bytes.length > 32) {
      bytes = bytes.slice(bytes.length - 32);
    }
    out.set(bytes, 32 - bytes.length);
    return out;
  };

  const paddedR = pad(trim(r));
  const paddedS = pad(trim(s));
  const raw = new Uint8Array(64);
  raw.set(paddedR, 0);
  raw.set(paddedS, 32);
  return raw;
}

async function verifyECDSA(pubKeyBytes, sigBytes, messageBytes) {
  try {
    const key = await crypto.subtle.importKey(
      'spki', pubKeyBytes.buffer,
      { name: 'ECDSA', namedCurve: 'P-256' },
      false, ['verify']
    );
    return await crypto.subtle.verify(
      { name: 'ECDSA', hash: 'SHA-256' },
      key, sigBytes, messageBytes
    );
  } catch {
    return false;
  }
}

function extractSpkiFromCert(certDer) {
  const p256oid = [0x2a, 0x86, 0x48, 0xce, 0x3d, 0x03, 0x01, 0x07];
  const bytes = new Uint8Array(certDer);
  for (let i = 0; i < bytes.length - p256oid.length - 10; i++) {
    if (p256oid.every((b, j) => bytes[i + j] === b)) {
      for (let k = i - 4; k >= 0; k--) {
        if (bytes[k] === 0x30) {
          let len;
          let offset = k + 1;
          if (bytes[offset] < 0x80) {
            len = bytes[offset];
            offset++;
          } else {
            const nb = bytes[offset] & 0x7f;
            len = 0;
            for (let n = 0; n < nb; n++) len = (len << 8) | bytes[offset + 1 + n];
            offset += 1 + nb;
          }
          const end = offset + len;
          if (end <= bytes.length && end > i + p256oid.length) {
            return bytes.slice(k, end).buffer;
          }
        }
      }
    }
  }
  return null;
}

function canonicalJson(obj) {
  if (Array.isArray(obj)) {
    return '[' + obj.map(canonicalJson).join(',') + ']';
  }
  if (obj !== null && typeof obj === 'object') {
    return '{' + Object.keys(obj).sort()
      .map(k => JSON.stringify(k) + ':' + canonicalJson(obj[k]))
      .join(',') + '}';
  }
  if (obj === undefined) {
    return 'null';
  }
  if (obj === null || typeof obj !== 'object') {
    return JSON.stringify(obj);
  }
  return JSON.stringify(obj);
}

async function verifyFile(fileText, sidecarText, trustedCerts = [TRUSTED_CERT_PEM]) {
  let sidecar;
  try { sidecar = JSON.parse(sidecarText); } catch {
    return { success: false, error: 'Sidecar is not valid JSON.' };
  }

  const { claim, signature } = sidecar;
  if (!claim)     return { success: false, error: 'Sidecar missing "claim".' };
  if (!signature) return { success: false, error: 'Sidecar missing "signature".' };

  const currentHash = await sha256Hex(fileText);
  const hashMatch = currentHash === claim.asset?.hash;

  let signatureValid = false;
  try {
    const certBytes  = pemToBytes(signature.cert_pem);
    // -----BEGIN PUBLIC KEY----- is already SPKI; only full X.509 certs need extraction
    const isBareKey  = (signature.cert_pem || '').includes('BEGIN PUBLIC KEY');
    const spkiBytes  = isBareKey ? certBytes.buffer : extractSpkiFromCert(certBytes.buffer);
    if (spkiBytes) {
      const derBytes  = Uint8Array.from(atob(signature.value), c => c.charCodeAt(0));
      const sigBytes  = derToP256Signature(derBytes);
      if (!sigBytes) {
        signatureValid = false;
      } else {
      const messages = [];
      const canonicalClaim = canonicalJson(claim);
      messages.push(canonicalClaim);
      const defaultJson = JSON.stringify(claim);
      if (defaultJson && defaultJson !== canonicalClaim) messages.push(defaultJson);
      for (const msg of messages) {
        const msgBytes = new TextEncoder().encode(msg);
        if (await verifyECDSA(new Uint8Array(spkiBytes), sigBytes, msgBytes)) {
          signatureValid = true;
          break;
        }
      }
      }
    }
  } catch { /* signatureValid stays false */ }

  const normalize = s => (s || '').replace(/\s+/g, '');
  const trustedList = (trustedCerts && trustedCerts.length ? trustedCerts : [TRUSTED_CERT_PEM])
    .map(normalize)
    .filter(Boolean);
  const certNormalized = normalize(signature.cert_pem);
  const matchIndex = trustedList.findIndex(entry => entry === certNormalized);
  const trusted = matchIndex !== -1;
  const trustLabel = matchIndex === 0
    ? 'kilroy (KUAF trust store)'
    : matchIndex > 0
      ? 'Uploaded cert'
      : 'Unknown signer';
  const trustDetail = matchIndex === 0
    ? 'Cert matches the kilroy certificate in the KUAF trust store.'
    : matchIndex > 0
      ? 'Matches a cert you manually trusted for this session.'
      : 'This cert is not in the trusted certificate list.';

  return {
    success: true,
    hashMatch,
    signatureValid,
    trust: { trusted, label: trustLabel, detail: trustDetail },
    claim,
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const ROBOT_ART = {
  idle: `  .-------.
 ( o     o )
 |  -   -  |
 |  _____  |
 '---------'
   |     |
  [=]   [=]`,
  fail: `  .-------.
 ( x     x )
 |  -   -  |
 |  )___(  |
 '---------'
   |     |
  [=]   [=]`,
  pass: `  .-------.
 ( o     o )
 |  ^   ^  |
 |  (___)  |
 '---------'
   |     |
  [=]   [=]`,
};

function RobotFace({ state }) {
  const palette = state === 'pass'
    ? { color: '#68d391', bg: '#0d2b1e', border: '#22543d' }
    : state === 'fail'
      ? { color: '#fc8181', bg: '#2b0d0d', border: '#742a2a' }
      : { color: '#94a3b8', bg: '#1e2330', border: '#2d3748' };
  const art = state === 'pass' ? ROBOT_ART.pass : state === 'fail' ? ROBOT_ART.fail : ROBOT_ART.idle;
  const label = state === 'pass' ? 'VERIFIED' : state === 'fail' ? 'REJECTED' : 'READY';

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <pre style={{
        fontFamily: '"SF Mono","Courier New",Consolas,monospace',
        fontSize: '0.85rem', lineHeight: 1.25,
        color: palette.color, display: 'inline-block',
        background: palette.bg,
        border: `1px solid ${palette.border}`,
        borderRadius: 8, padding: '10px 20px',
        transition: 'all 0.3s',
      }}>
{art}
      </pre>
      <div style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.4em', color: palette.color }}>
        {label}
      </div>
    </div>
  );
}

function CheckRow({ ok, label, detail }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 10,
      padding: '10px 14px', borderRadius: 8,
      border: `1px solid ${ok ? '#22543d' : '#742a2a'}`,
      background: ok ? '#0d2b1e' : '#2b0d0d',
      marginBottom: 8,
    }}>
      <span style={{ fontSize: '1rem', marginTop: 1 }}>{ok ? '✅' : '❌'}</span>
      <div>
        <div style={{ fontWeight: 700, fontSize: '0.88rem', color: ok ? '#68d391' : '#fc8181' }}>{label}</div>
        <div style={{ fontSize: '0.76rem', color: ok ? '#68d391cc' : '#fc8181cc', marginTop: 2 }}>{detail}</div>
      </div>
    </div>
  );
}

function DropZone({ label, accept, file, onFile, hint }) {
  const ref = useRef();
  const [over, setOver] = useState(false);

  const handleClick = useCallback(() => {
    if (ref.current) {
      ref.current.value = '';
      ref.current.click();
    }
  }, []);

  const handleDrop = useCallback(e => {
    e.preventDefault(); setOver(false);
    const f = e.dataTransfer.files[0];
    if (f) onFile(f);
  }, [onFile]);

  return (
    <div
      onClick={handleClick}
      onDragOver={e => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={handleDrop}
      style={{
        border: `2px dashed ${over ? '#4f8ef7' : file ? '#22543d' : '#2d3748'}`,
        borderRadius: 10, padding: '18px 16px', textAlign: 'center',
        cursor: 'pointer', background: file ? '#0d2b1e' : '#1e2330',
        transition: 'all 0.2s', marginBottom: 10,
      }}
    >
      <input ref={ref} type="file" accept={accept} style={{ display: 'none' }}
        onChange={e => {
          if (e.target.files[0]) onFile(e.target.files[0]);
          e.target.value = '';
        }} />
      <Upload size={20} style={{ color: file ? '#68d391' : '#4a5568', marginBottom: 6 }} />
      <div style={{ fontSize: '0.82rem', fontWeight: 600, color: file ? '#68d391' : '#94a3b8' }}>
        {file ? file.name : label}
      </div>
      {hint && !file && <div style={{ fontSize: '0.72rem', color: '#4a5568', marginTop: 4 }}>{hint}</div>}
    </div>
  );
}

function renderMarkdown(markdown = '') {
  const escapeHtml = str => str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const formatInline = text => {
    let html = escapeHtml(text);
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" />');
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
    html = html.replace(/(^|[^*])\*(?!\s)([^*]+?)\*(?!\*)/g, (_, lead, val) => `${lead}<em>${val}</em>`);
    html = html.replace(/_(.+?)_/g, '<em>$1</em>');
    return html;
  };

  const lines = markdown.split(/\r?\n/);
  const html = [];
  let paragraph = [];
  let inUl = false;
  let inOl = false;
  let inBlockquote = false;
  let inCode = false;
  let codeLines = [];
  let tableLines = null;

  const flushParagraph = () => {
    if (paragraph.length) {
      html.push(`<p>${formatInline(paragraph.join(' '))}</p>`);
      paragraph = [];
    }
  };

  const closeLists = () => {
    if (inUl) { html.push('</ul>'); inUl = false; }
    if (inOl) { html.push('</ol>'); inOl = false; }
  };

  const closeBlockquote = () => {
    if (inBlockquote) {
      html.push('</blockquote>');
      inBlockquote = false;
    }
  };

  const flushCode = () => {
    if (inCode) {
      html.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
      inCode = false;
      codeLines = [];
    }
  };

  const flushTable = () => {
    if (tableLines && tableLines.length) {
      html.push(`<pre class="md-table">${escapeHtml(tableLines.join('\n'))}</pre>`);
      tableLines = null;
    }
  };

  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('```')) {
      flushParagraph(); flushTable(); closeLists(); closeBlockquote();
      if (inCode) { flushCode(); } else { inCode = true; codeLines = []; }
      return;
    }
    if (inCode) { codeLines.push(line); return; }

    if (!trimmed) { flushParagraph(); flushTable(); closeBlockquote(); return; }

    if (/^---+$/.test(trimmed)) {
      flushParagraph(); flushTable(); closeLists(); closeBlockquote();
      html.push('<hr />'); return;
    }

    const tableMatch = /^\|.*\|$/.test(trimmed);
    if (tableMatch) {
      flushParagraph(); closeLists(); closeBlockquote();
      if (!tableLines) tableLines = [];
      tableLines.push(trimmed); return;
    } else if (tableLines) { flushTable(); }

    if (trimmed.startsWith('>')) {
      flushParagraph(); flushTable(); closeLists();
      if (!inBlockquote) { html.push('<blockquote>'); inBlockquote = true; }
      html.push(`<p>${formatInline(trimmed.replace(/^>\s?/, ''))}</p>`); return;
    } else { closeBlockquote(); }

    const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph(); flushTable(); closeLists(); closeBlockquote();
      const level = headingMatch[1].length;
      html.push(`<h${level}>${formatInline(headingMatch[2])}</h${level}>`); return;
    }

    const ulMatch = trimmed.match(/^[-*]\s+(.*)$/);
    if (ulMatch) {
      flushParagraph(); flushTable(); closeBlockquote();
      if (inOl) { html.push('</ol>'); inOl = false; }
      if (!inUl) { html.push('<ul>'); inUl = true; }
      html.push(`<li>${formatInline(ulMatch[1])}</li>`); return;
    }

    const olMatch = trimmed.match(/^\d+\.\s+(.*)$/);
    if (olMatch) {
      flushParagraph(); flushTable(); closeBlockquote();
      if (inUl) { html.push('</ul>'); inUl = false; }
      if (!inOl) { html.push('<ol>'); inOl = true; }
      html.push(`<li>${formatInline(olMatch[1])}</li>`); return;
    }

    paragraph.push(trimmed);
  });

  flushParagraph(); flushCode(); flushTable(); closeLists(); closeBlockquote();
  return html.join('');
}

function downloadTextFile(text, name, type = 'application/octet-stream') {
  if (!text) return;
  const blob = new Blob([text], { type });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

function MarkdownPreview({ markdown }) {
  const rendered = useMemo(() => renderMarkdown(markdown || ''), [markdown]);
  return (
    <div style={{
      background: '#080c16',
      border: '1px solid #1f2433',
      borderRadius: 12,
      padding: '16px 20px',
      boxShadow: '0 25px 50px rgba(0,0,0,0.55)',
      minHeight: 180,
    }}>
      <div style={{ fontSize: '0.7rem', color: '#64748b', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>
        Markdown Preview
      </div>
      {markdown
        ? <div className="markdown-preview" dangerouslySetInnerHTML={{ __html: rendered }} />
        : <div style={{ color: '#475569', fontSize: '0.82rem' }}>Select a file to preview the Markdown.</div>}
    </div>
  );
}

function SidecarPreview({ text }) {
  return (
    <div style={{
      background: '#05070d',
      border: '1px solid #1b2335',
      borderRadius: 12,
      padding: '16px 20px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.55)',
    }}>
      <div style={{ fontSize: '0.7rem', color: '#64748b', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>
        Sidecar (.c2pa.json)
      </div>
      {text
        ? <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '0.78rem', color: '#cbd5f5', background: '#090f1c', borderRadius: 8, padding: 12, border: '1px solid #1d2840', overflowX: 'auto' }}>{text}</pre>
        : <div style={{ color: '#475569', fontSize: '0.82rem' }}>Sidecar preview not available.</div>}
    </div>
  );
}

// ─── Activity 3: Verifier ─────────────────────────────────────────────────────

function Verifier() {
  const [mdFile, setMdFile]         = useState(null);
  const [sidecarFile, setSidecarFile] = useState(null);
  const [trustedCert, setTrustedCert] = useState(null);
  const [result, setResult]         = useState(null);
  const [loading, setLoading]       = useState(false);

  const reset = () => { setMdFile(null); setSidecarFile(null); setTrustedCert(null); setResult(null); };

  const verify = async () => {
    if (!mdFile || !sidecarFile) return;
    setLoading(true); setResult(null);
    try {
      const [fileText, sidecarText, customCert] = await Promise.all([
        mdFile.text(),
        sidecarFile.text(),
        trustedCert ? trustedCert.text() : Promise.resolve(''),
      ]);
      const trustList = [TRUSTED_CERT_PEM];
      if (customCert && customCert.trim()) trustList.push(customCert);
      const r = await verifyFile(fileText, sidecarText, trustList);
      setResult(r);
    } catch (e) {
      setResult({ success: false, error: e.message });
    } finally {
      setLoading(false);
    }
  };

  const allPass = result?.success && result.hashMatch && result.signatureValid && result.trust?.trusted;
  const robotState = result ? (allPass ? 'pass' : 'fail') : 'idle';
  const verdict    = result ? (allPass ? 'PASS' : 'FAIL') : null;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
      {/* Left: upload */}
      <div style={{ background: '#1e2330', border: '1px solid #2d3748', borderRadius: 12, padding: 24 }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 16 }}>
          Upload Files
        </div>
        <DropZone label="Drop .md file here" accept=".md,.txt" file={mdFile} onFile={setMdFile} hint="e.g. SOUL.md" />
        <DropZone label="Drop .c2pa.json sidecar here" accept=".json" file={sidecarFile} onFile={setSidecarFile} hint="e.g. SOUL.md.c2pa.json" />
        <DropZone label="Optional: Drop trusted cert (.pem)" accept=".pem,.crt,.cer,.txt" file={trustedCert} onFile={setTrustedCert} hint="Use this with Step 5 certs or untrusted files." />
        <button
          disabled={!mdFile || !sidecarFile || loading}
          onClick={verify}
          style={{
            width: '100%', background: '#4f8ef7', color: '#fff', border: 'none',
            borderRadius: 8, padding: '10px 0', fontWeight: 700, fontSize: '0.9rem',
            cursor: (!mdFile || !sidecarFile || loading) ? 'not-allowed' : 'pointer',
            opacity: (!mdFile || !sidecarFile) ? 0.4 : 1,
            marginBottom: 10,
          }}
        >
          {loading ? '⏳ Verifying…' : 'Verify'}
        </button>
        {(mdFile || sidecarFile || result) && (
          <button onClick={reset} style={{
            width: '100%', background: 'transparent', color: '#64748b', border: '1px solid #2d3748',
            borderRadius: 8, padding: '8px 0', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer',
          }}>
            Reset
          </button>
        )}
      </div>

      {/* Right: result */}
      <div style={{ background: '#1e2330', border: '1px solid #2d3748', borderRadius: 12, padding: 24 }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 16 }}>
          Verification Result
        </div>
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <RobotFace state={robotState} />
        </div>
        {verdict && (
          <div style={{
            textAlign: 'center', fontSize: '1.4rem', fontWeight: 900,
            letterSpacing: '0.12em', marginBottom: 14,
            color: allPass ? '#68d391' : '#fc8181',
          }}>
            {verdict}
          </div>
        )}
        {result?.success === false && (
          <div style={{ background: '#2b0d0d', border: '1px solid #742a2a', borderRadius: 8, padding: '10px 14px', fontSize: '0.82rem', color: '#fc8181' }}>
            {result.error}
          </div>
        )}
        {result?.success && (
          <>
            <CheckRow
              ok={result.signatureValid}
              label="Signature"
              detail={result.signatureValid
                ? 'ECDSA P-256 signature verified against the cert in the sidecar.'
                : 'Signature did not verify — sidecar may be corrupt or cert swapped.'}
            />
            <CheckRow
              ok={result.hashMatch}
              label="File integrity"
              detail={result.hashMatch
                ? 'SHA-256 matches the hash recorded at signing time.'
                : 'File has been modified since it was signed.'}
            />
            <CheckRow
              ok={result.trust?.trusted}
              label={`Trust · ${result.trust?.label}`}
              detail={result.trust?.detail}
            />
          </>
        )}
        {!result && (
          <div style={{ color: '#4a5568', fontSize: '0.82rem', fontStyle: 'italic', textAlign: 'center', marginTop: 20 }}>
            Upload a file and its sidecar to see results here.
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Animated RadioHead robot SVG ─────────────────────────────────────────────

const ROBOT_SVG = (
  <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
    style={{ width: 160, height: 160, animation: 'rhBob 2.2s ease-in-out infinite' }}
    aria-label="RadioHead robot DJ">
    <defs>
      <linearGradient id="f2-gR" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ffe8cc"/><stop offset="100%" stopColor="#ffb36e"/></linearGradient>
      <linearGradient id="f2-gH" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fff2de"/><stop offset="100%" stopColor="#ffd7a6"/></linearGradient>
      <linearGradient id="f2-gC" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#203559"/><stop offset="100%" stopColor="#172741"/></linearGradient>
      <filter id="f2-gB"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <filter id="f2-gO"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <filter id="f2-sh"><feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#0f1e33" floodOpacity=".28"/></filter>
    </defs>
    <g opacity=".95">
      <path style={{ animation: 'rhNote 1.5s ease-in-out infinite' }} d="M210 260v84c0 13-10 23-24 23s-24-10-24-23 10-23 24-23c4 0 8 .8 11 2v-63l89-15v69c0 13-10 23-24 23s-24-10-24-23 10-23 24-23c4 0 8 .8 11 2v-43z" fill="#7fb0ff"/>
      <path style={{ animation: 'rhNote 1.5s ease-in-out infinite 0.5s' }} d="M794 220v74c0 11-9 20-20 20s-20-9-20-20 9-20 20-20c3 0 6 .6 9 1.6v-54l76-13v61c0 11-9 20-20 20s-20-9-20-20 9-20 20-20c3 0 6 .6 9 1.6v-38z" fill="#ff9b54"/>
    </g>
    <g filter="url(#f2-sh)"><rect x="156" y="608" width="712" height="248" rx="42" fill="url(#f2-gC)" stroke="#385a88" strokeWidth="6"/><rect x="198" y="646" width="628" height="54" rx="16" fill="#2b4670" opacity=".8"/><rect x="198" y="714" width="628" height="102" rx="20" fill="#223a5f"/></g>
    <g>
      <circle style={{ animation: 'rhGlow 1.5s ease-in-out infinite' }} cx="270" cy="673" r="23" fill="#4f7cff" filter="url(#f2-gB)"/>
      <circle style={{ animation: 'rhGlow 1.5s ease-in-out infinite 0.4s' }} cx="330" cy="673" r="18" fill="#ff9b54" filter="url(#f2-gO)"/>
      <circle style={{ animation: 'rhGlow 1.5s ease-in-out infinite 0.4s' }} cx="694" cy="673" r="18" fill="#ff9b54" filter="url(#f2-gO)"/>
      <circle style={{ animation: 'rhGlow 1.5s ease-in-out infinite' }} cx="754" cy="673" r="23" fill="#4f7cff" filter="url(#f2-gB)"/>
      <rect x="412" y="661" width="200" height="24" rx="12" fill="#162743" stroke="#5e85c2" strokeWidth="3"/>
      <circle cx="485" cy="673" r="14" fill="#7fb0ff"/><circle cx="546" cy="673" r="14" fill="#ffb36e"/>
      <g opacity=".95"><rect x="250" y="745" width="14" height="55" rx="7" fill="#6d95d4"/><rect x="294" y="738" width="14" height="62" rx="7" fill="#6d95d4"/><rect x="338" y="752" width="14" height="48" rx="7" fill="#6d95d4"/><rect x="676" y="742" width="14" height="58" rx="7" fill="#6d95d4"/><rect x="720" y="754" width="14" height="46" rx="7" fill="#6d95d4"/><rect x="764" y="736" width="14" height="64" rx="7" fill="#6d95d4"/></g>
    </g>
    <g fill="#ffbf82" stroke="#e48d46" strokeWidth="5"><rect x="297" y="552" width="145" height="52" rx="26" transform="rotate(18 297 552)"/><rect x="589" y="523" width="145" height="52" rx="26" transform="rotate(-18 589 523)"/><circle cx="392" cy="626" r="26" fill="#ffe2bf"/><circle cx="630" cy="603" r="26" fill="#ffe2bf"/></g>
    <g filter="url(#f2-sh)"><rect x="378" y="486" width="268" height="224" rx="52" fill="url(#f2-gR)" stroke="#e5924a" strokeWidth="6"/><rect x="445" y="555" width="134" height="62" rx="20" fill="#2a4670"/><circle style={{ animation: 'rhGlow 1.5s ease-in-out infinite' }} cx="478" cy="586" r="11" fill="#7fb0ff" filter="url(#f2-gB)"/><circle style={{ animation: 'rhGlow 1.5s ease-in-out infinite 0.4s' }} cx="512" cy="586" r="11" fill="#ff9b54" filter="url(#f2-gO)"/><circle style={{ animation: 'rhGlow 1.5s ease-in-out infinite' }} cx="546" cy="586" r="11" fill="#7fb0ff" filter="url(#f2-gB)"/></g>
    <rect x="474" y="446" width="76" height="54" rx="18" fill="#ffd3a1" stroke="#e5924a" strokeWidth="5"/>
    <g filter="url(#f2-sh)"><rect x="336" y="250" width="352" height="224" rx="64" fill="url(#f2-gH)" stroke="#e5924a" strokeWidth="6"/><rect x="413" y="322" width="198" height="72" rx="28" fill="#20385f"/><circle style={{ animation: 'rhGlow 1.5s ease-in-out infinite' }} cx="468" cy="358" r="17" fill="#7fb0ff" filter="url(#f2-gB)"/><circle style={{ animation: 'rhGlow 1.5s ease-in-out infinite' }} cx="556" cy="358" r="17" fill="#7fb0ff" filter="url(#f2-gB)"/><path d="M448 418c18 20 42 30 64 30s46-10 64-30" fill="none" stroke="#3f628f" strokeWidth="8" strokeLinecap="round"/></g>
    <g><rect x="500" y="206" width="24" height="48" rx="12" fill="#ffbe7f"/><circle style={{ animation: 'rhGlow 1.5s ease-in-out infinite 0.4s' }} cx="512" cy="188" r="16" fill="#ff9b54" filter="url(#f2-gO)"/></g>
    <g><path d="M302 348c0-116 94-210 210-210s210 94 210 210" fill="none" stroke="#4f7cff" strokeWidth="24" strokeLinecap="round"/><rect x="292" y="322" width="44" height="118" rx="20" fill="#1f3559"/><rect x="688" y="322" width="44" height="118" rx="20" fill="#1f3559"/><rect x="297" y="330" width="34" height="102" rx="16" fill="#7fb0ff"/><rect x="693" y="330" width="34" height="102" rx="16" fill="#7fb0ff"/></g>
  </svg>
);

const Card = ({ children, style }) => (
  <div style={{ background: '#1e2330', border: '1px solid #2d3748', borderRadius: 12, padding: 24, ...style }}>
    {children}
  </div>
);

// ─── RadioHead file explorer (Step 3) ─────────────────────────────────────────

function RadioHeadFiles() {
  const [selected, setSelected] = useState(RADIOHEAD_FILES[0]);
  const [markdown, setMarkdown] = useState('');
  const [sidecar, setSidecar] = useState('');
  const [sidecarMeta, setSidecarMeta] = useState(null);
  const [previewResult, setPreviewResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!selected) return;
      setLoading(true); setError(null); setPreviewResult(null);
      try {
        const [mdResp, scResp] = await Promise.all([
          fetch(`/free2pa/${selected.name}`),
          fetch(`/free2pa/${selected.name}.c2pa.json`),
        ]);
        if (!mdResp.ok || !scResp.ok) throw new Error('fetch failed');
        const [mdText, sidecarText] = await Promise.all([mdResp.text(), scResp.text()]);
        let formattedSidecar = sidecarText;
        let parsedSidecar = null;
        try {
          parsedSidecar = JSON.parse(sidecarText);
          formattedSidecar = JSON.stringify(parsedSidecar, null, 2);
        } catch { /* keep raw */ }
        const verification = await verifyFile(mdText, sidecarText, [TRUSTED_CERT_PEM]);
        if (cancelled) return;
        setMarkdown(mdText);
        setSidecar(formattedSidecar);
        setSidecarMeta(parsedSidecar);
        setPreviewResult(verification);
      } catch {
        if (cancelled) return;
        setError('Unable to load preview right now. Download the files manually.');
        setMarkdown(''); setSidecar(''); setSidecarMeta(null); setPreviewResult(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [selected]);

  const onKeySelect = (file, event) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setSelected(file); }
  };

  const scenarioMeta = selected ? SCENARIO_INFO[selected.scenario] || SCENARIO_INFO.pass : null;
  const previewSuccess = previewResult?.success;
  const hashOk  = previewSuccess ? previewResult.hashMatch : false;
  const sigOk   = previewSuccess ? previewResult.signatureValid : false;
  const trustOk = previewSuccess ? previewResult.trust?.trusted : false;
  const allPass = hashOk && sigOk && trustOk;
  const signerCert = sidecarMeta?.signature?.cert_pem;

  return (
    <Card>
      <p style={{ color: '#94a3b8', marginBottom: 20, lineHeight: 1.7 }}>
        These are the 9 real files that define RadioHead — the AI agent running at KUAF.
        Click any card to load its Markdown + sidecar preview.
        The badge shows what will happen when you verify it (PASS, HASH FAIL, SIG FAIL, TRUST FAIL).
        Download each <code style={{ background: '#161b27', padding: '1px 6px', borderRadius: 4, fontSize: '0.85em' }}>.md</code>,
        its <code style={{ background: '#161b27', padding: '1px 6px', borderRadius: 4, fontSize: '0.85em' }}>.c2pa.json</code>,
        and grab the signer cert if needed for Activity 4.
      </p>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: '0.72rem', color: '#cbd5f5', marginBottom: 14 }}>
        {Object.entries({ 'PASS': '#22c55e', 'HASH FAIL': '#fbbf24', 'SIG FAIL': '#f87171', 'TRUST FAIL': '#f472b6' }).map(([label, color]) => (
          <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: color, display: 'inline-block' }} />
            {label}
          </span>
        ))}
      </div>

      {/* Two-pane: file list left, preview right */}
      <div className="f2pa-file-split" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 360px) 1fr', gap: 24, alignItems: 'stretch' }}>

        {/* File stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {RADIOHEAD_FILES.map(file => {
            const active = selected?.name === file.name;
            const info = SCENARIO_INFO[file.scenario] || SCENARIO_INFO.pass;
            return (
              <div
                key={file.name}
                role="button" tabIndex={0}
                onClick={() => setSelected(file)}
                onKeyDown={event => onKeySelect(file, event)}
                style={{
                  background: active ? '#111629' : '#151b2c',
                  border: `1px solid ${active ? '#4f8ef7' : '#1f2a3d'}`,
                  borderRadius: 14,
                  padding: '14px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: active ? '0 14px 32px rgba(17, 22, 41, 0.65)' : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#f8fafc' }}>{file.label}</div>
                    <div style={{ fontSize: '0.75rem', color: '#7c8ab0' }}>{file.desc}</div>
                  </div>
                  <span style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.15em', color: info.color, whiteSpace: 'nowrap' }}>{info.label}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 8 }}>
                  <a href={`/free2pa/${file.name}`} download onClick={e => e.stopPropagation()}
                    style={{ textAlign: 'center', background: '#1e2330', color: '#4f8ef7', textDecoration: 'none', border: '1px solid #2d3748', borderRadius: 6, padding: '6px 0', fontSize: '0.72rem', fontWeight: 700 }}>
                    .md
                  </a>
                  <a href={`/free2pa/${file.name}.c2pa.json`} download onClick={e => e.stopPropagation()}
                    style={{ textAlign: 'center', background: '#1e2330', color: '#94a3b8', textDecoration: 'none', border: '1px solid #2d3748', borderRadius: 6, padding: '6px 0', fontSize: '0.72rem', fontWeight: 700 }}>
                    sidecar
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Preview panel */}
        <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: '#101425', border: '1px solid #1f2a3f', borderRadius: 12, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#e2e8f0' }}>{selected?.label}</div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{selected?.desc}</div>
              {scenarioMeta && <div style={{ fontSize: '0.7rem', color: scenarioMeta.color, letterSpacing: '0.2em', marginTop: 6, fontWeight: 700 }}>{scenarioMeta.label}</div>}
            </div>
            {loading && <span style={{ fontSize: '0.72rem', color: '#4f8ef7' }}>Loading…</span>}
          </div>

          {scenarioMeta && (
            <div style={{ background: '#0d111e', border: '1px dashed #2d3748', borderRadius: 10, padding: '10px 14px', fontSize: '0.78rem', color: '#94a3b8' }}>
              {scenarioMeta.note}
            </div>
          )}

          {error ? (
            <div style={{ background: '#2b0d0d', border: '1px solid #742a2a', borderRadius: 10, padding: '12px 16px', color: '#fecaca', fontSize: '0.85rem' }}>{error}</div>
          ) : loading ? (
            <div style={{ background: '#0b0f1c', border: '1px solid #1f2a3f', borderRadius: 12, padding: '20px 16px', color: '#64748b', fontSize: '0.85rem', textAlign: 'center' }}>Fetching preview…</div>
          ) : (
            <>
              {previewSuccess && (
                <div style={{ background: '#050a16', border: '1px solid #1b2335', borderRadius: 12, padding: '14px 16px' }}>
                  <div style={{ fontSize: '0.7rem', letterSpacing: '0.35em', fontWeight: 800, color: '#64748b', marginBottom: 6 }}>VERDICT</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 900, letterSpacing: '0.2em', color: allPass ? '#68d391' : '#f87171', marginBottom: 10 }}>
                    {allPass ? 'PASS' : 'FAIL'}
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {[['Signature', sigOk], ['Hash', hashOk], ['Trust', trustOk]].map(([label, ok]) => (
                      <span key={label} style={{
                        fontSize: '0.7rem', fontWeight: 700, padding: '4px 10px', borderRadius: 999,
                        border: `1px solid ${ok ? '#22543d' : '#742a2a'}`,
                        color: ok ? '#68d391' : '#f87171',
                        background: ok ? '#0f1f1a' : '#1f0f13',
                      }}>
                        {ok ? '✓' : '✗'} {label}
                      </span>
                    ))}
                  </div>
                  {previewResult?.trust?.label && (
                    <div style={{ marginTop: 8, fontSize: '0.72rem', color: '#94a3b8' }}>
                      Trust detail: {previewResult.trust.label} — {previewResult.trust.detail}
                    </div>
                  )}
                  {signerCert && (
                    <button
                      onClick={() => downloadTextFile(signerCert, `${selected.label}-signer.pem`, 'application/x-pem-file')}
                      style={{ marginTop: 10, background: 'transparent', border: '1px solid #2d3748', color: '#e2e8f0', borderRadius: 999, padding: '6px 12px', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer' }}
                    >
                      <Download size={12} style={{ marginRight: 6 }} /> Download signer cert
                    </button>
                  )}
                </div>
              )}
              <MarkdownPreview markdown={markdown} />
              <SidecarPreview text={sidecar} />
            </>
          )}
        </div>
      </div>
    </Card>
  );
}

// ─── Step definitions ─────────────────────────────────────────────────────────

const STEPS = [
  {
    num: 0,
    title: 'Welcome',
    tag: null,
    content: (
      <Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

          {/* Title block */}
          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#3a4a5f', marginBottom: 14 }}>
              Presented by
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#f0f4ff', letterSpacing: '-0.02em', marginBottom: 6 }}>
              Karen Kilroy
            </div>
            <div style={{ fontSize: '1rem', color: '#7a8ea8', marginBottom: 4 }}>
              March 17, 2026 · University of Arkansas AI Club
            </div>
            <a href="mailto:kilroy@uark.edu" style={{ fontSize: '0.9rem', color: '#4f8ef7', textDecoration: 'none', fontWeight: 600 }}>
              kilroy@uark.edu
            </a>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a href="https://radiohead.bot/slides" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#111829', border: '1px solid #1e2a3f', borderRadius: 10, padding: '14px 18px', textDecoration: 'none', transition: 'border-color 0.2s' }}>
              <ExternalLink size={18} style={{ color: '#4f8ef7', flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#e2e8f0' }}>Presentation Slides</div>
                <div style={{ fontSize: '0.78rem', color: '#4a5a70' }}>radiohead.bot/slides</div>
              </div>
            </a>
            <a href="https://radiohead.bot/free2pa" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#111829', border: '1px solid #1e2a3f', borderRadius: 10, padding: '14px 18px', textDecoration: 'none', transition: 'border-color 0.2s' }}>
              <ExternalLink size={18} style={{ color: '#4f8ef7', flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#e2e8f0' }}>Free2PA Demo</div>
                <div style={{ fontSize: '0.78rem', color: '#4a5a70' }}>radiohead.bot/free2pa</div>
              </div>
            </a>
          </div>

          {/* Nudge to start */}
          <div style={{ color: '#3a4a5f', fontSize: '0.82rem' }}>
            Use the sidebar to jump to any activity, or hit <strong style={{ color: '#4f8ef7' }}>Next →</strong> to begin.
          </div>
        </div>
      </Card>
    ),
  },
  {
    num: 1,
    title: 'Real or Fake?',
    tag: 'Activity 1 · ⏱ 3 min',
    content: (
      <Card>
        {/* Side-by-side layout: image left, steps right — mirrors the presentation slide */}
        <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'flex-start' }}>

          {/* Battlefield image */}
          <div style={{ flex: '0 0 auto' }}>
            <img
              src="/img/Firefly_battlefield.png"
              alt="Battlefield medical triage — is it real or AI-generated?"
              style={{
                maxHeight: 340, width: 'auto', borderRadius: 10,
                border: '2px solid rgba(255,255,255,0.1)',
                boxShadow: '6px 6px 28px rgba(0,0,0,0.55)',
                display: 'block',
              }}
            />
          </div>

          {/* Steps + reveal */}
          <div style={{ flex: '1 1 280px' }}>
            <p style={{ color: '#94a3b8', marginBottom: 18, lineHeight: 1.6, fontSize: '0.95rem' }}>
              Don't guess — go find out.
            </p>

            {/* Numbered steps matching the presentation exactly */}
            {[
              <>1. <a href="/img/Firefly_battlefield.png" download style={{ color: '#4f8ef7', fontWeight: 700 }}>Download this image</a></>,
              <>2. Go to <a href="https://verify.contentauthenticity.org" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', fontWeight: 700 }}>verify.contentauthenticity.org</a></>,
              <>3. Drop the image in. What does it tell you?</>,
              <>4. <strong style={{ color: '#94a3b8' }}>Bonus:</strong> take it to <a href="https://melchersystem.com/c2pa-content-credentials-translator/" target="_blank" rel="noopener noreferrer" style={{ color: '#4f8ef7' }}>melchersystem.com/c2pa-content-credentials-translator</a> — read the full manifest in plain English</>,
            ].map((step, i) => (
              <div key={i} style={{
                background: '#161b27', border: '1px solid #2d3748', borderRadius: 8,
                padding: '11px 16px', marginBottom: 10,
                fontSize: '0.88rem', color: '#cbd5f5', lineHeight: 1.5,
              }}>
                {step}
              </div>
            ))}

            <div style={{ background: '#111520', border: '1px solid #1e2a3f', borderRadius: 8, padding: '12px 16px', fontSize: '0.85rem', color: '#64748b', marginTop: 4 }}>
              💬 Turn to a neighbor — what did you find?<br />
              <span style={{ color: '#3a4a5f' }}>The answer is in the reveal below.</span>
            </div>
          </div>
        </div>

        {/* Reveal section — always visible, matches the presentation's "The Answer" slide */}
        <div style={{ marginTop: 24, borderTop: '1px solid #1e2a3f', paddingTop: 20 }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#3a4a5f', marginBottom: 14 }}>
            The Answer
          </div>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>

            {/* AI-generated verdict badge */}
            <div style={{ flex: '0 0 auto', background: '#1a0a10', border: '2px solid #7f1d1d', borderRadius: 10, padding: '12px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 900, letterSpacing: '0.12em', color: '#f87171' }}>AI-GENERATED</div>
              <div style={{ fontSize: '0.75rem', color: '#9f1239', marginTop: 4 }}>Adobe Firefly · Gemini Flash</div>
            </div>

            {/* What the manifest revealed */}
            <div style={{ flex: '1 1 240px' }}>
              <div style={{ background: '#0d1222', border: '1px solid #1e2a3f', borderRadius: 8, padding: '12px 16px', marginBottom: 10, fontSize: '0.82rem', lineHeight: 1.7, color: '#94a3b8' }}>
                <div style={{ fontWeight: 700, color: '#e2e8f0', marginBottom: 6 }}>What the manifest revealed:</div>
                <div>✓ <strong>Signed by:</strong> Google LLC / Adobe Inc</div>
                <div>✓ <strong>Tool:</strong> Google Media Processing Services (Gemini Flash)</div>
                <div>✓ <strong>Action:</strong> <em>created</em> — not a modified real photo</div>
                <div>✓ <strong>AI indicator:</strong> flagged as AI-generated content</div>
              </div>
              <div style={{ background: '#0a1a10', border: '1px solid #14532d', borderRadius: 8, padding: '11px 16px', fontSize: '0.82rem', color: '#86efac' }}>
                <strong>You just used Content Credentials.</strong> By the end of this session you'll be able to sign and verify your own files the same way.
              </div>
            </div>
          </div>
        </div>
      </Card>
    ),
  },
  {
    num: 2,
    title: "Meet RadioHead's Files",
    tag: 'Download these for Activities 3 & 4',
    content: <RadioHeadFiles />,
  },
  {
    num: 3,
    title: 'Tamper & Watch It Fail',
    tag: 'Activity 3 · Live Verifier',
    content: (
      <Card>
        <p style={{ color: '#94a3b8', marginBottom: 20, lineHeight: 1.7 }}>
          Upload a RadioHead <code style={{ background: '#161b27', padding: '1px 6px', borderRadius: 4, fontSize: '0.85em' }}>.md</code> file
          and its <code style={{ background: '#161b27', padding: '1px 6px', borderRadius: 4, fontSize: '0.85em' }}>.c2pa.json</code> sidecar.
          All 3 checks should <span style={{ color: '#68d391', fontWeight: 700 }}>PASS</span>.<br />
          Then open the <code style={{ background: '#161b27', padding: '1px 6px', borderRadius: 4, fontSize: '0.85em' }}>.md</code> in a text editor,
          change one word, save it — and verify again. Watch it <span style={{ color: '#fc8181', fontWeight: 700 }}>FAIL</span>.
          Use the optional <strong>trusted cert</strong> drop zone for files you signed in Activity&nbsp;4 or signer certs from Activity&nbsp;2.
          We intentionally shipped a mix of PASS / HASH FAIL / SIG FAIL / TRUST FAIL files so you can see each error state.
        </p>
        <Verifier />
        <div style={{ marginTop: 16, background: '#161b27', borderRadius: 8, padding: '14px 18px', fontSize: '0.82rem', color: '#64748b' }}>
          <strong style={{ color: '#94a3b8' }}>Try all 3 failure modes:</strong>
          <span style={{ color: '#fc8181' }}> ①</span> Edit the file (hash fails) &nbsp;·&nbsp;
          <span style={{ color: '#fc8181' }}> ②</span> Delete the sidecar (no proof) &nbsp;·&nbsp;
          <span style={{ color: '#fc8181' }}> ③</span> Swap in a different sidecar (wrong signature)
        </div>
      </Card>
    ),
  },
  {
    num: 4,
    title: 'Sign Your Own File',
    tag: 'Activity 4 · Trust Networks',
    content: (
      <Card>
        <p style={{ color: '#94a3b8', marginBottom: 16, lineHeight: 1.7 }}>
          Let's do this exactly like KUAF will run it tomorrow morning.
          You're going to update the <code style={{ background: '#161b27', padding: '1px 6px', borderRadius: 4, fontSize: '0.85em' }}>workflow.md</code> file for a specific show,
          tweak two lines, sign it, and then prove it in Activity 3.
        </p>
        <div style={{ background: '#0d1222', borderRadius: 10, border: '1px solid #1f2a3f', padding: '14px 16px', color: '#cbd5f5', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: 18 }}>
          <div style={{ fontWeight: 700, color: '#f8fafc', marginBottom: 6 }}>Exactly what to do:</div>
          <ol style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li style={{ marginBottom: 8 }}>Copy the text below into the editor.
              Change <strong>Show Name</strong> to whatever you're working on (Ozarks at Large, Jazz Night, etc.).</li>
            <li style={{ marginBottom: 8 }}>Change the <strong>Automation</strong> line to a different time (e.g., verify at 16:00 instead of 17:30).</li>
            <li style={{ marginBottom: 8 }}>Update one item under <strong>Gaps</strong> so it's something you'd actually follow up on.</li>
            <li>Now hit “Sign this file”, download the <code style={{ background: '#161b27', padding: '1px 4px', borderRadius: 4 }}>workflow.md</code>, the matching <code style={{ background: '#161b27', padding: '1px 4px', borderRadius: 4 }}>.c2pa.json</code>, and <em>my-browser-cert.pem</em>.
              Take all three right back to Activity 3 and verify with the Optional cert slot filled.</li>
          </ol>
        </div>
        <div style={{ background: '#111629', borderRadius: 10, border: '1px solid #1d2840', padding: '14px 16px', color: '#cbd5f5', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: 16 }}>
          <div style={{ fontWeight: 700, color: '#f8fafc', marginBottom: 6 }}>Drop-in text (edit two lines and sign):</div>
          <pre style={{ margin: 0, background: '#050a16', borderRadius: 8, padding: '12px 14px', lineHeight: 1.5, fontSize: '0.78rem', border: '1px solid #1b2335', whiteSpace: 'pre-wrap', color: '#cbd5f5' }}>{`# workflow.md — Show Name Update

## Signals
- Automation export for today's rundown
- Google Doc notes from host
- Trusted cert list (RadioHead baseline + my cert)

## Decisions
- If host notes conflict with automation, block publish + DM producer
- If signer cert missing, route file to /quarantine and alert engineering

## Automation
- Verify on upload using Activity 3 tool before the 17:30 segment

## Gaps
- Need a checklist for late-breaking script edits
- Still missing revocation list for temp hosts`}</pre>
          <div style={{ marginTop: 10, color: '#8da2ce' }}>
            You can keep the rest exactly as-is — just update the lines above, sign, and prove it.
          </div>
        </div>
        <SignYourOwn />
        <div style={{ marginTop: 16, background: '#161b27', borderRadius: 8, padding: '14px 18px', fontSize: '0.82rem' }}>
          <div style={{ color: '#68d391', fontWeight: 700, marginBottom: 8 }}>What you'll see when you verify in Activity 3:</div>
          <div style={{ color: '#94a3b8', lineHeight: 1.7 }}>
            ✅ <strong>Hash</strong> — passes (you just signed it)<br />
            ✅ <strong>Signature</strong> — passes (your browser key verified it)<br />
            ✅ <strong>Trust</strong> — <span style={{ color: '#68d391' }}>passes once you drop your cert in the Optional slot</span>
          </div>
          <div style={{ marginTop: 10, color: '#64748b' }}>
            If you skip the cert upload you'll get a Trust FAIL — that's expected.
            The whole point is to prove how a trust store grows: export the cert, share it with Karen, and now every agent in the room can verify your work.
          </div>
        </div>
      </Card>
    ),
  },
];

// ─── Resources list (shown on final step) ─────────────────────────────────────

const RESOURCES = [
  ['C2PA Spec',             'c2pa.org',                             'https://c2pa.org'],
  ['Free Verifier',         'verify.contentauthenticity.org',       'https://verify.contentauthenticity.org'],
  ['C2PA Translator',       'melchersystem.com (Paul Melcher)',     'https://melchersystem.com/c2pa-content-credentials-translator/'],
  ['CC Foundations Course', 'learn.contentauthenticity.org',        'https://learn.contentauthenticity.org'],
  ['CAI Discord',           'discord.gg/CAI',                       'https://discord.gg/CAI'],
  ['Open-source SDK',       'opensource.contentauthenticity.org',   'https://opensource.contentauthenticity.org/docs'],
  ['Karen on LinkedIn',     'linkedin.com/in/karenkilroy',          'https://linkedin.com/in/karenkilroy'],
];

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Free2PA() {
  useEffect(() => { document.title = 'C2PA / Free2PA Demo — Karen Kilroy'; }, []);
  const [current, setCurrent] = useState(0);
  const total = STEPS.length;
  const step  = STEPS[current];

  return (
    <div style={{ minHeight: '100vh', background: '#080c16', color: '#e2e8f0', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif' }}>
      <style>{`
        @keyframes rhBob  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes rhGlow { 0%,100%{opacity:1} 50%{opacity:0.45} }
        @keyframes rhNote { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        a { color: #4f8ef7; }
        a:hover { text-decoration: underline; }
        .markdown-preview { line-height: 1.7; color: #cbd5f5; font-size: 0.9rem; }
        .markdown-preview h1 { font-size: 1.6rem; margin: 0 0 0.5em; color: #f8fafc; }
        .markdown-preview h2 { font-size: 1.3rem; margin: 0 0 0.5em; color: #f1f5f9; }
        .markdown-preview h3 { font-size: 1.1rem; margin: 0 0 0.4em; color: #e2e8f0; }
        .markdown-preview p { margin: 0 0 0.8em; }
        .markdown-preview ul, .markdown-preview ol { margin: 0 0 0.8em 1.4em; padding: 0; }
        .markdown-preview li { margin-bottom: 0.35em; }
        .markdown-preview blockquote { border-left: 3px solid #4f8ef7; padding-left: 14px; margin: 0.8em 0; color: #9fb0d9; font-style: italic; }
        .markdown-preview pre { background: #050d1c; border-radius: 8px; padding: 12px; margin: 0 0 1em; font-size: 0.82rem; color: #e2e8f0; overflow-x: auto; border: 1px solid #18233a; }
        .markdown-preview code { background: #111c33; border-radius: 4px; padding: 2px 6px; color: #7dd3fc; }
        .markdown-preview hr { border: none; border-top: 1px solid #2d3748; margin: 1.2em 0; }
        .markdown-preview a { color: #60a5fa; }
        .md-table { background: #050d1c; border: 1px dashed #2d3748; border-radius: 8px; padding: 10px 12px; margin: 0 0 1em; font-size: 0.82rem; color: #cbd5f5; overflow-x: auto; }
        /* Responsive: collapse sidebar below 900px */
        @media (max-width: 900px) {
          .f2pa-dashboard  { grid-template-columns: 1fr !important; }
          .f2pa-sidebar    { position: static !important; }
          .f2pa-file-split { grid-template-columns: 1fr !important; }
        }

      `}</style>

      {/* ── Dashboard: sidebar + main content ── */}
      {/*
        Left sidebar: persistent step navigation + prev/next.
        Right column: step header + activity content.
        Collapses to single column below 900px via media query.
      */}
      <div className="f2pa-dashboard" style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(260px, 300px) 1fr',
        gap: 24,
        maxWidth: 1440,
        margin: '0 auto',
        padding: '24px 24px 80px',
        alignItems: 'start',
      }}>

        {/* ── Left sidebar ── */}
        <aside className="f2pa-sidebar" style={{ position: 'sticky', top: 64 }}>

          <div style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#3a4a5f', marginBottom: 10 }}>
            Activities
          </div>

          {/* Step nav cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {STEPS.map((s, i) => {
              const active = i === current;
              const done   = i < current;
              return (
                <button key={i} onClick={() => setCurrent(i)} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  background: active ? '#0d1222' : '#0f1420',
                  border: `1.5px solid ${active ? '#4f8ef7' : done ? '#1c3050' : '#161e2e'}`,
                  borderRadius: 10, padding: '11px 13px', textAlign: 'left',
                  cursor: 'pointer', transition: 'all 0.18s', width: '100%',
                  boxShadow: active ? '0 0 0 1px rgba(79,142,247,0.2), 0 4px 20px rgba(79,142,247,0.08)' : 'none',
                }}>
                  {/* Step number / checkmark bubble */}
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                    background: active ? 'linear-gradient(135deg,#4f8ef7,#2563eb)' : done ? '#102040' : '#111928',
                    border: `1px solid ${active ? '#4f8ef7' : done ? '#2a5090' : '#1e2840'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.7rem', fontWeight: 900,
                    color: active ? '#fff' : done ? '#4f8ef7' : '#3a4a5f',
                  }}>
                    {done ? '✓' : s.num}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontWeight: 700, fontSize: '0.83rem', marginBottom: 2,
                      color: active ? '#f0f4ff' : done ? '#6a80a0' : '#4a5a70',
                    }}>
                      {s.title}
                    </div>
                    {s.tag && (
                      <div style={{
                        fontSize: '0.66rem', color: active ? '#3a6ab0' : '#243040',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>
                        {s.tag}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Prev / Next */}
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <button onClick={() => setCurrent(c => c - 1)} disabled={current === 0} style={{
              flex: 1, background: current === 0 ? '#0c1018' : '#1a2235',
              color: current === 0 ? '#2a3040' : '#8090a8',
              border: '1px solid #161e2e', borderRadius: 8, padding: '8px 0',
              fontWeight: 600, fontSize: '0.78rem', cursor: current === 0 ? 'not-allowed' : 'pointer',
            }}>← Prev</button>
            <button onClick={() => setCurrent(c => c + 1)} disabled={current >= total - 1} style={{
              flex: 1, background: current >= total - 1 ? '#0c1018' : '#4f8ef7',
              color: current >= total - 1 ? '#2a3040' : '#fff',
              border: 'none', borderRadius: 8, padding: '8px 0',
              fontWeight: 700, fontSize: '0.78rem', cursor: current >= total - 1 ? 'not-allowed' : 'pointer',
            }}>Next →</button>
          </div>

          {current === total - 1 && (
            <div style={{ marginTop: 12, textAlign: 'center', color: '#68d391', fontWeight: 700, fontSize: '0.85rem' }}>
              🎉 All done!
            </div>
          )}

          {/* Robot — ambient sidebar presence */}
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 28 }}>
            {ROBOT_SVG}
          </div>
        </aside>

        {/* ── Right: step content ── */}
        <main>
          {/* Step header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 20 }}>
            <div style={{
              width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg,#4f8ef7,#2563eb)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: '1.05rem', color: '#fff',
              boxShadow: '0 4px 18px rgba(79,142,247,0.35)',
            }}>{step.num}</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#edf2ff', margin: 0, letterSpacing: '-0.02em' }}>
              {step.title}
            </h2>
            {step.tag && (
              <span style={{
                fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase',
                color: '#4f8ef7', border: '1px solid #1a3360', borderRadius: 4, padding: '3px 10px',
              }}>
                {step.tag}
              </span>
            )}
          </div>

          {/* Activity content */}
          {step.content}

          {/* Resources — only on the final step */}
          {current === total - 1 && (
            <div style={{ marginTop: 24 }}>
              <Card>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 16 }}>
                  Resources
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 4 }}>
                  {RESOURCES.map(([label, display, url]) => (
                    <a key={url} href={url} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#94a3b8', textDecoration: 'none', padding: '10px 0', borderBottom: '1px solid #161e2e' }}>
                      <ExternalLink size={13} style={{ flexShrink: 0, color: '#4f8ef7' }} />
                      <span>
                        <strong style={{ color: '#e2e8f0', fontSize: '0.85rem' }}>{label}</strong><br />
                        <span style={{ fontSize: '0.74rem', color: '#4a5a70' }}>{display}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// ─── Activity 5: Sign your own file ──────────────────────────────────────────

function SignYourOwn() {
  const [content, setContent]   = useState('');
  const [filename, setFilename] = useState('workflow.md');
  const [sidecar, setSidecar]   = useState(null);
  const [signing, setSigning]   = useState(false);

  const sign = async () => {
    if (!content.trim()) return;
    setSigning(true); setSidecar(null);
    try {
      const keyPair = await crypto.subtle.generateKey(
        { name: 'ECDSA', namedCurve: 'P-256' },
        true, ['sign', 'verify']
      );

      const spkiDer = await crypto.subtle.exportKey('spki', keyPair.publicKey);
      const spkiB64 = btoa(String.fromCharCode(...new Uint8Array(spkiDer)));
      const certPem = `-----BEGIN PUBLIC KEY-----\n${spkiB64.match(/.{1,64}/g).join('\n')}\n-----END PUBLIC KEY-----`;

      const hash = await sha256Hex(content);

      const claim = {
        asset:     { alg: 'SHA-256', hash },
        signer:    'browser-generated',
        timestamp: new Date().toISOString(),
      };

      const msgBytes = new TextEncoder().encode(canonicalJson(claim));
      const sigDer   = await crypto.subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, keyPair.privateKey, msgBytes);
      const sigB64   = btoa(String.fromCharCode(...new Uint8Array(sigDer)));

      setSidecar({
        spec_version: 'free2pa/0.1.0',
        claim,
        signature: { value: sigB64, cert_pem: certPem },
      });
    } finally {
      setSigning(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
        <input
          value={filename}
          onChange={e => setFilename(e.target.value)}
          placeholder="workflow.md"
          style={{ flex: '0 0 180px', background: '#161b27', border: '1px solid #2d3748', borderRadius: 8, padding: '8px 12px', color: '#e2e8f0', fontSize: '0.85rem' }}
        />
        <div style={{ flex: 1, fontSize: '0.8rem', color: '#64748b', alignSelf: 'center' }}>Call it <strong>workflow.md</strong> so it matches what you're editing.</div>
      </div>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder={"# workflow.md — Show Name Update\n\n## Signals\n- automation export, host notes, trusted cert list\n\n## Decisions\n- block publish if notes conflict or signer missing\n\n## Automation\n- verify on upload before the 17:30 segment\n\n## Gaps\n- late-breaking script checklist, revocation list"}
        rows={7}
        style={{ width: '100%', background: '#161b27', border: '1px solid #2d3748', borderRadius: 8, padding: '12px 14px', color: '#e2e8f0', fontSize: '0.85rem', fontFamily: '"SF Mono","Fira Code","Courier New",monospace', resize: 'vertical', marginBottom: 12 }}
      />
      <button
        onClick={sign}
        disabled={!content.trim() || signing}
        style={{
          background: content.trim() ? '#4f8ef7' : '#1e2330',
          color: content.trim() ? '#fff' : '#4a5568',
          border: 'none', borderRadius: 8, padding: '10px 24px',
          fontWeight: 700, fontSize: '0.88rem',
          cursor: content.trim() ? 'pointer' : 'not-allowed',
          marginBottom: 16,
        }}
      >
        {signing ? '⏳ Signing…' : '🔐 Sign this file'}
      </button>

      {sidecar && (
        <div style={{ background: '#0d2b1e', border: '1px solid #22543d', borderRadius: 10, padding: 20 }}>
          <div style={{ color: '#68d391', fontWeight: 700, marginBottom: 12 }}>✅ Signed! Download your files:</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button onClick={() => downloadTextFile(content, filename)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#1e2330', color: '#e2e8f0', border: '1px solid #2d3748', borderRadius: 8, padding: '8px 16px', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}>
              <Download size={14} /> {filename}
            </button>
            <button onClick={() => downloadTextFile(JSON.stringify(sidecar, null, 2), filename + '.c2pa.json')}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#1e2330', color: '#94a3b8', border: '1px solid #2d3748', borderRadius: 8, padding: '8px 16px', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}>
              <Download size={14} /> {filename}.c2pa.json
            </button>
            <button onClick={() => {
              const certPem = sidecar.signature.cert_pem;
              downloadTextFile(certPem, 'my-browser-cert.pem', 'application/x-pem-file');
            }}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#1e2330', color: '#4f8ef7', border: '1px solid #1e3a6e', borderRadius: 8, padding: '8px 16px', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}>
              <Download size={14} /> my-browser-cert.pem
            </button>
          </div>
          <div style={{ marginTop: 12, fontSize: '0.78rem', color: '#68d391cc' }}>
            Next, head back to Activity 3, upload <strong>{filename}</strong> plus its sidecar, and drop <em>my-browser-cert.pem</em> into the trusted-cert slot — you should see Signature, Hash, and Trust all go green.
          </div>
          <div style={{ marginTop: 12, background: '#050d1c', border: '1px solid #1d2840', borderRadius: 8, padding: '12px 14px', fontSize: '0.8rem', color: '#94a3b8' }}>
            <strong>What you'll see when you verify:</strong><br />
            ✅ Hash — matches what you just signed<br />
            ✅ Signature — validated with your browser key<br />
            ✅ Trust — <span style={{ color: '#68d391' }}>passes once you include your cert</span><br />
            If you skip the cert upload you'll get a trust fail — share the cert and rerun the check to promote yourself into the network.
          </div>
        </div>
      )}
    </div>
  );
}
