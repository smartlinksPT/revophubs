---
title: "Shadow Agents: the next RevOps governance problem — RevOpsHubs"
description: "AI agents can now read and write to CRM systems. A practical framework to identify Shadow Agents, reduce risk and preserve useful autonomy."
canonical: "https://revophubs.com/articles/shadow-agents.html"
language: "en"
---

AI · Governance · RevOps · 12 min read

# The next RevOps problem is not Shadow IT. It is Shadow Agents.

When an agent can read the CRM, reach into external systems and take action, you are no longer governing software alone. You are governing new actors inside the Revenue System.

RevOpsHubs analysis · 4 October 2026

A seller connects ChatGPT to the CRM to prepare for meetings. Another builds an agent to research accounts and update fields. Marketing connects an agent to an external tool through MCP. Customer Success experiments with another that summarizes tickets and creates follow-up tasks.

No new CRM was purchased. No formal integration project was opened. Yet the company just added new actors with access to operational context — and some can take action.

At RevOpsHubs, we call these **Shadow Agents**.

### RevOpsHubs Thesis

**The risk is no longer only “which software are people using outside governance?”. It becomes “which agents can see, decide and act inside our systems — and who is accountable for them?”.**

## What is a Shadow Agent?

We are not presenting the term as an established industry category. It is a useful name for an emerging operating problem.

A **Shadow Agent** is an AI agent, assistant or app with access to company systems, data or tools that has moved into use without a clear definition of **owner, scope, permissions, approvals, monitoring and success criteria**.

It does not have to be malicious, secret or technically unauthorized. The problem is the absence of an operating model around it.

| Phenomenon | What escapes governance |
| --- | --- |
| Shadow IT | Software and services used outside formal catalogs or approval processes. |
| Shadow AI | Models and assistants used with company data or work without sufficient governance. |
| Shadow Agents | Agents with context and tools that can decide or act without a clear operating contract. |

## Why this becomes a problem now

The line between “assistant that answers” and “system that acts” is disappearing quickly.

In April 2026, the [remote HubSpot MCP server became generally available](https://developers.hubspot.com/changelog/remote-hubspot-mcp-server-is-now-generally-available) with write capabilities across multiple CRM objects. HubSpot also lets Agent Builder agents connect to external systems through the [HubSpot MCP Client](https://knowledge.hubspot.com/integrations/customize-breeze-agents-with-hubspot-mcp-client).

ChatGPT full MCP support for Business and Enterprise/Edu includes [write and modify actions](https://help.openai.com/en/articles/12584461-developer-mode-and-full-mcp-connectors-in-chatgpt), with admin, access and approval controls.

These capabilities are what make agents useful. The problem appears when organizations continue to govern them as if they were another SaaS seat.

> A license grants access. An agent can turn access into action.

## The Shadow Agent Risk Model

We propose seven questions:

1. **Identity — who is actually acting?** Which identity and permissions does the agent use?
2. **Context — what can it see?** Which data and sources are available, and which should be permitted?
3. **Tools — what can it call?** Search, update, send and delete create different action surfaces.
4. **Write — what can it change?** Which fields, objects or systems are writable?
5. **Approval — where must it stop?** Which actions are autonomous, human-approved or prohibited?
6. **Audit — can you reconstruct what happened?** Context, tool calls, actions and outcomes should be observable.
7. **Cost — how much can it consume?** Runs, credits and external calls are also part of autonomy.

Together, these dimensions form the agent's **operational surface**. The larger the surface, the stronger governance should be.

## The hardest failure is not hallucination. It is plausible action.

A prospecting agent might read the CRM, research accounts, update properties and create tasks. The difficult failures are not always fabricated data. It can correctly classify an account using an outdated ICP definition, update a valid field that triggers an unintended workflow, create tasks in the wrong territory or repeat hundreds of actions because a trigger is too broad.

None of this requires a rogue AI. A plausible decision inside a poorly bounded system is enough.

This is why [AI readiness starts before the AI layer](/articles/ai-ready-revenue-system.html).

## Useful governance does not mean blocking agents

The goal is **bounded autonomy**.

- **Inventory:** register agents, owner, purpose, connected systems, tools, data and status.
- **Least privilege:** give only the access required. Start with read and open write access when there is a clear operating reason.
- **Approval:** separate recommendation from execution; external and irreversible actions need stronger policies.
- **Testing:** simulate normal cases, edge cases and bad input before production.
- **Observability:** retain traces and use failures to improve prompts, data, tools and guardrails.
- **Kill switch:** know who can disable the agent, revoke the connection or remove write access.

## A 30-minute RevOps audit

1. List the agents and assistants used with company data.
2. Mark those connected to operational systems.
3. Separate read from write.
4. Name a specific owner.
5. Mark approval boundaries.
6. Check logs, limits and revocation.

If an agent fails three or four checks, it is not necessarily a reason to switch it off. It means it is not production-ready yet.

## From agent inventory to an operating contract

Inventory creates visibility. It does not define behavior.

For every agent entering production, define the contract under which it may operate. That is the next RevOpsHubs framework: [the Agent Operating Contract](/learn/ai-agent-operating-contract/), covering objective, context, tools, permissions, approvals, budget, metrics, escalation and rollback.

## RevOps will govern actors, not only systems

Agents can combine context across systems, select tools and execute sequences that previously required people. That is exactly why they are interesting.

The governance question changes:

> Not only “who has access to the CRM?” but “who — human or agent — can do what, with which context, under which limits and with whose accountability?”

That is now a Revenue Operations question.

## Public sources

- [HubSpot Developers — Remote HubSpot MCP server is now generally available](https://developers.hubspot.com/changelog/remote-hubspot-mcp-server-is-now-generally-available)
- [HubSpot Knowledge Base — Connect apps to HubSpot's AI agents](https://knowledge.hubspot.com/integrations/customize-breeze-agents-with-hubspot-mcp-client)
- [HubSpot Knowledge Base — Test and control agent credit usage](https://knowledge.hubspot.com/ai/review-estimated-credit-costs-when-using-agents)
- [OpenAI — Developer mode and MCP apps in ChatGPT](https://help.openai.com/en/articles/12584461-developer-mode-and-full-mcp-connectors-in-chatgpt)
- [OpenAI — ChatGPT Workspace Agents for Enterprise and Business](https://help.openai.com/en/articles/20001143-chatgpt-workspace-agents-for-enterprise-and-business)

## Keep going

- [The Agent Operating Contract →](/learn/ai-agent-operating-contract/)
- [AI readiness starts before AI →](/articles/ai-ready-revenue-system.html)
- [HubSpot's new credits model →](/learn/hubspot-pricing-credits-emea/)
- [What is a Revenue System? →](/articles/revops-operating-system.html)
