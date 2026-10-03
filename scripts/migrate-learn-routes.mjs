import fs from 'node:fs';
import path from 'node:path';
import { site, legacyArticleRoutes } from './content-routes.mjs';

const root = path.resolve('dist');

function ensureParent(file) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
}

function readIfExists(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
}

function routeReplacements(text) {
  let out = text;
  for (const route of legacyArticleRoutes) {
    const pairs = [
      [route.legacyEnPath, route.enPath],
      [route.legacyPtPath, route.ptPath],
      [route.legacyEnMarkdown, route.enMarkdown],
      [route.legacyPtMarkdown, route.ptMarkdown],
      [`${site}${route.legacyEnPath}`, `${site}${route.enPath}`],
      [`${site}${route.legacyPtPath}`, `${site}${route.ptPath}`]
    ];
    for (const [from, to] of pairs) out = out.replaceAll(from, to);
  }
  return out;
}

function moveTextFile(sourceRelative, destinationRelative, transform = value => value) {
  const source = path.join(root, sourceRelative);
  const destination = path.join(root, destinationRelative);
  const sourceText = readIfExists(source);
  if (sourceText === null) return;
  ensureParent(destination);
  fs.writeFileSync(destination, transform(sourceText));
  fs.unlinkSync(source);
}

for (const route of legacyArticleRoutes) {
  moveTextFile(route.legacyEnFile, route.enFile, routeReplacements);
  moveTextFile(route.legacyPtFile, route.ptFile, routeReplacements);

  const legacyMdName = route.legacyFile.replace(/\.html$/, '.md');
  const enMarkdownFile = route.enMarkdown.replace(/^\//, '');
  const ptMarkdownFile = route.ptMarkdown.replace(/^\//, '');
  moveTextFile(`markdown/articles/${legacyMdName}`, enMarkdownFile, routeReplacements);
  moveTextFile(`pt/markdown/articles/${legacyMdName}`, ptMarkdownFile, routeReplacements);
}

function walk(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.isFile()) files.push(full);
  }
  return files;
}

for (const file of walk(root)) {
  if (!/\.(?:html|md|txt|xml)$/i.test(file)) continue;
  const source = fs.readFileSync(file, 'utf8');
  const updated = routeReplacements(source);
  if (updated !== source) fs.writeFileSync(file, updated);
}

const redirects = ['# Legacy article URLs → Learn routes'];
for (const route of legacyArticleRoutes) {
  for (const [oldPath, newPath] of [[route.legacyEnPath, route.enPath],[route.legacyPtPath, route.ptPath]]) {
    const withoutHtml = oldPath.replace(/\.html$/, '');
    redirects.push(`${oldPath} ${newPath} 301`);
    redirects.push(`${withoutHtml} ${newPath} 301`);
    redirects.push(`${withoutHtml}/ ${newPath} 301`);
  }
}
fs.writeFileSync(path.join(root, '_redirects'), `${redirects.join('\n')}\n`);

console.log(`Migrated ${legacyArticleRoutes.length * 2} localized article routes into /learn/.`);
