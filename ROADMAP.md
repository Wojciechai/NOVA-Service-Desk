# Roadmap

## Shipped in v0.3.0–v0.5.1

- [x] Clickable fictional customer Windows desktop with settings and stateful mistakes
- [x] Remote-support workflow and simulated commands
- [x] 24-minute shift, manual and Alt+Tab auto-pause
- [x] Carry-over of unfinished tickets, fictional SLA labels and shift summaries
- [x] Special/recurring clients, interruption tickets, XP, achievements, skill progression
- [x] Versioning, real hotfix corrections and regression scripts

## Shipped in v0.6.0 — Service Desk Operations foundation

- [x] Agent dashboard and daily work queue
- [x] Search, status filters and priority/date sorting of tickets
- [x] Offline NOVA Mail inbox/sent view with linked case threads and message composition
- [x] Waiting for Customer, Reopened, Resolved and Closed statuses
- [x] Technically verified resolution without immediate customer confirmation, with evidence recorded
- [x] One authored Outlook recurrence can reopen a previously Resolved or Closed ticket while preserving its history
- [x] Scripted next-day replies to selected waiting email threads
- [x] Non-blocking notifications for reopened tickets and customer replies
- [x] Save/import/export of the new state and simulated workday continuity

## Shipped in v0.7.0 — Rush Hour & IT Operations

- [x] Randomized Rush Hour after day 2, roughly 25% per eligible shift, at least two non-peak shifts between triggered events
- [x] Staggered 3–6 new authored-template tickets and 1–3 customer emails, with optional incident grouping
- [x] Persisted one-time event rolls, pause-safe timing, duplicate protection, JSON migration and after-shift Rush metrics
- [x] Interactive fictional Windows Device Manager, driver inspection, rollback, approved package installation and incorrect-action consequences
- [x] Two new driver incidents: audio rollback and Wi-Fi driver installation
- [x] L1 escalation to L2, Network and Security with required diagnostic evidence, stored handoff history and later scripted team reply
- [x] Offline searchable Knowledge Base 2.0 with ten categorized procedures and case-relevant guidance
- [x] New simulated-state regression suite and GitHub Actions workflow configuration

## Next lifecycle improvements — proposed, not yet implemented

- [ ] Generalize real customer follow-ups, partial repairs, recurrences and reopening conditions to more scenario types rather than the single authored Outlook recurrence
- [ ] Separate response-time and resolution-time SLA clocks with working-hours and waiting-state policy
- [ ] Distinguish internal technician notes from customer-visible correspondence and extend L1/L2 handoffs to multi-step ownership and reassignment (the initial team escalation/history workflow shipped in v0.7)
- [ ] Explicit company policies for customer-confirmation windows and technically justified resolution
- [ ] More realistic email scenarios and validation of communication quality, without pretending to have unrestricted AI
- [ ] More extensive migration, abuse-case and real-browser interaction tests

## Next iterations

- [ ] Richer customer dialogues and multi-step problem branches
- [ ] More simulated Windows applications and interlinked faults
- [ ] Expanded dynamic incident chains and realistic impact-based prioritization beyond authored Rush Hour templates
- [ ] Knowledge Base article cross-links, guided troubleshooting branches, editorial review and stronger hints beyond the ten shipped local procedures
- [ ] Strict backup schema validation, migration tests and stronger storage recovery
- [ ] Real-browser E2E tests, accessibility, long-duration stability and verified GitHub Actions execution (workflow configuration already exists)
- [ ] Additional driver fault variants (graphics, audio services, networking) and device inventory history
- [ ] **NOVA Infrastructure Monitor**: fictional network devices, DNS/DHCP/VPN health, basic server-room alarms and contextual links to ticket scenarios
- [ ] **Windows Server Lab**: isolated virtual practice with AD, file sharing, DNS/DHCP and role-based admin actions (future optional learning mode)
- [ ] Optional **Real Windows Lab** via isolated VM, separate from Simulation Mode; not included now

The current application remains an offline training simulation. Features shown under Next iterations are proposals, not claims of delivered functionality.