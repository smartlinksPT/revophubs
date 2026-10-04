(() => {
  const form = document.querySelector('[data-semantic-audit]');
  if (!form) return;
  const isPt = document.documentElement.lang.toLowerCase().startsWith('pt');
  const dimensions = ['definition','evidence','ownership','transition','source'];
  const names = isPt ? {definition:'Definição',evidence:'Evidência',ownership:'Ownership',transition:'Transition Logic',source:'Source of Truth'} : {definition:'Definition',evidence:'Evidence',ownership:'Ownership',transition:'Transition Logic',source:'Source of Truth'};
  const actions = isPt ? {
    definition:['Escreva uma definição numa frase começando por “Isto significa que…”.','Adicione uma frase de exclusão: “Isto não significa…”.','Valide a definição com as equipas que usam o conceito.'],
    evidence:['Defina a evidência observável que torna o estado verdadeiro.','Troque critérios subjetivos por eventos, documentos ou sinais verificáveis.','Separe “opinião” de “evidência” em campos diferentes quando necessário.'],
    ownership:['Atribua um owner nominal para a definição.','Defina quem pode aprovar alterações ao conceito.','Crie um local simples para registar decisões e exceções.'],
    transition:['Documente entrada, saída e regressão do estado.','Identifique todos os workflows, imports e integrações que podem alterar o valor.','Teste três exceções antes de automatizar a transição.'],
    source:['Escolha um sistema e um campo como fonte autoritativa.','Liste os sistemas que podem escrever nesse valor.','Elimine sincronizações concorrentes ou defina precedência explícita.']
  } : {
    definition:['Write a one-sentence definition starting with “This means that…”.','Add an exclusion statement: “This does not mean…”.','Validate the definition with every team that uses the concept.'],
    evidence:['Define the observable evidence that makes the state true.','Replace subjective criteria with verifiable events, documents or signals.','Separate opinion from evidence into different fields when needed.'],
    ownership:['Assign one named owner for the definition.','Define who can approve changes to the concept.','Keep a simple record of decisions and exceptions.'],
    transition:['Document entry, exit and regression rules.','Identify every workflow, import and integration that can change the value.','Test three exception cases before automating the transition.'],
    source:['Choose one authoritative system and field.','List every system allowed to write to that value.','Remove competing syncs or define explicit precedence.']
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const unanswered = [...form.querySelectorAll('.semantic-question')].find(q => !q.querySelector('input:checked'));
    if (unanswered) { unanswered.scrollIntoView({behavior:'smooth',block:'center'}); unanswered.style.outline='2px solid #5300EF'; setTimeout(()=>unanswered.style.outline='',1400); return; }
    const scores = {};
    dimensions.forEach(dim => {
      const inputs = [...form.querySelectorAll(`input[data-dimension="${dim}"]:checked`)];
      scores[dim] = Math.round(inputs.reduce((sum,input)=>sum+Number(input.value),0) / (inputs.length * 2) * 100);
    });
    const total = Math.round(dimensions.reduce((sum,dim)=>sum+scores[dim],0)/dimensions.length);
    const weakest = [...dimensions].sort((a,b)=>scores[a]-scores[b])[0];
    const concept = form.querySelector('[data-concept]').value.trim() || (isPt ? 'Conceito avaliado' : 'Assessed concept');
    const result = form.querySelector('[data-semantic-result]');
    form.querySelector('[data-semantic-score]').textContent = total;
    const title = isPt
      ? (total < 40 ? 'Dívida semântica alta' : total < 70 ? 'Dívida semântica material' : total < 85 ? 'Semântica utilizável, mas frágil' : 'Semântica operacionalmente forte')
      : (total < 40 ? 'High semantic debt' : total < 70 ? 'Material semantic debt' : total < 85 ? 'Usable but fragile semantics' : 'Operationally strong semantics');
    form.querySelector('[data-semantic-title]').textContent = title;
    form.querySelector('[data-semantic-copy]').textContent = isPt
      ? `${concept}: a dimensão mais frágil é ${names[weakest]} (${scores[weakest]}/100). Corrija primeiro o significado que alimenta decisões, automações ou agentes antes de tentar “limpar” o resto do CRM.`
      : `${concept}: the weakest dimension is ${names[weakest]} (${scores[weakest]}/100). Fix the meaning that feeds decisions, automations or agents before trying to clean the rest of the CRM.`;
    form.querySelector('[data-semantic-breakdown]').innerHTML = dimensions.map(dim => `<div><span>${names[dim]}</span><i style="--score:${scores[dim]}%"></i><b>${scores[dim]}</b></div>`).join('');
    form.querySelector('[data-semantic-actions]').innerHTML = `<h3>${isPt ? 'Primeiras 3 ações' : 'First 3 actions'}</h3><ol>${actions[weakest].map(item=>`<li>${item}</li>`).join('')}</ol>`;
    const summary = `${isPt ? 'Semantic Debt Audit' : 'Semantic Debt Audit'} — ${concept}\nScore: ${total}/100\n${dimensions.map(dim=>`${names[dim]}: ${scores[dim]}/100`).join('\n')}\n\n${isPt ? 'Prioridade' : 'Priority'}: ${names[weakest]}\n${actions[weakest].map((item,i)=>`${i+1}. ${item}`).join('\n')}\n\nRevOpsHubs`;
    result.hidden = false;
    result.dataset.summary = summary;
    result.scrollIntoView({behavior:'smooth',block:'start'});
  });

  form.querySelector('[data-copy-semantic]')?.addEventListener('click', async (event) => {
    const result = form.querySelector('[data-semantic-result]');
    if (!result.dataset.summary) return;
    await navigator.clipboard.writeText(result.dataset.summary);
    event.currentTarget.textContent = isPt ? 'Resultado copiado' : 'Result copied';
  });
  form.querySelector('[data-print-semantic]')?.addEventListener('click', () => window.print());
})();
