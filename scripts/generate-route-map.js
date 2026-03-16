import fs from 'fs';
import path from 'path';
import { buildRouteMapMarkdown } from './lib/route-map.js';

const outputPath = path.resolve('docs/generated/route-map.md');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${buildRouteMapMarkdown()}`);
console.log(outputPath);
