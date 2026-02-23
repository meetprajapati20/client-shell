// client-shell/setup-dev.js
const fs = require('fs');
const path = require('path');

console.log("🛠️ Ensuring Webpack doesn't crash from missing modules...");

// Define all the modules your system has
const allModules = ['module1', 'module2', 'module3'];

// Ensure the src/modules directory exists
const modulesDir = path.join(__dirname, 'src', 'modules');
if (!fs.existsSync(modulesDir)) {
  fs.mkdirSync(modulesDir, { recursive: true });
}

// Loop through and create dummy files for any missing modules
allModules.forEach(mod => {
  const modPath = path.join(modulesDir, `client-${mod}`, 'src');
  const indexPath = path.join(modPath, 'index.js');

  // If the folder doesn't exist, create it and add the dummy file
  if (!fs.existsSync(modPath)) {
    console.log(`   -> Creating dummy fallback for ${mod}...`);
    fs.mkdirSync(modPath, { recursive: true });
    
    const dummyCode = 'export default function Dummy() { throw new Error("Module not available locally"); }\n';
    fs.writeFileSync(indexPath, dummyCode);
  }
});

console.log("✅ Module check complete.");