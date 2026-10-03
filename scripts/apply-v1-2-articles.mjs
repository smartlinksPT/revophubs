import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');

const paths = {
  'what-is-revops.html': ['/articles/revops-operating-system.html', '/model.html', '/assessment.html'],
  'revops-operating-system.html': ['/articles/pipeline-system-problem.html', '/model.html', '/assessment.html'],
  'pipeline-system-problem.html': ['/articles/revenue-handoffs.html', '/model.html#process', '/assessment.html'],
  'revenue-handoffs.html': ['/articles/crm-adoption-design.html', '/model.html#process', '/assessment.html'],
  'crm-adoption-design.html': ['/articles/ai-ready-revenue-system.html', '/model.html#crm', '/readiness.html'],
  'ai-ready-revenue-system.html': ['/ai-revops.html', '/model.html#ai', '/assessment.html']
};

function fileForUrl(url, pt) {
  const clean = url.split('#')[0].split('?')[0];
  const prefixed = pt && !clean.startsWith('/pt/') ? `/pt${clean}` : clean;
  const relative = prefixed.replace(/^\//, '').replace(/\/$/, '/index.html');
  return path.join(root, relative);
}

function h1ForUrl(url, pt) {
  const file = fileForUrl(url, pt);
  if (!fs.existsSync(file)) return pt ? 'Explorar o recurso' : 'Explore the resource';
  const html = fs.readFileSync(file, 'utf8');
  return html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, '').trim() || (pt ? 'Explorar o recurso' : 'Explore the resource');
}

function prefixUrl(url, pt) {
  if (!pt || url.startsWith('/pt/') || /^https?:/.test(url)) return url;
  return `/pt${url}`;
}

function mobileToc(html, pt) {
  const links = [...html.matchAll(/<h2 id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/gi)]
    .map((match) => `<a href="#${match[1]}">${match[2].replace(/<[^>]+>/g, '').trim()}</a>`)
    .join('');
  if (!links) return '';
  return `<details class="article-mobile-toc"><summary>${pt ? 'Neste artigo' : 'In this article'}</summary><nav>${links}</nav></details>`;
}

function keepGoing(slug, pt) {
  const raw = paths[slug] || ['/learn.html', '/model.html', '/assessment.html'];
  const urls = raw.map((url) => prefixUrl(url, pt));
  const labels = pt ? ['A seguir', 'Aprofundar', 'Ferramenta relacionada'] : ['Next', 'Go deeper', 'Related tool'];
  const cards = urls.map((url, index) => {
    const title = h1ForUrl(raw[index], pt);
    return `<a href="${url}"><span class="next-label">${labels[index]}</span><strong>${title}</strong><span class="next-arrow" aria-hidden="true">→</span></a>`;
  }).join('');
  return `<div class="next-reading next-reading-v12"><h2>${pt ? 'Continue a explorar' : 'Keep going'}</h2><div class="next-reading-grid next-reading-grid-v12">${cards}</div></div>`;
}

for (const languageDir of ['articles', 'pt/articles']) {
  const dir = path.join(root, languageDir);
  if (!fs.existsSync(dir)) continue;
  const pt = languageDir.startsWith('pt/');

  for (const entry of fs.readdirSync(dir)) {
    if (!entry.endsWith('.html')) continue;
    const file = path.join(dir, entry);
    let html = fs.readFileSync(file, 'utf8');

    if (!html.includes('/article-v12.css')) {
      html = html.replace('</head>', '<link rel="stylesheet" href="/article-v12.css">\n</head>');
    }

    if (!html.includes('class="article-breadcrumb"')) {
      const tag = html.match(/<p class="tag">([^<]+)<\/p>/i)?.[1] || (pt ? 'Guia' : 'Field guide');
      const category = tag.split('·')[0].trim();
      const breadcrumb = `<nav class="article-breadcrumb" aria-label="${pt ? 'Percurso do artigo' : 'Article path'}"><a href="${pt ? '/pt/learn.html' : '/learn.html'}">${pt ? 'Aprender' : 'Learn'}</a><span>/</span><span>${category}</span></nav>`;
      html = html.replace('<header class="article-head">', `${breadcrumb}<header class="article-head">`);
    }

    if (!html.includes('class="article-summary-label"')) {
      html = html.replace('<p class="article-deck">', `<span class="article-summary-label">${pt ? 'Ideia central' : 'Core idea'}</span><p class="article-deck">`);
    }

    if (!html.includes('class="article-mobile-toc"')) {
      const toc = mobileToc(html, pt);
      if (toc) html = html.replace('</header><div class="article-body">', `</header>${toc}<div class="article-body">`);
    }

    html = html.replace(/<div class="article-body">\s*<p(?! class="article-lead")>/, '<div class="article-body"><p class="article-lead">');
    html = html.replace(/<h3>In this guide<\/h3>/g, '<h3>In this article</h3>');
    html = html.replace(/<h3>Neste guia<\/h3>/g, '<h3>Neste artigo</h3>');

    const next = keepGoing(entry, pt);
    const nextPattern = /<div class="next-reading">[\s\S]*?<div class="next-reading-grid">[\s\S]*?<\/div><\/div>/;
    if (nextPattern.test(html)) html = html.replace(nextPattern, next);
    else if (!html.includes('next-reading-v12')) html = html.replace('</div></article><aside class="article-aside">', `${next}</div></article><aside class="article-aside">`);

    fs.writeFileSync(file, html);
  }
}

console.log('Applied RevOpsHubs V1.2 article continuity and navigation treatment.');
