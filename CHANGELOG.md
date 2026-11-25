# Changelog — NOVA Service Desk

All notable **application changes** are recorded here, with newest versions first. NOVA uses `MAJOR.MINOR.PATCH` versioning: feature releases advance the minor version, while verified bug fixes advance the patch version.

Dates refer to when the development versions were prepared. The v0.3.0, v0.4.0 and v0.5.0 entries describe actual development stages that were subsequently combined into the current v0.5.1 application; they are **not separate public GitHub releases**.

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
