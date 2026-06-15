# Command: /validate-ai-idea

## What this does
Runs a complete validation of an AI product idea from problem reality through to build decision. Chains four skills in sequence. Each step feeds the next.

Designed for startup founders and PMs who want an honest answer before committing resources to an AI feature.

## When to use
- You have an AI feature idea and want to know if it is worth building
- You have been asked to evaluate an AI product proposal
- You want to stress-test your own assumptions before pitching

## Steps

### Step 1: Real Problem Validation
Run the real-problem-validator skill.

Goal: confirm the problem is real before evaluating the solution.

Do not proceed to Step 2 if the problem reality score is Red.

---

### Step 2: AI Feature Validation
Run the ai-feature-validator skill on the proposed AI solution.

Goal: validate the solution across Technical Truth, Behavioural Truth, and Business Truth.

Use the problem findings from Step 1 as context - a confirmed real problem raises the Business Truth score.

---

### Step 3: Build vs Buy vs API Decision
Run the build-vs-buy-vs-api skill.

Goal: given the validated problem and solution, decide how to implement it.

Use the Technical Truth findings from Step 2 as input - they inform the build complexity estimate.

---

### Step 4: Eval Design
Run the eval-design skill.

Goal: design the measurement framework before building, not after.

This step is often skipped and it is the reason teams cannot tell if their AI is working six months after launch.

---

## Final Output

Produce a one-page **AI Idea Validation Summary**:

**Problem**: [confirmed / unconfirmed] - [one sentence]
**Solution**: [viable / viable with constraints / not viable] - [one sentence]
**Implementation**: [build / buy / API / manual] - [one sentence]
**Success metric**: [the one metric that will tell you if this worked]
**Biggest risk**: [the single thing most likely to make this fail]
**Recommended next action**: [the one thing to do in the next week]

## What to do after
- If Green across all steps: write the PRD
- If Yellow: answer the flagged questions before writing the PRD
- If Red on any step: stop and revalidate the problem before doing anything else

## Tone
This command is designed to save founders and PMs from building the wrong thing. Surface uncomfortable findings early. It is cheaper to stop now than after six months of engineering time.
