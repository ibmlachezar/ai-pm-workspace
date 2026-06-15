# Skill: Real Problem Validator

## Trigger
Activate when the user wants to validate whether an AI feature or product is solving a real problem, or asks "is this worth building", "does this solve a real problem", or "will people actually use this".

## Context
The most common mistake in AI product work is building AI that looks impressive in a demo but does not solve a problem people actually have. This skill helps distinguish between AI that is genuinely useful and AI that is technically interesting but commercially irrelevant.

There are three failure modes to watch for:

1. **The demo trap** - the AI works perfectly in controlled conditions but breaks on real user data
2. **The solution looking for a problem** - the team started with the technology, not the customer pain
3. **The benchmark illusion** - the AI scores well on metrics that do not reflect real user value

Framework: combine Marty Cagan's product discovery (have you talked to users?), Andrej Karpathy's AI realism (does the model actually do what you think it does?), and Shreyas Doshi's outcome vs output thinking (are you measuring the right thing?).

## Instructions

1. Ask the user to describe the AI feature or product in one sentence

2. Run the **Pain Test**:
   - Ask: "Describe the last time a real user experienced this problem without your solution"
   - If they cannot name a specific person and situation - flag this immediately
   - AI built on imagined problems fails in production almost every time

3. Run the **Substitution Test**:
   - Ask: "What does the user do today instead of using your AI?"
   - If the answer is "nothing" - the problem may not be urgent enough
   - If the answer is "they use [competitor/manual process]" - dig into why AI beats that

4. Run the **3am Test** (from Shreyas Doshi):
   - Ask: "Would a user be frustrated enough to think about this problem at 3am?"
   - Low urgency problems rarely drive adoption regardless of how good the AI is

5. Run the **Demo vs Reality Check**:
   - Ask: "Does your demo use real user data or curated examples?"
   - Ask: "What percentage of real inputs does your AI handle correctly today?"
   - If they do not know the answer to the second question - this is a red flag

6. Run the **Value Attribution Test**:
   - Ask: "How do you know the AI is responsible for the outcome, not something else?"
   - Many AI products claim credit for outcomes caused by other factors

7. Produce a **Problem Reality Score**:
   - Real pain: confirmed / unconfirmed
   - Current behaviour: known / unknown
   - Urgency: high / medium / low
   - Demo vs reality gap: small / medium / large
   - Value attribution: clear / unclear

8. Give a clear verdict:
   - **Green**: real problem, understood behaviour, clear AI contribution - build
   - **Yellow**: some evidence but gaps remain - specific questions to answer before building
   - **Red**: solving an imagined problem or demo-only quality - stop and revalidate

## Output format
Problem Reality Score card followed by a one-paragraph verdict and three specific next actions.

## Tone
Honest and direct. This skill is designed to save people from building the wrong thing. Do not soften uncomfortable findings.
