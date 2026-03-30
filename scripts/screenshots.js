const puppeteer = require('puppeteer-core');
const fs = require('fs');

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

(async () => {
  if (!executablePath) {
    console.error("Microsoft Edge not found.");
    process.exit(1);
  }

  const browser = await puppeteer.launch({ executablePath, headless: "new" });
  for (const [name, url] of Object.entries(urls)) {
    try {
      console.log(`Taking screenshot of ${name} at ${url}...`);
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      
      // Wait for a few seconds to let any animations finish
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
      await new Promise(r => setTimeout(r, 2000));
      
      await page.screenshot({ path: `public/projects/${name}.png` });
      console.log(`Saved public/projects/${name}.png`);
      await page.close();
    } catch (e) {
      console.error(`Failed ${name}: ${e.message}`);
    }
  }
  await browser.close();
})();
