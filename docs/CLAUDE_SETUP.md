# Claude Code Setup

## Prerequisites
- Node.js 18+
- Claude Code CLI installed (`npm install -g @anthropic-ai/claude-code`)

## First run
```bash
claude                        # Start Claude Code in the repo root
```

Claude Code automatically reads `CLAUDE.md` at the start of every conversation. No extra configuration needed.

## First commands
1. `npm run worktree:bootstrap`
2. `npm run observability:up`
3. `npm run dev:worktree`
4. `npm run verify`

## Using worktrees
Claude Code has built-in worktree support. Use `/worktree` to create an isolated copy of the repo for a task. Inside the worktree, run `npm run worktree:bootstrap` to set up deterministic ports and validate the environment.

For multi-agent work, each agent should operate in its own worktree and claim work via an execution plan in `docs/exec-plans/active/`.

## Project permissions
`.claude/settings.json` pre-allows common verification commands (lint, build, arch:check, etc.) so Claude can run them without prompting each time.

A post-edit hook automatically checks architecture boundaries after file changes and warns if a violation is detected.

## Suggested first prompt
> Read AGENTS.md and the docs in order. Summarize the repo, identify the next smallest safe improvement, implement it, regenerate docs if routes changed, and run `npm run verify`.

## Execution plans
For non-trivial tasks, create an execution plan:
```bash
npm run plan:new -- --title "my task title"
```
Or ask Claude to create one following the pattern in `docs/PLANS.md`.

## Observability
Start the local stack to get runtime signals:
```bash
npm run observability:up
npm run dev:worktree
npm run ui:smoke
npm run observability:query -- metrics "react_template_frontend_runtime_events_total"
npm run observability:query -- traces "{ name = \"runtime:route.view\" }"
```
