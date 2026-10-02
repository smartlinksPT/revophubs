import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const beehiivFormId = '7d6aec8a-727f-49ae-917c-dd1a49e35631';
const linkedinNewsletter = 'https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7402293277217132544';

function filesByExtension(dir, extensions, skipMarkdown = false) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (skipMarkdown && full.includes(path.sep + 'markdown')) continue;
      out.push(...filesByExtension(full, extensions, skipMarkdown));
    } else if (entry.isFile() && extensions.some((ext) => entry.name.endsWith(ext))) out.push(full);
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

function newsletter(pt, article = false) {
  const title = pt ? 'Uma ideia útil. Um sistema para melhorar.' : 'One useful idea. One system to improve.';
  const copy = pt ? 'Uma nota semanal concisa para quem é responsável por receita, operações e crescimento.' : 'A concise weekly field note for people responsible for revenue, operations and growth.';
  const note = pt ? 'Um email por semana. Sem ruído.' : 'One email a week. No noise.';
  const linked = pt ? 'Também disponível no LinkedIn →' : 'Also available on LinkedIn →';
  const tag = article ? 'div' : 'aside';
  const cls = article ? 'article-newsletter' : 'brief-card';
  const aria = article ? '' : ' aria-label="' + (pt ? 'Newsletter Revenue Systems Brief' : 'Revenue Systems Brief newsletter') + '"';
  return '<' + tag + ' class="' + cls + '"' + aria + '><p class="card-kicker">Revenue Systems Brief</p><h2>' + title + '</h2><p>' + copy + '</p><div class="beehiiv-embed"><script type="text/javascript" async src="https://subscribe-forms.beehiiv.com/attribution.js"></script><script async src="https://subscribe-forms.beehiiv.com/v3/loader.js" data-beehiiv-form="' + beehiivFormId + '"></script></div><p class="newsletter-note">' + note + ' <a href="' + linkedinNewsletter + '" target="_blank" rel="noopener">' + linked + '</a></p></' + tag + '>';
}

function homeHubs(pt) {
  if (pt) return '<div class="shell hub-grid">' +
    '<a href="/pt/model.html#strategy"><small>Hub 01</small><h3>Estratégia</h3><p>ICP, go-to-market, posicionamento, lifecycle e arquitetura de receita.</p><span>Entrar no hub →</span></a>' +
    '<a href="/pt/model.html#process"><small>Hub 02</small><h3>Processo</h3><p>Qualificação, ownership, hand-offs, pipeline e forecasting.</p><span>Entrar no hub →</span></a>' +
    '<a href="/pt/model.html#crm"><small>Hub 03</small><h3>CRM</h3><p>Arquitetura, adoção, governance, modelos de dados e integrações.</p><span>Entrar no hub →</span></a>' +
    '<a href="/pt/model.html#data"><small>Hub 04</small><h3>Dados</h3><p>Atribuição, qualidade de dados, medição, reporting e revenue intelligence.</p><span>Entrar no hub →</span></a>' +
    '<a href="/pt/model.html#automation"><small>Hub 05</small><h3>Automação</h3><p>Workflows, routing, enriquecimento e automação operacional.</p><span>Entrar no hub →</span></a>' +
    '<a href="/pt/ai-revops.html"><small>Hub 06</small><h3>IA</h3><p>AI readiness, assistentes, agentes e workflows de receita inteligentes.</p><span>Entrar no hub →</span></a>' +
    '</div>';
  return '<div class="shell hub-grid">' +
    '<a href="/model.html#strategy"><small>Hub 01</small><h3>Strategy</h3><p>ICP, go-to-market, positioning, lifecycle and revenue architecture.</p><span>Enter hub →</span></a>' +
    '<a href="/model.html#process"><small>Hub 02</small><h3>Process</h3><p>Qualification, ownership, hand-offs, pipeline and forecasting.</p><span>Enter hub →</span></a>' +
    '<a href="/model.html#crm"><small>Hub 03</small><h3>CRM</h3><p>Architecture, adoption, governance, data models and integrations.</p><span>Enter hub →</span></a>' +
    '<a href="/model.html#data"><small>Hub 04</small><h3>Data</h3><p>Attribution, data quality, measurement, reporting and revenue intelligence.</p><span>Enter hub →</span></a>' +
    '<a href="/model.html#automation"><small>Hub 05</small><h3>Automation</h3><p>Workflows, routing, enrichment and operational automation.</p><span>Enter hub →</span></a>' +
    '<a href="/ai-revops.html"><small>Hub 06</small><h3>AI</h3><p>AI readiness, assistants, agents and intelligent revenue workflows.</p><span>Enter hub →</span></a>' +
    '</div>';
}

function hubRows(pt) {
  if (pt) return '<div class="shell hub-stack">' +
    '<article class="hub-row"><span class="hub-id">01</span><h2>Estratégia</h2><p>ICP, go-to-market, posicionamento, definições de lifecycle, arquitetura de receita e métricas.</p><a href="/pt/model.html#strategy">Explorar o hub →</a></article>' +
    '<article class="hub-row"><span class="hub-id">02</span><h2>Processo</h2><p>Qualificação, ownership, hand-offs, etapas comerciais, gestão de pipeline e forecasting.</p><a href="/pt/model.html#process">Explorar o hub →</a></article>' +
    '<article class="hub-row"><span class="hub-id">03</span><h2>CRM</h2><p>Arquitetura, adoção, governance, modelos de dados e integrações.</p><a href="/pt/model.html#crm">Explorar o hub →</a></article>' +
    '<article class="hub-row"><span class="hub-id">04</span><h2>Dados</h2><p>Atribuição, qualidade de dados, medição, reporting e revenue intelligence.</p><a href="/pt/model.html#data">Explorar o hub →</a></article>' +
    '<article class="hub-row"><span class="hub-id">05</span><h2>Automação</h2><p>Workflows, routing, enriquecimento e automação operacional.</p><a href="/pt/model.html#automation">Explorar o hub →</a></article>' +
    '<article class="hub-row"><span class="hub-id">06</span><h2>IA</h2><p>AI readiness, assistentes, agentes e workflows de receita inteligentes assentes em fundações fiáveis.</p><a href="/pt/ai-revops.html">Explorar o hub →</a></article>' +
    '</div>';
  return '<div class="shell hub-stack">' +
    '<article class="hub-row"><span class="hub-id">01</span><h2>Strategy</h2><p>ICP, go-to-market, positioning, lifecycle definitions, revenue architecture and metrics.</p><a href="/model.html#strategy">Explore the hub →</a></article>' +
    '<article class="hub-row"><span class="hub-id">02</span><h2>Process</h2><p>Qualification, ownership, hand-offs, sales stages, pipeline management and forecasting.</p><a href="/model.html#process">Explore the hub →</a></article>' +
    '<article class="hub-row"><span class="hub-id">03</span><h2>CRM</h2><p>Architecture, adoption, governance, data models and integrations.</p><a href="/model.html#crm">Explore the hub →</a></article>' +
    '<article class="hub-row"><span class="hub-id">04</span><h2>Data</h2><p>Attribution, data quality, measurement, reporting and revenue intelligence.</p><a href="/model.html#data">Explore the hub →</a></article>' +
    '<article class="hub-row"><span class="hub-id">05</span><h2>Automation</h2><p>Workflows, routing, enrichment and operational automation.</p><a href="/model.html#automation">Explore the hub →</a></article>' +
    '<article class="hub-row"><span class="hub-id">06</span><h2>AI</h2><p>AI readiness, assistants, agents and intelligent revenue workflows built on trusted foundations.</p><a href="/ai-revops.html">Explore the hub →</a></article>' +
    '</div>';
}

function insertMidArticle(html, block) {
  const matches = [...html.matchAll(/<h2(?:\s[^>]*)?>/g)];
  if (matches.length >= 4) {
    const index = matches[3].index;
    return html.slice(0, index) + block + html.slice(index);
  }
  if (html.includes('<div class="next-reading">')) return html.replace('<div class="next-reading">', block + '<div class="next-reading">');
  if (html.includes('<div class="references">')) return html.replace('<div class="references">', block + '<div class="references">');
  return html;
}

for (const file of filesByExtension(root, ['.html'], true)) {
  const relative = path.relative(root, file).replaceAll('\\', '/');
  const pt = relative.startsWith('pt/');
  let html = fs.readFileSync(file, 'utf8');

  html = html.replaceAll('RevOpHubs', 'RevOpsHubs').replaceAll('<span>RevOp</span><strong>Hubs</strong>', '<span>RevOps</span><strong>Hubs</strong>');
  html = html.replaceAll('RevOps is not a department. It is an operating system.', 'Treat RevOps as an operating system, not just a department.');
  html = html.replaceAll('RevOps não é um departamento. É um sistema operativo.', 'Trate RevOps como um sistema operativo, não apenas como um departamento.');
  html = html.replace(/<nav id="site-nav" class="site-nav"[^>]*>[\s\S]*?<\/nav>/, navFor(relative));
  html = html.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/, footerFor(relative));

  if (relative === 'index.html' || relative === 'pt/index.html') {
    html = html.replace('Revenue Operations, made operational · A SmartLinks initiative', 'Revenue Operations, made operational');
    html = html.replace('Revenue Operations, na prática · Uma iniciativa SmartLinks', 'Revenue Operations, na prática');
    html = html.replace(/<aside class="brief-card"[\s\S]*?<\/aside>/, newsletter(pt, false));
    html = html.replace(/<div class="shell hub-grid">[\s\S]*?<\/div>\s*<\/section>/, homeHubs(pt) + '</section>');
    if (pt) {
      html = html.replace('A RevOpsHubs estuda como as organizações B2B desenham, ligam e desenvolvem os seus sistemas de receita — incluindo as condições organizacionais que tornam a IA útil.', '<span class="research-status">Investigação em desenvolvimento</span> A área de investigação da RevOpsHubs está a ser construída para estudar como as organizações B2B desenham, ligam e evoluem os seus sistemas de receita — incluindo as condições que tornam a IA genuinamente útil.');
    } else {
      html = html.replace('RevOpsHubs studies how B2B organisations design, connect and evolve their revenue systems — including the organisational conditions that make AI useful.', '<span class="research-status">Research in development</span> RevOpsHubs Research is being built to study how B2B organisations design, connect and evolve their revenue systems — including the conditions that make AI genuinely useful.');
    }
  }

  if (relative === 'hubs.html' || relative === 'pt/hubs.html') {
    html = html.replace(/<div class="shell hub-stack">[\s\S]*?<\/div><\/section>/, hubRows(pt) + '</section>');
  }

  if (relative.includes('articles/')) {
    if (!html.includes('class="article-newsletter"')) html = insertMidArticle(html, newsletter(pt, true));
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

for (const file of filesByExtension(root, ['.md','.txt'])) {
  const source = fs.readFileSync(file, 'utf8');
  const updated = source.replaceAll('RevOpHubs', 'RevOpsHubs');
  if (updated !== source) fs.writeFileSync(file, updated);
}

console.log('Applied RevOpsHubs V1.1 branding, navigation, hubs, Beehiiv newsletter, research copy and article continuity.');
