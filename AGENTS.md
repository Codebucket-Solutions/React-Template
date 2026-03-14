# AGENTS.md

Start here before making changes.

## Read in this order
1. `docs/WORKFLOW.md`
2. `docs/ARCHITECTURE.md`
3. `docs/QUALITY.md`
4. Any file in `docs/exec-plans/active/` relevant to the task

## Operating rules
- Make the smallest safe change.
- Read files before editing them.
- Preserve the existing frontend template structure unless the task explicitly requires structural changes.
- Before adding API calls or shared state, inspect src/apiCall/, src/store/, and src/shared/axios.js first and extend those patterns instead of creating page-local REST clients or parallel state containers.
- Follow the existing page/layout structure: prefer src/pages/<feature>/index.jsx wrappers, src/containers/<feature>/index.jsx implementations, and src/containers/layout/ for shared shells before adding new top-level page or layout files.
- Create or update an execution plan before starting any non-trivial work.
- Keep the execution plan current until the task is complete.
- Update docs when routes, architecture, state management, build flow, or developer workflow changes.
- Run verification before finishing.

## Verification
- `npm run lint`
- `npm run build`
- `npm run docs:validate`
- `npm run quality:score`
- `npm run verify`

## Important locations
- App source: `src/`
- Static assets: `public/`
- Docker files: `docker/`
- Harness docs: `docs/`
- Repo scripts: `scripts/`
- Codex project config: `.codex/config.toml`
