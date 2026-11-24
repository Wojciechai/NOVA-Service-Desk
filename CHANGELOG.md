# Changelog — NOVA Service Desk

This project uses `MAJOR.MINOR.PATCH` versioning. New features increase MINOR; isolated bug fixes/hotfixes increase PATCH. Changes are recorded when a release is prepared, not retroactively invented.

## [0.2.0] — 2026-11-24

### Added

- Virtual **calendar** with manual progression through workdays and a backlog of older tickets.
- **12 authored incidents across 10 days**, including recurring clients and more complex cases.
- Template rotation after day 10 (up to 180 virtual days), explicitly identified as reused scenarios.
- **Special cases** requiring higher trainee levels (company VPN incident and suspicious attachment).
- **XP and levels** with difficulty-based rewards, mistake penalties, and a completion history.
- **NOVA Remote Assist**, a choice-driven mock remote desktop that includes user guidance, fictional session code, consent, selectable app windows, repair actions, and session termination.
- **JSON export/import** of user progress and basic attempt to migrate saved v0.1 ticket states.
- Dedicated **Progress**, **Calendar**, and **Settings** panels.

### Changed

- Incident handling is now organized around reusable case types and required completion steps.
- Queue shows source day, priority, status, step counts, and special/locked states.
- Ticket completion requires verification and a written service note.
- Offline-first presentation and responsive layout extended to new panels.

### Fixed

- DNS diagnostic button IDs now map correctly to the required case checks.
- Pre-release v0.1 migration no longer references the XP helper before initialization.
- XP is only awarded once per ticket ID, even after resetting a case.
- Potentially unsafe actions are logged and penalized instead of being silently accepted as correct.
- Remote session must be ended before final ticket closure.

### Security & safety

- All CMD commands, application windows, session IDs, network settings and incidents remain fictional.
- The remote desktop does not read the user's screen or control any real computer.
- The user is informed that suspicious-attachment cases should be escalated, not remotely explored.
- Imported backup values are checked for basic structure; user-generated text is escaped before display.

### Performance / optimization

- Self-contained app without external dependencies, external network requests or build steps.
- Capped in-memory case history, chat and console output to keep browser storage bounded.
- Only the selected section is built for display on each navigation action.

### Verification performed

- JavaScript syntax checked with Node.js.
- Browser-based scripted tests completed **12/12 authored cases** through to successful closure, including both special incidents.
- Additional browser test completed the mock remote-access procedure, closure of a printer ticket and XP award.
- No runtime JavaScript errors detected in those scripted test paths. This is **not** exhaustive quality assurance.

## [0.1.0] — 2026-11-24

### Initial prototype

- Offline HTML-based helpdesk simulator.
- Three practice cases: broken DNS, blocked account, and offline Outlook.
- Tickets, simple livechat, simulated console, action panel, reports and local browser persistence.

## Hotfix policy

If a bug is found after release, record it as `0.2.1`, `0.2.2`, etc., with a short description, what was affected, what changed and how it was tested. A hotfix is not claimed until a corrected build is actually created.
