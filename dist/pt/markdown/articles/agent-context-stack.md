# O CRM já não é apenas o System of Record. Está a tornar-se o Context System dos agentes.

Um CRM pode conter os dados certos e ainda não conseguir responder à pergunta que um agente precisa para agir. Na era dos agentes, qualidade de dados não chega: precisamos de contexto operacional utilizável.

**Tese RevOpsHubs:** o CRM continua a ser o System of Record. Mas, para agentes, começa também a funcionar como Context System: a camada que transforma dados dispersos numa representação suficientemente coerente do negócio para permitir uma decisão.

## Dados não são contexto

Um deal pode ter dezenas de propriedades corretamente preenchidas e continuar a não dar a um agente informação suficiente para decidir o próximo passo. Pode faltar quem é o decision maker, o último compromisso, a relação com outros deals, a razão real do bloqueio, os critérios de passagem e os limites de execução.

[Semantic Debt](/pt/learn/divida-semantica-crm/) e context readiness são problemas diferentes. Semantic Debt pergunta se a informação tem significado estável. Context readiness pergunta se existe a combinação certa de informação para um trabalho específico.

## O Agent Context Stack

1. **Identity** — quem é esta entidade?
2. **Relationship** — como está ligada ao resto do sistema?
3. **State** — onde está agora?
4. **History** — o que aconteceu até aqui?
5. **Intent** — o que parece estar a tentar acontecer?
6. **Rules** — que regras se aplicam?
7. **Permissions** — o que o agente pode realmente fazer?

> Um agente não precisa de “mais dados”. Precisa de contexto suficiente para a decisão que lhe estamos a pedir.

## Exemplo: qualificação inbound

Um agente de inbound não deve olhar apenas para cargo, empresa, dimensão e origem. Deve perceber se o contacto já existe, que relações tem com a conta, em que estado está, que histórico existe, que sinais de intent são observáveis, que regras de ICP e aceitação são autoritativas e se pode apenas recomendar ou também alterar o CRM.

## Falhas que parecem problemas de IA mas são problemas de contexto

- o dado está certo no registo errado;
- o estado está desatualizado;
- o significado é instável;
- intent é tratado como facto;
- duas fontes discordam e não existe uma regra de precedência;
- capacidade de inferir é confundida com permissão para executar.

## O Context Contract

Para cada use case, defina:

1. entidade de entrada;
2. relações obrigatórias;
3. estado que tem de estar atualizado;
4. janela de histórico relevante;
5. sinais de intent e confiança;
6. regras autoritativas;
7. permissões e aprovações.

O [Agent Operating Contract](/pt/learn/contrato-operacional-agentes-ia/) governa o agente. O Context Contract governa a informação mínima de que ele precisa.

## Teste o contexto antes de testar o prompt

Use o [Agent Context Readiness Check](/pt/tools/preparacao-contexto-agentes/) para avaliar Identity, Relationship, State, History, Intent, Rules e Permissions num use case concreto.

## Fontes públicas

- [HubSpot — Create and customize agents in the Agent Builder](https://knowledge.hubspot.com/ai/create-and-customize-agents-in-the-agent-builder)
- [HubSpot — Manage your CRM database](https://knowledge.hubspot.com/get-started/manage-your-crm-database)
- [OpenAI — Developer mode and MCP apps in ChatGPT](https://help.openai.com/en/articles/12584461-developer-mode-and-full-mcp-connectors-in-chatgpt)

## Continue a explorar

- [Semantic Debt →](/pt/learn/divida-semantica-crm/)
- [Workflow ou agente? →](/pt/learn/workflow-ou-agente-ia/)
- [Agent Context Readiness Check →](/pt/tools/preparacao-contexto-agentes/)
- [Agent Operating Contract Builder →](/pt/tools/contrato-operacional-agente/)
