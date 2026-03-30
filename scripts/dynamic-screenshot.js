const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const id = process.argv[2];
const targetUrl = process.argv[3];

if (!id || !targetUrl) {
  console.error("Missing id or URL arguments");
  process.exit(1);
}

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

  // Provide an initial delay to ensure the server application finishes booting up completely
  await new Promise(r => setTimeout(r, 8000));

  let siteProjects = [];
  if (fs.existsSync(CONFIG_FILE)) {
    siteProjects = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
  }

  const browser = await puppeteer.launch({ executablePath, headless: "new" });
  try {
    console.log(`[Auto-Capture] Taking background server-side screenshot of ${id} at ${targetUrl}...`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    
    const response = await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 20000 });
    
    // Safety Mechanism 1
    if (response && response.status() >= 400) {
      throw new Error(`HTTP Error ${response.status()}`);
    }

    await new Promise(r => setTimeout(r, 2000));
    
    // Safety Mechanism 2
    const hasErrorOverlay = await page.evaluate(() => {
      const text = document.body.innerText;
      return !!document.querySelector('nextjs-portal') || text.includes('Unhandled Runtime Error') || text.includes('Application error');
    });

    if (hasErrorOverlay) {
      throw new Error('Detected error overlay. Skipping auto-capture.');
    }
    
    await page.screenshot({ path: `public/projects/${id}.png` });
    console.log(`[Auto-Capture] ✅ Saved public/projects/${id}.png`);
    
    let updated = false;
    const projectIndex = siteProjects.findIndex(p => p.id === id);
    if (projectIndex !== -1 && siteProjects[projectIndex].image !== `/projects/${id}.png`) {
      siteProjects[projectIndex].image = `/projects/${id}.png`;
      updated = true;
    }

    if (updated) {
      fs.writeFileSync(CONFIG_FILE, JSON.stringify(siteProjects, null, 2), 'utf-8');
      console.log(`[Auto-Capture] 💾 Live updated projects.json with newest mapped thumbnail.`);
    }

  } catch (e) {
    console.error(`[Auto-Capture] ❌ Skipped ${id}: ${e.message}`);
  } finally {
    await browser.close();
  }
})();
