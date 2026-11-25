# Changelog — NOVA Service Desk

Project versions follow `MAJOR.MINOR.PATCH`: features increase MINOR; actual verified fixes increase PATCH. Entries below refer to generated local release snapshots, not fabricated public downloads or user bug reports. Dates represent build dates.

## [Unreleased] — Repository maintenance (2026-11-25)

### Changed
- Removed the outdated GitHub Desktop publishing guide from the main branch after direct repository publication.
- Removed the old v0.2 ZIP archive from the repository root; previous commits still retain it.
- Updated README setup instructions, repository layout, public visibility and release-history wording to match the live GitHub repository.
- Kept `.gitignore` and executable regression checks as standard repository-maintenance files.
- No application code or runtime behavior changed during this housekeeping update.

## [0.5.1] — 2026-11-25 (Hotfix)

### Fixed
- Corrected responsive remote-desktop window layout and taskbar wrapping, which inherited incompatible grid styling.
- Corrected inconsistent emergency-ticket title on reload/import by rebuilding it from a trusted template.
- Fixed a dead-end where a wrong action could block verification permanently in mass VPN and security incidents with no repair action.
- Allowed correction of an accidentally misconfigured DNS through the interactive remote settings to clear the corresponding fault state.
- Fixed visible-time undercount when a browser throttles interval execution beyond five seconds. The clock now accounts for up to two minutes of a delayed visible tick.

### Verified
- Added targeted state-machine tests for the actual fixes; all five targeted checks passed.
- All original 12 training scenarios are completable; general workflow tests passed.

## [0.5.0] — 2026-11-25 (Features)

### Added
- Skill progression in Windows, Networking, Microsoft 365, Customer Support and Security.
- Achievement badges based on completed simulated cases.
- Progress dashboard showing completed/open/carried/overdue counts and recent shift reports.
- Training mode toggle for showing/hiding required workflow steps.
- Per-customer visit/resolution counts on ticket details.

### Maintenance
- Hardened dynamic incident imports by rebuilding known emergency cases from trusted templates.
- Extended save import with workday carry counts, scenario types, priorities and XP mistake metadata.

## [0.4.0] — 2026-11-25 (Features)

### Added
- 24-real-minute simulated workday with an on-screen countdown.
- Manual Pause/Resume and automatic pause on Alt+Tab/window focus loss (configurable).
- Automatic roll-over of unresolved cases into the next day, preserving progress, notes, conversation history and status.
- Carry-over counters and fictional SLA-overdue labels.
- End-of-shift history and optional early shift completion.
- A deterministic urgent interruption halfway through every third day from day 3.
- Clock, events and history included in progress backup data.

### Notes
- The timer stops outside the open app and does not use a remote/background scheduler.
- Emergency incidents reuse existing cases, not a new unlimited story generator.

## [0.3.0] — 2026-11-25 (Features)

### Added
- Interactive *fictional* Windows desktop in NOVA Remote Assist, launched only after consent.
- Clickable desktop/taskbar programs: settings/network, simulated CMD, company app/Outlook/Teams, devices/printers, Task Manager and Explorer.
- Stateful fictional device settings (e.g. DNS, DHCP, proxy, Outlook offline, printer queue, audio device, startup app).
- Repair choices, incorrect choices with consequences, console output reflecting device state, and verification guards.
- Existing v0.2 remote-session safety checks and incident flow retained.

### Maintenance
- Normalized missing device/remote fields in saved v0.2 ticket data without deleting XP or notes.

## [0.2.0] — 2026-11-24 (Existing baseline)

- Calendar with manual day advance, 12 authored incidents over 10 days, recurring fictional employees and special P1 cases.
- XP, levels, simulated remote-support choices, knowledge base and JSON backup.
- Prior improvements to ticket validation, legacy v0.1 import and no-repeat XP awards.
- The v0.2.0 baseline is retained in Git history; the public repository also contains earlier upload commits.

## [0.1.0] — 2026-11-24 (Earlier prototype)

- Three basic tickets, chat, simulated CMD, diagnostics and local browser persistence.
- This version is documented for completeness but not one of the five prepared publishing commits.

## Fix tracking policy

An issue becomes a **hotfix** only when an actual defect is identified and corrected. Preventive hardening, refactoring and performance work are documented as maintenance/optimization rather than made-up incidents. The `v0.5.1` entries above are identified reproducible issues found during development review; they were not attributed to real users.

## GitHub history note

The connected GitHub integration published the consolidated **v0.5.1 application** as one feature commit. Earlier v0.3.0, v0.4.0 and v0.5.0 versions are documented development stages, not separate commits on the public branch. Subsequent docs, tests and maintenance changes have their own commits. The existing repository history was not rewritten.
