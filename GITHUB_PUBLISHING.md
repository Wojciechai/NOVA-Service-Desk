# Publishing NOVA Service Desk to GitHub — in the right order

The download already contains a **local Git repository** with versioned history. You do **not** have to write or copy code to create the first releases.

## Recommended: GitHub Desktop (no command line)

1. **Extract the ZIP** into a permanent folder, for example `D:\Projects\NOVA-Service-Desk`. Do not open the ZIP as a temporary archive. The hidden `.git` directory inside the extracted project is essential for preserving its commit history.
2. Install **GitHub Desktop** from <https://desktop.github.com/> and sign in to your GitHub account.
3. In GitHub Desktop choose **File → Add local repository… → Choose…** and select the extracted project folder. It should be recognized as an existing Git repository.
4. In the **History** view, verify these five chronological commits (oldest first):
   - `chore: import v0.2.0 training baseline`
   - `feat(remote): release interactive desktop v0.3.0`
   - `feat(workday): release timed shifts v0.4.0`
   - `feat(progress): release skill tracking v0.5.0`
   - `fix: release verified v0.5.1 hotfixes`
5. Click **Publish repository**. Suggested repository name: `NOVA-Service-Desk`. **Keep this repository private** at first; make it public only when you are happy with the project and documentation. GitHub Desktop may ask you to confirm organization/account and visibility.
6. On GitHub, inspect the repository's README, application file, changelog, tests and commit history. The published main branch should show **v0.5.1**.
7. Optional: create GitHub **Releases** for v0.3.0, v0.4.0, v0.5.0 and v0.5.1 from the prepared tags. The `v0.2.0` tag is a baseline. A version tag is not the same as a published Release page; GitHub Desktop's Publish operation may not publish tags automatically. See the note below.

### If tags are not visible on GitHub

GitHub Desktop may push the branch without annotated tags. You can add the version names through GitHub's Releases interface by creating a release and selecting/creating the corresponding tag, but take care to target the correct commit. The tags exist **locally**. For exact tag-history preservation through Git, the optional command is:

```bash
git push origin --tags
```

Run it only inside this repository after GitHub Desktop has published it. If you do not want to use a terminal, leave releases/tags for later; your history of five real commits is still preserved.

## What to upload first?

**You do not need to manually upload each HTML version.** The repository history already contains the version-specific code in the correct order. The initial commit contains the original v0.2 baseline; later commits contain the corresponding feature additions and final patch. Just publish the extracted local repository. Never upload the five separate versions to the root simultaneously.

## Suggested GitHub description

> Offline IT Helpdesk L1 training simulator with incident tickets, a fictional remote-support desktop, 24-minute shifts, automatic ticket carry-over and XP progression.

Suggested topics: `helpdesk`, `it-support`, `service-desk`, `troubleshooting`, `training-simulator`, `javascript`, `offline-first`.

## Suggested text for the first public-facing release (v0.5.1)

> NOVA Service Desk v0.5.1 combines a simulated client desktop, remote-support consent flow, timed workdays, carried-over tickets, recurring customers and an XP/skills dashboard. This patch also fixes verified issues with incident progression, emergency save consistency, clock accounting and remote layout. All modules are offline simulations, not real Windows administration. Verification so far covers JS syntax and state-machine tests, not a full Windows browser QA run.

## Attribution and review

The local commits are attributed to `NOVA Project Draft <nova@localhost>` because no verified GitHub email was supplied; this is a technical drafting identity, **not** an impersonation of the project's owner. You can keep the portfolio author named in the README, and use your own GitHub account for all future commits. If you want historical commits to be associated with your GitHub identity, you would have to deliberately rewrite their author metadata before publishing; do not claim that has already happened.

## Backup before changing versions

The app uses browser localStorage. File paths can affect storage access. Open the older version, choose **Dane i ustawienia → Eksportuj postępy**, then open the newer version and import the backup. Keep an extra copy until you have verified the result.