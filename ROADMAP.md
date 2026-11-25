# Roadmap

## Shipped in v0.3.0–v0.5.1

- [x] Clickable fictional customer Windows desktop with settings and stateful mistakes
- [x] Remote-support workflow and simulated commands
- [x] 24-minute shift, manual and Alt+Tab auto-pause
- [x] Carry-over of unfinished tickets, fictional SLA labels and shift summaries
- [x] Special/recurring clients, interruption tickets, XP, achievements, skill progression
- [x] Versioning, real hotfix corrections and regression scripts

## Planned for v0.6.0 — Dynamic Ticket Lifecycle & Customer Follow-up

**Status: proposed, not implemented.** This feature should simulate real Helpdesk L1 decisions when the customer is unavailable or cannot immediately confirm the repair.

- [ ] Allow a technician to choose **Resolved** without direct customer confirmation **when company policy and available technical evidence justify it**. Record what was tested, the result, resolution reason and whether confirmation was obtained.
- [ ] Distinguish **In Progress**, **Waiting for Customer**, **Resolved (awaiting confirmation)** and **Closed**; reopening should preserve the original ticket instead of replacing it with a new unrelated case.
- [ ] Let fictional customers respond after one or more simulated days and **reopen a previously resolved ticket** if the symptoms persist or return, including through replies sent while the agent is working on another ticket.
- [ ] Display a **new-message/reopened-ticket notification** without automatically leaving the currently active case. Add the reopened case to the correct queue with its full history, notes, diagnostic evidence, previous actions and timestamps intact.
- [ ] Model three distinct outcomes for a technically resolved, unconfirmed issue: successful fix, partial fix/recurrence, and incorrect diagnosis. Determine outcomes from hidden scenario state and agent actions — **not an arbitrary random punishment**.
- [ ] Keep customer-confirmed, technically verified and unverified resolutions distinct in ticket metadata. **Lack of a reply is not proof that the issue was fixed.**
- [ ] Support a fictional, clearly documented confirmation window (e.g. two simulated days) before automatic **Closed**, while respecting pending-customer and SLA policies.
- [ ] Evaluate decisions fairly: do not automatically penalize a justified resolution without user confirmation; penalize unsupported claims, ignored contradictory evidence or skipped mandatory safety steps. Allow appropriate escalation rather than requiring every live chat to end with an immediate fix.
- [ ] Ensure follow-ups, pending status, reopen events, notifications and timers survive save/export/import and workday rollover; test the workflow with simulated live-chat, email and phone cases.

**Example:** an Outlook ticket is marked Resolved after appropriate diagnostics while its owner is in a meeting. On day 9, the owner replies that Outlook still fails. NOVA opens a notification during another active incident, changes the original ticket to Reopened/In Progress according to workflow, and retains the full diagnostic history.

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