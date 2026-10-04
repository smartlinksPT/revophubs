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

const ptLearnCard = `<a class="resource-card" href="/pt/learn/crm-sistema-contexto-agentes/"><span class="resource-meta">CRM · Agentes · Contexto · 13 min</span><h3>O CRM está a tornar-se o Context System dos agentes.</h3><p>Identity, Relationship, State, History, Intent, Rules e Permissions: o contexto mínimo para um agente trabalhar.</p><span class="card-action">Ler Agent Context Stack →</span></a>`;
const enLearnCard = `<a class="resource-card" href="/learn/crm-as-agent-context-system/"><span class="resource-meta">CRM · Agents · Context · 13 min</span><h3>The CRM is becoming the Context System for agents.</h3><p>Identity, Relationship, State, History, Intent, Rules and Permissions: the minimum context an agent needs to work.</p><span class="card-action">Read the Agent Context Stack →</span></a>`;
edit('pt/learn.html', text => insertBefore(text, '<a class="resource-card" href="/pt/readiness.html">', ptLearnCard, '/pt/learn/crm-sistema-contexto-agentes/'));
edit('learn.html', text => insertBefore(text, '<a class="resource-card" href="/readiness.html">', enLearnCard, '/learn/crm-as-agent-context-system/'));

const ptToolCards = `<article class="tool-card live"><div class="tool-status"><span>Agent context</span><b>Disponível</b></div><h2>Agent Context Readiness Check</h2><p>Teste Identity, Relationship, State, History, Intent, Rules e Permissions para um use case específico.</p><a href="/pt/tools/preparacao-contexto-agentes/">Testar contexto →</a></article><article class="tool-card live"><div class="tool-status"><span>Decision tool</span><b>Disponível</b></div><h2>Workflow ou agente?</h2><p>Use incerteza, impacto e reversibilidade para escolher workflow, AI-assisted workflow, agente ou aprovação humana.</p><a href="/pt/tools/workflow-ou-agente/">Escolher mecanismo →</a></article><article class="tool-card live"><div class="tool-status"><span>Builder · Governance</span><b>Disponível</b></div><h2>Agent Operating Contract Builder</h2><p>Defina objetivo, owner, contexto, tools, permissões, aprovação, budget, qualidade, escalamento e rollback.</p><a href="/pt/tools/contrato-operacional-agente/">Construir contrato →</a></article>`;
const enToolCards = `<article class="tool-card live"><div class="tool-status"><span>Agent context</span><b>Available</b></div><h2>Agent Context Readiness Check</h2><p>Test Identity, Relationship, State, History, Intent, Rules and Permissions for one specific use case.</p><a href="/tools/agent-context-readiness/">Test context →</a></article><article class="tool-card live"><div class="tool-status"><span>Decision tool</span><b>Available</b></div><h2>Workflow or agent?</h2><p>Use uncertainty, impact and reversibility to choose workflow, AI-assisted workflow, agent or human approval.</p><a href="/tools/workflow-vs-agent-decision/">Choose the mechanism →</a></article><article class="tool-card live"><div class="tool-status"><span>Builder · Governance</span><b>Available</b></div><h2>Agent Operating Contract Builder</h2><p>Define objective, owner, context, tools, permissions, approval, budget, quality, escalation and rollback.</p><a href="/tools/agent-operating-contract-builder/">Build the contract →</a></article>`;
edit('pt/tools.html', text => insertBefore(text, '<article class="tool-card"><div class="tool-status"><span>Ferramenta de mapeamento</span>', ptToolCards, '/pt/tools/preparacao-contexto-agentes/'));
edit('tools.html', text => insertBefore(text, '<article class="tool-card"><div class="tool-status"><span>Mapping tool</span>', enToolCards, '/tools/agent-context-readiness/'));

function addNextReading(relative, href, label) {
  edit(relative, text => {
    if (text.includes(href)) return text;
    const marker = '<div class="next-reading-grid">';
    if (!text.includes(marker)) return text;
    return text.replace(marker, `${marker}<a href="${href}">${label}</a>`);
  });
}

addNextReading('pt/articles/semantic-debt.html','/pt/learn/crm-sistema-contexto-agentes/','Agent Context Stack: significado estável ainda não é contexto suficiente →');
addNextReading('articles/semantic-debt.html','/learn/crm-as-agent-context-system/','Agent Context Stack: stable meaning is not enough context →');
addNextReading('pt/articles/workflow-vs-agent.html','/pt/tools/workflow-ou-agente/','Aplicar a Decision Uncertainty Matrix →');
addNextReading('articles/workflow-vs-agent.html','/tools/workflow-vs-agent-decision/','Apply the Decision Uncertainty Matrix →');
addNextReading('pt/articles/agent-operating-contract.html','/pt/tools/contrato-operacional-agente/','Construir um Agent Operating Contract →');
addNextReading('articles/agent-operating-contract.html','/tools/agent-operating-contract-builder/','Build an Agent Operating Contract →');
addNextReading('pt/articles/shadow-agents.html','/pt/tools/preparacao-contexto-agentes/','Agent Context Readiness: testar contexto antes da autonomia →');
addNextReading('articles/shadow-agents.html','/tools/agent-context-readiness/','Agent Context Readiness: test context before autonomy →');
addNextReading('pt/articles/ai-ready-revenue-system.html','/pt/learn/crm-sistema-contexto-agentes/','CRM como Context System dos agentes →');
addNextReading('articles/ai-ready-revenue-system.html','/learn/crm-as-agent-context-system/','CRM as the Context System for agents →');

function appendMarkdown(relative, block, sentinel) {
  edit(relative, text => text.includes(sentinel) ? text : `${text.trim()}\n\n${block.trim()}\n`);
}

appendMarkdown('pt/markdown/learn.md', `## Contexto para agentes\n\n- [CRM como Context System: o Agent Context Stack →](/pt/learn/crm-sistema-contexto-agentes/)`, '/pt/learn/crm-sistema-contexto-agentes/');
appendMarkdown('markdown/learn.md', `## Agent context\n\n- [CRM as a Context System: the Agent Context Stack →](/learn/crm-as-agent-context-system/)`, '/learn/crm-as-agent-context-system/');
appendMarkdown('pt/markdown/tools.md', `## Toolkit de agentes\n\n- [Agent Context Readiness Check →](/pt/tools/preparacao-contexto-agentes/)\n- [Workflow ou agente? Decision Tool →](/pt/tools/workflow-ou-agente/)\n- [Agent Operating Contract Builder →](/pt/tools/contrato-operacional-agente/)`, '/pt/tools/preparacao-contexto-agentes/');
appendMarkdown('markdown/tools.md', `## Agent toolkit\n\n- [Agent Context Readiness Check →](/tools/agent-context-readiness/)\n- [Workflow vs Agent Decision Tool →](/tools/workflow-vs-agent-decision/)\n- [Agent Operating Contract Builder →](/tools/agent-operating-contract-builder/)`, '/tools/agent-context-readiness/');

appendMarkdown('pt/markdown/articles/semantic-debt.md', `- [Agent Context Stack: significado estável ainda não é contexto suficiente →](/pt/learn/crm-sistema-contexto-agentes/)`, '/pt/learn/crm-sistema-contexto-agentes/');
appendMarkdown('markdown/articles/semantic-debt.md', `- [Agent Context Stack: stable meaning is not enough context →](/learn/crm-as-agent-context-system/)`, '/learn/crm-as-agent-context-system/');
appendMarkdown('pt/markdown/articles/workflow-vs-agent.md', `- [Aplicar a Decision Uncertainty Matrix →](/pt/tools/workflow-ou-agente/)`, '/pt/tools/workflow-ou-agente/');
appendMarkdown('markdown/articles/workflow-vs-agent.md', `- [Apply the Decision Uncertainty Matrix →](/tools/workflow-vs-agent-decision/)`, '/tools/workflow-vs-agent-decision/');
appendMarkdown('pt/markdown/articles/agent-operating-contract.md', `- [Construir um Agent Operating Contract →](/pt/tools/contrato-operacional-agente/)`, '/pt/tools/contrato-operacional-agente/');
appendMarkdown('markdown/articles/agent-operating-contract.md', `- [Build an Agent Operating Contract →](/tools/agent-operating-contract-builder/)`, '/tools/agent-operating-contract-builder/');

console.log('Integrated Agent Context Stack and agent decision/governance tools.');
