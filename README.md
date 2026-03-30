# Kayo Portal

Kayo Portal is a private, single-page application (SPA) acting as a personal project launchpad and dashboard for Kayomarz M Pavri. It is not an outward-facing portfolio—it is an operations hub designed to provide immediate, frictionless access to live projects, servers, and digital infrastructure.

## 🚀 The Core Concept
The portal exists to solve one problem: finding any active project in under 5 seconds. It hosts a responsive **Bento Grid** of interconnected project cards. Each card represents a live service (like self-hosted applications on TrueNAS, Next.js websites, or event microsites) and links directly to the target environment.

## 🛠️ Tech Stack & Architecture
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS (v4)
- **Language:** TypeScript
- **Animations:** Framer Motion (micro-interactions) & pure CSS 
- **Icons:** Lucide React
- **Authentication:** External — Handled entirely by Cloudflare Access before the traffic reaches the portal.

## 🎨 Design System (Obsidian Minimalist)
The layout is governed by five strict principles:
1. **Speed is the feature**: No decorative fluff.
2. **Cards are the interface**: No search bars or sidebars. The Grid is everything.
3. **Hover reveals**: The cards show full descriptions and launch arrows on hover using smooth glassmorphic transformations.
4. **Dark means dark**: A true black background (`#000000`). No toggle, no light mode.
5. **Frictionless edits**: Everything is powered by a central config file.

## ⚙️ Adding a New Project
Adding a project to the dashboard requires exactly zero design changes:

1. Drop a wide-aspect screenshot thumbnail of your project into the `public/projects/` folder.
2. Edit `config/projects.ts` and add a new object to the array:
```typescript
{
  id: "my-new-project",
  name: "My Next Big Thing",
  description: "A one sentence description of what this does.",
  url: "https://my-project-url.com",
  image: "/projects/my-screenshot.png",
  status: "live", // 'live' | 'building' | 'offline'
  featured: false // set to true to make the card double-size
}
```
3. Commit and push.

## 💻 Local Development
First, clone the repository:

```bash
git clone https://github.com/Kayo2970/Portfolio.git
cd Portfolio
```

Install the dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
