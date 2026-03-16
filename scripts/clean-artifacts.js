import fs from 'fs';
import path from 'path';

const removablePaths = [
  'dist',
  'dist-ssr',
  '.playwright-cli',
  path.join('output', 'playwright', '.playwright-cli'),
];

for (const relativePath of removablePaths) {
  fs.rmSync(path.resolve(relativePath), {
    recursive: true,
    force: true,
  });
}

console.log(
  JSON.stringify(
    {
      removed: removablePaths,
    },
    null,
    2,
  ),
);
