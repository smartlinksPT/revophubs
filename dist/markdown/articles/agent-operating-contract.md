---
title: "Agent Operating Contract: a framework for production AI agents — RevOpsHubs"
description: "A prompt does not define ownership, permissions, approvals, budget or rollback. Use the Agent Operating Contract to move AI agents into production with explicit limits."
canonical: "https://revophubs.com/articles/agent-operating-contract.html"
language: "en"
---

Agents · Governance · Framework · 13 min read

# A good prompt is not enough. An agent needs an operating contract.

Before an agent goes into production, you should know what it is trying to achieve, which context it may use, what it can do, where it must stop and how success will be measured.

RevOpsHubs framework · 4 October 2026

Most agent experiments begin the same way: write a prompt, test, refine, connect a tool and ask whether it can now run automatically.

That is where the prompt stops being enough.

A prompt can tell an agent how to reason or respond. It does not define, by itself, who owns the agent, which data it may access, which fields it can change, which actions require approval, how much it may spend, when it should escalate, how quality is measured or how to shut it down.

### RevOpsHubs Thesis

**A production agent needs an operating contract: an explicit definition of the work, context, autonomy, risk, economics and accountability under which it may operate.**

## What is an Agent Operating Contract?

The **Agent Operating Contract** is a RevOpsHubs framework. It is not a legal contract or a long technical specification.

It is an operational one-pager that follows an agent from experiment to pilot or production and turns “we have an agent helping Sales” into a governable unit of work.

## The 10 decisions in the contract

1. **Objective — what outcome should it produce?** Define something observable, not “help Sales.”
2. **Owner — who is accountable for performance?** A named person defines acceptable quality, reviews failures and approves material changes.
3. **Context — what information may it use?** CRM, notes, email, documents, knowledge base, web or ERP. Available context is not permitted context.
4. **Tools — which capabilities does it have?** Search, create task, update field, send email, call API or MCP.
5. **Permissions — where can it read and write?** Objects, fields, systems and scopes should be explicit.
6. **Approval — where must it ask?** Separate autonomous, approval-gated and prohibited actions.
7. **Budget — how much capacity may it consume?** Runs, credits, tokens, compute or external calls.
8. **Quality — how will you know it works?** Accuracy, acceptance without correction, rework, time saved, conversion or cost per outcome.
9. **Escalation — when should it stop and hand off?** Missing data, conflicting rules, low confidence, exceptions or retry limits.
10. **Rollback — how do you go back?** Disable, revoke, remove write access, restore data or return to a prior version.

## Does the prompt matter less?

No. It matters more because it no longer has to carry responsibilities that belong to the surrounding system.

OpenAI separates instructions, tools, guardrails, MCP, handoffs and structured outputs, and supports human review for sensitive actions. HubSpot lets teams configure MCP tools, simulate runs and set monthly limits.

The prompt is part of the contract. It is not the contract.

> Prompt engineering tells the agent how to work. Operating design decides what work may exist and under which limits.

## Example: an inbound qualification agent in HubSpot

Imagine a B2B company using HubSpot that wants to reduce manual research after inbound requests.

| Block | Operating decision |
| --- | --- |
| Objective | Prepare a qualification recommendation and account context within five minutes of a new request. |
| Owner | RevOps Manager; Head of Sales validates qualification criteria. |
| Context | HubSpot contact/company, conversion page, existing history, ICP rules and public domain research. |
| Tools | Read CRM, web research, create note and task. No autonomous outbound email. |
| Permissions | May populate approved enrichment fields. Cannot change Lifecycle Stage, Deal Stage, owner or consent. |
| Approval | Notes and tasks can be automatic; external communication requires a human. |
| Budget | Monthly run limit defined after simulating a representative sample. |
| Quality | Strong agreement with human review plus measurable reduction in preparation time; target calibrated during pilot. |
| Escalation | Missing domain, territory conflict, contradictory data or unfamiliar ICP case → human queue. |
| Rollback | Disable agent, remove write access and restore changed fields from available history/audit data. |

What makes this agent reliable is not only the prompt. It is the operating boundary.

## Not every agent needs the same governance depth

- **Tier A · Read-only:** research and recommendation, with no system writes or customer contact. Lightweight contract, logs and owner still apply.
- **Tier B · Internal write:** updates fields, creates tasks, notes or tickets. Requires explicit permissions, simulation, auditability and rollback.
- **Tier C · External impact:** sends, publishes, deletes, commits pricing, changes critical states or takes hard-to-reverse actions. Approval and guardrails should be stronger.

This connects directly to the [Shadow Agent Risk Model](/learn/shadow-agents/): the larger the context, tool, write and cost surface, the more explicit the contract should be.

## The contract also defines how to test

A production workflow should be tested beyond final answer quality:

- Did it choose the right tool?
- Did it refuse work outside scope?
- Did it request approval when required?
- Did it escalate when context was insufficient?
- Did it stay within run and budget limits?
- Did it improve the process or create more review work?

OpenAI recommends evaluating workflows through traces, tool calls, guardrails and handoffs. HubSpot lets teams simulate agent runs without changing CRM data or consuming credits.

## Budget becomes an agent property

With agents, work performed and consumption become more directly linked. In HubSpot, [the new EMEA pricing model makes credits an explicit unit of capacity](/learn/hubspot-pricing-credits-emea/), and HubSpot recommends simulating runs before setting monthly limits.

An agent allowed to run 500 times a day is operationally different from one capped at 20 priority cases.

## What to do on Monday morning

1. Write the objective as one observable outcome.
2. Name one business owner.
3. List context sources and remove unnecessary ones.
4. List every tool and mark read/write.
5. Create three columns: autonomous, approval required, prohibited.
6. Set a pilot usage limit.
7. Choose one quality metric and one outcome metric.
8. Write the escalation conditions.
9. Test 20–50 representative cases, including edge cases.
10. Document how to disable or roll back.

If you cannot fill these sections, you do not have a prompt problem yet. You have an operating design problem.

## Agents need freedom. But bounded freedom.

An agent that asks permission for everything is not useful. An agent that can do everything is not governable.

The interesting design space is in the middle: enough autonomy to remove human work, with context, permissions, risk, economics and accountability explicit.

> Do not move an agent into production because the prompt is good. Move it into production when the system around it is clear.

## Public sources

- [OpenAI Developers — Agent definitions](https://developers.openai.com/api/docs/guides/agents/define-agents)
- [OpenAI Developers — Guardrails and human review](https://developers.openai.com/api/docs/guides/agents/guardrails-approvals)
- [OpenAI Developers — Evaluate agent workflows](https://developers.openai.com/api/docs/guides/agent-evals)
- [HubSpot Knowledge Base — Test and control agent credit usage](https://knowledge.hubspot.com/ai/review-estimated-credit-costs-when-using-agents)
- [HubSpot Knowledge Base — Connect apps to HubSpot's AI agents](https://knowledge.hubspot.com/integrations/customize-breeze-agents-with-hubspot-mcp-client)

## Keep going

- [Shadow Agents: the new governance problem →](/learn/shadow-agents/)
- [AI readiness starts before AI →](/articles/ai-ready-revenue-system.html)
- [HubSpot Credits and agent economics →](/learn/hubspot-pricing-credits-emea/)
- [What is a Revenue System? →](/articles/revops-operating-system.html)
