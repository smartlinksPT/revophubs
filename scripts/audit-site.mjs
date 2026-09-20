import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const htmlFiles = [];
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory() && !full.includes(`${path.sep}markdown`)) walk(full);
    else if (entry.isFile() && entry.name.endsWith('.html')) htmlFiles.push(full);
  }
}
walk(root);

const errors = [];
const canonicals = new Set();
const required = [/<title>[^<]+<\/title>/i, /<meta name="description" content="[^"]+"/i, /<meta name="robots"/i, /<link rel="canonical" href="https:\/\/revophubs\.com\//i, /hreflang="en"/i, /hreflang="pt-PT"/i, /type="text\/markdown"/i, /type="application\/ld\+json"/i];

for (const file of htmlFiles) {
  const relative = path.relative(root, file);
  const source = fs.readFileSync(file, 'utf8');
  for (const expression of required) if (!expression.test(source)) errors.push(`${relative}: missing ${expression}`);
  const h1Count = (source.match(/<h1[\s>]/gi) || []).length;
  if (h1Count !== 1) errors.push(`${relative}: expected one h1, found ${h1Count}`);
  const canonical = source.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
  if (canonical && canonicals.has(canonical)) errors.push(`${relative}: duplicate canonical ${canonical}`);
  if (canonical) canonicals.add(canonical);
  const markdown = source.match(/<link rel="alternate" type="text\/markdown" href="([^"]+)"/i)?.[1];
  if (markdown && !fs.existsSync(path.join(root, markdown.replace(/^\//, '')))) errors.push(`${relative}: missing Markdown mirror ${markdown}`);
  for (const match of source.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(match[1]); } catch (error) { errors.push(`${relative}: invalid JSON-LD (${error.message})`); }
  }
  for (const match of source.matchAll(/href="(\/[^"]*)"/g)) {
    const href = match[1].split('#')[0].split('?')[0];
    if (!href || href === '/') continue;
    const local = path.join(root, href.replace(/^\//, '').replace(/\/$/, '/index.html'));
    if (!fs.existsSync(local)) errors.push(`${relative}: broken internal link ${href}`);
  }
}

const allText = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const sitemapCount = (allText.match(/<url>/g) || []).length;
if (sitemapCount !== htmlFiles.length) errors.push(`sitemap.xml: expected ${htmlFiles.length} URLs, found ${sitemapCount}`);
for (const requiredFile of ['robots.txt', 'sitemap.xml', 'llms.txt', 'llms-full.txt', 'feed.xml', '_headers', 'pt/llms.txt', 'pt/llms-full.txt', 'pt/feed.xml']) {
  if (!fs.existsSync(path.join(root, requiredFile))) errors.push(`missing ${requiredFile}`);
}

const typoFiles = [];
function searchTypo(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) searchTypo(full);
    else if (fs.readFileSync(full, 'utf8').includes('revopshubs.com')) typoFiles.push(path.relative(root, full));
  }
}
searchTypo(root);
if (typoFiles.length) errors.push(`old domain remains in: ${typoFiles.join(', ')}`);

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Audit passed: ${htmlFiles.length} HTML pages, ${canonicals.size} unique canonicals, ${sitemapCount} sitemap URLs.`);
