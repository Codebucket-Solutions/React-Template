import { writeWorktreeEnv } from './lib/worktree.js';

const metadata = writeWorktreeEnv();

console.log(
  JSON.stringify(
    {
      worktree: metadata.name,
      port: metadata.port,
      baseUrl: metadata.baseUrl,
      envFilePath: metadata.envFilePath,
      observability: metadata.observability,
    },
    null,
    2,
  ),
);
