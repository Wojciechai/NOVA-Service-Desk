# NOVA Service Desk

**Offline IT Helpdesk training simulator** · **v0.6.0** · HTML / CSS / JavaScript · Polish interface

NOVA Service Desk is a personal portfolio and learning project that simulates day-to-day work in a fictional IT support department. It combines incident tickets, customer conversations, an offline simulated mail inbox, a mock remote-support desktop, a timed shift and skill progression.

> **This is a simulation, not remote-access software.** NOVA does not connect to real computers, administer Windows, or use TeamViewer. Incidents, users, devices and tool outputs are fictional.

## Getting started

1. Download [`NOVA_Service_Desk.html`](NOVA_Service_Desk.html) using **Download raw file** on GitHub, or clone the repository.
2. Open the HTML file in a modern desktop browser (Chrome, Edge or Opera GX).
3. Start on the agent dashboard; use the searchable ticket queue to select an incident, investigate it, perform the simulated actions and document the result.
4. For remote-support cases, complete the customer guidance, session code and consent steps before opening the simulated desktop.
5. Verify the fix, end an active remote session, record a technical note and mark the case Resolved. You may document customer confirmation or technical evidence without customer confirmation. Resolved and Closed are distinct.

The application runs locally **without installation, server, virtual machine, API key or internet connection**. Node.js is only needed for optional regression tests.

## Current features

| Area | What you can practice |
| --- | --- |
| Ticket management | Dashboard, search/filter/sort, priorities, lifecycle status, case notes, verification and fictional SLA indicators |
| NOVA Mail | Offline inbox/sent messages linked to selected cases, outgoing replies and scripted customer follow-ups |\n| Remote assistance | A consent-based, simulated remote session with a clickable Windows-like desktop |
| Troubleshooting | Fictional network, DNS, DHCP, Outlook, printer, device and process problems |
| Diagnostic tools | Simulated commands such as `ipconfig /all`, `ping`, `nslookup` and `tasklist` |
| Decisions and mistakes | Changing virtual device settings, creating additional faults and recovering from incorrect actions |
| Work calendar | A 24-minute active-use shift, manual pause, optional auto-pause on Alt+Tab, and shift summaries |
| Backlog and interruptions | Automatic carry-over, notifications, recurring clients, scripted replies and selected reopened incidents |
| Progression | XP, levels, skill categories, achievements and optional training hints |
| Saving progress | Browser `localStorage`, JSON backup export and import |

### Workday rules

A simulated shift lasts **24 real minutes** while NOVA is active. The timer can be paused manually and, by default, pauses when the application loses focus. On return, it resumes unless manual pause remains enabled.

When a shift ends, unfinished tickets move to the next simulated day **with their notes, status and completed checks preserved**. Carried-over cases are not automatically considered overdue; SLA violations use separate fictional training rules. The current calendar uses consecutive dates, including weekends.

### Scenarios and limitations

- The first 10 simulated days include **12 authored cases**. Additional days rotate existing case templates rather than generating unlimited new problems.
- Urgent interruptions and mail follow-ups use predefined scripts; they are not live events. **Current automatic reopen example:** INC-1003 (Outlook), after a technically verified resolution without customer confirmation. Other scripted replies can resume selected Waiting for Customer email threads on a later simulated day.
- The virtual desktop and CMD support **implemented actions only**. They are not a complete Windows installation.
- Customer chat and NOVA Mail are rule-driven, not connected to an AI service. Composing an email saves it only inside this offline simulation, not to any real mail service.
- XP represents **in-game progress**, not commercial experience, certification or independently verified proficiency.
- No real computer settings, accounts or remote sessions are changed.

## Saving and upgrading

Progress, mail threads, lifecycle status and notifications are stored locally in the browser. With `file://` pages, storage access can differ between browsers or file locations.

**Before moving the HTML file or upgrading from an older copy, export your progress as JSON.** After opening the new version, import the backup and confirm that your progress was restored. Keep the original backup until checked.

## Repository structure

```text
NOVA_Service_Desk.html   # Offline application
README.md                # Overview and setup
CHANGELOG.md             # Changes and verified fixes
ROADMAP.md               # Planned improvements
TESTS.md                 # Test results and known gaps
scripts/                 # Optional Node.js regression checks
.gitignore               # Local files Git should not track
```

## Testing

Optional automated checks:

```bash
node scripts/regression.js NOVA_Service_Desk.html
node scripts/scenario-checks.js NOVA_Service_Desk.html
node scripts/hotfix-checks.js NOVA_Service_Desk.html\nnode scripts/operations-checks.js NOVA_Service_Desk.html
```

These scripts exercise selected application states with a **stubbed browser environment**. They do not replace a full end-to-end test in a real browser. See [TESTS.md](TESTS.md) for recorded checks and outstanding manual validation.

## Version history and future plans

- **v0.2.0:** ticket system, simulated calendar, clients and initial Remote Assist.
- **v0.3.0–v0.5.0:** interactive desktop, 24-minute shifts and expanded skill progression, documented as development stages.
- **v0.5.1:** consolidated interactive simulator and targeted fixes.\n- **v0.6.0:** agent dashboard, searchable queues, NOVA Mail, customer-waiting states, evidence-backed resolution and a scripted reopen/follow-up workflow.

Read [CHANGELOG.md](CHANGELOG.md) for details, including the distinction between local development stages and actual commits on GitHub. The old v0.2 archive was removed from the main branch; it remains available in Git history.

For planned features, see [ROADMAP.md](ROADMAP.md). Full enterprise integrations, a real Windows virtual-machine mode, advanced SLA timers, and an unrestricted AI email correspondent are **not implemented**.

## Project and attribution

Created as a learning and portfolio project by [Wojciech Żydek](https://github.com/Wojciechai) with assistance from ChatGPT.

**License:** No open-source license has been selected yet. The repository is public, but that does not automatically grant permission to redistribute or reuse its source code.
