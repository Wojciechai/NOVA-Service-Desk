# Verification report — NOVA Service Desk v0.5.1

Verification performed on **2026-11-25** in a sandboxed project runtime.

## Passed

- [x] Embedded JavaScript syntax (`node --check`) for v0.3.0, v0.4.0, v0.5.0 and v0.5.1.
- [x] Program state initially creates three day-one cases.
- [x] Fictional remote session must pass instruction, program launch, code and consent stages before opening the desktop.
- [x] Desktop changes fictional DNS state and logs an incorrect action; subsequent repair, verification and session closure succeed.
- [x] Ticket closure awards XP once (a solved case persists as resolved).
- [x] Manual pause freezes time; an Alt+Tab-style blur freezes time; focus restores automatic counting if not manually paused.
- [x] 24-minute timer rolls over day 1 to day 2 and automatically carries an unfinished case including its written note.
- [x] Emergency incident appears once at mid-shift on day 3.
- [x] Skills, achievements and shift reports render; training mode can be toggled.
- [x] Full original 12/12 authored incident workflows can be completed, including special VPN and security incidents.
- [x] Hotfix: emergency ticket data normalized and canonical title preserved after reload.
- [x] Hotfix: mistake in VPN P1 does not permanently prevent closure.
- [x] Hotfix: 30-second visible clock delay is fully counted (instead of capped at five seconds).
- [x] Hotfix: broken DNS can be corrected via remote desktop after a wrong action.
- [x] Hotfix: remote desktop markup and CSS display-mode mismatch corrected.

## Test method and limits

`node scripts/regression.js NOVA_Service_Desk.html`

`node scripts/scenario-checks.js NOVA_Service_Desk.html`

`node scripts/hotfix-checks.js NOVA_Service_Desk.html`

These Node.js checks execute the browser application logic in a **stubbed DOM/localStorage environment**. They validate core state transitions and emitted markup but not the appearance or every keyboard/mouse interaction in a real browser. A Playwright/Chromium browser check was attempted but navigation to test files/local server was blocked by the runtime administrator (`ERR_BLOCKED_BY_ADMINISTRATOR`); no successful full browser test or screenshot is claimed for these releases.

## Still to validate on the user's PC

- [ ] Manual UI pass in Chrome/Edge/Opera GX on Windows 11, including layout at 1920×1080.
- [ ] Browser refresh and `file://` storage behavior when switching file versions.
- [ ] Real JSON export/import through the browser's file picker, including a v0.2 backup.
- [ ] Long-running 24-minute shift without pausing.
- [ ] Accessibility and mobile responsiveness audit.
- [ ] Stress test with many days of unresolved tickets.

**No real remote connection or real Windows settings were touched during testing.**