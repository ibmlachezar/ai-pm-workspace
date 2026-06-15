# AI PM Workspace

**Skills, commands, and frameworks for AI product managers.**

Built by [Lachezar Atanasov](https://lachezaratanasov.com) — Head of AI Product, shipped GenAI to 2M+ merchants at Google, advisor to AI startups.

Works with Claude Code, Cursor, Gemini CLI, Codex, and any AI tool that reads markdown skill files.

---

## The thesis

AI that looks impressive is not the same as AI that solves a real problem.

Most AI PM failures happen not because the technology did not work — but because the team never validated the problem, measured the wrong things, or shipped a pilot without a path to production.

Every skill in this workspace encodes one judgment call that separates AI products that ship and stick from AI products that demo well and die.

---

## What is included

### Skills (building blocks)

| Skill | Plugin | What it does |
|---|---|---|
| real-problem-validator | ai-product-discovery | Tests whether the problem is real before evaluating the solution |
| ai-feature-validator | ai-product-discovery | Three-layer validation: Technical Truth, Behavioural Truth, Business Truth |
| build-vs-buy-vs-api | ai-product-strategy | Framework for the implementation decision |
| model-selection | ai-product-strategy | Matches model to use case — not to capability ceiling |
| agent-architecture | ai-product-strategy | When to use agents vs simpler approaches |
| mcp-tool-design | ai-product-strategy | How to expose your product to AI agents via MCP |
| pilot-to-production | ai-execution | The four gates every AI product must pass before launch |
| eval-design | ai-evaluation | Three-layer evaluation: model quality, product quality, business impact |
| ai-pm-interview-prep | ai-career | How to prepare for AI PM roles |

### Commands (chained workflows)

| Command | What it chains |
|---|---|
| /validate-ai-idea | real-problem-validator → ai-feature-validator → build-vs-buy-vs-api → eval-design |
| /ai-strategy-review | model-selection → agent-architecture → build-vs-buy-vs-api → risk assessment |

---

## Quick start

### With Claude Code

```bash
# Clone the workspace
git clone https://github.com/ibmlachezar/ai-pm-workspace
cd ai-pm-workspace

# Copy skills to Claude Code global skills folder
cp -r ai-product-discovery/skills/* ~/.claude/skills/
cp -r ai-product-strategy/skills/* ~/.claude/skills/
cp -r ai-execution/skills/* ~/.claude/skills/
cp -r ai-evaluation/skills/* ~/.claude/skills/
cp -r ai-career/skills/* ~/.claude/skills/

# Copy commands
cp -r ai-product-discovery/commands/* ~/.claude/commands/
cp -r ai-product-strategy/commands/* ~/.claude/commands/
```

Then in Claude Code:
```
/validate-ai-idea
```

### With any other AI tool

Copy any SKILL.md file into your tool's skills or context folder. The skill format is universal.

### Without any setup

Open any SKILL.md file and paste it into your AI conversation as context before asking your question.

---

## How to use each skill

**Validating an AI idea from scratch:**
```
/validate-ai-idea
```
Runs the full validation chain. Takes 10-15 minutes. Saves months of building the wrong thing.

**Choosing a model:**
Ask: "Help me choose a model for [your use case]"
The model-selection skill activates and guides you through the decision.

**Deciding build vs buy:**
Ask: "Should we build this ourselves or use an API?"
The build-vs-buy-vs-api skill activates.

**Preparing for production:**
Ask: "We have a successful pilot, how do we go to production?"
The pilot-to-production skill activates with its four-gate framework.

**Designing AI metrics:**
Ask: "How do I know if my AI feature is actually working?"
The eval-design skill activates.

---

## The skills encode these frameworks

- Marty Cagan's product discovery — have you talked to users?
- Shreyas Doshi's outcome vs output thinking — are you measuring the right thing?
- Andrej Karpathy's AI realism — does the model actually do what you think it does?
- Google-scale thinking — what works at 1K users breaks at 1M

None of these are my frameworks. These are the shoulders I stand on. What I have added is the specific application to AI product decisions and the lessons from shipping AI to millions of users.

---

## What is coming next

- Skill: AI PRD writing — how to write a PRD for an AI feature that engineers can actually build from
- Skill: AI user research — how to run discovery when the product is AI and users cannot articulate what they want
- Skill: Startup AI stack advisor — which AI tools for which stage
- Command: /ship-ai — end to end from validated idea to production launch checklist

---

## Built by

**Lachezar Atanasov**
Head of AI Product · AI startup founder · Advisor to multiple AI companies

Shipped GenAI to 2M+ merchants at Google. 12 years at Google. Building and advising in the AI space.

- [lachezaratanasov.com](https://lachezaratanasov.com)
- [LinkedIn](https://www.linkedin.com/in/lachezar-atanasov198/)
- [GitHub](https://github.com/ibmlachezar)

If this saves you from building the wrong thing — follow along. I share what I learn every week.

---

## Credit

Inspired by [phuryn/pm-skills](https://github.com/phuryn/pm-skills) by Pawel Huryn. The skill format and plugin structure are adapted from his work.

## License

MIT
