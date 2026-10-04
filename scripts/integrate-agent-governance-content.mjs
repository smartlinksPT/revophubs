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

function insertBefore(text, marker, block) {
  if (text.includes(block.trim().slice(0, 80))) return text;
  if (!text.includes(marker)) throw new Error(`Marker not found: ${marker}`);
  return text.replace(marker, `${block}${marker}`);
}

const ptCards = `<a class="resource-card" href="/pt/learn/shadow-agents/"><span class="resource-meta">IA · Governance · 12 min</span><h3>O próximo problema de RevOps não é Shadow IT. É Shadow Agents.</h3><p>Um framework para perceber que agentes conseguem ver, decidir e agir dentro dos seus sistemas.</p><span class="card-action">Ler artigo →</span></a><a class="resource-card" href="/pt/learn/contrato-operacional-agentes-ia/"><span class="resource-meta">Framework · Agentes · 13 min</span><h3>Um bom prompt não chega. Um agente precisa de um contrato operacional.</h3><p>Objective, owner, contexto, tools, permissões, aprovações, budget, qualidade, escalamento e rollback.</p><span class="card-action">Ler framework →</span></a>`;

const enCards = `<a class="resource-card" href="/learn/shadow-agents/"><span class="resource-meta">AI · Governance · 12 min</span><h3>The next RevOps problem is not Shadow IT. It is Shadow Agents.</h3><p>A framework for understanding which agents can see, decide and act inside your systems.</p><span class="card-action">Read article →</span></a><a class="resource-card" href="/learn/ai-agent-operating-contract/"><span class="resource-meta">Framework · Agents · 13 min</span><h3>A good prompt is not enough. An agent needs an operating contract.</h3><p>Objective, owner, context, tools, permissions, approvals, budget, quality, escalation and rollback.</p><span class="card-action">Read framework →</span></a>`;

edit('pt/learn.html', text => insertBefore(text, '<a class="resource-card" href="/pt/readiness.html">', ptCards));
edit('learn.html', text => insertBefore(text, '<a class="resource-card" href="/readiness.html">', enCards));

const ptAiBacklink = `<div class="source-note"><strong>Próximo passo de governance</strong><br>Quando a base está pronta, o problema muda de readiness para controlo operacional. Veja <a href="/pt/learn/shadow-agents/">Shadow Agents</a> e use o <a href="/pt/learn/contrato-operacional-agentes-ia/">Agent Operating Contract</a> antes de dar autonomia de produção.</div>\n`;
const enAiBacklink = `<div class="source-note"><strong>Next governance step</strong><br>Once the foundation is ready, the problem shifts from readiness to operating control. Read <a href="/learn/shadow-agents/">Shadow Agents</a> and use the <a href="/learn/ai-agent-operating-contract/">Agent Operating Contract</a> before granting production autonomy.</div>\n`;

edit('pt/articles/ai-ready-revenue-system.html', text => insertBefore(text, '<div class="next-reading">', ptAiBacklink));
edit('articles/ai-ready-revenue-system.html', text => insertBefore(text, '<div class="next-reading">', enAiBacklink));

function addNextReading(relative, href, label) {
  edit(relative, text => {
    if (text.includes(href)) return text;
    const marker = '<div class="next-reading-grid">';
    if (!text.includes(marker)) return text;
    return text.replace(marker, `${marker}<a href="${href}">${label}</a>`);
  });
}

addNextReading('pt/articles/hubspot-pricing-credits-emea.html', '/pt/learn/contrato-operacional-agentes-ia/', 'Agent Operating Contract: controlar autonomia e consumo →');
addNextReading('articles/hubspot-pricing-credits-emea.html', '/learn/ai-agent-operating-contract/', 'Agent Operating Contract: govern autonomy and spend →');

function appendMarkdown(relative, block, sentinel) {
  edit(relative, text => text.includes(sentinel) ? text : `${text.trim()}\n\n${block.trim()}\n`);
}

appendMarkdown('pt/markdown/learn.md', `## Governance de agentes\n\n- [Shadow Agents: o próximo problema de RevOps não é Shadow IT →](/pt/learn/shadow-agents/)\n- [Agent Operating Contract: o contrato operacional antes de produção →](/pt/learn/contrato-operacional-agentes-ia/)`, '/pt/learn/shadow-agents/');
appendMarkdown('markdown/learn.md', `## Agent governance\n\n- [Shadow Agents: the next RevOps problem is not Shadow IT →](/learn/shadow-agents/)\n- [Agent Operating Contract: the operating contract before production →](/learn/ai-agent-operating-contract/)`, '/learn/shadow-agents/');

appendMarkdown('pt/markdown/articles/ai-ready-revenue-system.md', `## Próximo passo de governance\n\nDepois da readiness, governe a autonomia: [Shadow Agents](/pt/learn/shadow-agents/) e [Agent Operating Contract](/pt/learn/contrato-operacional-agentes-ia/).`, '/pt/learn/shadow-agents/');
appendMarkdown('markdown/articles/ai-ready-revenue-system.md', `## Next governance step\n\nAfter readiness, govern autonomy: [Shadow Agents](/learn/shadow-agents/) and the [Agent Operating Contract](/learn/ai-agent-operating-contract/).`, '/learn/shadow-agents/');

appendMarkdown('pt/markdown/articles/hubspot-pricing-credits-emea.md', `- [Agent Operating Contract: controlar autonomia e consumo →](/pt/learn/contrato-operacional-agentes-ia/)`, '/pt/learn/contrato-operacional-agentes-ia/');
appendMarkdown('markdown/articles/hubspot-pricing-credits-emea.md', `- [Agent Operating Contract: govern autonomy and spend →](/learn/ai-agent-operating-contract/)`, '/learn/ai-agent-operating-contract/');

console.log('Integrated agent-governance articles into Learn and relevant internal-link paths.');
