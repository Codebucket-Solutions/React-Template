# Multi-Agent

## Goal
Make parallel work predictable by keeping worktree ownership, plan ownership, and write scopes explicit.

## Rules
- Use one git worktree per active agent task.
- Use one active execution plan per non-trivial task.
- Treat the active execution plan as the claim record for that task.
- Record owner and write scope in the plan before parallel work begins.
- Keep write scopes disjoint unless a human explicitly decides to coordinate overlap.
- Regenerate `.codex/worktree.env` inside each worktree; never copy it across worktrees.

## Recommended loop
1. Create the worktree and run `npm run worktree:bootstrap`.
2. Check `docs/exec-plans/active/` and claim the task via a new or updated plan file.
3. Start `npm run observability:up` if the task touches runtime behavior.
4. Start `npm run dev:worktree`.
5. Implement the scoped change.
6. Run `npm run verify` and any targeted validation such as `npm run ui:smoke`.
7. Handoff with the plan path, changed files, validation commands, and any relevant browser or telemetry artifacts.

## Handoff contract
- active plan path
- clear write scope summary
- commands run
- unresolved risks or follow-ups
- artifact locations such as `output/playwright/`
