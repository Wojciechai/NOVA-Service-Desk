# NOVA Service Desk

**Offline helpdesk training simulator** | Version **0.5.1** | Windows / modern browser | Polish UI

A local-first practice environment built around a fictional company. NOVA lets trainees work through incident reports, communicate with returning customers, troubleshoot fictional PCs, document outcomes, and learn how to prioritize cases under time pressure.

> **Training simulation, not real IT infrastructure.** NOVA Remote Assist cannot see, access or control real computers. Its Windows-like desktop, console, people, networks and application states are simulated. There is no live AI conversation, server connection or TeamViewer integration.

## Run locally

1. Open `NOVA_Service_Desk.html` in Chrome, Edge or Opera GX (double-click the file).
2. Pick a case in **Centrum zgłoszeń**. For a remote-support case, follow the instruction → session code → customer consent procedure.
3. Diagnose via **Diagnostyka**, **Działania** and the simulated **Zdalny pulpit**. Open program windows, change fictional settings and observe results.
4. Verify the solution, end remote access when active, write a technical note of 25+ characters and close the ticket.
5. Use **Kalendarz**, **Postępy** and **Dane i ustawienia** to track work, configure auto-pause and export a JSON backup.

**Requirements:** current desktop browser, no installation, virtual machine, internet, account, Node.js, API key or permissions needed for the application. Node.js is optional for automated state-machine tests.

## Features

| Area | Available now |
| --- | --- |
| Tickets | Priorities P1–P3, written diagnostics, persistent history, SLA indicators, carry-over and customer history |
| Calendar | A simulated workday lasts **24 real minutes** while the app is active; manual pause and optional auto-pause when you Alt+Tab |
| Daily workflow | Unfinished cases automatically roll into the next simulated day with notes, status and checks intact |
| Interruptions | A scheduled urgent incident arrives halfway through every third simulated day from day 3 onwards; existing templates are reused |
| Customers | Fictional repeat customers, 12 originally authored cases, additional rotating templates after day 10 |
| Remote Assist | Fictional approval procedure, simulated Windows-like client desktop, selectable apps, configurable DNS, proxy, Outlook, devices, printer and startup |
| Tools | Simulated CMD commands including `ipconfig /all`, `ping`, `nslookup`, `tasklist` and `ipconfig /renew` |
| Mistakes | Changes can cause additional fictional faults, be corrected, block verification until fixed and reduce XP |
| Progress | XP, trainee levels, skill categories, achievements, shift reports, training/realistic mode |
| Backup | Browser `localStorage` plus JSON export/import; a v0.2 save can be read in later versions if accessible under the same browser origin |

### Timing and backlog

A shift is 24 minutes of **active use**, not 24 minutes while the computer is idle. Use **Pauza** whenever needed. Auto-pause on window focus loss is on by default; the timer resumes upon return unless a manual pause is still active. Closing the application does not spend your time. When the timer reaches zero, the next day starts automatically. Open items carry across; their histories and notes remain, and overdue tickets are distinguished from merely carried-forward tickets. The P1/P2/P3 windows here are **fictional training rules**, not real employer SLAs. The calendar currently advances through consecutive dates including weekends.

### Learning limits

- Remote desktop applications are **implemented models**, not a complete Windows clone. Unsupported Windows functions will not work; the interface must not be confused with an actual VM.
- Chats use rule-driven fictional answers, not an online language model.
- The first 10 virtual days have 12 manually designed cases; later days reuse case templates. Emergency tickets are scheduled, not randomly generated.
- XP measures simulator performance only; it is **not** a claim of commercial Helpdesk experience or certification.
- Data is stored locally. Under `file://`, some browsers isolate `localStorage` by file path or origin. **Export a JSON backup before opening a new version or moving the file.** Importing overwrites current progress after confirmation.

## Project layout

```text
NOVA_Service_Desk.html     # Entire offline app (HTML + CSS + vanilla JS)
README.md                  # Getting started, features, limitations
CHANGELOG.md               # Real releases and actual fixes
TESTS.md                   # Verification performed vs. still pending
GITHUB_PUBLISHING.md       # How to publish with GitHub Desktop
ROADMAP.md                 # Future ideas (VM mode not implemented)
scripts/                   # Node.js state-machine regression tests
```

## Test commands (optional)

```bash
node scripts/regression.js NOVA_Service_Desk.html
node scripts/scenario-checks.js NOVA_Service_Desk.html
node scripts/hotfix-checks.js NOVA_Service_Desk.html
```

Tests execute the embedded JavaScript with an in-memory DOM/storage stub, so they validate application state transitions but do **not** replace a real-browser manual test. The JavaScript syntax was also checked with `node --check` for each staged release. See `TESTS.md`.

## GitHub release history

This folder contains a **real local Git repository with five commits and five version tags**: `v0.2.0`, `v0.3.0`, `v0.4.0`, `v0.5.0` and `v0.5.1`. It can be published as a private repository using GitHub Desktop. These tags describe actual files built in this handoff and do not imply an earlier public release or outside user feedback. See [GITHUB_PUBLISHING.md](GITHUB_PUBLISHING.md) for the exact click sequence.

## Safety and privacy

No external requests, telemetry, user-account credentials, network scans, real device administration, remote access or privilege elevation. Fictional session codes must never be mistaken for real remote-support credentials. Never import a backup you do not trust; JSON import is designed for local data. The program does not run shell commands on Windows.

## Author and project status

Portfolio project by [Wojciech Żydek](https://github.com/Wojciechai), built collaboratively with ChatGPT. The release history is locally prepared for review and publication; it has not been pushed to GitHub automatically.

**License:** Not selected; the suggested first repository is private. No open-source license is claimed. Choose a license explicitly if you later want to grant public reuse rights.