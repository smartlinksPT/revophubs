import fs from 'node:fs';
import path from 'node:path';
import { site, pagePairs, articlePairs } from './content-routes.mjs';

const root = path.resolve('dist');

const sectionPaths = {
  en: { Learn:'/learn.html', Hubs:'/hubs.html', Fundamentals:'/fundamentals.html', Tools:'/tools.html', Research:'/research.html', Methodology:'/model.html' },
  pt: { Aprender:'/pt/learn.html', Hubs:'/pt/hubs.html', Fundamentos:'/pt/fundamentals.html', Ferramentas:'/pt/tools.html', Investigação:'/pt/research.html', Metodologia:'/pt/model.html' }
};

const aboutById = {
  'ai-revops':['Artificial intelligence','Revenue Operations','AI governance','AI agents'],
  'ai-tools':['AI tools','Revenue Operations software','Workflow automation','Revenue intelligence'],
  research:['Revenue Operations','AI readiness','CRM adoption','Cross-functional revenue systems'],
  about:['RevOpsHubs','SmartLinks','Revenue Operations'],
  model:['Revenue strategy','Process governance','CRM','Revenue data','Automation','Artificial intelligence']
};

const featuresById = {
  assessment:['Six-layer revenue-system score','Weakest-layer diagnosis','Personalised 30-day action plan','Recommended resources'],
  readiness:['Nine-point CRM readiness checklist','Readiness score','Action recommendation']
};

function itemsFor(pair, language) {
  const article = id => articlePairs.find(item => item.id === id);
  const pick = item => language === 'pt' ? item.ptPath : item.enPath;
  if (pair.id === 'learn') return articlePairs.map(pick);
  if (pair.id === 'hubs') return language === 'pt'
    ? ['/pt/model.html#strategy','/pt/model.html#process','/pt/model.html#crm','/pt/model.html#data','/pt/model.html#automation','/pt/ai-revops.html']
    : ['/model.html#strategy','/model.html#process','/model.html#crm','/model.html#data','/model.html#automation','/ai-revops.html'];
  if (pair.id === 'fundamentals') return [pick(article('what-is-revops')),pick(article('revenue-system')),language === 'pt' ? '/pt/model.html' : '/model.html',language === 'pt' ? '/pt/assessment.html' : '/assessment.html'];
  if (pair.id === 'tools') return language === 'pt' ? ['/pt/assessment.html','/pt/model.html','/pt/readiness.html','/pt/ai-tools.html'] : ['/assessment.html','/model.html','/readiness.html','/ai-tools.html'];
  return null;
}

function extract(html, expression, fallback = '') {
  return html.match(expression)?.[1]?.trim() || fallback;
}

function breadcrumb(pair, language, title, canonical) {
  const isPt = language === 'pt';
  const section = isPt ? pair.sectionPt : pair.sectionEn;
  const home = `${site}${isPt ? '/pt/' : '/'}`;
  const elements = [{ '@type':'ListItem', position:1, name:isPt ? 'Início' : 'RevOpsHubs', item:home }];
  if (!['Home','Início'].includes(section)) {
    const sectionPath = sectionPaths[language][section];
    if (sectionPath) elements.push({ '@type':'ListItem', position:2, name:section, item:`${site}${sectionPath}` });
  }
  if (canonical !== elements.at(-1).item) elements.push({ '@type':'ListItem', position:elements.length + 1, name:title, item:canonical });
  return { '@type':'BreadcrumbList', '@id':`${canonical}#breadcrumb`, itemListElement:elements };
}

for (const pair of pagePairs) {
  for (const language of ['en','pt']) {
    const isPt = language === 'pt';
    const relative = isPt ? pair.ptFile : pair.enFile;
    const routePath = isPt ? pair.ptPath : pair.enPath;
    const markdown = isPt ? pair.ptMarkdown : pair.enMarkdown;
    const section = isPt ? pair.sectionPt : pair.sectionEn;
    const counterpart = isPt ? pair.enPath : pair.ptPath;
    const file = path.join(root, relative);
    let html = fs.readFileSync(file, 'utf8');

    html = html.replace(/\n*<!-- SEO:generated:start -->[\s\S]*?<!-- SEO:generated:end -->\n*/g, '\n');
    const canonical = `${site}${routePath}`;
    html = html.replace(/<link rel="canonical" href="[^"]+">/i, `<link rel="canonical" href="${canonical}">`);

    const title = extract(html, /<title>([^<]+)<\/title>/i, 'RevOpsHubs');
    const description = extract(html, /<meta name="description" content="([^"]+)"/i, isPt ? 'Conhecimento prático de Revenue Operations da RevOpsHubs.' : 'Practical Revenue Operations knowledge from RevOpsHubs.');

    const smartlinks = { '@type':'Organization', '@id':'https://www.smartlinks.pt/#organization', name:'SmartLinks', url:'https://www.smartlinks.pt/', email:'geral@smartlinks.pt', telephone:'+351 210 970 529' };
    const organisation = { '@type':'Organization', '@id':`${site}/#organization`, name:'RevOpsHubs', url:`${site}/`, description:isPt ? 'Uma iniciativa de investigação e educação da SmartLinks dedicada a conhecimento, investigação e ferramentas práticas de Revenue Operations.' : 'A research and education initiative by SmartLinks for practical Revenue Operations knowledge, research and tools.', parentOrganization:{ '@id':smartlinks['@id'] } };
    const website = { '@type':'WebSite', '@id':`${site}/#website-${isPt ? 'pt' : 'en'}`, url:`${site}${isPt ? '/pt/' : '/'}`, name:'RevOpsHubs', publisher:{ '@id':`${site}/#organization` }, creator:{ '@id':smartlinks['@id'] }, maintainer:{ '@id':smartlinks['@id'] }, inLanguage:isPt ? 'pt-PT' : 'en' };
    const crumbs = breadcrumb(pair, language, title, canonical);
    const graph = [smartlinks, organisation, website, crumbs];
    const pageNode = { '@type':pair.type, '@id':`${canonical}#page`, url:canonical, name:title, description, isPartOf:{ '@id':website['@id'] }, publisher:{ '@id':`${site}/#organization` }, inLanguage:isPt ? 'pt-PT' : 'en', breadcrumb:{ '@id':crumbs['@id'] } };

    if (pair.type === 'Article' || pair.type === 'TechArticle') {
      Object.assign(pageNode, {
        headline:title.replace(/ — RevOpsHubs$/,''), datePublished:'2026-09-20', dateModified:'2026-10-03',
        author:{ '@id':`${site}/#organization` }, mainEntityOfPage:canonical, articleSection:section,
        keywords:pair.keywords || aboutById[pair.id]
      });
    }
    if (pair.type === 'WebApplication') Object.assign(pageNode, { applicationCategory:'BusinessApplication', operatingSystem:'Web', isAccessibleForFree:true, offers:{ '@type':'Offer', price:'0', priceCurrency:'EUR' }, featureList:featuresById[pair.id] });
    const items = itemsFor(pair, language);
    if (items) pageNode.mainEntity = { '@type':'ItemList', itemListElement:items.map((item,index) => ({ '@type':'ListItem', position:index + 1, url:`${site}${item}` })) };
    if (aboutById[pair.id]) pageNode.about = aboutById[pair.id].map(name => ({ '@type':'Thing', name }));
    graph.push(pageNode);

    const kind = pair.type === 'Article' || pair.type === 'TechArticle' ? 'article' : 'website';
    const englishUrl = `${site}${pair.enPath}`;
    const portugueseUrl = `${site}${pair.ptPath}`;
    const generated = `<!-- SEO:generated:start -->\n<meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1">\n<meta name="author" content="SmartLinks">\n<meta property="og:type" content="${kind}">\n<meta property="og:title" content="${title.replaceAll('"','&quot;')}">\n<meta property="og:description" content="${description.replaceAll('"','&quot;')}">\n<meta property="og:url" content="${canonical}">\n<meta property="og:site_name" content="RevOpsHubs">\n<meta property="og:locale" content="${isPt ? 'pt_PT' : 'en_GB'}">\n<meta name="twitter:card" content="summary">\n<link rel="sitemap" type="application/xml" href="/sitemap.xml">\n<link rel="alternate" type="application/atom+xml" href="${isPt ? '/pt/feed.xml' : '/feed.xml'}" title="RevOpsHubs feed">\n<link rel="alternate" type="text/plain" href="${isPt ? '/pt/llms.txt' : '/llms.txt'}" title="LLM content index">\n<link rel="alternate" type="text/markdown" href="${markdown}" title="Markdown version">\n<link rel="alternate" hreflang="en" href="${englishUrl}">\n<link rel="alternate" hreflang="pt-PT" href="${portugueseUrl}">\n<link rel="alternate" hreflang="x-default" href="${englishUrl}">\n<script type="application/ld+json">${JSON.stringify({ '@context':'https://schema.org', '@graph':graph })}</script>\n<!-- SEO:generated:end -->\n`;

    html = html.replace('</head>', `${generated}</head>`);
    fs.writeFileSync(file, html);
  }
}

console.log(`Enriched ${pagePairs.length * 2} pages with localized canonicals and hreflang.`);
