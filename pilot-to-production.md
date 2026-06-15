# Skill: Pilot to Production

## Trigger
Activate when the user has an AI pilot that worked and wants to scale it, or asks "how do we go from pilot to production", "our pilot was successful but now what", "scaling our AI feature".

## Context
The pilot to production gap is where most AI initiatives die. A pilot that works with 10 customers in controlled conditions routinely fails when exposed to:
- Messy real-world data at scale
- Users who were not part of the pilot
- Edge cases the pilot did not encounter
- Production latency and cost constraints
- Organisational processes that were bypassed during the pilot

This skill is based on direct experience shipping AI to millions of users. The most common failure is teams treating a successful pilot as proof the product is ready, when it is actually proof the concept is valid.

Framework: the four gates every AI product must pass before production.

## Instructions

1. Ask the user to describe their pilot - what it tested, with how many users, over what time period, and what success looked like

2. **Gate 1: Data Reality Check**
   - During the pilot, how much of the input data was curated vs raw?
   - What percentage of production inputs will look different from pilot inputs?
   - Have you stress-tested with the messiest 20% of real inputs?
   - Gate passes when: model performs acceptably on uncurated production-representative data

3. **Gate 2: Scale and Cost Check**
   - What is the cost per inference at pilot volume vs projected production volume?
   - What is the latency at 10x, 100x, 1000x pilot volume?
   - Are there rate limits, context window limits, or API quotas that break at scale?
   - Gate passes when: unit economics work at 3x projected volume

4. **Gate 3: User Trust Check**
   - Did pilot users know they were in a pilot?
   - Were pilot users more forgiving of errors than typical users will be?
   - What is the failure experience - what does a user see when AI gets it wrong?
   - Gate passes when: error experience is designed and tested, not an afterthought

5. **Gate 4: Operational Check**
   - Who monitors the model in production?
   - What triggers a rollback?
   - How do you detect model drift over time?
   - What is the human fallback when AI fails?
   - Gate passes when: all four questions have documented answers

6. Produce a **Production Readiness Score**:
   - Gate 1 Data Reality: Pass / Partial / Fail
   - Gate 2 Scale and Cost: Pass / Partial / Fail
   - Gate 3 User Trust: Pass / Partial / Fail
   - Gate 4 Operations: Pass / Partial / Fail

7. Give a **Launch Recommendation**:
   - All gates pass: ready for production launch
   - One gate partial: staged rollout to 10% of users while fixing
   - Any gate fail: do not launch - specific action to fix failing gate

## Output format
Four-gate scorecard, launch recommendation, ordered list of actions before launch.

## Tone
Cautious but practical. The goal is not to block launches but to prevent the specific failures that destroy user trust in AI products.
