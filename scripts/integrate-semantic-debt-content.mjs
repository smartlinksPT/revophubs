import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');

function edit(relative, transform) {
  const file = path.join(root, relative);
  if (!fs.existsSync(file)) throw new Error(`Missing ${relative}`);
  const source = fs.readFileSync(file, 'utf8');
  const updated = transform(source);
  if (updated !== source) fs.writeFileSync(file, updated);
}

function insertBefore(text, marker, block, sentinel) {
  if (text.includes(sentinel)) return text;
  if (!text.includes(marker)) throw new Error(`Marker not found: ${marker}`);
  return text.replace(marker, `${block}${marker}`);
}

const ptLearnCards = `<a class="resource-card" href="/pt/learn/divida-semantica-crm/"><span class="resource-meta">CRM · Dados · IA · 12 min</span><h3>O seu CRM pode estar limpo e continuar errado. Semantic Debt.</h3><p>Um framework para medir quando campos completos continuam a ter significados instáveis.</p><span class="card-action">Ler framework →</span></a><a class="resource-card" href="/pt/learn/workflow-ou-agente-ia/"><span class="resource-meta">Automação · IA · 11 min</span><h3>Workflow ou agente? A escolha depende da incerteza.</h3><p>Use incerteza, impacto e reversibilidade para escolher workflow, AI action, agent ou aprovação humana.</p><span class="card-action">Ler artigo →</span></a>`;
const enLearnCards = `<a class="resource-card" href="/learn/semantic-debt/"><span class="resource-meta">CRM · Data · AI · 12 min</span><h3>Your CRM can be clean and still be wrong. Semantic Debt.</h3><p>A framework for measuring when complete fields still carry unstable meanings.</p><span class="card-action">Read framework →</span></a><a class="resource-card" href="/learn/workflow-vs-ai-agent/"><span class="resource-meta">Automation · AI · 11 min</span><h3>Workflow or agent? Choose based on uncertainty.</h3><p>Use uncertainty, impact and reversibility to choose workflow, AI action, agent or human approval.</p><span class="card-action">Read article →</span></a>`;

edit('pt/learn.html', text => insertBefore(text, '<a class="resource-card" href="/pt/readiness.html">', ptLearnCards, '/pt/learn/divida-semantica-crm/'));
edit('learn.html', text => insertBefore(text, '<a class="resource-card" href="/readiness.html">', enLearnCards, '/learn/semantic-debt/'));

const ptToolCard = `<article class="tool-card live"><div class="tool-status"><span>Audit · CRM</span><b>Disponível</b></div><h2>Semantic Debt Audit</h2><p>Avalie um campo, estado ou regra do CRM em definição, evidência, ownership, transition logic e source of truth. Receba score e prioridades.</p><a href="/pt/tools/semantic-debt-audit/">Medir Semantic Debt →</a></article>`;
const enToolCard = `<article class="tool-card live"><div class="tool-status"><span>Audit · CRM</span><b>Available</b></div><h2>Semantic Debt Audit</h2><p>Assess one CRM field, state or rule across definition, evidence, ownership, transition logic and source of truth. Get a score and priorities.</p><a href="/tools/semantic-debt-audit/">Measure Semantic Debt →</a></article>`;
edit('pt/tools.html', text => insertBefore(text, '<article class="tool-card"><div class="tool-status"><span>Ferramenta de mapeamento</span>', ptToolCard, '/pt/tools/semantic-debt-audit/'));
edit('tools.html', text => insertBefore(text, '<article class="tool-card"><div class="tool-status"><span>Mapping tool</span>', enToolCard, '/tools/semantic-debt-audit/'));

function addNextReading(relative, href, label) {
  edit(relative, text => {
    if (text.includes(href)) return text;
    const marker = '<div class="next-reading-grid">';
    if (!text.includes(marker)) return text;
    return text.replace(marker, `${marker}<a href="${href}">${label}</a>`);
  });
}

addNextReading('pt/articles/ai-ready-revenue-system.html','/pt/learn/divida-semantica-crm/','Semantic Debt: quando o contexto tem significados instáveis →');
addNextReading('articles/ai-ready-revenue-system.html','/learn/semantic-debt/','Semantic Debt: when context carries unstable meaning →');
addNextReading('pt/articles/shadow-agents.html','/pt/learn/divida-semantica-crm/','Semantic Debt: governar o significado antes da autonomia →');
addNextReading('articles/shadow-agents.html','/learn/semantic-debt/','Semantic Debt: govern meaning before autonomy →');
addNextReading('pt/articles/agent-operating-contract.html','/pt/learn/workflow-ou-agente-ia/','Workflow ou agente? Escolher o mecanismo antes do contrato →');
addNextReading('articles/agent-operating-contract.html','/learn/workflow-vs-ai-agent/','Workflow or agent? Choose the mechanism before the contract →');
addNextReading('pt/articles/crm-adoption-design.html','/pt/learn/divida-semantica-crm/','Semantic Debt: um CRM pode estar preenchido e continuar errado →');
addNextReading('articles/crm-adoption-design.html','/learn/semantic-debt/','Semantic Debt: complete CRM data can still be wrong →');

function appendMarkdown(relative, block, sentinel) {
  edit(relative, text => text.includes(sentinel) ? text : `${text.trim()}\n\n${block.trim()}\n`);
}

appendMarkdown('pt/markdown/learn.md', `## Semântica e decisões de automação\n\n- [Semantic Debt: quando o CRM está preenchido mas o significado continua instável →](/pt/learn/divida-semantica-crm/)\n- [Workflow ou agente? A escolha depende da incerteza →](/pt/learn/workflow-ou-agente-ia/)`, '/pt/learn/divida-semantica-crm/');
appendMarkdown('markdown/learn.md', `## Semantics and automation decisions\n\n- [Semantic Debt: when complete CRM data still carries unstable meaning →](/learn/semantic-debt/)\n- [Workflow or agent? Choose based on uncertainty →](/learn/workflow-vs-ai-agent/)`, '/learn/semantic-debt/');
appendMarkdown('pt/markdown/tools.md', `## Semantic Debt Audit\n\nAvalie definição, evidência, ownership, transition logic e source of truth num conceito crítico do CRM.\n\n[Abrir Semantic Debt Audit →](/pt/tools/semantic-debt-audit/)`, '/pt/tools/semantic-debt-audit/');
appendMarkdown('markdown/tools.md', `## Semantic Debt Audit\n\nAssess definition, evidence, ownership, transition logic and source of truth for one critical CRM concept.\n\n[Open Semantic Debt Audit →](/tools/semantic-debt-audit/)`, '/tools/semantic-debt-audit/');

appendMarkdown('pt/markdown/articles/ai-ready-revenue-system.md', `- [Semantic Debt: quando o contexto tem significados instáveis →](/pt/learn/divida-semantica-crm/)`, '/pt/learn/divida-semantica-crm/');
appendMarkdown('markdown/articles/ai-ready-revenue-system.md', `- [Semantic Debt: when context carries unstable meaning →](/learn/semantic-debt/)`, '/learn/semantic-debt/');
appendMarkdown('pt/markdown/articles/shadow-agents.md', `- [Semantic Debt: governar o significado antes da autonomia →](/pt/learn/divida-semantica-crm/)`, '/pt/learn/divida-semantica-crm/');
appendMarkdown('markdown/articles/shadow-agents.md', `- [Semantic Debt: govern meaning before autonomy →](/learn/semantic-debt/)`, '/learn/semantic-debt/');
appendMarkdown('pt/markdown/articles/agent-operating-contract.md', `- [Workflow ou agente? Escolher o mecanismo antes do contrato →](/pt/learn/workflow-ou-agente-ia/)`, '/pt/learn/workflow-ou-agente-ia/');
appendMarkdown('markdown/articles/agent-operating-contract.md', `- [Workflow or agent? Choose the mechanism before the contract →](/learn/workflow-vs-ai-agent/)`, '/learn/workflow-vs-ai-agent/');

console.log('Integrated Semantic Debt, Workflow vs Agent, and Semantic Debt Audit.');
