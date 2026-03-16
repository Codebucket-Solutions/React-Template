import fs from 'fs';
import path from 'path';

const srcRoot = path.resolve('src');

const walk = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return walk(fullPath);
    }

    return /\.(js|jsx)$/.test(entry.name) ? [fullPath] : [];
  });
};

const resolveImportTarget = (sourceFile, specifier) => {
  if (!specifier || /\.(css|scss|svg|png|jpg|jpeg|gif|ttf)$/.test(specifier)) {
    return null;
  }

  let candidatePath = null;

  if (specifier.startsWith('@/')) {
    candidatePath = path.join(srcRoot, specifier.slice(2));
  } else if (specifier.startsWith('.')) {
    candidatePath = path.resolve(path.dirname(sourceFile), specifier);
  } else if (specifier.startsWith('src/')) {
    candidatePath = path.resolve(specifier);
  }

  if (!candidatePath) {
    return null;
  }

  const possiblePaths = [
    candidatePath,
    `${candidatePath}.js`,
    `${candidatePath}.jsx`,
    path.join(candidatePath, 'index.js'),
    path.join(candidatePath, 'index.jsx'),
  ];

  return possiblePaths.find((item) => fs.existsSync(item)) || null;
};

const getImports = (filePath) => {
  const contents = fs.readFileSync(filePath, 'utf8');
  const matches = [...contents.matchAll(/^\s*import(?:[\s\S]*?from\s+)?["']([^"']+)["'];?/gm)];

  return matches.map((match) => ({
    specifier: match[1],
    line: contents.slice(0, match.index).split('\n').length,
    target: resolveImportTarget(filePath, match[1]),
  }));
};

const normalize = (filePath) => path.relative(srcRoot, filePath).replace(/\\/g, '/');

const pageWrapperFiles = new Set();
const issues = [];

for (const filePath of walk(srcRoot)) {
  const source = normalize(filePath);
  const imports = getImports(filePath);

  if (/^pages\/[^/]+\/index\.jsx$/.test(source)) {
    pageWrapperFiles.add(filePath);
    const importsContainer = imports.some((entry) => normalize(entry.target || '').startsWith('containers/'));

    if (!importsContainer) {
      issues.push(`${source}: page wrappers should import a container implementation from src/containers/.`);
    }
  }

  for (const entry of imports) {
    const target = entry.target ? normalize(entry.target) : null;

    if (source.startsWith('pages/')) {
      if (entry.specifier === 'react-redux') {
        issues.push(
          `${source}:${entry.line} pages should stay thin and avoid importing react-redux directly.`,
        );
      }

      if (target && (target.startsWith('store/') || target.startsWith('apiCall/'))) {
        issues.push(
          `${source}:${entry.line} pages should import containers, not store/api modules (${target}).`,
        );
      }
    }

    if (source.startsWith('containers/') && target?.startsWith('pages/')) {
      issues.push(
        `${source}:${entry.line} containers should not import page wrappers (${target}).`,
      );
    }

    if (source.startsWith('store/') && target && (target.startsWith('pages/') || target.startsWith('containers/'))) {
      issues.push(
        `${source}:${entry.line} store modules must not depend on pages or containers (${target}).`,
      );
    }

    if (source.startsWith('apiCall/') && target && (target.startsWith('pages/') || target.startsWith('containers/'))) {
      issues.push(
        `${source}:${entry.line} api modules must not depend on pages or containers (${target}).`,
      );
    }

    if (
      source.startsWith('routes/') &&
      target &&
      !target.startsWith('pages/') &&
      !target.startsWith('routes/') &&
      !target.startsWith('containers/layout/')
    ) {
      issues.push(
        `${source}:${entry.line} routes may only depend on route metadata, pages, or shared layout shells (${target}).`,
      );
    }
  }
}

if (issues.length > 0) {
  console.error('Architecture check failed:');
  issues.forEach((issue) => console.error(`- ${issue}`));
  process.exit(1);
}

console.log(`Architecture check passed for ${pageWrapperFiles.size} page wrapper(s).`);
