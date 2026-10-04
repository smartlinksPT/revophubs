import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const stylesheet = '<link rel="stylesheet" href="/link-colors.css">';

function walk(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

let changed = 0;
for (const file of walk(root)) {
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('/link-colors.css')) continue;
  if (!html.includes('</head>')) continue;
  html = html.replace('</head>', `${stylesheet}</head>`);
  fs.writeFileSync(file, html);
  changed += 1;
}

console.log(`Applied editorial link-color stylesheet to ${changed} HTML pages.`);
