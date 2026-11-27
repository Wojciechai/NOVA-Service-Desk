# Verification history — NOVA Service Desk

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

## v0.6.0 — Service Desk Operations (2026-11-26)

**Tested using a simulated browser environment, not a full browser GUI.**

- [x] Application script parsed successfully in V8.
- [x] Dashboard booted with all three day-one tickets.
- [x] Ticket queue search narrowed the list to the expected ticket; basic input/search flow tested.
- [x] NOVA Mail displayed a linked case, stored an outgoing reply and changed the ticket to Waiting for Customer.
- [x] Waiting ticket could be manually resumed without loss of its history.
- [x] All **12/12** authored original incident workflows still reached Resolved with XP awarded.
- [x] Outlook INC-1003 resolved via technical evidence without customer confirmation.
- [x] A formally Closed INC-1003 was reopened after the next day transition, its fix/verification state invalidated and a new incoming email/notification generated.
- [x] Agent reply to the reopened case moved it to Waiting for Customer; a later scripted reply resumed it to In Progress.
- [x] Previously earned XP was preserved rather than awarded again on reopen.

Reproduce the new workflow tests locally with:

```bash
node scripts/operations-checks.js NOVA_Service_Desk.html
```

**Still requires manual checking:** Chrome/Edge/Opera GX interactions, responsive layout, keyboard navigation, JSON file-picker import/export and full 24-minute real-time shifts. A simulated-DOM test alone cannot verify visual correctness.


## v0.7.0 — Rush Hour & IT Operations (2026-11-27)

**Scope:** app-script V8 execution using a simulated DOM, local storage, deterministic time and controlled random draws. This verifies state and scripted interface output, **not** real browser rendering, screen readers, user workflows or deployed CI results.

- [x] Embedded application JavaScript parsed without syntax errors.
- [x] Original **12/12** ticket workflows completed as before; XP was awarded with no extra duplicate resolutions.
- [x] Existing regression suite passed remote assistance, DNS misconfiguration/recovery, pause, Alt+Tab behavior, day rollover, urgent interruptions and achievements.
- [x] v0.5.1 targeted checks passed emergency-title normalization, mistaken VPN action recovery, delayed clock compensation and DNS restoration.
- [x] v0.6.0 checks passed ticket search, NOVA Mail, technical-only resolution, Outlook recurrence, case reopening and XP preservation.
- [x] Knowledge Base 2.0 responded to search terms and showed the matching driver article.
- [x] Device Manager showed scripted states; inappropriate driver updates left audio broken and incurred a simulated penalty, while rollback solved the audio case.
- [x] Approved Wi-Fi package installation fixed the new missing-driver case after diagnosis.
- [x] Escalation with no diagnostic evidence was blocked; documented L1 → L2 handoff remained pending despite customer mail and returned with a scripted answer the following day.
- [x] Controlled random draw created a Rush Hour schedule once, emitted **three tickets and one email** in stages, and did not change the event count during a manual pause.
- [x] Unsent customer emails and escalation notes/team choices survived incoming Rush Hour events, browser reload and JSON backup import.
- [x] Refresh restored active Rush Hour plans and all previously emitted tickets without duplication.
- [x] JSON import restored Rush plans, generated incidents and notifications.
- [x] Completed peak cases retained their data; all unresolved peak tickets carried to the next simulated shift.
- [x] Rush Hour shift-report metrics were shown in progress history, and the immediate following day correctly observed the cooldown.
- [x] Previous emergency incident IDs imported correctly and an injected title was replaced with the canonical authored title.

**Regression commands:**

```bash
node scripts/regression.js NOVA_Service_Desk.html
node scripts/scenario-checks.js NOVA_Service_Desk.html
node scripts/hotfix-checks.js NOVA_Service_Desk.html
node scripts/operations-checks.js NOVA_Service_Desk.html
node scripts/v07-checks.js NOVA_Service_Desk.html
```

A new `.github/workflows/ci.yml` runs these five suites on pushes and pull requests. **The hosted GitHub Actions outcome was not directly verified** at the time this report was written.

**Manual checks still needed on the user's computer:** browser layout for Device Manager and Knowledge Base 2.0, correct handling of hardware-like controls, long active Rush Hours, keyboard navigation, export/import through the actual file picker, and a full 24-minute day without pauses. This application never accesses a real customer computer or modifies Windows drivers.
