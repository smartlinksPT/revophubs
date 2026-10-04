---
title: "Lifecycle Stage, Lead Status ou Deal Stage? — RevOpsHubs"
description: "Como usar Lifecycle Stage, Lead Status, Lead Stage e Deal Stage no HubSpot sem misturar conceitos, reporting e automação."
canonical: "https://revophubs.com/pt/articles/lifecycle-stage-lead-status-deal-stage.html"
language: "pt-PT"
---

HubSpot · CRM · 11 min de leitura

# Lifecycle Stage, Lead Status ou Deal Stage? O que cada um deve dizer no HubSpot

Os três parecem responder à mesma pergunta — “em que fase está este lead?” — mas não deviam. Quando usamos os três para representar a mesma coisa, o CRM começa a contradizer-se.

### Resposta curta

**Lifecycle Stage** deve representar a relação da pessoa ou empresa com o nosso processo de receita. **Lead Status** deve representar o estado de trabalho comercial sobre um lead qualificado. **Deal Stage** deve representar o progresso de uma oportunidade concreta no processo de venda.

## Lifecycle Stage: onde está esta pessoa ou empresa no ciclo de receita?

No HubSpot, Lifecycle Stage aplica-se a contactos e empresas e categoriza-os de acordo com a posição nos processos de marketing e vendas. É uma visão macro do lifecycle, útil para reporting, segmentação e automação.

**Evidência**  
A documentação do HubSpot define Lifecycle Stage como a forma de categorizar contactos e empresas com base na posição nos processos de marketing e vendas e acompanhar a sua progressão.

## Lead Status: o que está a acontecer comercialmente com este lead?

A propriedade clássica Lead Status funciona num nível mais operacional. O HubSpot descreve-a como subfases dentro de Sales Qualified Lead, com opções como New, Open, In Progress, Attempted to Contact, Connected, Bad Timing ou Unqualified.

Não deve substituir Lifecycle Stage. É uma camada de trabalho dentro do processo comercial.

## Atenção: Lead Status não é Lead Stage

Com o objeto **Leads** do HubSpot, esta distinção ficou mais importante. Em Sales Hub Professional e Enterprise, um Lead pode ser um registo próprio associado a um contacto ou empresa, com pipeline e etapas próprias — por defeito New, Attempting, Connected, Qualified e Disqualified.

Hoje uma organização pode ter:

- Lifecycle Stage no contacto/empresa;
- Lead Status como propriedade tradicional;
- Lead Pipeline Stage num registo Lead;
- Deal Stage num negócio.

### Tese RevOpsHubs

Não use quatro propriedades para responder à mesma pergunta. Cada estado deve ter **um significado único, um owner claro e uma consequência operacional concreta**.

## Deal Stage: em que ponto está esta oportunidade específica?

Deal Stage pertence ao negócio, não ao contacto. Um contacto pode ser Customer e ter um novo negócio aberto para upsell; uma empresa pode ter vários negócios em etapas diferentes.

Uma boa Deal Stage representa uma mudança real no processo de compra e deve ter critérios observáveis de entrada e saída.

## Um modelo simples

**Lifecycle Stage = relação**  
**Lead Status / Lead Stage = trabalho comercial**  
**Deal Stage = progresso da oportunidade**

Quando existe dúvida, pergunte:

1. Este estado pertence à pessoa/empresa ou a uma oportunidade específica?
2. Quero medir mudança de lifecycle ou trabalho/progresso comercial?
3. Se este valor mudar, que decisão, automação ou relatório deve mudar com ele?

## Sinais de má arquitetura

- Lifecycle Stage muda para trás e para a frente para acompanhar tarefas.
- Deal Stage é copiado para o contacto para facilitar reporting.
- Lead Status e Lead Stage têm praticamente os mesmos valores.
- Workflows tentam sincronizar vários estados em permanência.
- Marketing e Sales usam definições diferentes para MQL, SQL e Opportunity.

Nestes casos, volte primeiro ao diagnóstico [CRM ou processo?](/pt/articles/crm-vs-process.html).

## Porque isto interessa ainda mais com IA

Para uma pessoa experiente, estados sobrepostos são incómodos. Para um agente, são contexto contraditório. Uma boa arquitetura de lifecycle é, por isso, também uma peça de [AI readiness](/pt/articles/ai-ready-revenue-system.html).

## O que faria na segunda-feira de manhã

Abra Lifecycle Stage, Lead Status, Lead Stage — se usa o objeto Leads — e Deal Stage. Ao lado de cada valor escreva:

**“Este estado significa que…”**

Depois:

**“Sabemos que é verdade quando…”**

Se duas propriedades acabam com a mesma definição, encontrou redundância. Se ninguém consegue completar a segunda frase, encontrou um problema de critério.

## Fontes

- [HubSpot Knowledge Base — Use contact and company lifecycle stages](https://knowledge.hubspot.com/records/use-lifecycle-stages)
- [HubSpot Knowledge Base — Set up and manage object pipelines](https://knowledge.hubspot.com/object-settings/set-up-and-customize-pipelines)
- [HubSpot Knowledge Base — Create leads](https://knowledge.hubspot.com/records/create-leads)
- [HubSpot Knowledge Base — Set up lead pipeline automation](https://knowledge.hubspot.com/object-settings/set-up-lead-pipeline-automation)

## Continue a explorar

- [CRM ou processo? Faça primeiro o diagnóstico →](/pt/articles/crm-vs-process.html)
- [A adoção do CRM é uma questão de desenho →](/pt/articles/crm-adoption-design.html)
- [Veja onde o CRM encaixa no Revenue System →](/pt/articles/revops-operating-system.html)
