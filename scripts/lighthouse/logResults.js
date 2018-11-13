const chalk = require('chalk'); // eslint-disable-line import/no-extraneous-dependencies

function formatResult({ id, score, expectedScore, pass }) {
  const resultDetail = `${id}, actual: ${score}, expected: ${expectedScore}`;
  if (pass) {
    console.log(`${chalk.black.bgGreen(' PASS ')} ${resultDetail}`); // eslint-disable-line no-console
  } else {
    console.log(`${chalk.black.bgRed(' FAIL ')} ${resultDetail}`); // eslint-disable-line no-console
  }
}

function logHighLevelScores(results) {
  const failures = [];
  results.forEach(result => {
    console.log(chalk.underline(`\nLighthouse results for ${result.url}:`)); // eslint-disable-line no-console
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
    console.log(`\n${chalk.red('Lighthouse threshold tests failed')}`); // eslint-disable-line no-console
    return true;
    // Uncomment the following to fail Travis build
    // process.on('exit', () =>
    //   console.log(`\n${chalk.red('Lighthouse threshold tests failed')}`),
    // );
    // process.exit(1);
  }
  return false;
}

module.exports = {
  logHighLevelScores,
  checkFailures,
};
