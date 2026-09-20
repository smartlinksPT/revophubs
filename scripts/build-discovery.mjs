import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const site = 'https://revophubs.com';
const lastmod = '2026-09-20';
const pages = ['index.html', 'learn.html', 'hubs.html', 'fundamentals.html', 'ai-revops.html', 'ai-tools.html', 'tools.html', 'research.html', 'about.html', 'model.html', 'assessment.html', 'readiness.html', 'articles/what-is-revops.html', 'articles/revops-operating-system.html', 'articles/pipeline-system-problem.html', 'articles/revenue-handoffs.html', 'articles/crm-adoption-design.html', 'articles/ai-ready-revenue-system.html'];
const articles = pages.filter((page) => page.startsWith('articles/'));

function pathFor(relative, language) {
  const pagePath = relative === 'index.html' ? '/' : `/${relative}`;
  return language === 'pt' ? `/pt${pagePath}` : pagePath;
}

function metadata(relative, language) {
  const file = path.join(root, language === 'pt' ? 'pt' : '', relative);
  const source = fs.readFileSync(file, 'utf8');
  return {
    title: source.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim() || 'RevOpHubs',
    description: source.match(/<meta name="description" content="([^"]+)"/i)?.[1]?.trim() || ''
  };
}

const sitemapRows = [];
for (const relative of pages) {
  for (const language of ['en', 'pt']) {
    const url = `${site}${pathFor(relative, language)}`;
    const en = `${site}${pathFor(relative, 'en')}`;
    const pt = `${site}${pathFor(relative, 'pt')}`;
    sitemapRows.push(`  <url><loc>${url}</loc><lastmod>${lastmod}</lastmod><xhtml:link rel="alternate" hreflang="en" href="${en}"/><xhtml:link rel="alternate" hreflang="pt-PT" href="${pt}"/><xhtml:link rel="alternate" hreflang="x-default" href="${en}"/></url>`);
  }
}
fs.writeFileSync(path.join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sitemapRows.join('\n')}\n</urlset>\n`);

fs.writeFileSync(path.join(root, 'robots.txt'), `# RevOpHubs welcomes search crawlers and user-directed AI agents.\n# The Content-Signal preference permits search and real-time AI input, but not model training.\nUser-agent: *\nAllow: /\nContent-Signal: search=yes, ai-input=yes, ai-train=no\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: ChatGPT-User\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /\n\nUser-agent: Claude-SearchBot\nAllow: /\n\nUser-agent: Claude-User\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /\n\nSitemap: ${site}/sitemap.xml\nHost: revophubs.com\n`);

fs.writeFileSync(path.join(root, '_headers'), `/*\n  Content-Signal: search=yes, ai-input=yes, ai-train=no\n  Link: </sitemap.xml>; rel="sitemap"; type="application/xml", </llms.txt>; rel="alternate"; type="text/plain"\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n\n/markdown/*\n  Content-Type: text/markdown; charset=utf-8\n\n/pt/markdown/*\n  Content-Type: text/markdown; charset=utf-8\n`);

for (const language of ['en', 'pt']) {
  const isPt = language === 'pt';
  const lines = [
    '# RevOpHubs',
    '',
    isPt ? '> Uma iniciativa SmartLinks com conhecimento, investigação e ferramentas práticas para construir sistemas de receita conectados.' : '> A SmartLinks initiative with practical knowledge, research and tools for building connected revenue systems.',
    '',
    isPt ? 'A versão canónica para humanos está em https://revophubs.com/pt/. Cada link abaixo aponta para uma versão Markdown equivalente.' : 'The canonical human-readable site is at https://revophubs.com/. Each link below points to an equivalent Markdown version.',
    '',
    isPt ? '## Páginas principais' : '## Core pages'
  ];
  for (const relative of pages.filter((page) => !page.startsWith('articles/'))) {
    const { title, description } = metadata(relative, language);
    const markdownPath = pathFor(relative.replace(/\.html$/, '.md').replace(/^/, 'markdown/'), language);
    lines.push(`- [${title}](${site}${markdownPath}): ${description}`);
  }
  lines.push('', isPt ? '## Artigos' : '## Articles');
  for (const relative of articles) {
    const { title, description } = metadata(relative, language);
    const markdownPath = pathFor(relative.replace(/^articles\//, 'markdown/articles/').replace(/\.html$/, '.md'), language);
    lines.push(`- [${title}](${site}${markdownPath}): ${description}`);
  }
  lines.push('', isPt ? '## Descoberta e políticas' : '## Discovery and policies', `- [Sitemap](${site}/sitemap.xml)`, `- [Robots and content signals](${site}/robots.txt)`, `- [${isPt ? 'Índice inglês' : 'Portuguese index'}](${site}${isPt ? '/llms.txt' : '/pt/llms.txt'})`, '');
  const llmsPath = path.join(root, isPt ? 'pt/llms.txt' : 'llms.txt');
  fs.writeFileSync(llmsPath, lines.join('\n'));

  const full = pages.map((relative) => fs.readFileSync(path.join(root, isPt ? 'pt/markdown' : 'markdown', relative.replace(/\.html$/, '.md')), 'utf8')).join('\n\n---\n\n');
  fs.writeFileSync(path.join(root, isPt ? 'pt/llms-full.txt' : 'llms-full.txt'), `${lines.join('\n')}\n\n---\n\n${full}`);

  const feedEntries = articles.map((relative) => {
    const { title, description } = metadata(relative, language);
    const url = `${site}${pathFor(relative, language)}`;
    return `  <entry><title>${title.replaceAll('&', '&amp;')}</title><id>${url}</id><link href="${url}"/><updated>${lastmod}T00:00:00Z</updated><summary>${description.replaceAll('&', '&amp;')}</summary></entry>`;
  }).join('\n');
  const home = `${site}${isPt ? '/pt/' : '/'}`;
  const feed = `<?xml version="1.0" encoding="utf-8"?>\n<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="${isPt ? 'pt-PT' : 'en'}"><title>RevOpHubs</title><id>${home}</id><link href="${home}"/><link rel="self" href="${site}${isPt ? '/pt/feed.xml' : '/feed.xml'}"/><updated>${lastmod}T00:00:00Z</updated>\n${feedEntries}\n</feed>\n`;
  fs.writeFileSync(path.join(root, isPt ? 'pt/feed.xml' : 'feed.xml'), feed);
}

console.log('Built sitemap, robots, headers, feeds and LLM indexes.');
