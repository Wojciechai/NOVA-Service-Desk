# NOVA Service Desk

**Offline IT Helpdesk training simulator** · **v0.7.0** · HTML / CSS / JavaScript · Polish interface

NOVA Service Desk is a personal portfolio and learning project that simulates day-to-day work in a fictional IT support department. It combines incident tickets, customer conversations, an offline simulated mail inbox, a mock remote-support desktop, stochastic ticket bursts, technical escalation, searchable troubleshooting guidance, a timed shift and skill progression.

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
| NOVA Mail | Offline inbox/sent messages linked to cases, outgoing replies, scripted customer follow-ups and Rush Hour customer mail |
| Rush Hour | Approx. 25% chance per eligible day, multi-minute staggered arrival of 3–6 new tickets and 1–3 emails, two-day cooldown and shift summaries |
| Escalations L1 → L2 | Team selection, mandatory diagnostic handoff, logged history and scripted next-day specialist response |
| Device Manager | Fictional Windows device/driver inspection, stateful update, rollback or installation and two distinct authored cases |
| Knowledge Base 2.0 | Searchable local Helpdesk procedures, category filters and suggestions linked to the current case |
| Remote assistance | A consent-based, simulated remote session with a clickable Windows-like desktop |
| Troubleshooting | Fictional network, DNS, DHCP, Outlook, printer, device and process problems |
| Diagnostic tools | Simulated commands such as `ipconfig /all`, `ping`, `nslookup` and `tasklist` |
| Decisions and mistakes | Changing virtual device settings, creating additional faults and recovering from incorrect actions |
| Work calendar | A 24-minute active-use shift, manual pause, optional auto-pause on Alt+Tab, and shift summaries |
| Backlog and interruptions | Automatic carry-over, notifications, recurring clients, scripted replies and selected reopened incidents |
| Progression | XP, levels, skill categories, achievements and optional training hints |
| Saving progress | Browser `localStorage`, JSON backup export and import |

### Workday rules

A simulated shift lasts **24 real minutes** while NOVA is active. The timer can be paused manually and, by default, pauses when the application loses focus. On return, it resumes unless manual pause remains enabled.

When a shift ends, unfinished tickets (including Rush Hour and escalated cases) move to the next simulated day **with their notes, status and completed checks preserved**. Carried-over cases are not automatically considered overdue; SLA violations use separate fictional training rules. The current calendar uses consecutive dates, including weekends.

### Rush Hour rules

From **day 3 onward**, qualifying shifts have roughly **25% probability** of a peak-workload event. At least two full shifts separate triggered peaks. The decision and complete event schedule are saved to local storage, so refreshing the page does not reroll the peak or duplicate existing generated cases.

If triggered, a burst begins approximately **5–10 real minutes** into a normal 24-minute shift. **3–6 tickets** and **1–3 customer emails** arrive in staggered increments, without announcing the event in advance. Some tickets may share a common incident group label; that is informational and does **not** automatically solve related cases.

The existing pause/Alt+Tab behavior also pauses arrivals. The end-of-shift report lists burst volumes, untouched priority-one cases and escalations. Incomplete cases carry over normally and are **not penalized automatically merely because the workload increased**.

### New training scenarios

- **INC-DRV-011 (day 2):** audio fails after a driver update. Inspect the fictional Device Manager, review the version, and **roll back** to the previously approved package; an inappropriate update makes things worse.
- **INC-DRV-012 (day 4):** the Wi-Fi adapter has no installed driver, but Ethernet still works. Use Remote Assist, inspect the device, **install an approved driver**, and verify connectivity.
- **L1 → L2 handoff:** choose IT Support L2, Network Team or Security Team, enter a meaningful diagnosis and business impact, and wait for a **scripted specialist response** on a subsequent simulated day. Sending a customer email does not cancel a pending escalation.

### Scenarios and limitations

- The first 10 simulated days include **12 original authored cases plus 2 new driver cases (14 total)**. Additional days rotate existing templates. Rush Hour events draw from curated training templates rather than freely generating arbitrary incidents.
- Urgent interruptions and mail follow-ups use predefined scripts; they are not live events. Rush Hour timing and template selection are randomized but each issue's symptoms and actions are pre-authored. **Current automatic reopen example:** INC-1003 (Outlook), after a technically verified resolution without customer confirmation. Other scripted replies can resume selected Waiting for Customer email threads on a later simulated day.
- The virtual desktop, Device Manager and CMD support **implemented actions only**. They are not a complete Windows installation.
- Customer chat and NOVA Mail are rule-driven, not connected to an AI service. Composing an email saves it only inside this offline simulation, not to any real mail service.
- XP represents **in-game progress**, not commercial experience, certification or independently verified proficiency.
- No real computer settings, accounts or remote sessions are changed.

## Saving and upgrading

Progress, mail threads, lifecycle status, escalation history, Rush Hour plans and notifications are stored locally in the browser. With `file://` pages, storage access can differ between browsers or file locations.

**Before moving the HTML file or upgrading from an older copy, export your progress as JSON.** After opening the new version, import the backup and confirm that your progress was restored. Keep the original backup until checked.

## Repository structure

```text
NOVA_Service_Desk.html   # Offline application
README.md                # Overview and setup
CHANGELOG.md             # Changes and verified fixes
ROADMAP.md               # Planned improvements
TESTS.md                 # Test results and known gaps
scripts/                 # Node.js regression checks
.github/workflows/ci.yml # Automated regression workflow on push / PR
.gitignore               # Local files Git should not track
```

## Testing

Optional automated checks:

```bash
node scripts/regression.js NOVA_Service_Desk.html
node scripts/scenario-checks.js NOVA_Service_Desk.html
node scripts/hotfix-checks.js NOVA_Service_Desk.html
node scripts/operations-checks.js NOVA_Service_Desk.html
node scripts/v07-checks.js NOVA_Service_Desk.html
```

These scripts exercise application states with a **stubbed browser environment**; GitHub Actions is also configured to run all suites on pushes and pull requests. They do not replace a full end-to-end test in a real browser. See [TESTS.md](TESTS.md) for recorded checks and outstanding manual validation.

## Version history and future plans

- **v0.2.0:** ticket system, simulated calendar, clients and initial Remote Assist.
- **v0.3.0–v0.5.0:** interactive desktop, 24-minute shifts and expanded skill progression, documented as development stages.
- **v0.5.1:** consolidated interactive simulator and targeted fixes.
- **v0.6.0:** agent dashboard, searchable queues, NOVA Mail, customer-waiting states, evidence-backed resolution and a scripted reopen/follow-up workflow.
- **v0.7.0:** staggered Rush Hour, Device Manager and two driver scenarios, L1/L2 team handoff, Knowledge Base 2.0 and regression CI.

Read [CHANGELOG.md](CHANGELOG.md) for details, including the distinction between local development stages and actual commits on GitHub. The old v0.2 archive was removed from the main branch; it remains available in Git history.

For planned features, see [ROADMAP.md](ROADMAP.md). Full enterprise integrations, a real Windows virtual-machine mode, advanced SLA timers, and an unrestricted AI email correspondent are **not implemented**.

## Project and attribution

Created as a learning and portfolio project by [Wojciech Żydek](https://github.com/Wojciechai) with assistance from ChatGPT.

**License:** No open-source license has been selected yet. The repository is public, but that does not automatically grant permission to redistribute or reuse its source code.
