const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const chalk = require('chalk');

const log = console.log;
const config = require(`./../lighthouse`);

function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher
    .launch({ chromeFlags: opts.chromeFlags })
    .then(chrome => {
      opts.port = chrome.port;
      return lighthouse(url, opts, config).then(results =>
        chrome.kill().then(() => results.lhr),
      );
    });
}

function getScoresPerCategory(reportCategories, audits, url) {
  const scores = Object.keys(reportCategories).map(category => ({
    id: reportCategories[category].id,
    score: reportCategories[category].score,
  }));

  return { scores, url, audits };
}

function validateScores(resultsArray) {
  return resultsArray.map(result => ({
    url: result.url,
    scores: result.scores.map(actual => {
      const key = actual.id;
      const expectedScore = config.thresholds[key];
      return {
        id: key,
        actualScore: actual.score,
        expectedScore,
        pass: actual.score >= expectedScore,
      };
    }),
  }));
}

const lighthouseRuns = config.urls.map(url =>
  launchChromeAndRunLighthouse(url, config.opts).then(results =>
    getScoresPerCategory(results.categories, results.audits, url),
  ),
);

function formatResult(result) {
  if (result.pass) {
    log(
      `${chalk.black.bgGreen(' PASS ')} ${result.id}, actual: ${
        result.actualScore
      }, expected: ${result.expectedScore}`,
    );
  } else {
    log(
      `${chalk.black.bgRed(' FAIL ')} ${result.id}, actual: ${
        result.actualScore
      }, expected: ${result.expectedScore}`,
    );
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
    // process.exit(1); Uncomment to fail Travis build
  }
}

Promise.all(lighthouseRuns)
  .then(validateScores)
  .then(logHighLevelScores)
  .then(checkFailures);
