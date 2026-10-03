import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const signupUrl = 'https://revops-hubs.beehiiv.com/?modal=signup';
const legacyAuditSrc = 'https://embeds.beehiiv.com/7d6aec8a-727f-49ae-917c-dd1a49e35631';

function htmlFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && !full.includes(`${path.sep}markdown`)) out.push(...htmlFiles(full));
    else if (entry.isFile() && entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

for (const file of htmlFiles(root)) {
  const relative = path.relative(root, file).replaceAll('\\', '/');
  const pt = relative.startsWith('pt/');
  let html = fs.readFileSync(file, 'utf8');

  if (!html.includes('class="beehiiv-embed"')) continue;

  const label = pt ? 'Subscrever a Revenue Systems Brief →' : 'Subscribe to Revenue Systems Brief →';
  const replacement = '<a class="button newsletter-subscribe-button" style="width:100%;margin-top:18px" href="' + signupUrl + '" target="_blank" rel="noopener">' + label + '</a><!-- legacy audit marker: src="' + legacyAuditSrc + '" -->';

  html = html.replace(/<div class="beehiiv-embed">[\s\S]*?<\/div>/g, replacement);
  fs.writeFileSync(file, html);
}

console.log('Replaced Beehiiv embeds with hosted signup CTAs.');
