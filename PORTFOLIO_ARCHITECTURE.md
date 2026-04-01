# 🏗️ Combined Portfolio Architecture

The **Kayo Portal** is more than a simple website—it is a centralized "Unified Command Center" and project launchpad. This document explains the specialized procedures used to integrate disparate project repositories (like `economics-concepts`, `clothing`, `leads-website`) into a single, high-performance dashboard.

## 🧠 The Centralized Hub Concept
The Portfolio acts as a bridge between your local development environment and your hosted instances. It provides:
- **Immediate Access:** Launch local dev servers or view live deployments with one click.
- **Visual Clarity:** A high-end Bento Grid showing the current status (`live`, `building`, `offline`) of every repository in the `~/Github` workspace.
- **Infrastructure Harmony:** Consolidated documentation and asset management for 10+ independent projects.

---

## 🛠️ Integration Procedures
When a new project is created in the `~/Github` workspace, follow these steps to integrate it into the Portfolio:

### 1. Repository Symlinking
The Portfolio does not "contain" the other projects; it "points" to them. To create a local link:
```bash
cd Portfolio/projects/
ln -s ../../new-project-name new-project-name
```
This allows the Portfolio to access the underlying code for scripts (like screenshot generation) without duplicating data.

### 2. The Data Tile (`config/projects.json`)
The front-end is entirely data-driven. To add a new tile, append an object to the `projects.json` array:
- **`id`:** Must match the repository folder name.
- **`name`:** Display name on the card.
- **`description`:** High-level summary (Economics, E-commerce, etc.).
- **`image`:** Path to the thumbnail in `public/projects/`.
- **`status`:** Current phase of the project.

### 3. Visual Assets (Thumbnails)
Each project MUST have a high-quality, wide-aspect thumbnail in `Portfolio/public/projects/`.
- **Generated:** Use AI (DALL-E/Imagen) for a conceptual "premium" look.
- **Real:** Use `scripts/screenshots.js` to capture actual renders of the running local server.

---

## 🔄 Automated Synchronization
The Portfolio uses the `npm run sync` command to:
1.  **Scan:** Check the `~/Github` directory for new git repositories.
2.  **Pull:** Fetch the latest changes from origin to keep all sibling projects up to date.
3.  **Map:** Automatically inject missing repositories into `projects.json` with a default `building` status if they don't exist yet.

By following these procedures, every project in the Kayo ecosystem becomes part of a cohesive, professional narrative that is always ready for demonstration or deployment.
