# Skill: Agent Architecture for PMs

## Trigger
Activate when the user wants to build an agentic AI product or feature, or asks "should we use an agent", "how to design an AI agent", "multi-agent vs single agent", "when does my product need an agent".

## Context
Agents are powerful and frequently misapplied. Most tasks that teams build agents for would be better served by a simpler LLM call or a deterministic function.

An agent is justified when:
- The task requires multiple sequential decisions where each decision depends on previous results
- The task involves tool use that cannot be predetermined
- The task is long-running enough that a single LLM call cannot complete it

An agent is not justified when:
- A single well-structured prompt solves the problem
- The steps are known in advance and can be hardcoded
- The user needs to trust and verify each step (agents make this hard)

Framework: start with the simplest possible implementation, add agency only when simplicity fails.

## Instructions

1. Ask the user to describe the task they want to automate and what decisions need to be made during the task

2. **Simplicity Test**
   - Can this be solved with a single LLM prompt? If yes: do not build an agent
   - Can this be solved with a fixed sequence of LLM calls? If yes: build a pipeline, not an agent
   - Does the task require the AI to decide what to do next based on what it just learned? If yes: agent is justified

3. **Tool Inventory**
   - What tools does the agent need? (web search, database, API calls, code execution)
   - Are these tools deterministic and safe to call without human approval?
   - What is the worst case if a tool is called incorrectly?
   - High-risk tools need human-in-the-loop checkpoints

4. **Architecture Decision**
   - Single agent: one model with tools - use for most agentic tasks
   - Multi-agent orchestrator: one coordinator agent routing to specialist agents - use when tasks require genuinely different expertise
   - Multi-agent parallel: multiple agents working simultaneously - use for speed when tasks are independent

5. **Trust and Control Design**
   - Where does a human need to approve before the agent proceeds?
   - What triggers an automatic stop?
   - How does a user recover if the agent does something wrong?
   - Agent products that do not answer these questions fail in production

6. **PM Responsibilities for Agent Products**
   - Define the task boundary: what is the agent allowed to do and not do?
   - Define failure modes: what does the agent do when it cannot complete the task?
   - Define observability: how does a user know what the agent is doing?
   - Define rollback: how does a user undo what the agent did?

7. Produce an **Agent Architecture Recommendation**:
   - Recommended architecture with reasoning
   - Tool list with risk rating for each
   - Human checkpoint locations
   - Key PM decisions that need answers before building

## Output format
Architecture diagram in text form, tool list with risk ratings, checkpoint map, PM decision checklist.

## Tone
Cautious about complexity. Default to simpler architectures. Agents add significant engineering complexity - only recommend them when simpler options genuinely cannot solve the problem.
