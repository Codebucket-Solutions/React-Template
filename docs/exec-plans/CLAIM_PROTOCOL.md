# Task Claim Protocol

## Purpose
Use the active plan file itself as the task claim record. This keeps coordination lightweight and visible in-repo.

## Claim a task
1. Check `docs/exec-plans/active/` for an existing plan that already covers the task or overlaps the same write scope.
2. If no conflicting claim exists, create a new plan with `npm run plan:new <slug>`.
3. Fill in the claim block before editing code:
   - `Status`
   - `Claimed by`
   - `Worktree`
   - `Last updated`
   - `Write scope`

## Claim states
- `claimed` — reserved, work has not started yet
- `in_progress` — active implementation
- `blocked` — waiting on another change or decision
- `handoff` — ready for another agent or human to continue
- `done` — ready to move out of `active/`

## Conflict rule
If an active plan already claims the same files or feature surface, do not start a second overlapping implementation by default. Narrow the write scope or coordinate directly in the existing plan.

## Release a claim
- Move the plan to `docs/exec-plans/completed/` when the work is done.
- Delete the plan only if the task was abandoned before meaningful work landed.

## Minimum handoff
- current `Status`
- exact `Write scope`
- commands already run
- unresolved blockers or follow-ups
