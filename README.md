NOVA Service Desk
Offline helpdesk training simulator · Version 0.2.0 · Local-first / personal learning project
NOVA Service Desk is a fictional IT support environment for practicing helpdesk workflows: troubleshooting, customer communication, incident prioritization, remote-support consent, documentation, and safe escalation.
> **Status:** Early prototype. This is **not** a real remote-access tool, an operating system, or a replacement for supervised practice in a company. All incidents and customer conversations are simulated.
Features in v0.2.0
Incident dashboard with a queue, priority labels (P1–P3), and persistent case state.
Virtual work calendar: manually advance simulated days; previously opened incidents remain in the backlog.
Recurring customers with follow-up problems across different days.
Special incidents such as a department-wide VPN outage and a suspected phishing/malware event, unlocked by level.
Progression system: XP, levels, penalties for unsafe actions, and a completion history. Complex cases award more XP.
NOVA Remote Assist (simulation): guide the customer through starting an approved tool, obtaining a fictional session code, granting consent, choosing a simulated application, performing actions, and ending the session.
Basic simulated CMD commands and actions that modify each case's fictional state.
Case notes and verification before closing an incident.
Offline storage, plus JSON export/import of progress.
Knowledge base with introductory IT support procedures.
Quick start / Jak uruchomić
Download `NOVA_Service_Desk_v0.2.html`.
Open it in a modern browser (Chrome, Edge, or Opera) on your computer.
Select a ticket in Centrum zgłoszeń, then use the chat, diagnostics, actions, or remote simulation.
Complete all required steps, add a service note (at least 25 characters), and close the ticket to earn XP.
Open Kalendarz and select Rozpocznij następny dzień to add new tickets.
In Dane i ustawienia, periodically export a JSON backup.
No installation, server, account, internet connection, virtual machine, or paid API is needed.
Learning model
Component	How it works
Virtual days	The user manually advances the calendar; this is not a real-time background scheduler.
Case library	12 authored cases across the first 10 days. After day 10, templates rotate to create additional tickets; they are not all unique cases.
Recurring staff	The same fictional employees return with new or related support requests.
XP	Awarded once per ticket ID after the mandatory checks and a service note; reset cannot be used to farm XP.
Difficulty	P1 and later-day tickets yield more XP; some special tickets require level 2 or 3.
Mistakes	A deliberately unsafe configuration change is logged and reduces the ticket's XP reward.
Remote support	Choice-driven simulation only. No real screen capture, control, or TeamViewer connection.
Ticket scenarios
Incorrect corporate DNS configuration
Locked employee account
Outlook in offline mode
Blocked printer queue
Wrong device selected in Microsoft Teams
APIPA / unavailable DHCP lease
Special: widespread VPN outage
Resource-heavy Windows startup application
Full mailbox
Special: suspicious email attachment / security escalation
Follow-up printer incident
Follow-up Teams device issue
Technology
HTML5, CSS3, vanilla JavaScript (single offline `.html` file).
`localStorage` for progress on the local browser profile.
JSON export/import for backup and transfer.
No external libraries or services.
Data & safety
The application does not run system commands or change real Windows settings.
Remote Assist does not connect to other devices. The session code displayed by the app is fictional.
The environment contains fictional company users and incidents only.
Browser-stored progress can be lost if you clear site data or if the browser treats a moved `file://` document as a different origin. Use the JSON backup tool.
Import overwrites the current simulator progress after confirmation. Only import trusted backup files.
Upgrading from v0.1
On startup v0.2 attempts to import the three original ticket states from the browser's `nova-helpdesk-v01` localStorage key if it is accessible under the same origin. Browsers can isolate storage for individual local files, so automatic migration is not guaranteed. The v0.1 file remains untouched.
Roadmap
[x] First incident queue and guided troubleshooting (v0.1)
[x] Daily calendar, repeat clients, specials, XP and simple Remote Assist (v0.2)
[ ] More varied customer conversations and case branching
[ ] A richer interactive fictional Windows desktop and more persistent fault states
[ ] Ticket search, filters, SLA timing, and individual customer histories
[ ] Scenario editor and difficulty tuning
[ ] Automated regression tests and performance benchmarks in CI
[ ] Optional VM integration as a future, separate feature
Changelog
See `CHANGELOG.md` for released changes, fixes and optimization notes.
Author & project status
Personal learning and portfolio project by Wojciech Żydek. Currently developed privately. No public hosted demo or repository URL is asserted here.
License: Not selected. Do not assume the code is open-source unless a license is added.
