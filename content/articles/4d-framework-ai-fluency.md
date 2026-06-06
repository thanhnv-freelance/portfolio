---
title: "The Framework That Changed How I Collaborate With AI Every Day"
slug: 4d-framework-ai-fluency
date: 2026-06-06
tags: [ai, productivity, engineering, workflow]
summary: "I use Claude every day at work — code reviews, hotfix analysis, database proposals. For a long time I thought I was using it well. Then I found the 4D Framework, and it changed how I think about the collaboration itself."
---

I use Claude every day at work. Code reviews, hotfix analysis, database proposals, architecture decisions. And for a long time, I thought I was using it well — until I realised I was mostly just typing questions and hoping for good answers.

The turning point was finding the 4D Framework, a mental model from Anthropic's AI Fluency course. It did not teach me new prompting tricks. It changed how I think about the *collaboration* itself — who does what, how to communicate clearly, when to trust the output, and when to wait.

This is what I learned, shown through a real task I worked on.

---

## The 4D Framework in One Paragraph

The framework has four competencies:

- **Delegation** — deciding what to give AI vs. keep yourself
- **Description** — communicating what you need with precision
- **Discernment** — evaluating what AI gives you with a critical eye
- **Diligence** — using AI responsibly and owning your output

They are not four steps you follow in sequence. They are four lenses you apply to every AI collaboration. Description and Discernment especially form a loop — you describe, evaluate, refine, repeat — until the output is actually good.

---

## The Real Task I Used to Practice It

I needed to write a technical case study about a production database problem I investigated at work: PostgreSQL HOT update suppression caused by an R2DBC `@Version` indexed column. Real production data, real root cause, real fix. The kind of thing that makes a strong portfolio piece.

Here is how I applied each D.

---

## D1 — Delegation: Who Does What (and Why It Matters)

Before I opened a prompt window, I asked myself: *what does this task actually require?*

The case study needed accurate production numbers, a narrative arc (problem → investigation → root cause → fix → outcome), appropriate anonymization, and a tone suited for a public engineering portfolio.

Then: *what can Claude do well here, and what can it not?*

Claude is good at structuring narrative from raw facts, writing clearly for a technical audience, and synthesizing information from multiple source documents. Claude cannot verify my production numbers, make my anonymization judgment calls, or know who my audience is.

So here is how I split the work:

| Task | Owner | Reason |
|------|-------|--------|
| Technical facts and production data | Me | Only I can verify these |
| Root cause narrative | Claude drafts, I verify | Structure is Claude's strength; accuracy is mine |
| Anonymization decisions | Me | Judgment call — only I know what is sensitive |
| Writing and structure | Claude | Efficiency; I review everything |
| Framing and tone | Claude drafts, I adjust | I know my audience best |

**The insight that changed how I work:** Delegation is not about giving AI as much as possible. It is about giving AI the *right* things — and keeping the things that require your specific expertise, judgment, or accountability.

Most engineers I know flip this. They hand Claude everything, then feel vaguely uneasy about the output. The reason it feels off is that they delegated things that were theirs to own.

---

## D2 — Description: Three Types, Not One

This is where I used to leave the most value on the table.

Most people write one type of description: *"Give me a case study about X."* That is Product Description — what to produce. But there are two more:

- **Process Description** — *how* Claude should approach the task
- **Performance Description** — *how* Claude should behave during the collaboration

Here is what I actually wrote for each:

**Product:**
> "A case study in Markdown, 800–1200 words, structured as: Context → Investigation → Root Cause → Impact → Proposed Solution → Expected Outcome → Lessons Learned."

Precise format, target length, named sections. No guessing.

**Process:**
> "Use my existing proposal doc and diagram docs as source material. Synthesize into a narrative — not a proposal, but a retrospective case study. Write in first-person architect voice."

This is the one most people skip. Without it, Claude might have reproduced my proposal structure verbatim instead of transforming it into a different genre. The word "synthesize" and "narrative" changed the entire shape of the output.

**Performance:**
> "Technical but readable. Avoid jargon without explanation. No company names. Tone: confident, measured, grounded in data."

This sets the constraints that affect every sentence — voice, register, and the anonymization rule baked in from the start.

When I write all three, I get a usable draft in one pass. When I only write Product, I spend the next three iterations correcting tone and approach.

---

## D3 — Discernment: Evaluate Before You Read, Not After

Here is what I used to do: receive Claude's output, read it, feel broadly satisfied, move on.

Here is what Discernment actually requires: prepare a review checklist *before* reading the output. Then evaluate against it.

For the case study, my checklist was:

- HOT rate figures correct: 54% → 44.8%, target ~70–80%
- Root cause chain correct: `@Version` → full UPDATE → version indexed → HOT blocked
- Index sizes correct: `transaction_un` = 598 MB, composite = 310 MB
- Write count correct: 3 DB writes on happy path, 4 on partner error
- Narrative arc in order: problem → investigation → cause → fix → outcome
- First-person voice maintained throughout
- No company or partner names present

Preparing the checklist first keeps evaluation objective. If I read the output first, I start reading to *confirm* rather than to *verify* — which is not the same thing.

**The part that surprised me:** sometimes Discernment means pausing. The "Expected Outcome" section of my case study cannot be validated until the index drop actually executes in production and I measure the HOT rate improvement. Approving the draft now would mean accepting a claim I cannot yet verify.

So I paused. The draft is ready, the checklist is written, and I will complete the review when the production data exists.

That is Discernment working correctly — not rubber-stamping, not blocking indefinitely, but knowing when you have enough information to proceed and when you do not.

---

## D4 — Diligence: Build Responsibility In, Not On

Diligence is the one that feels optional until it is not. Three things I do now that I did not before:

**1. Justify the tool choice.** Claude was right for this task — it synthesizes well, writes clearly, and has no access to my production systems. That is a deliberate choice, not a reflex. When the task involves confidential data or a domain where hallucinations are dangerous, the answer might be different.

**2. Write the transparency note into the template.** The case study ends with:

> *"Written with AI assistance (Claude Sonnet 4.6). All technical facts, production data, and architectural analysis are the author's own."*

I put this line in my template so it appears in every draft — not as a last-minute addition I might forget. The distinction it makes — AI wrote the words, I own the analysis — is accurate and important.

**3. Separate the writing decision from the publishing decision.** Just because a draft is done does not mean I should publish it immediately. The publishing decision involves: who is my audience, is the anonymization sufficient, do I stand behind every claim. I make that decision separately, after D3 is complete.

---

## The Description–Discernment Loop

Description and Discernment are not two separate stages. They form a feedback loop:

```
Describe clearly → Claude produces output → Evaluate with Discernment
→ Identify gaps in your description → Describe more precisely → repeat
```

In my case study, the loop ran once before hitting a real-world constraint (the index drop). When production data arrives, the loop resumes. Each iteration brings the output closer to something I can genuinely stand behind.

The loop is not a sign of failure. It is how quality human-AI collaboration actually works.

---

## What Changed For Me

Before the framework, I was treating Claude like a search engine with better writing. I would ask a question and evaluate the answer based on whether it felt plausible.

Now I treat it as a collaboration with a clear contract: I own the expertise, the judgment, and the accountability. Claude owns the execution of well-specified tasks. When the output is not good, I look first at my description — because in most cases, that is where the gap is.

The 4D Framework did not make me faster at using AI. It made me better at knowing when to use it, what to give it, and when to trust what comes back.

That is a more durable skill than any prompt trick.

---

## Apply It to Your Next Task

Before your next significant AI collaboration:

1. Write out what the task actually requires — before opening the prompt window
2. Split the work explicitly: what you own, what AI owns
3. Write Product, Process, and Performance descriptions — all three
4. Prepare your review checklist before you read the output
5. Add the transparency note to your template, not as an afterthought

The framework comes from Anthropic Academy's free course: [AI Fluency: Framework & Foundations](https://anthropic.skilljar.com/ai-fluency-framework-foundations).

---

*The case study referenced in this post is still in progress — the outcome section will be completed once the proposed database changes are validated in production.*
