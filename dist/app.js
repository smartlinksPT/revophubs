(() => {
  const isPortuguese = document.documentElement.lang.toLowerCase().startsWith('pt');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  const assessment = document.querySelector('[data-assessment]');
  if (assessment) {

  const steps = [...assessment.querySelectorAll('.question-step')];
  const form = assessment.querySelector('form');
  const result = assessment.querySelector('[data-result]');
  const next = assessment.querySelector('[data-next]');
  const back = assessment.querySelector('[data-back]');
  const progress = assessment.querySelector('[data-progress]');
  const progressLabel = assessment.querySelector('[data-progress-label]');
  let current = 0;
  let lastSummary = '';

  function update() {
    steps.forEach((step, index) => step.classList.toggle('active', index === current));
    progress.style.setProperty('--progress', `${((current + 1) / steps.length) * 100}%`);
    progressLabel.textContent = isPortuguese ? `Pergunta ${current + 1} de ${steps.length}` : `Question ${current + 1} of ${steps.length}`;
    back.disabled = current === 0;
    next.textContent = current === steps.length - 1 ? (isPortuguese ? 'Ver o meu resultado' : 'See my result') : (isPortuguese ? 'Pergunta seguinte' : 'Next question');
  }

  back.addEventListener('click', () => {
    if (current > 0) { current -= 1; update(); }
  });

  next.addEventListener('click', () => {
    const selected = steps[current].querySelector('input:checked');
    if (!selected) {
      const first = steps[current].querySelector('.choice');
      first.style.borderColor = '#155eef';
      return;
    }
    if (current < steps.length - 1) { current += 1; update(); return; }
    showResult();
  });

  function showResult() {
    const scores = steps.map((step, index) => ({ layer: step.dataset.layer, score: Number(step.querySelector(`input[name="q${index + 1}"]:checked`).value) * 25 }));
    const total = Math.round(scores.reduce((sum, item) => sum + item.score, 0) / scores.length);
    const weakest = [...scores].sort((a, b) => a.score - b.score)[0];
    const title = isPortuguese
      ? (total < 40 ? 'O sistema depende do esforço individual.' : total < 70 ? 'O seu sistema tem uma base para desenvolver.' : 'O seu sistema está conectado — teste agora a sua resiliência.')
      : (total < 40 ? 'The system is relying on individual effort.' : total < 70 ? 'Your system has a foundation to build on.' : 'Your system is connected — now test its resilience.');
    assessment.querySelector('[data-total-score]').textContent = total;
    assessment.querySelector('[data-result-title]').textContent = title;
    const paths = isPortuguese ? {
      Strategy: { actions: ['Clarifique um ICP principal e o problema que está melhor posicionado para resolver.', 'Escolha o movimento comercial prioritário para os próximos 30 dias.', 'Alinhe marketing, vendas e equipas de clientes em torno de um objetivo de receita partilhado.'], article: ['/pt/articles/pipeline-system-problem.html', 'Porque é que mais pipeline não resolve um problema de sistema'], hub: ['/pt/model.html#strategy', 'Explorar a camada de Estratégia'] },
      Process: { actions: ['Mapeie a passagem de trabalho com mais fricção no ciclo de vida do cliente.', 'Defina critérios observáveis de entrada e saída para as duas etapas em causa.', 'Atribua um responsável e reveja a passagem semanalmente durante 30 dias.'], article: ['/pt/articles/revenue-handoffs.html', 'A receita perde-se nas passagens de trabalho'], hub: ['/pt/model.html#process', 'Explorar a camada de Processo'] },
      CRM: { actions: ['Liste as decisões que o CRM deve ajudar os utilizadores a tomar todos os dias.', 'Remova ou adie campos que não suportem essas decisões.', 'Observe porque é que uma equipa trabalha fora do CRM antes de acrescentar formação.'], article: ['/pt/articles/crm-adoption-design.html', 'A adoção do CRM é uma questão de desenho operacional'], hub: ['/pt/readiness.html', 'Fazer o teste de preparação do CRM'] },
      Data: { actions: ['Escolha três métricas de receita que suportem uma decisão real.', 'Escreva uma definição partilhada e indique um responsável por cada métrica.', 'Resolva o desacordo mais relevante antes de criar outro dashboard.'], article: ['/pt/articles/revops-operating-system.html', 'RevOps é um sistema operacional'], hub: ['/pt/model.html#data', 'Explorar a camada de Dados'] },
      Automation: { actions: ['Identifique uma tarefa repetida dentro de um processo estável.', 'Documente a regra, o responsável e o caminho de exceção antes de automatizar.', 'Meça o tempo poupado e a procura gerada por falhas durante 30 dias.'], article: ['/pt/articles/revenue-handoffs.html', 'Corrigir a passagem antes de a automatizar'], hub: ['/pt/model.html#automation', 'Explorar a camada de Automação'] },
      AI: { actions: ['Selecione um fluxo de trabalho com contexto fiável e um responsável humano claro.', 'Defina o que a IA pode propor, decidir e nunca fazer sozinha.', 'Execute um teste de quatro semanas sobre qualidade, velocidade e retrabalho.'], article: ['/pt/articles/ai-ready-revenue-system.html', 'A preparação para IA começa antes da camada de IA'], hub: ['/pt/model.html#ai', 'Explorar a camada de IA'] }
    } : {
      Strategy: { actions: ['Clarify one primary ICP and the problem you are best placed to solve.', 'Choose the commercial motion that deserves priority for the next 30 days.', 'Align marketing, sales and customer teams on one shared revenue objective.'], article: ['/articles/pipeline-system-problem.html', 'Why more pipeline does not solve a system problem'], hub: ['/model.html#strategy', 'Explore the Strategy layer'] },
      Process: { actions: ['Map the highest-friction hand-off in the customer lifecycle.', 'Define observable entry and exit criteria for the two stages around it.', 'Assign one owner and review the hand-off weekly for 30 days.'], article: ['/articles/revenue-handoffs.html', 'Revenue leaks at the hand-offs'], hub: ['/model.html#process', 'Explore the Process layer'] },
      CRM: { actions: ['List the decisions the CRM must help users make every day.', 'Remove or postpone fields that do not support those decisions.', 'Observe why one team works outside the CRM before adding training.'], article: ['/articles/crm-adoption-design.html', 'CRM adoption is an operating-design issue'], hub: ['/readiness.html', 'Run the CRM Readiness Check'] },
      Data: { actions: ['Choose three revenue measures that support an actual decision.', 'Write one shared definition and owner for each measure.', 'Resolve the most material disagreement before building another dashboard.'], article: ['/articles/revops-operating-system.html', 'RevOps is an operating system'], hub: ['/model.html#data', 'Explore the Data layer'] },
      Automation: { actions: ['Identify one repeated task inside a stable process.', 'Document the rule, owner and exception path before automating it.', 'Measure time saved and failure demand for 30 days.'], article: ['/articles/revenue-handoffs.html', 'Fix the hand-off before automating it'], hub: ['/model.html#automation', 'Explore the Automation layer'] },
      AI: { actions: ['Select one workflow with trusted context and a clear human owner.', 'Define what the AI may propose, decide and never do alone.', 'Run a four-week test against quality, speed and rework.'], article: ['/articles/ai-ready-revenue-system.html', 'AI readiness starts before the AI layer'], hub: ['/model.html#ai', 'Explore the AI layer'] }
    };
    const path = paths[weakest.layer];
    assessment.querySelector('[data-result-copy]').textContent = isPortuguese
      ? `A camada com pontuação mais baixa é ${weakest.layer === 'Strategy' ? 'Estratégia' : weakest.layer === 'Process' ? 'Processo' : weakest.layer === 'Data' ? 'Dados' : weakest.layer === 'Automation' ? 'Automação' : weakest.layer === 'AI' ? 'IA' : weakest.layer}. Comece aí: melhorar uma ferramenta a jusante antes de reforçar esta limitação irá provavelmente acrescentar atividade sem corrigir o sistema.`
      : `Your lowest-scoring layer is ${weakest.layer}. Start there: improving a downstream tool before strengthening this constraint is likely to add activity without fixing the system.`;
    const translatedLayers = { Strategy: 'Estratégia', Process: 'Processo', CRM: 'CRM', Data: 'Dados', Automation: 'Automação', AI: 'IA' };
    assessment.querySelector('[data-breakdown]').innerHTML = scores.map((item) => `<div><span>${isPortuguese ? translatedLayers[item.layer] : item.layer}</span><i style="--layer-score:${item.score}%"></i><b>${item.score}</b></div>`).join('');
    const plan = assessment.querySelector('[data-result-plan]');
    const resources = assessment.querySelector('[data-result-resources]');
    if (plan) plan.innerHTML = `<h3>${isPortuguese ? 'Os seus próximos 30 dias' : 'Your next 30 days'}</h3><ol>${path.actions.map((action) => `<li>${action}</li>`).join('')}</ol>`;
    if (resources) resources.innerHTML = `<a href="${path.article[0]}">${path.article[1]} →</a><a href="${path.hub[0]}">${path.hub[1]} →</a>`;
    lastSummary = isPortuguese
      ? `Diagnóstico do sistema de receita: ${total}/100\nCamada mais frágil: ${weakest.layer}\n\nPróximos 30 dias:\n${path.actions.map((action, index) => `${index + 1}. ${action}`).join('\n')}\n\nRevOpHubs`
      : `Revenue System Assessment: ${total}/100\nWeakest layer: ${weakest.layer}\n\nNext 30 days:\n${path.actions.map((action, index) => `${index + 1}. ${action}`).join('\n')}\n\nRevOpHubs`;
    form.hidden = true;
    result.classList.add('active');
    assessment.querySelector('.progress-wrap').hidden = true;
    assessment.querySelector('.progress-bar').hidden = true;
    result.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  update();
  assessment.querySelector('[data-copy-result]')?.addEventListener('click', async (event) => {
    await navigator.clipboard.writeText(lastSummary);
    event.currentTarget.textContent = isPortuguese ? 'Resultado copiado' : 'Result copied';
  });
  assessment.querySelector('[data-download-result]')?.addEventListener('click', () => {
    const blob = new Blob([lastSummary], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = isPortuguese ? 'revophubs-resultado-diagnostico.txt' : 'revophubs-assessment-result.txt';
    link.click();
    URL.revokeObjectURL(link.href);
  });
  }

  const readiness = document.querySelector('[data-readiness]');
  if (readiness) {
    const boxes = [...readiness.querySelectorAll('input[type="checkbox"]')];
    const result = readiness.querySelector('[data-readiness-result]');
    let readinessSummary = '';
    readiness.addEventListener('submit', (event) => {
      event.preventDefault();
      const checked = boxes.filter((box) => box.checked).length;
      const score = Math.round((checked / boxes.length) * 100);
      const title = isPortuguese
        ? (score < 45 ? 'Desenhe primeiro o modelo operacional.' : score < 75 ? 'Avance, mas torne as condições explícitas.' : 'Está preparado para configurar com disciplina.')
        : (score < 45 ? 'Design the operating model first.' : score < 75 ? 'Proceed, but make the conditions explicit.' : 'You are ready to configure with discipline.');
      const copy = isPortuguese
        ? (score < 45 ? 'O maior risco é codificar definições e responsabilidades pouco claras num novo sistema. Use a próxima fase para alinhar ciclo de vida, decisões e governação.' : score < 75 ? 'A iniciativa de CRM pode avançar se os pontos por resolver se tornarem dependências identificadas, com responsáveis e prazos.' : 'As condições essenciais estão presentes. Mantenha a adoção e a qualidade das decisões como métricas de desenho, não como preocupações pós-lançamento.')
        : (score < 45 ? 'The greatest risk is encoding unclear definitions and ownership into a new system. Use the next phase to align the lifecycle, decisions and governance.' : score < 75 ? 'A CRM initiative can move forward if the unresolved items become named project dependencies with owners and deadlines.' : 'The core conditions are present. Keep adoption and decision quality as design measures, not post-launch concerns.');
      readiness.querySelector('[data-readiness-score]').textContent = score;
      readiness.querySelector('[data-readiness-title]').textContent = title;
      readiness.querySelector('[data-readiness-copy]').textContent = copy;
      readinessSummary = `${isPortuguese ? 'Teste de preparação do CRM' : 'CRM Readiness Check'}: ${score}/100\n${title}\n${copy}\n\nRevOpHubs`;
      result.hidden = false;
      result.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    readiness.querySelector('[data-copy-readiness]')?.addEventListener('click', async (event) => {
      await navigator.clipboard.writeText(readinessSummary);
      event.currentTarget.textContent = isPortuguese ? 'Resultado copiado' : 'Result copied';
    });
  }

  // Progressive enhancement for browsers and agents that implement the
  // WebMCP draft. The tools are read-only and mirror the human-facing tools.
  if (document.modelContext?.registerTool) {
    const assessmentPaths = isPortuguese ? {
      strategy: ['Clarifique um ICP principal e o problema que está melhor posicionado para resolver.', 'Escolha o movimento comercial prioritário para os próximos 30 dias.', 'Alinhe as equipas em torno de um objetivo de receita partilhado.'],
      process: ['Mapeie a passagem de trabalho com mais fricção.', 'Defina critérios observáveis de entrada e saída.', 'Atribua um responsável e reveja semanalmente durante 30 dias.'],
      crm: ['Liste as decisões que o CRM deve ajudar a tomar.', 'Remova campos que não suportem essas decisões.', 'Observe porque se trabalha fora do CRM antes de acrescentar formação.'],
      data: ['Escolha três métricas que suportem decisões reais.', 'Defina e atribua um responsável a cada métrica.', 'Resolva o desacordo mais relevante antes de criar outro dashboard.'],
      automation: ['Identifique uma tarefa repetida num processo estável.', 'Documente a regra, o responsável e as exceções.', 'Meça o tempo poupado e o retrabalho durante 30 dias.'],
      ai: ['Selecione um fluxo com contexto fiável e responsável humano.', 'Defina o que a IA pode propor, decidir e nunca fazer sozinha.', 'Teste durante quatro semanas a qualidade, a velocidade e o retrabalho.']
    } : {
      strategy: ['Clarify one primary ICP and the problem you are best placed to solve.', 'Choose the commercial motion that deserves priority for the next 30 days.', 'Align marketing, sales and customer teams on one shared revenue objective.'],
      process: ['Map the highest-friction hand-off in the customer lifecycle.', 'Define observable entry and exit criteria for the two stages around it.', 'Assign one owner and review the hand-off weekly for 30 days.'],
      crm: ['List the decisions the CRM must help users make every day.', 'Remove or postpone fields that do not support those decisions.', 'Observe why one team works outside the CRM before adding training.'],
      data: ['Choose three revenue measures that support an actual decision.', 'Write one shared definition and owner for each measure.', 'Resolve the most material disagreement before building another dashboard.'],
      automation: ['Identify one repeated task inside a stable process.', 'Document the rule, owner and exception path before automating it.', 'Measure time saved and failure demand for 30 days.'],
      ai: ['Select one workflow with trusted context and a clear human owner.', 'Define what the AI may propose, decide and never do alone.', 'Run a four-week test against quality, speed and rework.']
    };
    const layerLabels = isPortuguese
      ? { strategy: 'Estratégia', process: 'Processo', crm: 'CRM', data: 'Dados', automation: 'Automação', ai: 'IA' }
      : { strategy: 'Strategy', process: 'Process', crm: 'CRM', data: 'Data', automation: 'Automation', ai: 'AI' };
    const localePrefix = isPortuguese ? '/pt' : '';
    const layerUrls = { strategy: `${localePrefix}/model.html#strategy`, process: `${localePrefix}/model.html#process`, crm: `${localePrefix}/readiness.html`, data: `${localePrefix}/model.html#data`, automation: `${localePrefix}/model.html#automation`, ai: `${localePrefix}/model.html#ai` };

    document.modelContext.registerTool({
      name: 'assess_revenue_system',
      title: isPortuguese ? 'Avaliar um sistema de receita' : 'Assess a revenue system',
      description: isPortuguese ? 'Avalia as seis camadas de um sistema de receita, identifica a mais frágil e devolve um plano de ação prático para 30 dias. Cada entrada usa uma escala de 1 (pontual) a 4 (governada e continuamente melhorada).' : 'Scores the six layers of a revenue system, identifies its weakest layer and returns a practical 30-day action plan. Each input uses a scale from 1 (ad hoc) to 4 (governed and continuously improved).',
      inputSchema: {
        type: 'object',
        properties: Object.fromEntries(Object.keys(layerLabels).map((layer) => [layer, { type: 'integer', minimum: 1, maximum: 4, description: `${layerLabels[layer]} maturity from 1 to 4` }])),
        required: Object.keys(layerLabels),
        additionalProperties: false
      },
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
      execute: async (input) => {
        const ranked = Object.entries(layerLabels).map(([key, label]) => ({ key, label, score: input[key] * 25 }));
        const score = Math.round(ranked.reduce((sum, layer) => sum + layer.score, 0) / ranked.length);
        const weakest = [...ranked].sort((a, b) => a.score - b.score)[0];
        const result = {
          score,
          maximumScore: 100,
          weakestLayer: weakest.label,
          layerScores: Object.fromEntries(ranked.map((layer) => [layer.label, layer.score])),
          next30Days: assessmentPaths[weakest.key],
          methodologyUrl: new URL(layerUrls[weakest.key], location.origin).href,
          fullAssessmentUrl: new URL(`${localePrefix}/assessment.html`, location.origin).href
        };
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
      }
    });

    document.modelContext.registerTool({
      name: 'check_crm_readiness',
      title: isPortuguese ? 'Testar a preparação do CRM' : 'Check CRM readiness',
      description: isPortuguese ? 'Converte o número de condições de preparação do CRM cumpridas numa pontuação e numa recomendação operacional.' : 'Converts the number of satisfied CRM readiness conditions into a score and an operating recommendation.',
      inputSchema: {
        type: 'object',
        properties: { checksPassed: { type: 'integer', minimum: 0, maximum: 9, description: 'Number of readiness conditions currently satisfied, from 0 to 9' } },
        required: ['checksPassed'],
        additionalProperties: false
      },
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
      execute: async ({ checksPassed }) => {
        const score = Math.round((checksPassed / 9) * 100);
        const recommendation = isPortuguese
          ? (score < 45 ? 'Desenhe primeiro o modelo operacional. Alinhe o ciclo de vida, as decisões e a governação antes da configuração.' : score < 75 ? 'Avance, mas transforme os pontos por resolver em dependências explícitas, com responsáveis e prazos.' : 'Configure com disciplina, mantendo a adoção e a qualidade das decisões como métricas de desenho.')
          : (score < 45 ? 'Design the operating model first. Align the lifecycle, decisions and governance before configuration.' : score < 75 ? 'Proceed, but make unresolved items explicit project dependencies with owners and deadlines.' : 'Configure with discipline, keeping adoption and decision quality as design measures.');
        const result = { score, maximumScore: 100, checksPassed, recommendation, readinessCheckUrl: new URL(`${localePrefix}/readiness.html`, location.origin).href };
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
      }
    });
  }
})();
