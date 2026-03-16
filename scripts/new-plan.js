import fs from 'fs';
import path from 'path';

const slug = process.argv[2] || 'new-task';
const date = new Date().toISOString().slice(0, 10);
const dir = path.resolve('docs/exec-plans/active');
fs.mkdirSync(dir, { recursive: true });
const file = path.join(dir, `${date}-${slug}.md`);
if (fs.existsSync(file)) {
  console.error(`Plan already exists: ${file}`);
  process.exit(1);
}
fs.writeFileSync(file, `# ${slug}

## Goal

## Scope

## Steps
1.

## Verification
- npm run verify
`);
console.log(file);
