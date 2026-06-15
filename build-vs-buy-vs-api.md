# Skill: Build vs Buy vs API vs Manual Decision

## Trigger
Activate when the user asks whether to build an AI capability themselves, buy a tool, wrap an existing API, or keep a process manual. Triggers: "should we build or buy", "should we use OpenAI API or build our own", "is it worth building this ourselves".

## Context
This is one of the most consequential decisions in AI product work and most teams make it based on gut feel or engineer preference rather than a structured analysis.

The four options have fundamentally different tradeoffs:

- **Build** - maximum control, maximum cost, maximum time, potential moat if you have proprietary data
- **Buy** - fastest, highest ongoing cost, vendor dependency, limited differentiation
- **API wrap** - fast to start, model dependency risk, margin compression, easy to copy
- **Keep manual** - underrated option, zero AI risk, sometimes the right answer at early stage

Framework combines:
- Shreyas Doshi's leverage thinking (where does AI create disproportionate value?)
- Andrej Karpathy's AI realism (what does the model actually do vs what you think it does?)
- Google-scale thinking (what works at 1K users breaks at 1M - design for the right scale)

## Instructions

1. Ask the user to describe the capability they are trying to build and their current stage (pre-PMF, post-PMF, scaling)

2. **Proprietary Data Test**
   - Do you have data that a foundation model was not trained on?
   - Is that data the source of the value, or is the value in the application layer?
   - If yes to both: building is more justified
   - If no: API or buy is almost always faster and cheaper

3. **Differentiation Test**
   - Is this capability your core differentiator or supporting infrastructure?
   - If core differentiator: building gives you control over your moat
   - If supporting infrastructure: buy or API - do not build what is not your product

4. **Quality Threshold Test**
   - What accuracy does this need to be genuinely useful vs just impressive in a demo?
   - Can an existing API or tool meet that threshold today?
   - If yes: buying saves 6-18 months of model development

5. **Stage Test**
   - Pre-PMF: almost always API or buy - you need to learn fast, not build infrastructure
   - Post-PMF with scale: building becomes more justified as volume erodes API margins
   - Scaling: evaluate proprietary model only if API costs exceed build costs at projected volume

6. **Switching Cost Test**
   - If you start with an API and want to switch to build later - how hard is that?
   - If switching is easy: start with API, validate, then build
   - If switching is very hard (deeply integrated): make the build vs buy decision now

7. Produce a **Decision Matrix**:
   - Build score: 0-10
   - Buy score: 0-10
   - API score: 0-10
   - Manual score: 0-10

8. Give a **Recommendation** with one-paragraph reasoning and the single biggest risk of the recommended path

## Output format
Decision matrix, one-paragraph recommendation, biggest risk, earliest trigger to revisit the decision.

## Tone
Opinionated. This skill is designed to cut through analysis paralysis. Give a clear recommendation even when the evidence is mixed.
