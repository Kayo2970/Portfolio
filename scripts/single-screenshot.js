const puppeteer = require('puppeteer-core');
const fs = require('fs');

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

  console.log("Launching browser to update clothing.png...");
  const browser = await puppeteer.launch({ executablePath, headless: "new" });
  
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    
    // Clothing is running on 3001
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 4000)); // wait for images to load
    
    await page.screenshot({ path: `public/projects/clothing.png` });
    console.log(`Saved updated public/projects/clothing.png`);
  } catch (e) {
    console.error(`Failed: ${e.message}`);
  } finally {
    await browser.close();
  }
})();
