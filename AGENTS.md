# AGENTS.md

Start here before making changes.

## Read in this order
1. `docs/WORKFLOW.md`
2. `docs/ARCHITECTURE.md`
3. `docs/FRONTEND.md`
4. `docs/QUALITY.md`
5. `docs/OBSERVABILITY.md` when touching runtime validation, telemetry, or API flows
6. `docs/MULTI_AGENT.md` when coordinating work across multiple agents or worktrees
7. Any file in `docs/exec-plans/active/` relevant to the task

## Operating rules
- Make the smallest safe change.
- Read files before editing them.
- Preserve the existing frontend template structure unless the task explicitly requires structural changes.
- Before adding API calls or shared state, inspect src/apiCall/, src/store/, and src/shared/axios.js first and extend those patterns instead of creating page-local REST clients or parallel state containers.
- Follow the existing page/layout structure: prefer src/pages/<feature>/index.jsx wrappers, src/containers/<feature>/index.jsx implementations, and src/containers/layout/ for shared shells before adding new top-level page or layout files.
- Keep `src/routes/routeCatalog.js` as the route system of record and regenerate `docs/generated/route-map.md` after route changes.
- Create or update an execution plan before starting any non-trivial work.
- Keep the execution plan current until the task is complete.
- Use one active plan and one worktree per non-trivial agent task.
- Prefer the local observability stack for runtime-validation work instead of relying on browser console output alone.
- Update docs when routes, architecture, state management, build flow, or developer workflow changes.
- Run verification before finishing.

## Verification
- `npm run lint`
- `npm run build`
- `npm run arch:check`
- `npm run docs:generate`
- `npm run docs:validate`
- `npm run quality:score`
- `npm run verify`
- `npm run ui:smoke`
- `npm run observability:status`

## Important locations
- App source: `src/`
- Static assets: `public/`
- Docker files: `docker/`
- Harness docs: `docs/`
- Repo scripts: `scripts/`
- Codex project config: `.codex/config.toml`
- Route registry: `src/routes/routeCatalog.js`
