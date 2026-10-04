---
title: "CRM problem or process problem? How to diagnose it — RevOpsHubs"
description: "A practical diagnostic to tell whether a commercial problem comes from CRM configuration, process, data or adoption before rebuilding the system."
canonical: "https://revophubs.com/articles/crm-vs-process.html"
language: "en"
---

CRM · Process · 9 min read

# Is this a CRM problem or a process problem?

When someone says “the CRM is broken”, the fastest response is often to change fields, stages or workflows. That is also how teams end up configuring around a problem they have not diagnosed.

There is a sentence that shows up in almost every CRM project: **“this does not work in HubSpot.”** Or Salesforce. Or Dynamics.

Sometimes the platform really is the issue. But just as often the CRM is exposing an unclear qualification rule, inconsistent stage criteria, a hand-off nobody owns or a commercial rule that changes depending on who you ask.

### RevOpsHubs Thesis

**Diagnose the failing layer before you redesign the CRM.** Fixing configuration when the real issue is process creates a cleaner version of the same ambiguity.

## Four places the problem can actually live

1. **Process** — the operating decision has not been made clearly.
2. **CRM representation** — the process is understood, but the CRM expresses it badly.
3. **Data** — the process and configuration are sound, but information is late, incomplete or contradictory.
4. **Adoption** — people do not use the system consistently. Even here, remember that [CRM adoption can be an operating-design issue](/articles/crm-adoption-design.html).

## A simple diagnostic before changing the CRM

Take one real record where the issue happened and ask, in order:

1. **Is the rule clear?**
2. **Does the CRM represent the rule?**
3. **Is the evidence trustworthy?**
4. **Do people follow the rule?**

> Do not begin with “what should we change in the CRM?”. Begin with “what was the first decision that stopped happening as intended?”.

## Example: “Marketing sends bad leads”

Before adding form fields, changing scoring or automating more aggressively, check whether Marketing and Sales use the same qualification definition, whether the hand-off has explicit entry criteria, and whether Sales records why leads are rejected.

If those decisions are missing, the CRM cannot invent them. This is exactly the kind of failure that appears at [revenue hand-offs](/articles/revenue-handoffs.html).

## Technology should express the process, not substitute for it

HubSpot describes pipelines as a way to visualise processes through stages. Microsoft Dynamics 365 describes a sales process as a repeatable set of steps sellers follow through a sale.

**Evidence**  
The platforms themselves treat CRM stages as representations of a process. The commercial rules behind that process still have to be defined by the organisation.

## AI makes the distinction more important

Agents need much more of the operating context to be explicit than an experienced human does. That follows directly from the [Revenue System Model](/articles/revops-operating-system.html): CRM sits downstream of Process, and AI inherits ambiguity from the layers before it.

## What to do on Monday morning

Pick one issue your team currently blames on the CRM. Take three real records where it happened and run the four-question diagnostic. If the failure appears before configuration, close the operating decision first.

If the process is clear, the evidence exists and people follow it, then you know something useful: **now it is worth changing the technology.**

## Sources

- [HubSpot Knowledge Base — Set up and manage object pipelines](https://knowledge.hubspot.com/object-settings/set-up-and-customize-pipelines)
- [Microsoft Learn — Understand the sales process](https://learn.microsoft.com/en-us/dynamics365/sales/nurture-sales-from-lead-order-sales)

## Keep going

- [What is a Revenue System? →](/articles/revops-operating-system.html)
- [Why CRM adoption is an operating-design issue →](/articles/crm-adoption-design.html)
- [Lifecycle Stage vs Lead Status vs Deal Stage →](/articles/lifecycle-stage-lead-status-deal-stage.html)
