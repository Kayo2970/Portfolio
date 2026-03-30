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
1. **Global Sync:** Executed a batch `git pull` across all git-initialized repositories residing in the parent GitHub workspace directory.
2. **Dynamic Project Launcher:** Created an API route (`app/api/launch/route.ts`) that handles incoming requests, safely runs `npm run dev` in the sibling project directory binding to `0.0.0.0` (for mobile/LAN support), and dynamically redirects the user. This effectively turned the portfolio into a local Ops Hub.
3. **Automated Thumbnails:** Created a Puppeteer script (`scripts/screenshots.js`) that automatically captures real, high-quality screenshots from the running local dev servers and maps them to `projects.json`, avoiding generated placeholders.
4. **Clothing Store Next.js Migration:** Fully implemented the Next.js frontend pages for the `clothing` project repo (`/collections`, `/collections/[slug]`, `/bespoke`, `/lookbook`) following the luxury high-end design specs, and fixed CSP configs for `images.unsplash.com`.

## Next Steps for AI Agent
When the user picks this back up on another device or a new AI session:
- **Environment:** The `Portfolio` is functioning as a live dashboard launcher.
- **Goal:** Wait for the user's specific request. If they want to add new projects to the dashboard, use `scripts/sync.js`, followed by `scripts/screenshots.js` to grab new thumbnails.
- **Guidelines:** Refer to `README.md` for the strict maintenance and operations procedures. Keep code premium, hyper-minimalist, and high-performance.
