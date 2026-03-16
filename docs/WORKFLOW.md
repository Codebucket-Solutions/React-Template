# Workflow

## Default loop
1. Read `AGENTS.md` and the relevant docs.
2. Run `npm run worktree:bootstrap` when opening a fresh checkout or worktree.
3. Run `npm run observability:up` when the task touches runtime flows, API behavior, or browser validation.
4. Create or update an execution plan for non-trivial work.
5. Make the smallest safe implementation change.
6. Regenerate derived docs when routes or generated artifacts change.
7. Run verification.
8. Update docs when structure, routes, state, build flow, or developer workflow changes.

## When to create a plan
Create a plan for:
- new pages or route groups
- state management changes
- API layer changes
- environment/build changes
- large UI or structural refactors
- harness, documentation, or validation changes

## Route changes
`src/routes/routeCatalog.js` is the route system of record.

After changing routes:
- update or add the relevant page wrapper in `src/pages/`
- update the implementation container in `src/containers/`
- run `npm run docs:generate`
- run `npm run docs:validate`

## Worktree expectations
- use `npm run dev:worktree` for deterministic local ports
- keep `.codex/worktree.env` generated, not hand-edited
- write browser artifacts into `output/playwright/`
- derive observability ports from `.codex/worktree.env`, not ad hoc local choices
- prune disposable artifacts with `npm run clean:artifacts` when the workspace needs to be reset

## Multi-agent loop
- Use one worktree per active agent task.
- Check `docs/exec-plans/active/` before starting overlapping work.
- Use one active plan file per non-trivial task and keep ownership/write scope explicit.
- Treat the active plan file as the task claim.
- Keep write scopes disjoint when multiple agents are editing in parallel.
- Handoffs should include the plan path, changed surfaces, verification run, and any browser or observability commands used.

## Observability loop
- Start the stack with `npm run observability:up`.
- Run the app with `npm run dev:worktree`.
- Validate UI paths with `npm run ui:smoke`.
- Query the stack with `npm run observability:query -- metrics|logs|traces "<query>"`.
