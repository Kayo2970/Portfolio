# AI Session History & Handoff Context

## Current Project Context: Kayo Portal
The user is currently working on the **Portfolio** (Kayo Portal) project (located in the repository root directory).

### Architecture Overview
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS v4 ("Obsidian Minimalist" design system relying on native CSS variables)
- **Animations:** Framer Motion + Pure CSS
- **Data Source:** The entire dashboard UI is data-driven, reading from `config/projects.json` rather than hardcoded cards.
- **Sync System:** Uses a custom Node.js script (`scripts/sync.js`) that queries the GitHub API to automate adding new repos into the portal.

### Recent Actions (March 30/31, 2026)
1. **Global Sync:** The user had worked on several repositories on another device and pushed them to GitHub. We executed a batch `git pull` across all git-initialized repositories residing in the parent GitHub workspace directory.
2. **Current Goal:** The user explicitly changed focus to jump back into the **Portfolio** project to continue development.

## Next Steps for AI Agent
When the user picks this back up on another device or a new AI session:
- **Environment:** Be aware that the local clones of all repos are synced and up-to-date.
- **Goal:** Wait for the user's specific request inside the Portfolio (whether it's running `npm run dev`, modifying `config/projects.json`, styling a component in the `app` or `components` directory, or running `npm run sync`).
- **Guidelines:** Refer to `README.md` for the strict maintenance and operations procedures (e.g., adding/updating cards) before modifying arbitrary code.
