# AI Session History & Handoff Context

## Current Project Context: Kayo Portal
The user is currently working on the **Portfolio** (Kayo Portal) project (located in the repository root directory).

### Architecture Overview
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS v4 ("Obsidian Minimalist" design system relying on native CSS variables)
- **Animations:** Framer Motion + Pure CSS
- **Data Source:** The entire dashboard UI is data-driven, reading from `config/projects.json` rather than hardcoded cards.
- **Sync System:** Uses a custom Node.js script (`scripts/sync.js`) that queries the GitHub API to automate adding new repos into the portal.

3. **Architecture Evolution:** Redefined the Portfolio as a **Unified Command Center** for the entire `~/Github` workspace. Created [PORTFOLIO_ARCHITECTURE.md](./PORTFOLIO_ARCHITECTURE.md) to explain the hub-and-spoke integration strategy.
4. **Economics Explorer Integration:**
    - Fully implemented the 8-module suite in the `economics-concepts` repo.
    - Generated a premium AI mockup for the launch tile.
    - Integrated the project as a featured "live" project in `config/projects.json`.
    - Created symlink and performed global Git sync to finalize the portal update.

## Next Steps for AI Agent
When the user picks this back up on another device or a new AI session:
- **Environment:** The `Portfolio` is functioning as a live dashboard launcher.
- **Goal:** Wait for the user's specific request. If they want to add new projects to the dashboard, use `scripts/sync.js`, followed by `scripts/screenshots.js` to grab new thumbnails.
- **Guidelines:** Refer to `README.md` for the strict maintenance and operations procedures. Keep code premium, hyper-minimalist, and high-performance.
