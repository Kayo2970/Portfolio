const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const urls = {
  'portfolio': 'http://localhost:3000',
  'clothing': 'http://localhost:3001',
  'leads-website': 'http://localhost:3002',
  'tv-tech': 'http://localhost:5174',
  'bls': 'http://localhost:4000',
  'bls-2.0': 'http://localhost:4001',
  'indibioteck': 'http://localhost:4002',
  'iphone-timeline': 'http://localhost:4003',
  'anti-test': 'http://localhost:4004',
  'vapewebsite': 'http://localhost:4005',
  'the-apple-project': 'http://localhost:4006'
};

const edgePaths = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
];

let executablePath = edgePaths.find(p => fs.existsSync(p));
const CONFIG_FILE = path.resolve(__dirname, '../config/projects.json');

(async () => {
  if (!executablePath) {
    console.error("Microsoft Edge not found.");
    process.exit(1);
  }

  // Load the Dashboard Data
  let siteProjects = [];
  if (fs.existsSync(CONFIG_FILE)) {
    siteProjects = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
  }
  let projectsUpdated = false;

  const browser = await puppeteer.launch({ executablePath, headless: "new" });
  for (const [name, url] of Object.entries(urls)) {
    try {
      console.log(`Taking screenshot of ${name} at ${url}...`);
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      
      const response = await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
      
      // Safety Mechanism 1: Reject standard HTTP Error Pages (404, 500)
      if (response && response.status() >= 400) {
        throw new Error(`HTTP Error ${response.status()}`);
      }

      await new Promise(r => setTimeout(r, 2000));
      
      // Safety Mechanism 2: Reject Next.js/Vite Runtime Overlay Errors inside the rendered DOM
      const hasErrorOverlay = await page.evaluate(() => {
        const text = document.body.innerText;
        return !!document.querySelector('nextjs-portal') || text.includes('Unhandled Runtime Error') || text.includes('Application error');
      });

      if (hasErrorOverlay) {
        throw new Error('Detected a framework runtime error/overlay on the page. Skipping thumbnail capture.');
      }
      
      // Capture the verified image
      await page.screenshot({ path: `public/projects/${name}.png` });
      console.log(`✅ Saved public/projects/${name}.png`);
      
      // Update the Dashboard configuration
      const projectIndex = siteProjects.findIndex(p => p.id === name);
      if (projectIndex !== -1 && siteProjects[projectIndex].image !== `/projects/${name}.png`) {
        siteProjects[projectIndex].image = `/projects/${name}.png`;
        projectsUpdated = true;
        console.log(`🔗 Mapped thumbnail for ${name} to the Home Page config.`);
      }

      await page.close();
    } catch (e) {
      console.error(`❌ Skipped ${name}: ${e.message}`);
    }
  }
  
  // Persist the changes to the dashboard
  if (projectsUpdated) {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(siteProjects, null, 2), 'utf-8');
    console.log(`\n💾 Successfully updated the main home page (projects.json) with new thumbnails.`);
  }

  await browser.close();
})();
