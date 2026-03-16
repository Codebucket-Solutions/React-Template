import fs from 'fs';
import path from 'path';

const slug = process.argv[2] || 'new-task';
const now = new Date();
const date = [
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, '0'),
  String(now.getDate()).padStart(2, '0'),
].join('-');
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

## Claim
- Status: claimed
- Claimed by:
- Worktree:
- Last updated:

## Owner

## Write scope

## Steps
1.

## Coordination
- Blockers:
- Handoff:

## Verification
- npm run docs:generate
- npm run verify
`);
console.log(file);
