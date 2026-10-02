import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const beehiivFormId = '548553ad-b90f-486a-af21-d44dfafc7eb1';
const linkedinNewsletter = 'https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7402293277217132544';

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && !full.includes(path.sep + 'markdown')) out.push(...walk(full));
    else if (entry.isFile() && entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function navFor(relative) {
  const pt = relative.startsWith('pt/');
  const rel = pt ? relative.slice(3) : relative;
  const current =
    rel.startsWith('articles/') || rel === 'learn.html' || rel === 'fundamentals.html' ? 'learn' :
    rel === 'hubs.html' ? 'hubs' :
    ['tools.html','ai-tools.html','assessment.html','readiness.html'].includes(rel) ? 'tools' :
    rel === 'research.html' ? 'research' :
    rel === 'model.html' ? 'model' : '';
  const prefix = pt ? '/pt' : '';
  const items = pt
    ? [['learn','Aprender','/learn.html'],['hubs','Hubs','/hubs.html'],['tools','Ferramentas','/tools.html'],['research','Investigação','/research.html'],['model','Metodologia','/model.html']]
    : [['learn','Learn','/learn.html'],['hubs','Hubs','/hubs.html'],['tools','Tools','/tools.html'],['research','Research','/research.html'],['model','Methodology','/model.html']];
  return '<nav id="site-nav" class="site-nav" aria-label="' + (pt ? 'Navegação principal' : 'Main navigation') + '">' +
    items.map(([key,label,href]) => '<a href="' + prefix + href + '"' + (current === key ? ' aria-current="page"' : '') + '>' + label + '</a>').join('') +
    '</nav>';
}

function footerFor(relative) {
  const pt = relative.startsWith('pt/');
  if (pt) return '<footer class="site-footer"><div class="shell footer-top"><div><a class="brand brand-light" href="/pt/"><span>RevOps</span><strong>Hubs</strong></a><p>Frameworks, ferramentas e investigação para construir melhores sistemas de receita B2B.</p></div><div class="footer-links"><div><b>Explorar</b><a href="/pt/learn.html">Aprender</a><a href="/pt/hubs.html">Hubs</a><a href="/pt/tools.html">Ferramentas</a><a href="/pt/research.html">Investigação</a><a href="/pt/model.html">Metodologia</a></div><div><b>Sobre</b><a href="/pt/about.html">Sobre a RevOpsHubs</a><a href="https://www.smartlinks.pt/" rel="external">SmartLinks</a></div></div></div><div class="shell footer-bottom"><span>A RevOpsHubs é uma iniciativa independente de investigação e educação da SmartLinks.</span><span>© 2026 SmartLinks</span></div></footer>';
  return '<footer class="site-footer"><div class="shell footer-top"><div><a class="brand brand-light" href="/"><span>RevOps</span><strong>Hubs</strong></a><p>Frameworks, tools and research for building better B2B revenue systems.</p></div><div class="footer-links"><div><b>Explore</b><a href="/learn.html">Learn</a><a href="/hubs.html">Hubs</a><a href="/tools.html">Tools</a><a href="/research.html">Research</a><a href="/model.html">Methodology</a></div><div><b>About</b><a href="/about.html">About RevOpsHubs</a><a href="https://www.smartlinks.pt/" rel="external">SmartLinks</a></div></div></div><div class="shell footer-bottom"><span>RevOpsHubs is an independent research and education initiative by SmartLinks.</span><span>© 2026 SmartLinks</span></div></footer>';
}

function articleNewsletter(pt) {
  const title = pt ? 'Uma ideia útil. Um sistema para melhorar.' : 'One useful idea. One system to improve.';
  const copy = pt ? 'Uma nota semanal concisa para quem é responsável por receita, operações e crescimento.' : 'A concise weekly field note for people responsible for revenue, operations and growth.';
  const note = pt ? 'Um email por semana. Sem ruído.' : 'One email a week. No noise.';
  const linked = pt ? 'Também disponível no LinkedIn →' : 'Also available on LinkedIn →';
  return '<div class="article-newsletter"><p class="card-kicker">Revenue Systems Brief</p><h2>' + title + '</h2><p>' + copy + '</p><div class="beehiiv-embed"><script type="text/javascript" async src="https://subscribe-forms.beehiiv.com/attribution.js"></script><script async src="https://subscribe-forms.beehiiv.com/v3/loader.js" data-beehiiv-form="' + beehiivFormId + '"></script></div><p class="newsletter-note">' + note + ' <a href="' + linkedinNewsletter + '" target="_blank" rel="noopener">' + linked + '</a></p></div>';
}

for (const file of walk(root)) {
  const relative = path.relative(root, file).replaceAll('\\', '/');
  const pt = relative.startsWith('pt/');
  let html = fs.readFileSync(file, 'utf8');

  html = html.replaceAll('RevOpHubs', 'RevOpsHubs').replaceAll('<span>RevOp</span><strong>Hubs</strong>', '<span>RevOps</span><strong>Hubs</strong>');
  html = html.replaceAll('RevOps is not a department. It is an operating system.', 'Treat RevOps as an operating system, not just a department.');
  html = html.replace(/<nav id="site-nav" class="site-nav"[^>]*>[\s\S]*?<\/nav>/, navFor(relative));
  html = html.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/, footerFor(relative));

  if (relative.includes('articles/')) {
    if (!html.includes('class="article-newsletter"')) {
      const block = articleNewsletter(pt);
      if (html.includes('<div class="next-reading">')) html = html.replace('<div class="next-reading">', block + '<div class="next-reading">');
      else if (html.includes('<div class="references">')) html = html.replace('<div class="references">', block + '<div class="references">');
    }
    html = html.replace(/<div class="next-reading"><h2>[\s\S]*?<\/h2>/, '<div class="next-reading"><h2>' + (pt ? 'Continue a explorar' : 'Keep going') + '</h2>');
  }

  if (relative === 'research.html') {
    html = html.replace('RevOpsHubs studies how B2B organisations connect commercial work — and which conditions make automation and AI genuinely useful.', 'RevOpsHubs Research is being built to study how B2B organisations connect commercial work — and which conditions make automation and AI genuinely useful.');
    if (!html.includes('Research in development</p><p class="page-intro">')) html = html.replace('<p class="page-intro">RevOpsHubs Research is being built', '<p class="research-status">Research in development</p><p class="page-intro">RevOpsHubs Research is being built');
  }
  if (relative === 'pt/research.html') {
    html = html.replace('A RevOpsHubs estuda como as organizações B2B ligam o trabalho comercial — e quais as condições que tornam a automação e a IA genuinamente úteis.', 'A área de investigação da RevOpsHubs está a ser construída para estudar como as organizações B2B ligam o trabalho comercial — e quais as condições que tornam a automação e a IA genuinamente úteis.');
    if (!html.includes('Investigação em desenvolvimento</p><p class="page-intro">')) html = html.replace('<p class="page-intro">A área de investigação da RevOpsHubs está a ser construída', '<p class="research-status">Investigação em desenvolvimento</p><p class="page-intro">A área de investigação da RevOpsHubs está a ser construída');
  }

  fs.writeFileSync(file, html);
}

console.log('Applied RevOpsHubs V1.1 global navigation, branding, footer and article newsletter.');
