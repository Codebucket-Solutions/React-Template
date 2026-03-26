import fs from 'fs';
import path from 'path';
import { buildRouteMapMarkdown } from './lib/route-map.js';

const required = [
  'AGENTS.md',
  '.codex/config.toml',
  '.buildParams.stage',
  '.buildParams.master',
  'docs/ARCHITECTURE.md',
  'docs/FRONTEND.md',
  'docs/WORKFLOW.md',
  'docs/OBSERVABILITY.md',
  'docs/MULTI_AGENT.md',
  'docs/PLANS.md',
  'docs/QUALITY.md',
  'docs/QUALITY_SCORE.md',
  'docs/SECURITY.md',
  'docs/RELIABILITY.md',
  'docs/CODEX_APP_SETUP.md',
  'CLAUDE.md',
  'docs/CLAUDE_SETUP.md'
];

const missing = required.filter((file) => !fs.existsSync(path.resolve(process.cwd(), file)));

const requiredDirectories = [
  'docs/design-docs',
  'docs/product-specs',
  'docs/references',
  'docs/generated',
  'docs/exec-plans/active',
  'docs/exec-plans/completed',
];

const missingDirectories = requiredDirectories.filter(
  (dir) => !fs.existsSync(path.resolve(process.cwd(), dir)),
);

const docsReadme = fs.existsSync('docs/README.md') ? fs.readFileSync('docs/README.md', 'utf8') : '';
const docsReadmeReferences = [
  'FRONTEND.md',
  'OBSERVABILITY.md',
  'MULTI_AGENT.md',
  'PLANS.md',
  'QUALITY_SCORE.md',
  'design-docs',
  'product-specs',
  'references',
  'generated',
  'tech-debt-tracker.md',
];

const missingReadmeReferences = docsReadmeReferences.filter((item) => !docsReadme.includes(item));

const routeMapPath = path.resolve('docs/generated/route-map.md');
const routeMapMatches =
  fs.existsSync(routeMapPath) && fs.readFileSync(routeMapPath, 'utf8') === buildRouteMapMarkdown();

if (missing.length || missingDirectories.length || missingReadmeReferences.length || !routeMapMatches) {
  console.error('Missing required docs/files:');
  for (const item of missing) console.error(`- ${item}`);
  for (const item of missingDirectories) console.error(`- ${item}`);
  for (const item of missingReadmeReferences) console.error(`- docs/README.md missing reference to ${item}`);
  if (!routeMapMatches) {
    console.error('- docs/generated/route-map.md is missing or stale; run npm run docs:generate');
  }
  process.exit(1);
}

console.log('Docs validation passed.');
