// Invoked on the commit-msg git hook by yorkie.

const chalk = require('chalk');
const msgPath = process.env.GIT_PARAMS;
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim();

const commitRE =
  /^(((\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f\ude80-\udeff])|[\u2600-\u2B55]) )?(revert: )?(feat|fix|docs|UI|refactor|⚡perf|workflow|build|CI|typos|chore|tests|types|wip|release|dep)(\(.+\))?: .{1,50}/;

if (!commitRE.test(msg)) {
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
      `invalid commit message format.`,
    )}\n\n${chalk.red(
      `  Proper commit message format is required for automated changelog generation. Examples:\n\n`,
    )}
    ${chalk.green(`[<emoji>] [revert: ?]<type>[(scope)?]: <message>\n`)}
    ${chalk.green(`💥 feat(compiler): add 'comments' option`)}
    ${chalk.green(`🐛 fix(compiler): fix some bug`)}
    ${chalk.green(`📝 docs(compiler): add some docs`)}
    ${chalk.green(`🌷 UI(compiler): better styles`)}
    ${chalk.green(`🏰 chore(compiler): Made some changes to the scaffolding`)}
    ${chalk.green(`🌐 locale(compiler): Made a small contribution to internationalization\n`)}
    ${chalk.green(`Other commit types: refactor, perf, workflow, build, CI, typos, tests, types, wip, release, dep\n`,
    )}
    ${chalk.red(`See https://github.com/vuejs/core/blob/main/.github/commit-convention.md\n`)}`,
  );
  process.exit(1);
}
