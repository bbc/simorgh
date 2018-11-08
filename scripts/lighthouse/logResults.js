const chalk = require('chalk');

const { log } = console;

function formatResult({ id, score, expectedScore, pass }) {
  const resultDetail = `${id}, actual: ${score}, expected: ${expectedScore}`;
  if (pass) {
    log(`${chalk.black.bgGreen(' PASS ')} ${resultDetail}`);
  } else {
    log(`${chalk.black.bgRed(' FAIL ')} ${resultDetail}`);
  }
}

function logHighLevelScores(results) {
  const failures = [];
  results.forEach(result => {
    log(chalk.underline(`\nLighthouse results for ${result.url}:`));
    result.scores.forEach(score => {
      formatResult(score);
      if (!score.pass) {
        failures.push({ url: result.url, category: score.id });
      }
    });
  });
  return failures;
}

function checkFailures(failures) {
  if (failures.length > 0) {
    process.on('exit', () =>
      log(`\n${chalk.red('Lighthouse threshold tests failed')}`),
    );
    return true;
    // process.exit(1); Uncomment to fail Travis build
  }
  return false;
}

module.exports = {
  logHighLevelScores,
  checkFailures,
};
