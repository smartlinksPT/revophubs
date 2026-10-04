export const site = 'https://revophubs.com';

const staticDefs = [
  ['home','index.html','/','pt/index.html','/pt/','WebPage','Home','Início','/markdown/index.md','/pt/markdown/index.md'],
  ['learn','learn/index.html','/learn/','pt/learn/index.html','/pt/learn/','CollectionPage','Learn','Aprender','/markdown/learn.md','/pt/markdown/learn.md'],
  ['hubs','hubs.html','/hubs.html','pt/hubs.html','/pt/hubs.html','CollectionPage','Hubs','Hubs','/markdown/hubs.md','/pt/markdown/hubs.md'],
  ['fundamentals','fundamentals.html','/fundamentals.html','pt/fundamentals.html','/pt/fundamentals.html','CollectionPage','Fundamentals','Fundamentos','/markdown/fundamentals.md','/pt/markdown/fundamentals.md'],
  ['ai-revops','ai-revops.html','/ai-revops.html','pt/ai-revops.html','/pt/ai-revops.html','TechArticle','Hubs','Hubs','/markdown/ai-revops.md','/pt/markdown/ai-revops.md'],
  ['ai-tools','ai-tools.html','/ai-tools.html','pt/ai-tools.html','/pt/ai-tools.html','CollectionPage','Tools','Ferramentas','/markdown/ai-tools.md','/pt/markdown/ai-tools.md'],
  ['tools','tools.html','/tools.html','pt/tools.html','/pt/tools.html','CollectionPage','Tools','Ferramentas','/markdown/tools.md','/pt/markdown/tools.md'],
  ['research','research.html','/research.html','pt/research.html','/pt/research.html','WebPage','Research','Investigação','/markdown/research.md','/pt/markdown/research.md'],
  ['about','about.html','/about.html','pt/about.html','/pt/about.html','AboutPage','Home','Início','/markdown/about.md','/pt/markdown/about.md'],
  ['model','model.html','/model.html','pt/model.html','/pt/model.html','TechArticle','Methodology','Metodologia','/markdown/model.md','/pt/markdown/model.md'],
  ['assessment','assessment.html','/assessment.html','pt/assessment.html','/pt/assessment.html','WebApplication','Tools','Ferramentas','/markdown/assessment.md','/pt/markdown/assessment.md'],
  ['readiness','readiness.html','/readiness.html','pt/readiness.html','/pt/readiness.html','WebApplication','Tools','Ferramentas','/markdown/readiness.md','/pt/markdown/readiness.md']
];

export const articlePairs = [
  {
    id:'what-is-revops', legacyFile:'what-is-revops.html',
    enFile:'learn/what-is-revops/index.html', enPath:'/learn/what-is-revops/', enMarkdown:'/markdown/learn/what-is-revops.md',
    ptFile:'pt/learn/o-que-e-revops/index.html', ptPath:'/pt/learn/o-que-e-revops/', ptMarkdown:'/pt/markdown/learn/o-que-e-revops.md',
    keywords:['what is RevOps','Revenue Operations definition','RevOps history','Revenue Operations']
  },
  {
    id:'revenue-system', legacyFile:'revops-operating-system.html',
    enFile:'learn/what-is-a-revenue-system/index.html', enPath:'/learn/what-is-a-revenue-system/', enMarkdown:'/markdown/learn/what-is-a-revenue-system.md',
    ptFile:'pt/learn/o-que-e-um-revenue-system/index.html', ptPath:'/pt/learn/o-que-e-um-revenue-system/', ptMarkdown:'/pt/markdown/learn/o-que-e-um-revenue-system.md',
    keywords:['Revenue System','B2B revenue system','Revenue System Model','AI-ready revenue system']
  },
  {
    id:'pipeline-system-problem', legacyFile:'pipeline-system-problem.html',
    enFile:'learn/why-more-pipeline-does-not-fix-a-system-problem/index.html', enPath:'/learn/why-more-pipeline-does-not-fix-a-system-problem/', enMarkdown:'/markdown/learn/why-more-pipeline-does-not-fix-a-system-problem.md',
    ptFile:'pt/learn/porque-mais-pipeline-nao-resolve-um-problema-de-sistema/index.html', ptPath:'/pt/learn/porque-mais-pipeline-nao-resolve-um-problema-de-sistema/', ptMarkdown:'/pt/markdown/learn/porque-mais-pipeline-nao-resolve-um-problema-de-sistema.md',
    keywords:['B2B pipeline','revenue constraint','demand generation']
  },
  {
    id:'revenue-handoffs', legacyFile:'revenue-handoffs.html',
    enFile:'learn/revenue-handoffs/index.html', enPath:'/learn/revenue-handoffs/', enMarkdown:'/markdown/learn/revenue-handoffs.md',
    ptFile:'pt/learn/hand-offs-de-receita/index.html', ptPath:'/pt/learn/hand-offs-de-receita/', ptMarkdown:'/pt/markdown/learn/hand-offs-de-receita.md',
    keywords:['revenue hand-offs','marketing sales alignment','revenue process']
  },
  {
    id:'crm-adoption', legacyFile:'crm-adoption-design.html',
    enFile:'learn/crm-adoption/index.html', enPath:'/learn/crm-adoption/', enMarkdown:'/markdown/learn/crm-adoption.md',
    ptFile:'pt/learn/adocao-do-crm/index.html', ptPath:'/pt/learn/adocao-do-crm/', ptMarkdown:'/pt/markdown/learn/adocao-do-crm.md',
    keywords:['CRM adoption','CRM operating design','CRM governance']
  },
  {
    id:'ai-ready-revenue-system', legacyFile:'ai-ready-revenue-system.html',
    enFile:'learn/ai-ready-revenue-system/index.html', enPath:'/learn/ai-ready-revenue-system/', enMarkdown:'/markdown/learn/ai-ready-revenue-system.md',
    ptFile:'pt/learn/sistema-de-receita-preparado-para-ia/index.html', ptPath:'/pt/learn/sistema-de-receita-preparado-para-ia/', ptMarkdown:'/pt/markdown/learn/sistema-de-receita-preparado-para-ia.md',
    keywords:['AI readiness','Revenue Operations AI','AI governance']
  },
  {
    id:'hubspot-pricing-credits-emea', legacyFile:'hubspot-pricing-credits-emea.html',
    enFile:'learn/hubspot-pricing-credits-emea/index.html', enPath:'/learn/hubspot-pricing-credits-emea/', enMarkdown:'/markdown/learn/hubspot-pricing-credits-emea.md',
    ptFile:'pt/learn/hubspot-pricing-creditos-emea/index.html', ptPath:'/pt/learn/hubspot-pricing-creditos-emea/', ptMarkdown:'/pt/markdown/learn/hubspot-pricing-creditos-emea.md',
    keywords:['HubSpot pricing 2026','HubSpot Credits','HubSpot EMEA pricing','flexible seats and credits','AI usage-based pricing']
  }
];

export const pagePairs = [
  ...staticDefs.map(([id,enFile,enPath,ptFile,ptPath,type,sectionEn,sectionPt,enMarkdown,ptMarkdown]) => ({ id,enFile,enPath,ptFile,ptPath,type,sectionEn,sectionPt,enMarkdown,ptMarkdown })),
  ...articlePairs.map(article => ({ ...article, type:'Article', sectionEn:'Learn', sectionPt:'Aprender' }))
];

export const legacyArticleRoutes = articlePairs.map(article => ({
  ...article,
  legacyEnFile:`articles/${article.legacyFile}`,
  legacyPtFile:`pt/articles/${article.legacyFile}`,
  legacyEnPath:`/articles/${article.legacyFile}`,
  legacyPtPath:`/pt/articles/${article.legacyFile}`,
  legacyEnMarkdown:`/markdown/articles/${article.legacyFile.replace(/\.html$/,'.md')}`,
  legacyPtMarkdown:`/pt/markdown/articles/${article.legacyFile.replace(/\.html$/,'.md')}`
}));
