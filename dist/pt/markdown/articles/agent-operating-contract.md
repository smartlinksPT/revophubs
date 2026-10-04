---
title: "Agent Operating Contract: framework para pôr agentes de IA em produção — RevOpsHubs"
description: "Um prompt não define ownership, permissões, aprovações, orçamento ou rollback. Use o Agent Operating Contract para colocar agentes de IA em produção com limites claros."
canonical: "https://revophubs.com/pt/articles/agent-operating-contract.html"
language: "pt-PT"
---

Agentes · Governance · Framework · 13 min de leitura

# Um bom prompt não chega. Um agente precisa de um contrato operacional.

Antes de um agente entrar em produção, deve estar claro o que tenta alcançar, que contexto pode usar, que ações pode executar, onde tem de parar e como sabemos se está a criar valor.

Framework RevOpsHubs · 4 de outubro de 2026

A maioria das experiências com agentes começa da mesma forma: escrevemos um prompt, testamos, ajustamos, ligamos uma ferramenta e alguém pergunta se já pode correr automaticamente.

É precisamente aí que o prompt deixa de chegar.

Um prompt pode explicar ao agente como deve pensar ou responder. Não define sozinho quem é responsável, que dados pode consultar, que propriedades pode alterar, que ações exigem aprovação, quanto pode gastar, quando deve escalar, como medimos qualidade ou como o desligamos.

### Tese RevOpsHubs

**Um agente em produção precisa de um contrato operacional: uma definição explícita do trabalho, contexto, autonomia, risco, economia e responsabilidade sob os quais pode operar.**

## O que é um Agent Operating Contract?

O **Agent Operating Contract** é um framework RevOpsHubs. Não é um contrato jurídico nem um documento técnico extenso.

É uma ficha operacional, idealmente de uma página, que acompanha cada agente que passa de experiência para piloto ou produção.

Serve para transformar “temos um agente que ajuda Sales” numa unidade de trabalho governável por RevOps, pelo owner do processo e por quem administra a tecnologia.

## As 10 decisões do contrato

1. **Objective — que resultado deve produzir?** Defina um resultado observável, não “ajudar vendas”.
2. **Owner — quem responde pelo desempenho?** Uma pessoa concreta define qualidade, revê falhas e aprova mudanças.
3. **Context — que informação pode usar?** CRM, notas, email, documentos, knowledge base, web ou ERP. Contexto disponível não é contexto permitido.
4. **Tools — que capacidades tem?** Pesquisar, criar tarefa, atualizar propriedade, enviar email, chamar API ou MCP.
5. **Permissions — onde pode ler e escrever?** Objetos, propriedades, sistemas e âmbitos explícitos.
6. **Approval — onde tem de pedir autorização?** Separe ações autónomas, ações com aprovação e ações proibidas.
7. **Budget — quanta capacidade pode consumir?** Runs, créditos, tokens, compute ou chamadas externas.
8. **Quality — como sabemos que está a funcionar?** Precisão, aceitação sem correção, retrabalho, tempo poupado, conversão ou custo por resultado.
9. **Escalation — quando deve parar e passar a um humano?** Dados em falta, regras em conflito, baixa confiança, exceções ou retries máximos.
10. **Rollback — como voltamos atrás?** Desativar, revogar, retirar escrita, restaurar dados ou regressar à versão anterior.

## Então o prompt deixa de ser importante?

Não. Torna-se mais importante porque deixa de carregar responsabilidades que pertencem ao sistema.

A OpenAI separa instruções, ferramentas, guardrails, MCP, handoffs e outputs estruturados; suporta ainda human review para ações sensíveis. A HubSpot permite configurar ferramentas MCP, simular execuções e definir limites mensais.

O prompt é uma parte do contrato. Não é o contrato.

> Prompt engineering diz ao agente como trabalhar. Operating design decide que trabalho pode existir e sob que limites.

## Exemplo: agente de qualificação inbound em HubSpot

Imagine uma empresa B2B com HubSpot que quer reduzir pesquisa manual após pedidos de contacto.

| Bloco | Decisão operacional |
| --- | --- |
| Objective | Preparar recomendação de qualificação e contexto da conta até 5 minutos após um novo pedido. |
| Owner | RevOps Manager; Head of Sales valida critérios de qualificação. |
| Context | Contacto/empresa no HubSpot, página de conversão, histórico, regras de ICP e pesquisa pública do domínio. |
| Tools | Leitura de CRM, pesquisa web, criação de nota e tarefa. Sem envio autónomo de email. |
| Permissions | Pode preencher propriedades de enriquecimento aprovadas. Não altera Lifecycle Stage, Deal Stage, owner ou consentimento. |
| Approval | Nota e tarefa automáticas; comunicação externa exige humano. |
| Budget | Limite mensal de runs definido após simulação de uma amostra representativa. |
| Quality | Forte concordância com revisão humana e redução mensurável do tempo de preparação; target calibrado no piloto. |
| Escalation | Empresa sem domínio, conflito de território, dados contraditórios ou caso fora do ICP → fila humana. |
| Rollback | Desativar agente, remover escrita e reverter campos através do histórico/auditoria disponível. |

O que torna este agente confiável não é apenas o prompt. São os limites operacionais.

## Nem todos os agentes precisam do mesmo nível de governance

- **Nível A · Read-only:** pesquisa e recomendação, sem escrita nem contacto externo. Contrato leve, logs e owner continuam necessários.
- **Nível B · Internal write:** atualiza propriedades, cria tarefas, notas ou tickets. Exige permissões explícitas, simulação, auditoria e rollback.
- **Nível C · External impact:** envia, publica, elimina, compromete preço, altera estados críticos ou executa ações difíceis de reverter. Aprovação e guardrails devem ser muito mais fortes.

Esta classificação liga ao [Shadow Agent Risk Model](/pt/learn/shadow-agents/): quanto maior a superfície de contexto, ferramentas, escrita e custo, mais explícito precisa de ser o contrato.

## O contrato também define como testar

Em produção, não basta avaliar a resposta final. Teste o workflow completo:

- escolheu a ferramenta certa?
- recusou ações fora do âmbito?
- pediu aprovação quando devia?
- escalou quando faltava contexto?
- manteve-se dentro do orçamento e dos runs?
- melhorou o processo ou apenas criou mais revisão?

A OpenAI recomenda avaliações com traces, tool calls, guardrails e handoffs. A HubSpot permite simular agentes sem alterar o CRM ou consumir créditos.

## O orçamento passa a ser uma propriedade do agente

Com agentes, trabalho executado e consumo ficam mais ligados. Na HubSpot, [o novo modelo EMEA torna os créditos uma unidade explícita de capacidade](/pt/learn/hubspot-pricing-creditos-emea/), e a plataforma recomenda simular execuções antes de definir limites mensais.

Um agente com 500 runs por dia é operacionalmente diferente de um agente limitado a 20 casos prioritários.

## O que faria na segunda-feira de manhã

1. Escreva o objetivo numa frase observável.
2. Nomeie um owner de negócio.
3. Liste fontes de contexto e elimine as desnecessárias.
4. Liste todas as tools e marque read/write.
5. Crie três colunas: autónomo, requer aprovação, proibido.
6. Defina um limite de utilização para o piloto.
7. Escolha uma métrica de qualidade e uma de resultado.
8. Escreva condições de escalamento.
9. Teste 20–50 casos representativos, incluindo exceções.
10. Documente como desligar ou recuar.

Se não conseguir preencher estes pontos, ainda não tem um problema de prompt. Tem um problema de desenho operacional.

## Os agentes precisam de liberdade. Mas liberdade delimitada.

Um agente que pede autorização para tudo não é útil. Um agente que pode fazer tudo não é governável.

O espaço interessante está no meio: autonomia suficiente para retirar trabalho humano, com contexto, permissões, risco, economia e responsabilidade explícitos.

> Não coloque um agente em produção porque o prompt ficou bom. Coloque-o em produção quando o sistema à volta dele estiver claro.

## Fontes públicas

- [OpenAI Developers — Agent definitions](https://developers.openai.com/api/docs/guides/agents/define-agents)
- [OpenAI Developers — Guardrails and human review](https://developers.openai.com/api/docs/guides/agents/guardrails-approvals)
- [OpenAI Developers — Evaluate agent workflows](https://developers.openai.com/api/docs/guides/agent-evals)
- [HubSpot Knowledge Base — Test and control agent credit usage](https://knowledge.hubspot.com/ai/review-estimated-credit-costs-when-using-agents)
- [HubSpot Knowledge Base — Connect apps to HubSpot's AI agents](https://knowledge.hubspot.com/integrations/customize-breeze-agents-with-hubspot-mcp-client)

## Continue a explorar

- [Shadow Agents: o novo problema de governance →](/pt/learn/shadow-agents/)
- [AI readiness começa antes da IA →](/pt/articles/ai-ready-revenue-system.html)
- [HubSpot Credits e economia dos agentes →](/pt/learn/hubspot-pricing-creditos-emea/)
- [O que é um Revenue System? →](/pt/articles/revops-operating-system.html)
