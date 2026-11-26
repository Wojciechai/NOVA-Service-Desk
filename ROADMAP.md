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

## Next lifecycle improvements — proposed, not yet implemented

- [ ] Generalize real customer follow-ups, partial repairs, recurrences and reopening conditions to more scenario types rather than the single authored Outlook recurrence
- [ ] Separate response-time and resolution-time SLA clocks with working-hours and waiting-state policy
- [ ] Internal technician notes versus public customer replies, with meaningful assignment and L1/L2 escalation history
- [ ] Explicit company policies for customer-confirmation windows and technically justified resolution
- [ ] More realistic email scenarios and validation of communication quality, without pretending to have unrestricted AI
- [ ] More extensive migration, abuse-case and real-browser interaction tests

## Next iterations

- [ ] Richer customer dialogues and multi-step problem branches
- [ ] Search, ticket filters and sorting for large backlogs
- [ ] More simulated Windows applications and interlinked faults
- [ ] Notification/interruptions with variable impact and task priority trade-offs
- [ ] Enhanced knowledge base, troubleshooting explanations and case-specific hints
- [ ] Strict backup schema validation, migration tests and stronger storage recovery
- [ ] Real-browser E2E tests and automated CI once execution environment permits
- [ ] Optional **Real Windows Lab** via isolated VM, separate from Simulation Mode; not included now

The current application remains an offline training simulation. Features shown under Next iterations are proposals, not claims of delivered functionality.