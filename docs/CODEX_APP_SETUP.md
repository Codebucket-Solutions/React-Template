# Codex App Setup

## Recommended setup
Open this repo in the Codex app as a trusted project.

### Worktree setup command
`bash scripts/worktree-bootstrap.sh`

### Suggested project actions
- `npm run verify`
- `npm run lint`
- `npm run build`
- `npm run docs:validate`
- `npm run quality:score`
- `npm run plan:new`

### Suggested first prompt
Read `AGENTS.md`, `docs/WORKFLOW.md`, `docs/ARCHITECTURE.md`, and any active plan. Summarize the repo, identify the next smallest safe improvement, implement it, and run `npm run verify`.
