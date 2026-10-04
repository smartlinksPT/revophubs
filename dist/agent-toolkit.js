(() => {
  const pt = document.documentElement.lang.toLowerCase().startsWith('pt');
  const copyText = async (text, button, donePt = 'Resultado copiado', doneEn = 'Result copied') => {
    await navigator.clipboard.writeText(text);
    const previous = button.textContent;
    button.textContent = pt ? donePt : doneEn;
    setTimeout(() => { button.textContent = previous; }, 1800);
  };

  const contextForm = document.querySelector('[data-agent-context]');
  if (contextForm) {
    const result = contextForm.querySelector('[data-context-result]');
    const labels = pt ? {
      identity:'Identity', relationship:'Relationship', state:'State', history:'History', intent:'Intent', rules:'Rules', permissions:'Permissions'
    } : {
      identity:'Identity', relationship:'Relationship', state:'State', history:'History', intent:'Intent', rules:'Rules', permissions:'Permissions'
    };
    const actions = pt ? {
      identity:['Defina a entidade que inicia o trabalho e a chave que a identifica.', 'Resolva duplicados que possam alterar uma decisão.', 'Documente quando dois registos representam a mesma entidade real.'],
      relationship:['Liste as associações mínimas necessárias para o use case.', 'Defina papéis relevantes: owner, buying role, account, deal ou território.', 'Teste casos com múltiplas associações antes de produção.'],
      state:['Escolha um estado autoritativo para a decisão.', 'Defina quem ou o que o pode alterar.', 'Crie uma regra de recência para detetar estados potencialmente desatualizados.'],
      history:['Defina que janela de histórico é necessária.', 'Garanta acesso a reuniões, emails, tarefas ou mudanças de estado relevantes.', 'Separe eventos concluídos de compromissos ainda em aberto.'],
      intent:['Separe sinais observados de inferências.', 'Defina níveis de confiança para intent inferido.', 'Nunca use um sinal probabilístico como facto sem regra de validação quando o impacto é alto.'],
      rules:['Documente as regras que realmente comandam a decisão.', 'Escolha uma fonte autoritativa para ICP, stage criteria, pricing ou hand-offs.', 'Especifique como tratar exceções e conflitos entre regras.'],
      permissions:['Comece por read/recommend e abra write apenas quando necessário.', 'Defina ações que exigem aprovação humana.', 'Documente quem consegue revogar acesso ou desligar o agente.']
    } : {
      identity:['Define the entity that starts the job and the key that identifies it.', 'Resolve duplicates that could change a decision.', 'Document when two records represent the same real-world entity.'],
      relationship:['List the minimum associations required for the use case.', 'Define relevant roles: owner, buying role, account, deal or territory.', 'Test cases with multiple associations before production.'],
      state:['Choose one authoritative state for the decision.', 'Define who or what may change it.', 'Add a recency rule for detecting potentially stale states.'],
      history:['Define the history window the use case needs.', 'Ensure access to relevant meetings, emails, tasks or state changes.', 'Separate completed events from commitments that are still open.'],
      intent:['Separate observed signals from inference.', 'Define confidence levels for inferred intent.', 'Do not treat a probabilistic signal as fact without validation when impact is high.'],
      rules:['Document the rules that actually govern the decision.', 'Choose an authoritative source for ICP, stage criteria, pricing or hand-offs.', 'Specify how exceptions and rule conflicts are handled.'],
      permissions:['Start with read/recommend and add write only when required.', 'Define actions that require human approval.', 'Document who can revoke access or stop the agent.']
    };
    let summary = '';

    contextForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const radios = [...contextForm.querySelectorAll('input[type="radio"]')];
      const names = [...new Set(radios.map(r => r.name))];
      const selected = names.map(name => contextForm.querySelector(`input[name="${name}"]:checked`));
      if (selected.some(Boolean) === false || selected.some(x => !x)) {
        contextForm.querySelector('.agent-section')?.scrollIntoView({behavior:'smooth', block:'start'});
        return;
      }
      const values = Object.fromEntries(selected.map(input => [input.dataset.dimension, Number(input.value)]));
      const keys = Object.keys(labels);
      const total = Math.round(keys.reduce((sum,key) => sum + values[key],0) / (keys.length * 2) * 100);
      const useCase = contextForm.querySelector('[data-use-case]');
      const useCaseLabel = useCase.options[useCase.selectedIndex].textContent;
      const risky = ['next_action','crm_update','customer_response'].includes(useCase.value);
      let status = total >= 80 ? 'ready' : total >= 55 ? 'constrained' : 'unsafe';
      if (values.permissions === 0 && risky) status = 'unsafe';
      if ((values.rules === 0 || values.state === 0) && status === 'ready') status = 'constrained';
      const statusTitle = pt ? {
        ready:'Ready: o contexto é suficientemente forte para um piloto controlado.',
        constrained:'Constrained: o use case é viável, mas tem dependências de contexto.',
        unsafe:'Unsafe: falta contexto crítico para dar autonomia com segurança.'
      }[status] : {
        ready:'Ready: context is strong enough for a controlled pilot.',
        constrained:'Constrained: the use case is viable, but context dependencies remain.',
        unsafe:'Unsafe: critical context is missing for safe autonomy.'
      }[status];
      const statusCopy = pt ? {
        ready:`Para “${useCaseLabel}”, o stack está suficientemente completo para testar o agente com limites explícitos, casos de exceção e monitorização.`,
        constrained:`Para “${useCaseLabel}”, não aumente autonomia antes de corrigir as dimensões mais fracas. Um bom prompt não resolve contexto ausente.`,
        unsafe:`Para “${useCaseLabel}”, comece por contexto e governance. Dar write ou impacto externo agora transformaria lacunas de informação em risco operacional.`
      }[status] : {
        ready:`For “${useCaseLabel}”, the stack is complete enough to test the agent with explicit boundaries, exception cases and monitoring.`,
        constrained:`For “${useCaseLabel}”, do not increase autonomy before fixing the weakest dimensions. A good prompt cannot compensate for missing context.`,
        unsafe:`For “${useCaseLabel}”, start with context and governance. Granting write or external impact now would turn information gaps into operating risk.`
      }[status];
      const ranking = keys.map(key => ({key, score:values[key] * 50})).sort((a,b)=>a.score-b.score);
      contextForm.querySelector('[data-context-score]').textContent = total;
      contextForm.querySelector('[data-context-title]').textContent = statusTitle;
      contextForm.querySelector('[data-context-copy]').textContent = statusCopy;
      contextForm.querySelector('[data-context-breakdown]').innerHTML = ranking.map(item => `<div><span>${labels[item.key]}</span><i style="--score:${item.score}%"></i><b>${item.score}</b></div>`).join('');
      const weakest = ranking.slice(0,3);
      contextForm.querySelector('[data-context-actions]').innerHTML = `<h3>${pt ? 'Três prioridades' : 'Three priorities'}</h3><ol>${weakest.map(item => `<li><strong>${labels[item.key]}:</strong> ${actions[item.key][0]}</li>`).join('')}</ol>`;
      summary = `${pt ? 'Agent Context Readiness Check' : 'Agent Context Readiness Check'}\n${useCaseLabel}: ${total}/100 — ${status.toUpperCase()}\n\n${weakest.map(item => `${labels[item.key]}: ${item.score}/100 — ${actions[item.key][0]}`).join('\n')}\n\nRevOpsHubs`;
      result.hidden = false;
      result.scrollIntoView({behavior:'smooth', block:'center'});
    });
    contextForm.querySelector('[data-copy-context]')?.addEventListener('click', e => copyText(summary, e.currentTarget));
    contextForm.querySelector('[data-print-context]')?.addEventListener('click', () => window.print());
  }

  const decisionForm = document.querySelector('[data-agent-decision]');
  if (decisionForm) {
    const result = decisionForm.querySelector('[data-decision-result]');
    let summary = '';
    decisionForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const selected = [...decisionForm.querySelectorAll('.agent-question')].map(q => q.querySelector('input:checked'));
      if (selected.some(x => !x)) return;
      const v = selected.map(x => Number(x.value));
      const uncertainty = (v[0]+v[1]+v[2])/3;
      const impact = (v[3]+v[4]+v[5])/3;
      let key;
      if (uncertainty < .67) key = 'workflow';
      else if (uncertainty < 1.34 && impact < 1.2) key = 'ai_workflow';
      else if (uncertainty >= 1.34 && impact < .9) key = 'agent';
      else if (impact >= 1.65 && v[4] === 2 && v[5] === 2) key = 'human';
      else key = 'agent_approval';
      const outcomes = pt ? {
        workflow:{title:'Workflow',copy:'A decisão é suficientemente determinística para ser codificada. Prefira regras explícitas, observáveis e testáveis antes de introduzir raciocínio agêntico.',actions:['Documente a regra e as exceções.', 'Defina owner e caminho de erro.', 'Meça failure demand antes de acrescentar IA.']},
        ai_workflow:{title:'AI-assisted workflow',copy:'Existe alguma interpretação de conteúdo não estruturado, mas a sequência principal continua previsível. Use IA dentro de um workflow em vez de dar autonomia ampla a um agente.',actions:['Mantenha triggers e outputs determinísticos.', 'Use IA apenas na etapa que requer interpretação ou geração.', 'Defina fallback quando a confiança é baixa.']},
        agent:{title:'Agent',copy:'O trabalho tem incerteza real, múltiplos caminhos e impacto relativamente controlado. Um agente pode ser o mecanismo certo, desde que o contexto e as ferramentas estejam delimitados.',actions:['Faça o Agent Context Readiness Check.', 'Defina um Agent Operating Contract.', 'Comece com autonomia reversível e observabilidade.']},
        agent_approval:{title:'Agent + human approval',copy:'O trabalho exige julgamento e tem impacto material. O agente pode analisar, recomendar e preparar a ação, mas deve parar antes de decisões ou execuções sensíveis.',actions:['Defina exatamente onde a aprovação é obrigatória.', 'Mostre ao aprovador contexto, proposta e efeitos da ação.', 'Registe decisão, execução e rollback.']},
        human:{title:'Human decision + AI assistance',copy:'A combinação de impacto externo elevado e baixa reversibilidade torna a autonomia inadequada. Use IA para pesquisa, síntese ou recomendação; mantenha a decisão e execução sob responsabilidade humana.',actions:['Use IA para reduzir trabalho cognitivo, não autoridade.', 'Exija revisão humana antes da ação.', 'Reavalie apenas quando existirem melhores guardrails ou reversibilidade.']}
      } : {
        workflow:{title:'Workflow',copy:'The decision is deterministic enough to encode. Prefer explicit, observable and testable rules before adding agentic reasoning.',actions:['Document the rule and exceptions.', 'Define an owner and error path.', 'Measure failure demand before adding AI.']},
        ai_workflow:{title:'AI-assisted workflow',copy:'Some interpretation of unstructured content is required, but the main sequence remains predictable. Use AI inside a workflow rather than granting broad agent autonomy.',actions:['Keep triggers and outputs deterministic.', 'Use AI only for the step that requires interpretation or generation.', 'Define a fallback for low-confidence outputs.']},
        agent:{title:'Agent',copy:'The job contains genuine uncertainty, multiple paths and relatively controlled impact. An agent may be appropriate if context and tools are bounded.',actions:['Run the Agent Context Readiness Check.', 'Define an Agent Operating Contract.', 'Start with reversible autonomy and observability.']},
        agent_approval:{title:'Agent + human approval',copy:'The job requires judgement and carries material impact. The agent can analyse, recommend and prepare the action, but should stop before sensitive decisions or execution.',actions:['Define exactly where approval is mandatory.', 'Show the approver context, recommendation and effects.', 'Log the decision, execution and rollback path.']},
        human:{title:'Human decision + AI assistance',copy:'High external impact and low reversibility make autonomy inappropriate. Use AI for research, synthesis or recommendation while keeping decision and execution under human responsibility.',actions:['Use AI to reduce cognitive work, not authority.', 'Require human review before action.', 'Reassess only when stronger guardrails or reversibility exist.']}
      };
      const out = outcomes[key];
      const uPct = Math.round(uncertainty/2*100), iPct = Math.round(impact/2*100);
      decisionForm.querySelector('[data-decision-title]').textContent = out.title;
      decisionForm.querySelector('[data-decision-copy]').textContent = out.copy;
      decisionForm.querySelector('[data-uncertainty]').textContent = `${uPct}/100`;
      decisionForm.querySelector('[data-impact]').textContent = `${iPct}/100`;
      decisionForm.querySelector('[data-decision-actions]').innerHTML = `<h3>${pt ? 'Próximos passos' : 'Next steps'}</h3><ol>${out.actions.map(x=>`<li>${x}</li>`).join('')}</ol>`;
      const contractLink = decisionForm.querySelector('[data-contract-link]');
      if (contractLink) contractLink.hidden = !['agent','agent_approval'].includes(key);
      summary = `${pt ? 'Workflow ou Agent Decision Tool' : 'Workflow vs Agent Decision Tool'}\n${out.title}\n${pt ? 'Incerteza' : 'Uncertainty'}: ${uPct}/100\n${pt ? 'Impacto' : 'Impact'}: ${iPct}/100\n\n${out.copy}\n\n${out.actions.map((x,i)=>`${i+1}. ${x}`).join('\n')}\n\nRevOpsHubs`;
      result.hidden = false;
      result.scrollIntoView({behavior:'smooth', block:'center'});
    });
    decisionForm.querySelector('[data-copy-decision]')?.addEventListener('click', e => copyText(summary, e.currentTarget));
    decisionForm.querySelector('[data-print-decision]')?.addEventListener('click', () => window.print());
  }

  const contractForm = document.querySelector('[data-contract-builder]');
  if (contractForm) {
    const result = contractForm.querySelector('[data-contract-result]');
    let summary = '';
    contractForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const fields = ['name','objective','owner','context','tools','permissions','approval','budget','quality','escalation','rollback','tier'];
      const values = Object.fromEntries(fields.map(name => [name, contractForm.elements[name]?.value?.trim() || '—']));
      if (values.objective === '—' || values.owner === '—') return;
      const labels = pt ? {
        name:'Agente',objective:'Objetivo',owner:'Owner',context:'Contexto mínimo',tools:'Tools',permissions:'Permissões',approval:'Aprovações',budget:'Budget / limites',quality:'Qualidade / KPI',escalation:'Escalamento',rollback:'Rollback',tier:'Nível de autonomia'
      } : {
        name:'Agent',objective:'Objective',owner:'Owner',context:'Minimum context',tools:'Tools',permissions:'Permissions',approval:'Approvals',budget:'Budget / limits',quality:'Quality / KPI',escalation:'Escalation',rollback:'Rollback',tier:'Autonomy tier'
      };
      contractForm.querySelector('[data-contract-output]').innerHTML = `<h3>${values.name !== '—' ? values.name : (pt ? 'Agent Operating Contract' : 'Agent Operating Contract')}</h3><dl>${fields.filter(f=>f!=='name').map(f=>`<div><dt>${labels[f]}</dt><dd>${values[f].replaceAll('<','&lt;').replaceAll('>','&gt;')}</dd></div>`).join('')}</dl>`;
      summary = `# ${values.name !== '—' ? values.name : 'Agent Operating Contract'}\n\n${fields.filter(f=>f!=='name').map(f=>`## ${labels[f]}\n${values[f]}`).join('\n\n')}\n\nRevOpsHubs`;
      result.hidden = false;
      result.scrollIntoView({behavior:'smooth', block:'start'});
    });
    contractForm.querySelector('[data-copy-contract]')?.addEventListener('click', e => copyText(summary, e.currentTarget, 'Contrato copiado', 'Contract copied'));
    contractForm.querySelector('[data-print-contract]')?.addEventListener('click', () => window.print());
  }
})();