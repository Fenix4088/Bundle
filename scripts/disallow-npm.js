const agent = process.env.npm_config_user_agent;

if (!agent.startsWith('pnpm')) {
  console.error('\nPlease use pnpm to manage dependencies in this repository.\n  $ npm i pnpm -g\n');
  process.exit(1);
}
