import fs from 'fs';
import { buildRouteMapMarkdown } from './lib/route-map.js';

const checks = [
  ['AGENTS.md', fs.existsSync('AGENTS.md')],
  ['docs/ARCHITECTURE.md', fs.existsSync('docs/ARCHITECTURE.md')],
  ['docs/FRONTEND.md', fs.existsSync('docs/FRONTEND.md')],
  ['docs/WORKFLOW.md', fs.existsSync('docs/WORKFLOW.md')],
  ['docs/OBSERVABILITY.md', fs.existsSync('docs/OBSERVABILITY.md')],
  ['docs/MULTI_AGENT.md', fs.existsSync('docs/MULTI_AGENT.md')],
  ['docs/QUALITY.md', fs.existsSync('docs/QUALITY.md')],
  ['docs/PLANS.md', fs.existsSync('docs/PLANS.md')],
  ['docs/QUALITY_SCORE.md', fs.existsSync('docs/QUALITY_SCORE.md')],
  ['.codex/config.toml', fs.existsSync('.codex/config.toml')],
  ['.buildParams.stage', fs.existsSync('.buildParams.stage')],
  ['.buildParams.master', fs.existsSync('.buildParams.master')],
  ['scripts/worktree-bootstrap.sh', fs.existsSync('scripts/worktree-bootstrap.sh')],
  ['scripts/check-architecture.js', fs.existsSync('scripts/check-architecture.js')],
  ['scripts/write-worktree-env.js', fs.existsSync('scripts/write-worktree-env.js')],
  ['scripts/observability-up.sh', fs.existsSync('scripts/observability-up.sh')],
  ['scripts/observability-query.sh', fs.existsSync('scripts/observability-query.sh')],
  ['scripts/ui-smoke.sh', fs.existsSync('scripts/ui-smoke.sh')],
  ['docker/docker-compose.observability.yml', fs.existsSync('docker/docker-compose.observability.yml')],
  ['playwright-cli.json', fs.existsSync('playwright-cli.json')],
  [
    'docs/generated/route-map.md',
    fs.existsSync('docs/generated/route-map.md') &&
      fs.readFileSync('docs/generated/route-map.md', 'utf8') === buildRouteMapMarkdown(),
  ],
];

const passed = checks.filter(([, ok]) => ok).length;
const score = Math.round((passed / checks.length) * 100);

console.log(JSON.stringify({ score, checks }, null, 2));
