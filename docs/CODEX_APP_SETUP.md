# Codex App Setup

## Recommended setup
Open this repo in the Codex app as a trusted project.

## First commands
1. `npm run worktree:bootstrap`
2. `npm run observability:up`
3. `npm run dev:worktree`
4. `npm run verify`

## Suggested project actions
- `npm run dev:worktree`
- `npm run observability:up`
- `npm run observability:query -- metrics "react_template_frontend_runtime_events_total"`
- `npm run observability:query -- traces "{ name = \"runtime:route.view\" }"`
- `npm run docs:generate`
- `npm run arch:check`
- `npm run ui:smoke`
- `npm run quality:score`
- `npm run clean:artifacts`

## Suggested first prompt
Read `AGENTS.md`, `docs/WORKFLOW.md`, `docs/ARCHITECTURE.md`, `docs/FRONTEND.md`, `docs/OBSERVABILITY.md`, `docs/MULTI_AGENT.md`, and any active plan. Summarize the repo, identify the next smallest safe improvement, implement it, regenerate docs if routes changed, and run `npm run verify`.
