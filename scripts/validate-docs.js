import fs from 'fs';
import path from 'path';

const required = [
  'AGENTS.md',
  '.codex/config.toml',
  'docs/ARCHITECTURE.md',
  'docs/WORKFLOW.md',
  'docs/QUALITY.md',
  'docs/SECURITY.md',
  'docs/RELIABILITY.md',
  'docs/CODEX_APP_SETUP.md'
];

const missing = required.filter((file) => !fs.existsSync(path.resolve(process.cwd(), file)));

if (missing.length) {
  console.error('Missing required docs/files:');
  for (const item of missing) console.error(`- ${item}`);
  process.exit(1);
}

console.log('Docs validation passed.');
