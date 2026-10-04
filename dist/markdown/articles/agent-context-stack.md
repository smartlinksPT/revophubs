# The CRM is no longer only the System of Record. It is becoming the Context System for agents.

A CRM can contain the right data and still fail to answer the question an agent needs in order to act. In an agentic operating model, data quality is necessary but not sufficient: usable context becomes a production dependency.

**RevOpsHubs Thesis:** the CRM remains the System of Record. But for agents it is also becoming a Context System: the layer that turns distributed data into a sufficiently coherent representation of the business to support a decision.

## Data is not context

A deal can contain dozens of correctly populated properties and still fail to provide enough information for an agent to choose the next action. It may be missing the decision maker, the latest commitment, the relationship to other deals, the true reason for stalling, stage criteria or execution limits.

[Semantic Debt](/learn/semantic-debt/) and context readiness are different problems. Semantic Debt asks whether information has stable meaning. Context readiness asks whether the right combination of information exists for a specific job.

## The Agent Context Stack

1. **Identity** — what entity is this?
2. **Relationship** — how is it connected to the rest of the system?
3. **State** — where is it now?
4. **History** — what happened before?
5. **Intent** — what appears to be happening next?
6. **Rules** — which rules apply?
7. **Permissions** — what may the agent actually do?

> An agent does not need “more data”. It needs enough context for the decision we are asking it to make.

## Example: inbound qualification

An inbound agent should not only inspect title, company, size and source. It should understand whether the contact already exists, how it relates to the account, its current state, relevant history, observable intent signals, authoritative ICP and acceptance rules, and whether the agent may only recommend or also update the CRM.

## Failures that look like AI problems but are context problems

- the right data is on the wrong record;
- the current state is stale;
- meaning is unstable;
- inferred intent is treated as fact;
- two sources disagree and no precedence rule exists;
- the ability to infer is confused with permission to execute.

## The Context Contract

For each use case, define:

1. the entry entity;
2. mandatory relationships;
3. the state that must be current;
4. the relevant history window;
5. intent signals and confidence;
6. authoritative rules;
7. permissions and approvals.

The [Agent Operating Contract](/learn/ai-agent-operating-contract/) governs the agent. The Context Contract governs the minimum information it needs.

## Test context before testing the prompt

Use the [Agent Context Readiness Check](/tools/agent-context-readiness/) to assess Identity, Relationship, State, History, Intent, Rules and Permissions for one concrete use case.

## Public sources

- [HubSpot — Create and customize agents in the Agent Builder](https://knowledge.hubspot.com/ai/create-and-customize-agents-in-the-agent-builder)
- [HubSpot — Manage your CRM database](https://knowledge.hubspot.com/get-started/manage-your-crm-database)
- [OpenAI — Developer mode and MCP apps in ChatGPT](https://help.openai.com/en/articles/12584461-developer-mode-and-full-mcp-connectors-in-chatgpt)

## Keep going

- [Semantic Debt →](/learn/semantic-debt/)
- [Workflow or agent? →](/learn/workflow-vs-ai-agent/)
- [Agent Context Readiness Check →](/tools/agent-context-readiness/)
- [Agent Operating Contract Builder →](/tools/agent-operating-contract-builder/)
