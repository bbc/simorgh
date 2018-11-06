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

const mapScores = scores =>
  scores.map(({ id, score }) => {
    const expectedScore = config.thresholds[id];
    return {
      id,
      score,
      expectedScore,
      pass: score >= expectedScore,
    };
  });

function validateScores(resultsArray) {
  return resultsArray.map(({ url, scores }) => ({
    url,
    scores: mapScores(scores),
  }));
}

const lighthouseRuns = config.urls.map(url =>
  launchChromeAndRunLighthouse(url, config.opts).then(results =>
    getScoresPerCategory(results.categories, results.audits, url),
  ),
);

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
    // process.exit(1); Uncomment to fail Travis build
  }
}

Promise.all(lighthouseRuns)
  .then(validateScores)
  .then(logHighLevelScores)
  .then(checkFailures);
