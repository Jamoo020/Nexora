const fs = require('fs');
const path = require('path');
const root = process.cwd();
const exts = new Set(['.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.txt', '.html', '.css', '.csv', '.xml']);
const replacements = [
  ['Brentiq', 'Brentiq'],
  ['BRENTIQ', 'BRENTIQ'],
  ['brentiq', 'brentiq'],
];
let filesUpdated = 0;
let hits = 0;
function walk(dir) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, name.name);
    if (name.isDirectory()) {
      if (['.next', 'node_modules', '.git'].includes(name.name)) continue;
      walk(full);
    } else {
      if (!exts.has(path.extname(name.name).toLowerCase())) continue;
      let text;
      try {
        text = fs.readFileSync(full, 'utf8');
      } catch {
        continue;
      }
      const original = text;
      let updated = text;
      for (const [oldv, newv] of replacements) {
        updated = updated.split(oldv).join(newv);
      }
      if (updated !== original) {
        fs.writeFileSync(full, updated, 'utf8');
        filesUpdated += 1;
      }
      const lines = original.split(/\r?\n/);
      lines.forEach((line, index) => {
        if (line.includes('Brentiq') || line.includes('brentiq') || line.includes('BRENTIQ')) {
          console.log(`${full}:${index + 1}:${line}`);
          hits += 1;
        }
      });
    }
  }
}
walk(root);
console.log(`filesUpdated=${filesUpdated} hits=${hits}`);
