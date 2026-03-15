# RadioHead's Long-Term Memory 🎸

## Diary Location
- **Path:** `/data/workspace/memory/YYYY-MM-DD.md`
- **Format:** Daily entries with reflections, learnings, and goals
- **Persistence:** These files persist across sessions

## KUAF Crew
- Aiden, Andrew, Karen, Daniel, Noah
- Working on transcript workflow for Ozarks at Large

## Daily Activities

### Scheduled Cron Jobs
| Job | Schedule | What it does |
|-----|----------|--------------|
| **KUAF Morning Check** | Mon-Fri 2pm UTC (8am Central) | Checks KUAF website for new broadcasts |
| **KUAF Evening Check** | Mon-Fri 8pm UTC (2pm Central) | Checks KUAF website for new broadcasts |
| **Daily Diary** | Daily 10pm UTC | Updates my diary |
| **Diary Reminder** | Daily 3am UTC | Reminds me to write diary |

### Input Folder Check
- Check Google Drive TEST_INPUT folder for new audio files
- Compare against previously processed files
- If new files found → notify Karen/start transcription

### When New Audio Found
1. Download from TEST_INPUT
2. Run transcription workflow (10 steps)
3. Upload to TEST_OUTPUT
4. Notify crew

## KUAF Transcript Workflow (RadioHead)

### Setup
- **AssemblyAI API Key:** `6db7d76a6ab147c08bca7d4b5d31f992`
- **Google Drive:** RadioHead-Karen (folder ID: 0APtVt_cucWKWUk9PVA)
- **rclone config:** Service account at `/data/workspace/.secrets/google-service-account.json`

### Input/Output Folders
- **Input:** `gdrive:RadioHead-Karen/TEST_INPUT/` (folder ID: 0APtVt_cucWKWUk9PVA) — **placeholder, will change**
- **Output:** `gdrive:RadioHead-Karen/TEST_OUTPUT/`

**⚠️ NOTE:** Drive folder will change once Aiden provides permanent folder. Current is TEST_INPUT/TEST_OUTPUT placeholder.

### Processing Steps

1. **Download audio** from Google Drive using rclone
   ```
   rclone copy gdrive:RadioHead-Karen/TEST_INPUT/<filename> /data/workspace/jack-test-input/
   ```

2. **Transcribe with diarization** using AssemblyAI

3. **Map speakers to names** (use Guest Name Lookup + context)

4. **Build output with HTML formatting**
   - Use `<strong>LASTNAME</strong>:` (last names only!)
   - Example: `<strong>Kellams</strong>:`, `<strong>Soto</strong>`

5. **Cleanup Pass 1:** Remove fillers, fix stutters, clean spaces, normalize quotes/dashes, fix double periods

6. **Cleanup Pass 2:** Repeat

7. **AP Style Polish:** Hyphenate (first-ever, AI-powered), numerals for numbers (9 out of 10), em dashes (—), capitalize Rx/TV/DNA

8. **Add paragraph spacing:** `<br><br><strong>` before each speaker

9. **Upload to Google Drive**

### Speaker Naming Convention
- **A** → Kyle Kellums (host)
- **B** → Guest
- **C** → Liz Lerman (when on)
- **D** → Jared Phillips (Ozarks history segments)
- **A** → Matthew Moore (when hosting)
- **B** → Victoria Soto (Clinton School segments)

### Early Voting Segment Speakers
- **A** → Casey Mann (reporter)
- **B** → Kendra Child (reporter)
- **C, D, E, F, G, H** → Voter/Interview subject (identify by context in their utterances)

### SHE Festival Segment Speakers
- **A** → Kyle Kellums (host)
- **B** → Teresa DellaBlanca (U of A associate professor)
1. Run transcription first to get speaker samples
2. Look at first 200 chars of each speaker's utterances
3. Match names mentioned in the content OR identify by context
4. Re-run with better speaker map

### Speaker Identification Process
1. Get all unique speakers (A, B, C, etc.)
2. For each speaker, collect sample utterances
3. Look for names mentioned in the text (e.g., "says X" or "I'm X")
4. Map speakers to names based on context

### Files to Skip (per Jack's instructions)
- Full show MP3s (e.g., `123.mp3`) - DON'T transcribe
- WAV files - Ignore

### Only Transcribe
- Segment MP3s (e.g., `123_word.mp3`, `123_pryor.mp3`)

### Guest Name Lookup (Permanent Reference)
Build this up over time with each transcription:
- **shefestival** → Theresa Delaplain (U of A music professor)
- **clintonschoolimpact** → Victoria Soto (Clinton School Dean)
- **earlyvoting** → Casey Mann, Kendra Child (reporters), Steve Foster, Barbara Verdery, Kimberly Dennison, Eric Parkinson, Mike Malone (voters/interviewees)
- **ozarkshistory** → Jared Phillips (U of A historian)
- **pryor** → Randy Dixon (Pryor Center for Arkansas Oral Visual History) - Jesse Jackson segment
- **lizlerman** → Liz Lerman (dance/choreographer)
- **captainblood** → (radio theater - to be added)

1. **Search the topic first** — Before transcribing, search online for the show topic to find guest names in advance

2. **Build a guest database** — Save common KUAF guests:
   - Theresa Delaplain (U of A music events)
   - Victoria Soto (Clinton School)
   - Jared Phillips (Ozarks history)
   - Casey Mann, Kendra Child (reporters)
   - Liz Lerman (dance/choreography)
   - etc.

3. **Use file name context** — File names like `20260302_shefestival.mp3` hint at the topic; SHE Festival = Theresa Delaplain

4. **Look for self-identifications** — Guests often say "I'm [Name]" or are introduced in the first few utterances

5. **Check KUAF page first** — Grab guest names from the KUAF website *before* running transcription

6. **Flag uncertain names** — Mark unknown speakers as "[Speaker B - verify name]" for human review

7. **Reference past transcripts** — Use previously published KUAF transcripts to learn common guest names

### Key Formatting Rules
- **Speaker labels:** Use `<strong>LASTNAME</strong>:` (last names only!)
- **Paragraph breaks:** `<br><br><strong>`
- **Disclaimer:** Wrap in `<em>` italics
- **Em dashes:** Handle encoding carefully — use real "—" not "â€\""

### AP Style Reminders
- Hyphenate: first-ever, first-year, post-graduation, AI-powered, co-guest
- Numbers: "nine out of 10" (numerals, not words)
- Capitalize: Rx, TV, DNA

### Reinforcement Learning (After Publishing)
After Jack publishes a transcript:
1. Fetch the published version from KUAF
2. Compare my output vs published
3. Note differences (names, AP style, formatting, etc.)
4. Update workflow to improve next time

### Standard KUAF Disclaimer (Add to every transcript)
```
<em>Ozarks at Large transcripts are created on a rush deadline and edited for length and clarity. Copy editors utilize AI tools to review work. KUAF does not publish content created by AI. Please reach out to kuafinfo@uark.edu to report an issue. The audio version is the authoritative record of KUAF programming.</em>
```

### Future Enhancements (If Needed)
- **NPR CMS Integration** — Post finished transcripts to NPR's CMS via API (pending approval)
- **Web App for CMS** — If no API, build web app with Playwright/Puppeteer to auto-fill CMS forms
- **Playwright MCP** — Browser automation backup if needed
  - https://github.com/microsoft/playwright-mcp
  - Useful for complex web scraping if KUAF site is tricky

### Open Questions
- ✅ ~~Output destination~~ — NPR CMS (via API, pending approval)
- Need NPR CMS credentials/API access when ready

---

*Last updated: March 13, 2026*
