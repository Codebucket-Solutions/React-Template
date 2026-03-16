import fs from 'fs';

const checks = [
  ['AGENTS.md', fs.existsSync('AGENTS.md')],
  ['docs/ARCHITECTURE.md', fs.existsSync('docs/ARCHITECTURE.md')],
  ['docs/WORKFLOW.md', fs.existsSync('docs/WORKFLOW.md')],
  ['docs/QUALITY.md', fs.existsSync('docs/QUALITY.md')],
  ['.codex/config.toml', fs.existsSync('.codex/config.toml')],
  ['scripts/worktree-bootstrap.sh', fs.existsSync('scripts/worktree-bootstrap.sh')]
];

const passed = checks.filter(([, ok]) => ok).length;
const score = Math.round((passed / checks.length) * 100);

console.log(JSON.stringify({ score, checks }, null, 2));
