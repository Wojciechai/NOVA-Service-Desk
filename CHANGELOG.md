# Changelog — NOVA Service Desk

All notable **application changes** are recorded here, with newest versions first. NOVA uses `MAJOR.MINOR.PATCH` versioning: feature releases advance the minor version, while verified bug fixes advance the patch version.

Dates refer to when the development versions were prepared. The v0.3.0, v0.4.0 and v0.5.0 entries describe actual development stages that were subsequently combined into the current v0.5.1 application; they are **not separate public GitHub releases**.

## [0.7.0] — 2026-11-27 — Rush Hour & IT Operations

### Added
- **NOVA Rush Hour:** roughly 25% chance per eligible simulated workday (from day 3), with at least two ordinary shifts between actual peaks. A scheduled burst unfolds gradually during active clock time, introducing **3–6 additional tickets** and **1–3 incoming emails**.
- **Persistent randomness:** the once-per-day roll, event order, timing and progress are saved; browser refresh and JSON import do not reroll a running burst or duplicate emitted tickets. Manual/automatic pause stops the arrival schedule.
- **Incident grouping:** selected pairs of peak tickets carry a shared fictional incident-group identifier. This is a triage hint, not an automatic cross-ticket repair mechanism.
- **Rush reporting:** shift summaries show the number of added tickets/emails, P1 requests left without initial checks and escalated peak tickets. Unfinished cases retain their progress across day rollover.
- **Device Manager:** interactive fictional Windows device and driver properties, hardware warning codes, version inspection, rollback, approved installation, update and disabling actions with meaningful consequences.
- **Two new authored cases:** `INC-DRV-011` (audio driver regression; approved rollback) on day 2 and `INC-DRV-012` (missing Wi-Fi driver; approved installation) on day 4. The original 12 authored case workflows remain available.
- **L1 → L2 escalations:** tickets can be handed to IT Support L2, Network Team or Security Team with a mandatory technical summary, validation of critical security/network preconditions, an auditable history, a pending team status and scripted follow-up the next simulated day.
- **Knowledge Base 2.0:** ten locally searchable Helpdesk procedures with category filtering and guidance linked to the currently selected ticket.
- **Regressions and CI:** a new `scripts/v07-checks.js` suite and a GitHub Actions workflow configured to run all existing and new Node suites on pushes and pull requests.

### Changed
- Active team escalation is not confused with Resolved; outstanding escalations remain in the work backlog, and a client email does not overwrite the L2 handoff status.
- Escalated tickets cannot be worked on or resolved by L1 before the scripted specialist response, and are excluded from the simplified training SLA-overdue calculation while pending.
- Export filename and interface identify **v0.7.0**, while the existing `localStorage` key remains stable for v0.6 saves.
- Existing save metadata upgrades to the current version on load.

### Fixed
- Preserved unsent customer email drafts and L1-to-L2 handoff notes/team selection when Rush Hour events redraw the current workspace; retained these drafts in JSON backups.
- Corrected ID validation for persisted emergency/Rush tickets, preserving their canonical metadata across refresh and JSON import.
- Initialized Rush template definitions before restoring saved in-progress events; this prevents an initialization error from discarding an active saved session.
- Made the earlier clock/hotfix tests deterministic when a random Rush Hour would otherwise be capable of changing expected incident counts.
- Corrected reported carried-over counts to exclude Resolved and Closed cases and prevented conflicting actions during pending escalations.

### Verification and limits
- V8 simulated-DOM execution of all **five regression suites** passed, including **12/12 original ticket workflows**, both new driver scenarios, an L1/L2 handoff, the Knowledge Base search, and a full Rush Hour with pause, refresh, JSON import, cooldown and rollover.
- GitHub Actions workflow configuration was committed; an individual hosted CI run is **not independently confirmed** in these release notes.
- This remains a curated **offline training simulator**. No real e-mail is sent and no real Windows driver or infrastructure is changed. Incoming events, responses and diagnoses use predefined scenarios, not an unconstrained AI system.
- Real-browser UI/visual testing, accessibility, long-duration stability and integration testing remain outstanding.

## [0.6.0] — 2026-11-26 — Service Desk Operations (first iteration)

### Added
- A **Helpdesk agent dashboard** with active tickets, urgent P1 incidents, pending-customer cases, carry-over totals and direct links to the relevant work.
- **Ticket search, status filters and sorting** by creation order or priority. Searches can use a ticket ID, user, department, device or issue title.
- **NOVA Mail**, an offline training inbox with received/sent views, case-linked message threads, a reply composer and the option to set a ticket to **Waiting for Customer**.
- Separate **Waiting for Customer**, **Reopened**, **Resolved** and **Closed** ticket states, alongside existing new/in-progress cases. A technician can pause the workflow and resume it without losing the ticket history.
- A resolution evidence choice: confirmation by a customer, or sufficient technical verification without immediate customer confirmation.
- A scripted follow-up: if the original Outlook case **INC-1003** is marked resolved on technical evidence alone, the issue can recur the next simulated day, opening the same ticket again with its original notes and diagnostic history.
- A scripted reply to selected pending e-mail threads on a later simulated day, returning the case to the active queue.
- A notification panel for replies and reopened cases that does not take the technician away from the current ticket.
- Extended JSON import/export and local persistence for message threads, confirmation evidence, reopened status, follow-up flags and notifications.

### Changed
- Resolved means a technical resolution has been recorded; it is no longer treated as identical to formally Closed. Resolved cases are automatically closed after two simulated days if not reopened.
- Previously completed tickets do not count as outstanding carry-over or SLA-overdue cases.
- The simulated inbox is explicit that no real e-mail is sent.

### Verification and limits
- Application JavaScript syntax passed V8 parsing; simulated-DOM checks completed all 12 original case workflows and the new Outlook reopen/mail-reply scenario.
- A new operations regression script is included for repeatable Node-based local checks.
- The reopening and e-mail response systems are **authored training flows, not a general conversational AI or unlimited event generator**. Full browser UI testing, stronger approval workflows and separate response/resolution SLA clocks remain future work.

## [0.5.1] — 2026-11-25 — Bug fixes / Hotfix

### Fixed
- **Remote desktop UI:** corrected window layout and taskbar wrapping caused by conflicting grid and flex styles.
- **Emergency ticket persistence:** restored the correct incident title after loading or importing a saved game, instead of trusting an inconsistent stored title.
- **VPN and security cases:** prevented incorrect actions from permanently blocking successful verification when the scenario had no separate repair step.
- **DNS recovery:** made it possible to reverse an incorrect DNS setting using the simulated remote desktop and clear the associated fault.
- **Workday timer:** corrected lost simulated time when the browser delayed a visible timer callback; the timer now compensates for delayed ticks of up to two minutes.

### Verification
- Targeted regression checks covered all five fixes.
- All 12 original incident workflows remained completable in simulated state tests.

## [0.5.0] — 2026-11-25 — Skills and progression

### Added
- Five skill categories: **Windows, Networking, Microsoft 365, Customer Support and Security**.
- Achievement badges for completed training scenarios.
- A progress dashboard with resolved, open, carried-over and overdue ticket totals.
- Shift summaries and recent workday history in the progress view.
- A training-mode option to show or hide workflow guidance.
- Customer-specific visit and resolution counts on ticket details.

### Improved
- Expanded saved-ticket data to retain priority, scenario type, carry-over count and mistake-penalty information when importing progress.
- Normalized known emergency incidents against built-in scenario definitions during save import.

## [0.4.0] — 2026-11-25 — Workday simulation

### Added
- A **24-minute real-time workday** with a visible countdown.
- Manual **Pause / Resume** for the workday timer.
- Optional automatic pause when the NOVA window loses focus (e.g. Alt+Tab), with automatic resume on return unless manually paused.
- Automatic transition to the next simulated day when time expires.
- Automatic carry-over of all unresolved tickets **without resetting notes, conversation history, checks or ticket status**.
- A carried-over ticket counter, separate from fictional SLA-overdue status.
- End-of-shift summaries and an option to finish a shift early.
- A scheduled urgent incident halfway through every third day, starting on day 3.
- Storage of timer, emergency-event and shift-history information in JSON backups.

### Behavior notes
- The timer only advances during an active unpaused session; closing the app does not consume shift time.
- Urgent cases come from predefined templates rather than an unrestricted random scenario generator.

## [0.3.0] — 2026-11-25 — Interactive remote assistance

### Added
- An interactive **fictional Windows-style customer desktop** inside NOVA Remote Assist.
- A customer-guidance, connection-code and consent workflow before remote control becomes available.
- Clickable simulated application windows for network settings, CMD, Outlook/Teams or company apps, printer/devices, Task Manager and File Explorer.
- Stateful simulated settings for DNS, DHCP, proxy, Outlook offline mode, print queue, audio devices and startup applications.
- Diagnostic command output that responds to the simulated customer-computer state.
- Incorrect configuration choices, simulated side effects, repair actions and verification conditions.

### Improved
- Preserved the existing remote-session closure and incident-resolution requirements.
- Added defaults for missing virtual-desktop and remote-session fields when opening older v0.2 saves.

## [0.2.0] — 2026-11-24 — Ticket workflow expansion

### Added
- A virtual work calendar with manually advanced days and a persistent backlog.
- **12 authored incidents across 10 simulated days**, including repeat customers and complex cases.
- More demanding VPN outage and suspicious-attachment scenarios.
- Priority levels, an incident history, XP rewards, trainee levels and mistake penalties.
- A choice-driven early version of NOVA Remote Assist with fictional session setup and consent.
- JSON progress export/import and continued browser-local save support.
- Reused case templates after day 10, with the scenarios identified as repetitions.

### Improved
- Ticket validation and safeguards against awarding XP multiple times for the same resolved case.
- Compatibility with older v0.1 save data.

## [0.1.0] — 2026-11-24 — Initial prototype

### Added
- Basic offline helpdesk dashboard with three initial tickets.
- Scripted customer conversations and technical diagnostic actions.
- Simulated CMD responses and incident-resolution flow.
- Browser-local progress persistence.

---

## Testing and release notes

The checks documented in [TESTS.md](TESTS.md) use a stubbed DOM and local storage. They validate selected state transitions, **not** every visual interaction in a real Windows browser. Full manual browser testing remains outstanding.

Only reproducible, corrected defects are labeled **Fixed / Hotfix**. Preventive improvements are marked **Improved**; no fake bug reports or fixes are included.

Repository-only housekeeping (such as README edits, removed upload instructions or GitHub file organization) is tracked in **Git commits**, not treated as an application release.
