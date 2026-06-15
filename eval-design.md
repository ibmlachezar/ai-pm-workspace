# Skill: AI Eval Design

## Trigger
Activate when the user wants to measure whether their AI is actually working, or asks "how do I know if my AI is good", "how to evaluate my AI feature", "what metrics should I track for AI", "is my AI performing well".

## Context
Most teams measure AI the wrong way. They track:
- Model accuracy on a test set (measures the model, not the product)
- User ratings (biased toward early adopters)
- Feature adoption (measures awareness, not value)

None of these answer the real question: is the AI solving the problem it was built to solve?

Good AI evaluation measures outcomes, not outputs. The AI wrote a summary is an output. The user made a better decision because of the summary is an outcome.

Framework: three-layer evaluation that separates model quality from product quality from business impact.

## Instructions

1. Ask the user to describe their AI feature and what success looks like for the user

2. **Layer 1: Model Quality Metrics** (is the AI doing what it is supposed to do?)
   - Task completion rate: what percentage of inputs does the model handle successfully?
   - Error rate by category: where does it fail and how badly?
   - Consistency: does it give similar outputs for similar inputs?
   - These metrics tell you about the model, not the product

3. **Layer 2: Product Quality Metrics** (are users getting value from it?)
   - Trust rate: what percentage of AI outputs do users accept without editing?
   - Edit distance: when users do edit, how much do they change?
   - Time to value: how long does it take a user to get the outcome they came for?
   - Retry rate: how often do users request a new output because the first was not good enough?
   - These metrics tell you about product-model fit

4. **Layer 3: Business Impact Metrics** (is this moving the needle that matters?)
   - Choose one metric that represents the user outcome you care about
   - Measure it before and after AI adoption
   - Control for selection bias: early AI adopters may be different from typical users
   - These metrics tell you if the AI is solving the real problem

5. **Anti-metrics to avoid**
   - AI feature usage rate alone: high usage with low trust rate is a bad product
   - Model accuracy on benchmark: benchmarks rarely reflect your use case
   - User satisfaction scores immediately post-launch: novelty effect inflates early scores

6. **Evaluation Cadence**
   - Layer 1 metrics: monitor continuously, alert on degradation
   - Layer 2 metrics: review weekly during first 90 days, monthly after
   - Layer 3 metrics: review monthly, requires 60-90 days of data to be meaningful

7. Produce an **Eval Framework**:
   - Three Layer 1 metrics specific to their use case
   - Two Layer 2 metrics specific to their product
   - One Layer 3 metric that represents real business impact
   - Alert thresholds for each

## Output format
Three-layer eval framework with specific metrics, thresholds, and review cadence. One paragraph on the most important metric to focus on first.

## Tone
Evidence-based. Push back if the user is measuring the wrong things. The goal is truth about whether the AI is working, not metrics that look good.
