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
