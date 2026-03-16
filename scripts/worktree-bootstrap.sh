#!/usr/bin/env bash
set -euo pipefail

if command -v npm >/dev/null 2>&1; then
  npm ci || npm install
  npm run worktree:env
  npm run docs:generate
  npm run docs:validate
  npm run arch:check
  npm run quality:score
fi
