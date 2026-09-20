import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve('dist');
const pages = [
  'index.html', 'learn.html', 'hubs.html', 'fundamentals.html', 'ai-revops.html', 'ai-tools.html', 'tools.html', 'research.html', 'about.html', 'model.html', 'assessment.html', 'readiness.html',
  'articles/what-is-revops.html', 'articles/revops-operating-system.html', 'articles/pipeline-system-problem.html', 'articles/revenue-handoffs.html',
  'articles/crm-adoption-design.html', 'articles/ai-ready-revenue-system.html'
];

function extract(source, expression) {
  return source.match(expression)?.[1]?.trim() || '';
}

for (const language of ['en', 'pt']) {
  for (const relative of pages) {
    const htmlFile = path.join(root, language === 'pt' ? 'pt' : '', relative);
    const html = fs.readFileSync(htmlFile, 'utf8');
    const conversion = spawnSync('pandoc', ['--from=html', '--to=gfm', '--wrap=none', htmlFile], { encoding: 'utf8' });
    if (conversion.status !== 0) throw new Error(conversion.stderr || `Pandoc failed for ${htmlFile}`);
    const title = extract(html, /<title>([^<]+)<\/title>/i);
    const description = extract(html, /<meta name="description" content="([^"]+)"/i);
    const canonical = extract(html, /<link rel="canonical" href="([^"]+)"/i);
    const body = conversion.stdout
      .replace(/<div[^>]*>/g, '')
      .replace(/<\/div>/g, '')
      .replace(/[ \t]+$/gm, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    const frontmatter = `---\ntitle: "${title.replaceAll('"', '\\"')}"\ndescription: "${description.replaceAll('"', '\\"')}"\ncanonical: "${canonical}"\nlanguage: "${language === 'pt' ? 'pt-PT' : 'en'}"\n---\n\n`;
    const markdownRelative = relative.replace(/\.html$/, '.md');
    const output = path.join(root, language === 'pt' ? 'pt/markdown' : 'markdown', markdownRelative);
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, `${frontmatter}${body}\n`);
  }
}

console.log(`Built ${pages.length * 2} Markdown mirrors.`);
