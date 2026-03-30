const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const GITHUB_USER = 'Kayo2970';
const WORKSPACE_DIR = path.resolve(__dirname, '../../');
const PORTFOLIO_DIR = path.resolve(__dirname, '../');
const PROJECTS_LINK_DIR = path.join(PORTFOLIO_DIR, 'projects');
const CONFIG_FILE = path.join(PORTFOLIO_DIR, 'config', 'projects.json');

(async () => {
  console.log('🔄 Fetching repository list from GitHub API...');
  let repos = [];
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`);
    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }
    const data = await response.json();
    repos = data.map(r => ({ name: r.name, url: r.html_url, description: r.description }));
  } catch (error) {
    console.error('❌ Failed to fetch repositories from GitHub REST API.', error.message);
    process.exit(1);
  }

  // Ensure the local projects symlink directory exists
  if (!fs.existsSync(PROJECTS_LINK_DIR)) {
    fs.mkdirSync(PROJECTS_LINK_DIR, { recursive: true });
  }

  // Parse existing config
  let siteProjects = [];
  try {
    const configContent = fs.readFileSync(CONFIG_FILE, 'utf-8');
    siteProjects = JSON.parse(configContent);
  } catch (error) {
    console.error('❌ Failed to read or parse config/projects.json.');
    process.exit(1);
  }

  // Create a Set of existing project IDs for quick lookup
  const existingProjectIds = new Set(siteProjects.map(p => p.id));

  let newProjectsAdded = 0;

  console.log(`\nFound ${repos.length} repositories on GitHub.\n`);

  repos.forEach(repo => {
    const repoName = repo.name;
    const repoPath = path.join(WORKSPACE_DIR, repoName);
    const symlinkPath = path.join(PROJECTS_LINK_DIR, repoName);

    // 1. CLONE
    if (!fs.existsSync(repoPath)) {
      console.log(`📥 Cloning missing repository: ${repoName}...`);
      try {
        execSync(`git clone https://github.com/${GITHUB_USER}/${repoName}.git`, { stdio: 'inherit', cwd: WORKSPACE_DIR });
      } catch (e) {
        console.error(`⚠️ Failed to clone ${repoName}`);
        return;
      }
    } else {
      console.log(`✅ Repo exists locally: ${repoName}`);
    }

    // 2. SYMLINK
    if (!fs.existsSync(symlinkPath)) {
      console.log(`🔗 Creating symlink for ${repoName} in Portfolio/projects/...`);
      try {
        // Relative path from symlink location to the actual repo
        fs.symlinkSync(path.join('../../', repoName), symlinkPath, 'dir');
      } catch (e) {
        console.error(`⚠️ Failed to create symlink for ${repoName}:`, e.message);
      }
    }

    // 3. CONFIGURATION (Exclude the Portfolio repo itself if you want)
    if (repoName.toLowerCase() !== 'portfolio') {
      const safeId = repoName.toLowerCase().replace(/[^a-z0-9-]/g, '-');
      
      // Check if the project is already in our Next.js dashboard config
      if (!existingProjectIds.has(safeId)) {
        console.log(`✨ Adding new project card to Dashboard: ${repoName}`);
        
        siteProjects.push({
          id: safeId,
          name: repoName,
          description: repo.description || `The ${repoName} project repository.`,
          url: repo.url,
          image: `https://placehold.co/800x600/111111/FFFFFF/png?text=${encodeURIComponent(repoName)}`,
          status: "offline", // default status
          featured: false
        });
        
        existingProjectIds.add(safeId);
        newProjectsAdded++;
      }
    }
  });

  if (newProjectsAdded > 0) {
    // Write the updated Configuration back to disk
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(siteProjects, null, 2), 'utf-8');
    console.log(`\n🎉 Sync complete! Added ${newProjectsAdded} new project(s) to config/projects.json.`);
  } else {
    console.log(`\n👍 Sync complete. Dashboard config is already up to date.`);
  }
})();
