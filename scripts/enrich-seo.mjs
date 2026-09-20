import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const site = 'https://revophubs.com';
const basePages = {
  'index.html': { type: 'WebPage', markdown: '/markdown/index.md', section: 'Home' },
  'learn.html': { type: 'CollectionPage', markdown: '/markdown/learn.md', section: 'Learn', items: ['/articles/what-is-revops.html','/articles/revops-operating-system.html','/articles/pipeline-system-problem.html','/articles/revenue-handoffs.html','/articles/crm-adoption-design.html','/articles/ai-ready-revenue-system.html'] },
  'hubs.html': { type: 'CollectionPage', markdown: '/markdown/hubs.md', section: 'Hubs', items: ['/model.html#strategy','/model.html#process','/model.html#crm','/model.html#data','/model.html#automation','/ai-revops.html'] },
  'fundamentals.html': { type: 'CollectionPage', markdown: '/markdown/fundamentals.md', section: 'Fundamentals', items: ['/articles/what-is-revops.html','/articles/revops-operating-system.html','/model.html','/assessment.html'] },
  'ai-revops.html': { type: 'TechArticle', markdown: '/markdown/ai-revops.md', section: 'Hubs', about: ['Artificial intelligence','Revenue Operations','AI governance','AI agents'] },
  'ai-tools.html': { type: 'CollectionPage', markdown: '/markdown/ai-tools.md', section: 'Tools', about: ['AI tools','Revenue Operations software','Workflow automation','Revenue intelligence'] },
  'tools.html': { type: 'CollectionPage', markdown: '/markdown/tools.md', section: 'Tools', items: ['/assessment.html','/model.html','/readiness.html','/ai-tools.html'] },
  'research.html': { type: 'WebPage', markdown: '/markdown/research.md', section: 'Research', about: ['Revenue Operations','AI readiness','CRM adoption','Cross-functional revenue systems'] },
  'about.html': { type: 'AboutPage', markdown: '/markdown/about.md', section: 'Home', about: ['RevOpHubs','SmartLinks','Revenue Operations'] },
  'model.html': { type: 'TechArticle', markdown: '/markdown/model.md', section: 'Methodology', about: ['Revenue strategy','Process governance','CRM','Revenue data','Automation','Artificial intelligence'] },
  'assessment.html': { type: 'WebApplication', markdown: '/markdown/assessment.md', section: 'Tools', featureList: ['Six-layer revenue-system score','Weakest-layer diagnosis','Personalised 30-day action plan','Recommended resources'] },
  'readiness.html': { type: 'WebApplication', markdown: '/markdown/readiness.md', section: 'Tools', featureList: ['Nine-point CRM readiness checklist','Readiness score','Action recommendation'] },
  'articles/revops-operating-system.html': { type: 'Article', markdown: '/markdown/articles/revops-operating-system.md', section: 'Learn', keywords: ['Revenue Operations','RevOps operating system','revenue system'] },
  'articles/what-is-revops.html': { type: 'Article', markdown: '/markdown/articles/what-is-revops.md', section: 'Learn', keywords: ['what is RevOps','Revenue Operations definition','RevOps history','Revenue Operations'] },
  'articles/pipeline-system-problem.html': { type: 'Article', markdown: '/markdown/articles/pipeline-system-problem.md', section: 'Learn', keywords: ['B2B pipeline','revenue constraint','demand generation'] },
  'articles/crm-adoption-design.html': { type: 'Article', markdown: '/markdown/articles/crm-adoption-design.md', section: 'Learn', keywords: ['CRM adoption','CRM operating design','CRM governance'] },
  'articles/revenue-handoffs.html': { type: 'Article', markdown: '/markdown/articles/revenue-handoffs.md', section: 'Learn', keywords: ['revenue hand-offs','marketing sales alignment','revenue process'] },
  'articles/ai-ready-revenue-system.html': { type: 'Article', markdown: '/markdown/articles/ai-ready-revenue-system.md', section: 'Learn', keywords: ['AI readiness','Revenue Operations AI','AI governance'] }
};

const pages = {};
for (const [relative, config] of Object.entries(basePages)) {
  pages[relative] = { ...config, lang: 'en', llms: '/llms.txt' };
  pages[`pt/${relative}`] = {
    ...config,
    lang: 'pt-PT',
    llms: '/pt/llms.txt',
    markdown: `/pt${config.markdown}`,
    items: config.items?.map((item) => `/pt${item}`),
    section: ({ Home: 'Início', Learn: 'Aprender', Hubs: 'Hubs', Fundamentals: 'Fundamentos', Tools: 'Ferramentas', Research: 'Investigação', Methodology: 'Metodologia' })[config.section] || config.section
  };
}

function extract(html, expression, fallback = '') {
  return html.match(expression)?.[1]?.trim() || fallback;
}

function breadcrumbs(config, title, canonical) {
  const prefix = config.lang === 'pt-PT' ? '/pt' : '';
  const homeName = config.lang === 'pt-PT' ? 'Início' : 'RevOpHubs';
  const elements = [{ '@type': 'ListItem', position: 1, name: homeName, item: `${site}${prefix}/` }];
  if (!['Home', 'Início'].includes(config.section)) {
    const paths = config.lang === 'pt-PT'
      ? { Aprender: '/learn.html', Hubs: '/hubs.html', Fundamentos: '/fundamentals.html', Ferramentas: '/tools.html', Investigação: '/research.html', Metodologia: '/model.html' }
      : { Learn: '/learn.html', Hubs: '/hubs.html', Fundamentals: '/fundamentals.html', Tools: '/tools.html', Research: '/research.html', Methodology: '/model.html' };
    const sectionPath = `${prefix}${paths[config.section]}`;
    elements.push({ '@type': 'ListItem', position: 2, name: config.section, item: `${site}${sectionPath}` });
  }
  if (canonical !== elements.at(-1).item) elements.push({ '@type': 'ListItem', position: elements.length + 1, name: title, item: canonical });
  return { '@type': 'BreadcrumbList', '@id': `${canonical}#breadcrumb`, itemListElement: elements };
}

for (const [relative, config] of Object.entries(pages)) {
  const file = path.join(root, relative);
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/\n*<!-- SEO:generated:start -->[\s\S]*?<!-- SEO:generated:end -->\n*/g, '\n');
  const title = extract(html, /<title>([^<]+)<\/title>/i, 'RevOpHubs');
  const description = extract(html, /<meta name="description" content="([^"]+)"/i, 'Practical Revenue Operations knowledge and tools from SmartLinks.');
  const canonical = extract(html, /<link rel="canonical" href="([^"]+)"/i, `${site}/${relative === 'index.html' ? '' : relative}`);
  const isPortuguese = config.lang === 'pt-PT';
  const smartlinks = { '@type': 'Organization', '@id': 'https://www.smartlinks.pt/#organization', name: 'SmartLinks', url: 'https://www.smartlinks.pt/', email: 'geral@smartlinks.pt', telephone: '+351 210 970 529' };
  const organisation = { '@type': 'Organization', '@id': `${site}/#organization`, name: 'RevOpHubs', url: `${site}/`, description: isPortuguese ? 'Iniciativa da SmartLinks dedicada a conhecimento, investigação e ferramentas práticas de Revenue Operations.' : 'A SmartLinks initiative for practical Revenue Operations knowledge, research and tools.', parentOrganization: { '@id': smartlinks['@id'] } };
  const website = { '@type': 'WebSite', '@id': `${site}/#website-${isPortuguese ? 'pt' : 'en'}`, url: `${site}${isPortuguese ? '/pt/' : '/'}`, name: 'RevOpHubs', publisher: { '@id': `${site}/#organization` }, creator: { '@id': smartlinks['@id'] }, maintainer: { '@id': smartlinks['@id'] }, inLanguage: config.lang };
  const graph = [smartlinks, organisation, website, breadcrumbs(config, title, canonical)];
  const pageNode = { '@type': config.type, '@id': `${canonical}#page`, url: canonical, name: title, description, isPartOf: { '@id': website['@id'] }, publisher: { '@id': `${site}/#organization` }, inLanguage: config.lang, breadcrumb: { '@id': `${canonical}#breadcrumb` } };
  if (config.type === 'Article' || config.type === 'TechArticle') Object.assign(pageNode, { headline: title.replace(/ — RevOpHubs$/, ''), datePublished: '2026-09-20', dateModified: '2026-09-20', author: { '@id': `${site}/#organization` }, mainEntityOfPage: canonical, articleSection: config.section, keywords: config.keywords || config.about });
  if (config.type === 'WebApplication') Object.assign(pageNode, { applicationCategory: 'BusinessApplication', operatingSystem: 'Web', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' }, featureList: config.featureList });
  if (config.items) pageNode.mainEntity = { '@type': 'ItemList', itemListElement: config.items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, url: `${site}${item}` })) };
  if (config.about) pageNode.about = config.about.map(name => ({ '@type': 'Thing', name }));
  graph.push(pageNode);
  const kind = config.type === 'Article' || config.type === 'TechArticle' ? 'article' : 'website';
  const baseRelative = relative.replace(/^pt\//, '');
  const rootPath = baseRelative === 'index.html' ? '/' : `/${baseRelative}`;
  const englishUrl = `${site}${rootPath}`;
  const portugueseUrl = `${site}/pt${rootPath}`;
  const generated = `<!-- SEO:generated:start -->\n<meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1">\n<meta name="author" content="SmartLinks">\n<meta property="og:type" content="${kind}">\n<meta property="og:title" content="${title.replaceAll('"', '&quot;')}">\n<meta property="og:description" content="${description.replaceAll('"', '&quot;')}">\n<meta property="og:url" content="${canonical}">\n<meta property="og:site_name" content="RevOpHubs by SmartLinks">\n<meta property="og:locale" content="${isPortuguese ? 'pt_PT' : 'en_GB'}">\n<meta name="twitter:card" content="summary">\n<link rel="sitemap" type="application/xml" href="/sitemap.xml">\n<link rel="alternate" type="application/atom+xml" href="${isPortuguese ? '/pt/feed.xml' : '/feed.xml'}" title="RevOpHubs feed">\n<link rel="alternate" type="text/plain" href="${config.llms}" title="LLM content index">\n<link rel="alternate" type="text/markdown" href="${config.markdown}" title="Markdown version">\n<link rel="alternate" hreflang="en" href="${englishUrl}">\n<link rel="alternate" hreflang="pt-PT" href="${portugueseUrl}">\n<link rel="alternate" hreflang="x-default" href="${englishUrl}">\n<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>\n<!-- SEO:generated:end -->\n`;
  html = html.replace('</head>', `${generated}</head>`);
  fs.writeFileSync(file, html);
}

console.log(`Enriched ${Object.keys(pages).length} pages.`);
