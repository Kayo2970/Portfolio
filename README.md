# Kayo Portal (Combined Projects Hub)

Kayo Portal is a private, single-page application (SPA) acting as a **centralized project launchpad** and master dashboard for all projects in the `~/Github` workspace (e.g., Economics Explorer, Clothing Hub, TV Tech). It is an operations hub designed to provide immediate, frictionless access to live projects, servers, and digital infrastructure.

## 🏗️ System Architecture

The architecture is a **Unified Command Center** designed for maximum performance, minimal maintenance, and completely automated synchronization. For a deep-dive into the integration logic, see the [Portfolio Architecture Guide](./PORTFOLIO_ARCHITECTURE.md).

### 1. Key Components
- **Framework:** Next.js 14 (App Router) executing as a statically optimized application.
- **Styling Pipeline:** Tailwind CSS v4 driven entirely by native CSS variables (the "Obsidian Minimalist" design system).
- **Animations:** Framer Motion powers the entrance staggers and spring animations, while pure CSS handles the high-performance glassmorphic hover reveals.
- **Security & Auth:** The application itself has no login screen. It relies completely on Cloudflare Access to block unauthorized traffic at the DNS level before it even reaches the Next.js server.

### 2. The Configuration Engine (`config/projects.json`)
The entire user interface is strictly data-driven. The Next.js application does not hardcode any project cards. Instead, it reads from a central `config/projects.json` file. When you add an entry to this JSON array, the `BentoGrid` component loops over the data and generates a `ProjectCard` with the correct status badges, icons, and links automatically.

### 3. The Automated Sync System (`npm run sync`)
To eliminate the need for manual data entry, the portal features a bespoke Node.js synchronization engine (`scripts/sync.js`). When triggered via the `Sync GitHub` button or by running `npm run sync` in the terminal:
1. It queries the GitHub API via the `gh` CLI for all repositories under `Kayo2970`.
2. It clones missing repositories locally to `/Users/kayo/Github/`.
3. It creates local symlinks for those repos into `Portfolio/projects/`.
4. It parses `config/projects.json` and automatically injects any missing repositories as new cards on the dashboard, using Fallback placeholders and a `"building"` status.

---

## 🛠️ Maintenance & Operations Manual

This section contains the official post-launch procedures to keep the Kayo Portal running flawlessly.

### 1. Daily Operations: Adding or Updating Cards

**Automated Method:**
1. Click the "Sync GitHub" button on the portal or run `npm run sync` in the terminal.
2. The script will pull down your newly created repo and inject it into the dashboard.
3. Commit and push the changes to GitHub.

**Manual Method (For non-GitHub links):**
1. Drop a wide-aspect screenshot thumbnail into `public/projects/`.
2. Edit `config/projects.json` and add/modify an object:
```json
{
  "id": "my-new-project",
  "name": "My New Project",
  "description": "One sentence — what it does. Max 80 characters.",
  "url": "https://myproject.pavris.in",
  "image": "/projects/my-screenshot.png",
  "status": "live", 
  "featured": false 
}
```
*Note: Status options are `"live"`, `"building"`, or `"offline"`.*

### 2. Emergency Troubleshooting (If the Portal Goes Down)

1. **Do not touch the code yet.**
2. Check [Vercel Status](https://www.vercelstatus.com/) for platform outages.
3. Check [Cloudflare Status](https://www.cloudflarestatus.com/) for DNS/Access outages.
4. Log into your Vercel Dashboard and check the **Deployments** tab. If the latest deployment threw an error, click **"Rollback to previous deployment"**.
5. **AI Diagnostic Prompt:** If the issue persists, paste the Vercel error log into Claude/ChatGPT along with: *"My Next.js site is deployed on Vercel but the site at my domain is not loading. The domain uses Cloudflare Access. Here is the log: [paste log]. Help me diagnose what is wrong."*

### 3. Fixing Broken Project Links (Cloudflare Tunnels)
If a card's link fails to load the target project:
1. Verify if the target Cloudflare Tunnel is still active.
2. Log into TrueNAS SCALE → Apps → Check if the project container is running.
3. If the tunnel is disconnected, restart the `cloudflared` service on TrueNAS.
4. If the URL has permanently changed, update the `url` string in `config/projects.json` and push to main.

### 4. Periodic Health Checks

**Monthly (5 Minutes):**
- Click every card on the portal to ensure there are no dead links.
- Check Vercel Web Vitals (LCP < 2.5s, CLS < 0.1).
- Check Cloudflare Access logs for any unexpected blocked traffic.

**Quarterly (15 Minutes):**
- Run a Chrome Lighthouse audit in an incognito window (Target: 90+ Mobile Score).
- Run `npm update` to bump minor dependencies.
- Verify that your domain (`pavris.in`) is set to auto-renew in your registrar.

### 5. When to Plan a Rebuild
The Kayo Portal is engineered to run untouched for years. You should only consider a rebuild or v2 if:
- The project card count exceeds 20 and the Bento Grid becomes unnavigable (requiring the addition of a search bar or category filters).
- You require Next.js architecture features not supported by simple static output (e.g., live server-side data fetching for ping status). 
- To initiate a v2, provide an AI assistant with this `README.md`, your `config/projects.json`, and `page.tsx` to draft an upgrade path.

### 6. AI Agent Handoff
For seamless continuation of work across different devices or AI sessions, refer to the [ai_history.md](./ai_history.md) guide.
