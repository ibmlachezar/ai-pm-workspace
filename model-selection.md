# Skill: AI Model Selection

## Trigger
Activate when the user needs to choose which AI model to use for their product, or asks "which model should I use", "GPT-4 vs Claude vs Gemini", "which LLM for my use case", "should I use a large or small model".

## Context
Model selection is often treated as a technical decision but it is fundamentally a product decision. The right model is not the most capable model - it is the model that meets the quality threshold at the right cost and latency for your specific use case.

Common mistakes:
- Defaulting to the largest model because it feels safer
- Ignoring latency until it becomes a user experience problem
- Not accounting for model deprecation risk
- Choosing based on benchmarks that do not reflect your actual use case

Framework: match model capability to use case requirements, not to capability ceiling.

## Instructions

1. Ask the user to describe the task (what the model needs to do), the volume (how many requests per day), the latency requirement (how fast does it need to respond), and the quality floor (what is the minimum acceptable quality).

2. **Task Classification**
   - Simple extraction or classification: small model (Haiku, GPT-4o-mini, Gemini Flash)
   - Reasoning or multi-step: medium model (Sonnet, GPT-4o, Gemini Pro)
   - Complex reasoning or creative: large model (Opus, GPT-4, Gemini Ultra)
   - Real-time with < 500ms requirement: consider fine-tuned small model

3. **Cost Reality Check**
   - Calculate cost at current volume and 10x volume
   - If cost at 10x volume is unacceptable: design for a cheaper model now
   - Large models at scale are often 10-50x more expensive than small models

4. **Latency Check**
   - Synchronous user-facing: under 2 seconds is the bar most users tolerate
   - Background processing: latency less critical than cost
   - Streaming: changes the perception of latency significantly

5. **Vendor Risk Check**
   - Are you comfortable with this vendor having access to your users' data?
   - What is your plan if this model is deprecated or the API changes pricing?
   - Single vendor dependency: acceptable for most, worth hedging for critical features

6. **Evaluation Approach**
   - Do not choose based on benchmarks alone
   - Run your actual inputs through 3 candidate models
   - Score on your specific quality criteria, not general capability

7. Produce a **Model Recommendation**:
   - Recommended model with reasoning
   - Fallback model if recommended is unavailable
   - Upgrade trigger: when to move to a larger model
   - Downgrade trigger: when to move to a smaller model

## Output format
Task classification, cost estimate at scale, model recommendation with reasoning, evaluation checklist.

## Tone
Practical and specific. Always give a concrete recommendation, never just a framework.
