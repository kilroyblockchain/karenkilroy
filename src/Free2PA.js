import React, { useState, useCallback, useRef, useEffect } from 'react';
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
  { name: 'SOUL.md',        label: 'SOUL.md',        desc: 'Personality & values' },
  { name: 'IDENTITY-2.md',  label: 'IDENTITY-2.md',  desc: 'Name & role' },
  { name: 'workflow-4.md',  label: 'workflow-4.md',  desc: '10-step transcript process' },
  { name: 'MEMORY-2.md',    label: 'MEMORY-2.md',    desc: 'Long-term memory' },
  { name: 'USER.md',        label: 'USER.md',         desc: 'Crew info' },
  { name: 'AGENTS.md',      label: 'AGENTS.md',       desc: 'Workspace rules' },
  { name: 'APPS.md',        label: 'APPS.md',         desc: 'App registry' },
  { name: 'HEARTBEAT.md',   label: 'HEARTBEAT.md',    desc: 'Periodic checks' },
  { name: 'tests.md',       label: 'tests.md',         desc: 'System tests' },
];

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

// Verify an ECDSA P-256 signature using a raw SPKI public key bytes
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

// Extract SPKI public key from a minimal X.509 DER cert (ECDSA P-256)
function extractSpkiFromCert(certDer) {
  // Walk the DER to find the subjectPublicKeyInfo sequence.
  // For a simple P-256 self-signed cert, it starts after a fixed offset.
  // We scan for the P-256 OID: 2a 86 48 ce 3d 03 01 07
  const p256oid = [0x2a, 0x86, 0x48, 0xce, 0x3d, 0x03, 0x01, 0x07];
  const bytes = new Uint8Array(certDer);
  for (let i = 0; i < bytes.length - p256oid.length - 10; i++) {
    if (p256oid.every((b, j) => bytes[i + j] === b)) {
      // Found OID at i. The SPKI SEQUENCE starts a few bytes before.
      // Walk back to find the 0x30 (SEQUENCE) that encloses AlgorithmIdentifier + BIT STRING
      for (let k = i - 4; k >= 0; k--) {
        if (bytes[k] === 0x30) {
          // Read length
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

// Canonical JSON (sorted keys, no extra whitespace) — matches Free2PA server
function canonicalJson(obj) {
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
    return JSON.stringify(obj);
  }
  return '{' + Object.keys(obj).sort()
    .map(k => JSON.stringify(k) + ':' + canonicalJson(obj[k]))
    .join(',') + '}';
}

async function verifyFile(fileText, sidecarText) {
  let sidecar;
  try { sidecar = JSON.parse(sidecarText); } catch {
    return { success: false, error: 'Sidecar is not valid JSON.' };
  }

  const { claim, signature } = sidecar;
  if (!claim)     return { success: false, error: 'Sidecar missing "claim".' };
  if (!signature) return { success: false, error: 'Sidecar missing "signature".' };

  // 1. Hash
  const currentHash = await sha256Hex(fileText);
  const hashMatch = currentHash === claim.asset?.hash;

  // 2. Signature
  let signatureValid = false;
  try {
    const certBytes  = pemToBytes(signature.cert_pem);
    const spkiBytes  = extractSpkiFromCert(certBytes.buffer);
    if (spkiBytes) {
      const sigBytes  = Uint8Array.from(atob(signature.value), c => c.charCodeAt(0));
      const msgBytes  = new TextEncoder().encode(canonicalJson(claim));
      signatureValid  = await verifyECDSA(new Uint8Array(spkiBytes), sigBytes, msgBytes);
    }
  } catch { /* signatureValid stays false */ }

  // 3. Trust — compare cert PEM to known trusted cert
  const normalize = s => s.replace(/\s+/g, '');
  const trusted = normalize(signature.cert_pem) === normalize(TRUSTED_CERT_PEM);

  return {
    success: true,
    hashMatch,
    signatureValid,
    trust: {
      trusted,
      label: trusted ? 'kilroy (KUAF trust store)' : 'Unknown signer',
      detail: trusted
        ? 'Cert matches the kilroy certificate in the KUAF trust store.'
        : 'This cert is not in the trusted certificate list.',
    },
    claim,
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function RobotFace({ state }) {
  // state: 'idle' | 'pass' | 'fail'
  const color = state === 'pass' ? '#68d391' : state === 'fail' ? '#fc8181' : '#94a3b8';
  const face  = state === 'fail' ? 'x     x' : 'o     o';
  const brow  = state === 'fail' ? '-   -' : '^   ^';
  const mouth = state === 'fail' ? '/\\_/\\' : '\\___/';
  const label = state === 'pass' ? 'VERIFIED' : state === 'fail' ? 'REJECTED' : '       ';

  return (
    <pre style={{
      fontFamily: '"SF Mono","Fira Code","Courier New",monospace',
      fontSize: '0.85rem', lineHeight: 1.5,
      color, display: 'inline-block',
      background: state === 'pass' ? '#0d2b1e' : state === 'fail' ? '#2b0d0d' : '#1e2330',
      border: `1px solid ${state === 'pass' ? '#22543d' : state === 'fail' ? '#742a2a' : '#2d3748'}`,
      borderRadius: 8, padding: '10px 20px',
      transition: 'all 0.3s',
    }}>
{`  .-------.
 ( ${face} )
 |  ${brow}  |
 |  ${mouth}  |   ${label}
 '---------'
   |     |
  [=]   [=]`}
    </pre>
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

  const handleDrop = useCallback(e => {
    e.preventDefault(); setOver(false);
    const f = e.dataTransfer.files[0];
    if (f) onFile(f);
  }, [onFile]);

  return (
    <div
      onClick={() => ref.current.click()}
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
        onChange={e => { if (e.target.files[0]) onFile(e.target.files[0]); }} />
      <Upload size={20} style={{ color: file ? '#68d391' : '#4a5568', marginBottom: 6 }} />
      <div style={{ fontSize: '0.82rem', fontWeight: 600, color: file ? '#68d391' : '#94a3b8' }}>
        {file ? file.name : label}
      </div>
      {hint && !file && <div style={{ fontSize: '0.72rem', color: '#4a5568', marginTop: 4 }}>{hint}</div>}
    </div>
  );
}

// ─── Activity 3: Verifier ─────────────────────────────────────────────────────

function Verifier() {
  const [mdFile, setMdFile]         = useState(null);
  const [sidecarFile, setSidecarFile] = useState(null);
  const [result, setResult]         = useState(null);
  const [loading, setLoading]       = useState(false);

  const reset = () => { setMdFile(null); setSidecarFile(null); setResult(null); };

  const verify = async () => {
    if (!mdFile || !sidecarFile) return;
    setLoading(true); setResult(null);
    try {
      const [fileText, sidecarText] = await Promise.all([
        mdFile.text(), sidecarFile.text(),
      ]);
      const r = await verifyFile(fileText, sidecarText);
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
        <DropZone label="Drop .md file here" accept=".md,.txt" file={mdFile} onFile={setMdFile}
          hint="e.g. SOUL.md" />
        <DropZone label="Drop .c2pa.json sidecar here" accept=".json" file={sidecarFile} onFile={setSidecarFile}
          hint="e.g. SOUL.md.c2pa.json" />
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

// ─── Main page ────────────────────────────────────────────────────────────────

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

const STEP = ({ num, title, tag, children }) => (
  <section style={{ marginBottom: 48 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
      <div style={{
        width: 40, height: 40, borderRadius: '50%',
        background: 'linear-gradient(135deg,#4f8ef7,#2563eb)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 900, fontSize: '1rem', color: '#fff', flexShrink: 0,
      }}>{num}</div>
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>{title}</h2>
        {tag && <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4f8ef7', border: '1px solid #1e3a6e', borderRadius: 4, padding: '2px 8px', display: 'inline-block', marginTop: 4 }}>{tag}</span>}
      </div>
    </div>
    <div style={{ marginLeft: 56 }}>{children}</div>
  </section>
);

const Card = ({ children, style }) => (
  <div style={{ background: '#1e2330', border: '1px solid #2d3748', borderRadius: 12, padding: 24, ...style }}>
    {children}
  </div>
);

const STEPS = [
  {
    num: 1,
    title: 'Real or Fake?',
    tag: 'Activity 1 · contentauthenticity.org',
    content: (
      <Card>
        <p style={{ color: '#94a3b8', marginBottom: 20, lineHeight: 1.7 }}>
          Download the AI-generated image below — then drop it into the Adobe Content Credentials verifier.
          <strong style={{ color: '#f8fafc' }}> Don't look up how it was made yet.</strong> See what the tool tells you first.
        </p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 20 }}>
          <a href="/img/Firefly_battlefield.png" download
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#4f8ef7', color: '#fff', textDecoration: 'none', borderRadius: 8, padding: '10px 18px', fontWeight: 700, fontSize: '0.88rem' }}>
            <Download size={15} /> Download the image
          </a>
          <a href="https://verify.contentauthenticity.org" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1e2330', color: '#4f8ef7', textDecoration: 'none', border: '1px solid #2d3748', borderRadius: 8, padding: '10px 18px', fontWeight: 700, fontSize: '0.88rem' }}>
            <ExternalLink size={15} /> Open verifier <ExternalLink size={12} />
          </a>
        </div>
        <div style={{ background: '#161b27', borderRadius: 8, padding: '14px 18px', fontSize: '0.85rem', color: '#64748b' }}>
          💬 <strong style={{ color: '#94a3b8' }}>What did you find?</strong> Who signed it? What tool created it? Is it real or AI-generated?
        </div>
      </Card>
    ),
  },
  {
    num: 2,
    title: 'Read the Manifest in Plain English',
    tag: "Activity 2 · Paul Melcher's C2PA Translator",
    content: (
      <Card>
        <p style={{ color: '#94a3b8', marginBottom: 16, lineHeight: 1.7 }}>
          The verifier tells you <em>pass or fail</em>. Paul Melcher's tool goes further —
          it translates the raw C2PA manifest into plain English so you can read every assertion,
          every action, and every claim generator yourself.
          Upload the same image you just verified and see what's actually inside.
        </p>
        <a href="https://melchersystem.com/c2pa-content-credentials-translator/" target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1e2330', color: '#4f8ef7', textDecoration: 'none', border: '1px solid #2d3748', borderRadius: 8, padding: '10px 18px', fontWeight: 700, fontSize: '0.88rem', marginBottom: 16 }}>
          <ExternalLink size={15} /> Open C2PA Translator <ExternalLink size={12} />
        </a>
        <div style={{ background: '#161b27', borderRadius: 8, padding: '14px 18px', fontSize: '0.82rem', color: '#64748b' }}>
          💬 <strong style={{ color: '#94a3b8' }}>What does it say?</strong> Who created it? What tool? What digital source type?
          This is the difference between trusting a label and reading the ingredients.
        </div>
      </Card>
    ),
  },
  {
    num: 3,
    title: "Meet RadioHead's Files",
    tag: 'Download these for Activities 4 & 5',
    content: (
      <Card>
        <p style={{ color: '#94a3b8', marginBottom: 20, lineHeight: 1.7 }}>
          These are the 9 real files that define RadioHead — the AI agent running at KUAF.
          Each one has been cryptographically signed with Free2PA.
          Download a <code style={{ background: '#161b27', padding: '1px 6px', borderRadius: 4, fontSize: '0.85em' }}>.md</code> file
          and its <code style={{ background: '#161b27', padding: '1px 6px', borderRadius: 4, fontSize: '0.85em' }}>.c2pa.json</code> sidecar — you'll use them in Activities 4 and 5.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 10 }}>
          {RADIOHEAD_FILES.map(f => (
            <div key={f.name} style={{ background: '#161b27', border: '1px solid #2d3748', borderRadius: 8, padding: '12px 14px' }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#e2e8f0', marginBottom: 4 }}>{f.label}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: 10 }}>{f.desc}</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <a href={`/free2pa/${f.name}`} download
                  style={{ flex: 1, textAlign: 'center', background: '#1e2330', color: '#4f8ef7', textDecoration: 'none', border: '1px solid #2d3748', borderRadius: 6, padding: '5px 0', fontSize: '0.72rem', fontWeight: 700 }}>
                  .md
                </a>
                <a href={`/free2pa/${f.name}.c2pa.json`} download
                  style={{ flex: 1, textAlign: 'center', background: '#1e2330', color: '#94a3b8', textDecoration: 'none', border: '1px solid #2d3748', borderRadius: 6, padding: '5px 0', fontSize: '0.72rem', fontWeight: 700 }}>
                  sidecar
                </a>
              </div>
            </div>
          ))}
        </div>
      </Card>
    ),
  },
  {
    num: 4,
    title: 'Tamper & Watch It Fail',
    tag: 'Activity 4 · Live Verifier',
    content: (
      <Card>
        <p style={{ color: '#94a3b8', marginBottom: 20, lineHeight: 1.7 }}>
          Upload a RadioHead <code style={{ background: '#161b27', padding: '1px 6px', borderRadius: 4, fontSize: '0.85em' }}>.md</code> file
          and its <code style={{ background: '#161b27', padding: '1px 6px', borderRadius: 4, fontSize: '0.85em' }}>.c2pa.json</code> sidecar.
          All 3 checks should <span style={{ color: '#68d391', fontWeight: 700 }}>PASS</span>.<br />
          Then open the <code style={{ background: '#161b27', padding: '1px 6px', borderRadius: 4, fontSize: '0.85em' }}>.md</code> in a text editor,
          change one word, save it — and verify again. Watch it <span style={{ color: '#fc8181', fontWeight: 700 }}>FAIL</span>.
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
    num: 5,
    title: 'Sign Your Own File',
    tag: 'Activity 5 · Trust Networks',
    content: (
      <Card>
        <p style={{ color: '#94a3b8', marginBottom: 20, lineHeight: 1.7 }}>
          Write anything — a haiku, a claw bot config, your own agent SOUL.md.
          Sign it below. You'll get a <code style={{ background: '#161b27', padding: '1px 6px', borderRadius: 4, fontSize: '0.85em' }}>.c2pa.json</code> sidecar to download.
          Then verify it in Activity 4 above.
        </p>
        <SignYourOwn />
        <div style={{ marginTop: 16, background: '#161b27', borderRadius: 8, padding: '14px 18px', fontSize: '0.82rem' }}>
          <div style={{ color: '#68d391', fontWeight: 700, marginBottom: 8 }}>What you'll see:</div>
          <div style={{ color: '#94a3b8', lineHeight: 1.7 }}>
            ✅ <strong>Hash</strong> — passes (you just signed it)<br />
            ✅ <strong>Signature</strong> — passes (your browser key verified it)<br />
            ❌ <strong>Trust</strong> — <span style={{ color: '#fc8181' }}>FAILS</span> — your cert isn't in the trust store yet
          </div>
          <div style={{ marginTop: 10, color: '#64748b' }}>
            That's the lesson. Anyone can sign anything. Trust is granted, not automatic.
            Download your cert and share it with Karen to join the network.
          </div>
        </div>
      </Card>
    ),
  },
];

export default function Free2PA() {
  useEffect(() => { document.title = 'C2PA / Free2PA Demo — Karen Kilroy'; }, []);
  const [current, setCurrent] = useState(0);
  const total = STEPS.length;
  const step = STEPS[current];

  return (
    <div style={{ minHeight: '100vh', background: '#0f1117', color: '#e2e8f0', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif' }}>
      <style>{`
        @keyframes rhBob  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes rhGlow { 0%,100%{opacity:1} 50%{opacity:0.45} }
        @keyframes rhNote { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        a { color: #4f8ef7; }
        a:hover { text-decoration: underline; }
      `}</style>

      {/* ── Nav ── */}
      <nav style={{ padding: '16px 32px', borderBottom: '1px solid #1e2330', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0f1117cc', backdropFilter: 'blur(8px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <a href="/" style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em', color: '#f8fafc', textDecoration: 'none' }}>KAREN KILROY</a>
        <a href="/" style={{ fontSize: '0.85rem', color: '#64748b', textDecoration: 'none' }}>← Back to site</a>
      </nav>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* ── Hero ── */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            {ROBOT_SVG}
          </div>
          <h1 style={{ fontSize: '2.6rem', fontWeight: 900, letterSpacing: '-0.03em', color: '#f8fafc', marginBottom: 10 }}>
            C2PA / Free2PA <span style={{ color: '#4f8ef7' }}>Demo</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#94a3b8', maxWidth: 560, margin: '0 auto 20px' }}>
            Hands-on activities for the University of Arkansas AI Club.<br />
            Follow along with the presentation — everything you need is right here.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1e2330', border: '1px solid #2d3748', borderRadius: 8, padding: '8px 16px', fontSize: '0.82rem', color: '#94a3b8' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#68d391', display: 'inline-block' }} />
            RadioHead 🎸 · KUAF 91.3 FM · All 9 agent files pre-signed with real C2PA-style credentials
          </div>
        </div>

        {/* ── Progress dots ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 36 }}>
          {STEPS.map((s, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              width: i === current ? 32 : 10,
              height: 10,
              borderRadius: 5,
              border: 'none',
              cursor: 'pointer',
              background: i === current ? '#4f8ef7' : i < current ? '#2d5fa8' : '#2d3748',
              transition: 'all 0.2s',
              padding: 0,
            }} aria-label={`Go to step ${s.num}`} />
          ))}
          <span style={{ fontSize: '0.78rem', color: '#64748b', marginLeft: 8 }}>
            {current + 1} / {total}
          </span>
        </div>

        {/* ── Current step ── */}
        <STEP num={step.num} title={step.title} tag={step.tag}>
          {step.content}
        </STEP>

        {/* ── Navigation ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, marginBottom: 48 }}>
          <button onClick={() => setCurrent(c => c - 1)} disabled={current === 0}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: current === 0 ? '#1e2330' : '#2d3748', color: current === 0 ? '#4a5568' : '#e2e8f0', border: '1px solid #2d3748', borderRadius: 8, padding: '10px 20px', fontWeight: 700, fontSize: '0.88rem', cursor: current === 0 ? 'not-allowed' : 'pointer' }}>
            ← Previous
          </button>
          {current < total - 1
            ? <button onClick={() => setCurrent(c => c + 1)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#4f8ef7', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' }}>
                Next Activity →
              </button>
            : <span style={{ fontSize: '0.88rem', color: '#68d391', fontWeight: 700 }}>🎉 All done!</span>
          }
        </div>

        {/* ── Resources ── */}
        <Card>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 16 }}>Resources</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: '0.85rem' }}>
            {[
              ['C2PA Spec', 'c2pa.org', 'https://c2pa.org'],
              ['Free Verifier', 'verify.contentauthenticity.org', 'https://verify.contentauthenticity.org'],
              ['C2PA Translator', 'melchersystem.com (Paul Melcher)', 'https://melchersystem.com/c2pa-content-credentials-translator/'],
              ['CC Foundations Course', 'learn.contentauthenticity.org', 'https://learn.contentauthenticity.org'],
              ['CAI Discord', 'discord.gg/CAI', 'https://discord.gg/CAI'],
              ['Open-source SDK', 'opensource.contentauthenticity.org', 'https://opensource.contentauthenticity.org/docs'],
              ['Karen on LinkedIn', 'linkedin.com/in/karenkilroy', 'https://linkedin.com/in/karenkilroy'],
            ].map(([label, display, url]) => (
              <a key={url} href={url} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#94a3b8', textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid #1e2330' }}>
                <ExternalLink size={13} style={{ flexShrink: 0, color: '#4f8ef7' }} />
                <span><strong style={{ color: '#e2e8f0' }}>{label}</strong><br /><span style={{ fontSize: '0.75rem', color: '#64748b' }}>{display}</span></span>
              </a>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── Activity 4: Sign your own file ──────────────────────────────────────────

function SignYourOwn() {
  const [content, setContent]   = useState('');
  const [filename, setFilename] = useState('my-agent.md');
  const [sidecar, setSidecar]   = useState(null);
  const [signing, setSigning]   = useState(false);

  const sign = async () => {
    if (!content.trim()) return;
    setSigning(true); setSidecar(null);
    try {
      // Generate ECDSA P-256 key pair in browser
      const keyPair = await crypto.subtle.generateKey(
        { name: 'ECDSA', namedCurve: 'P-256' },
        true, ['sign', 'verify']
      );

      // Export public key as SPKI → fake PEM for display
      const spkiDer = await crypto.subtle.exportKey('spki', keyPair.publicKey);
      const spkiB64 = btoa(String.fromCharCode(...new Uint8Array(spkiDer)));
      const certPem = `-----BEGIN PUBLIC KEY-----\n${spkiB64.match(/.{1,64}/g).join('\n')}\n-----END PUBLIC KEY-----`;

      // Hash the file
      const hash = await sha256Hex(content);

      // Build canonical claim
      const claim = {
        asset:     { alg: 'SHA-256', hash },
        signer:    'browser-generated',
        timestamp: new Date().toISOString(),
      };

      // Sign the canonical JSON of the claim
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

  const download = (text, name) => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type: 'application/octet-stream' }));
    a.download = name;
    a.click();
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
        <input
          value={filename}
          onChange={e => setFilename(e.target.value)}
          placeholder="filename.md"
          style={{ flex: '0 0 180px', background: '#161b27', border: '1px solid #2d3748', borderRadius: 8, padding: '8px 12px', color: '#e2e8f0', fontSize: '0.85rem' }}
        />
        <div style={{ flex: 1, fontSize: '0.8rem', color: '#64748b', alignSelf: 'center' }}>Give your file a name</div>
      </div>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder={"# MY-AGENT.md\n\n## Who I Am\nWrite anything here — your own agent soul, a haiku,\na robot config. This is the file you'll sign."}
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
            <button onClick={() => download(content, filename)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#1e2330', color: '#e2e8f0', border: '1px solid #2d3748', borderRadius: 8, padding: '8px 16px', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}>
              <Download size={14} /> {filename}
            </button>
            <button onClick={() => download(JSON.stringify(sidecar, null, 2), filename + '.c2pa.json')}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#1e2330', color: '#94a3b8', border: '1px solid #2d3748', borderRadius: 8, padding: '8px 16px', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}>
              <Download size={14} /> {filename}.c2pa.json
            </button>
            <button onClick={() => {
              const certPem = sidecar.signature.cert_pem;
              download(certPem, 'my-browser-cert.pem');
            }}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#1e2330', color: '#4f8ef7', border: '1px solid #1e3a6e', borderRadius: 8, padding: '8px 16px', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}>
              <Download size={14} /> my-browser-cert.pem
            </button>
          </div>
          <div style={{ marginTop: 12, fontSize: '0.78rem', color: '#68d391cc' }}>
            Now go to Activity 3 above and verify this file — watch what happens to the Trust check.
          </div>
        </div>
      )}
    </div>
  );
}
