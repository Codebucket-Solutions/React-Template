# Plans

## Why plans exist
Execution plans keep non-trivial work legible to future agent runs and human reviewers.

## Directories
- `docs/exec-plans/active/` — work currently in flight
- `docs/exec-plans/completed/` — archived plans for work your team has already landed
- `docs/exec-plans/tech-debt-tracker.md` — recurring follow-up items and cleanup backlog
- `docs/exec-plans/CLAIM_PROTOCOL.md` — lightweight task-claim rules for parallel work

## Expectations
- Create or update a plan before large structural work.
- Treat the active plan file as the task claim when more than one agent may be working in parallel.
- Include owner and write scope when the task may be parallelized across multiple agents.
- Keep the scope tight and the verification section concrete.
- Move completed plans out of `active/` once the work lands.
- Keep the starter template itself free of bootstrap-only history; use `completed/` for project-owned work after adoption.
