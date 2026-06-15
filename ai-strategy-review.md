# Command: /ai-strategy-review

## What this does
Reviews an AI product strategy end to end. Chains model selection, agent architecture, and build vs buy into a complete strategic assessment.

Designed for founders and PMs who have a validated problem and need to make the right technical and strategic choices before building.

## When to use
- You have validated the problem and are ready to decide how to build
- You need to review an existing AI product strategy
- You are preparing for a stakeholder or investor conversation about your AI approach

## Steps

### Step 1: Model Selection
Run the model-selection skill.

Goal: choose the right model for the use case based on task complexity, latency, cost, and quality requirements.

Output: model recommendation with cost estimate at scale.

---

### Step 2: Architecture Decision
Run the agent-architecture skill if the product involves agentic behaviour. Skip if it is a simple LLM feature.

Goal: determine the right architecture - single LLM call, pipeline, single agent, or multi-agent.

Use the model selection output as input - the chosen model constrains the architecture options.

---

### Step 3: Build vs Buy vs API
Run the build-vs-buy-vs-api skill.

Goal: decide the implementation approach given the strategy.

---

### Step 4: Risk Assessment
For each decision made in Steps 1-3, identify:
- The single biggest risk
- The earliest signal that the decision was wrong
- The cost of switching if the decision turns out to be wrong

---

## Final Output

**AI Strategy Summary**:

**Model**: [recommended model] - [one sentence reasoning]
**Architecture**: [approach] - [one sentence reasoning]
**Implementation**: [build / buy / API] - [one sentence reasoning]
**Total estimated cost at scale**: [monthly at projected volume]
**Biggest strategic risk**: [one sentence]
**Decision to revisit first if things go wrong**: [which of the three decisions above]

## What to do after
- Validate the strategy with one engineer before committing
- Run /validate-ai-idea first if you have not already validated the problem
- Set a 90-day checkpoint to revisit model and architecture decisions as you learn from production
