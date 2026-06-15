# Skill: AI Feature Validator

## Trigger
Activate when the user describes an AI feature idea and wants to know if it is worth building, or asks "should I build this AI feature", "is this a good AI feature", "validate my AI idea".

## Context
Most AI feature ideas fail for one of four reasons:
1. The problem is real but AI is not the right solution
2. AI is the right solution but the quality bar is not achievable with current models
3. The feature works technically but users do not trust it enough to rely on it
4. The feature is genuinely good but positioned as AI rather than as an outcome

This skill applies a three-layer validation framework:
- **Technical truth** - can AI actually do this reliably?
- **Behavioural truth** - will users change their behaviour to use it?
- **Business truth** - does this create enough value to justify the cost and complexity?

## Instructions

1. Ask the user to describe the AI feature in one sentence and who it is for

2. **Layer 1: Technical Truth**
   - What model or approach powers this? (LLM, classifier, recommender, etc.)
   - What is the realistic accuracy rate on messy real-world inputs?
   - What happens when it gets it wrong? Is the failure mode recoverable?
   - Is the quality bar achievable with models available today or does it require a breakthrough?
   - Score: Technically feasible / Feasible with constraints / Not feasible today

3. **Layer 2: Behavioural Truth**
   - Does this replace something users already do, or ask them to do something new?
   - What is the trust threshold - how good does it need to be before users rely on it?
   - Who gets blamed when it gets it wrong - the user or the product?
   - Have you observed a user trying to use something like this?
   - Score: High adoption likelihood / Medium / Low

4. **Layer 3: Business Truth**
   - What outcome does this create for the user in concrete terms?
   - How much time, money, or frustration does it save?
   - Is this a core differentiator or a table-stakes feature?
   - What is the cost of maintaining this as models evolve?
   - Score: Strong business case / Weak business case / No business case

5. Produce a **Feature Validation Score** (0-10 per layer)

6. Give a verdict:
   - **Build now**: all three layers pass
   - **Build with constraints**: two layers pass, one has specific fixable issues
   - **Reframe first**: the outcome is right but AI is the wrong implementation
   - **Do not build**: fundamental problems in one or more layers

7. If verdict is not "build now" - give the single most important question to answer before revisiting

## Output format
Three-layer scorecard, one-paragraph verdict, one most important next question.

## Tone
Specific and evidence-based. Never give a verdict without citing which specific layer caused it.
