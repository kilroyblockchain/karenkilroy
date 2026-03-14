# RadioHead System Tests

## How to Test Each Component

### 1. Test AssemblyAI Transcription

```bash
node -e "
const { AssemblyAI } = require('assemblyai');
const client = new AssemblyAI({ apiKey: '6db7d76a6ab147c08bca7d4b5d31f992' });

async function test() {
  const transcript = await client.transcripts.transcribe({
    audio: 'https://cpa.ds.npr.org/s197/audio/2026/03/20260311.mp3',
    language_detection: true,
    speaker_labels: true,
  });
  console.log('Status:', transcript.status);
  console.log('Speakers:', transcript.utterances?.length || 0);
}
test();
"
```

**Expected:** Status "completed" with utterances

---

### 2. Test Google Drive (rclone)

```bash
rclone ls gdrive:RadioHead-Karen/TEST_INPUT --drive-root-folder-id 0APtVt_cucWKWUk9PVA
```

**Expected:** List of files in TEST_INPUT folder

---

### 3. Test Full Transcription Workflow

1. Put a test audio file in TEST_INPUT
2. Run transcription script
3. Check TEST_OUTPUT for result

---

### 4. Test Cron Jobs

```bash
# List cron jobs
cron list
```

**Expected:** Shows 4 jobs (Morning, Evening, Diary, Reminder)

---

### 5. Test Browser Access

```bash
curl -s https://www.kuaf.com | head
```

**Expected:** HTML response from KUAF

---

### 6. Test Memory Files

```bash
ls -la /data/workspace/memory/
cat /data/workspace/processed-files.json
```

**Expected:** Diary files and processed files list

---

### 7. Test Dashboard

Visit: https://group-4-production-71a2.up.railway.app/apps/radiohead-dashboard/

**Expected:** Shows all .md files including workflow.md

---

## Quick Smoke Test

Run this to test everything at once:

```bash
# 1. Check Drive
rclone ls gdrive:RadioHead-Karen/TEST_INPUT --drive-root-folder-id 0APtVt_cucWKWUk9PVA

# 2. Check processed files
cat /data/workspace/processed-files.json

# 3. List cron jobs
cron list

# 4. Check workflow file
head -20 /data/workspace/workflow.md
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| rclone not found | Reinstall: `curl https://rclone.org/install.sh | bash` |
| AssemblyAI fails | Check API key in memory |
| Cron not running | Check gateway status |
| Dashboard 404 | Restart the app |

---

*Last updated: March 13, 2026*
