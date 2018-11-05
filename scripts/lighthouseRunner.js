const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const chalk = require('chalk');

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

function logHighLevelScores(results) {
  const failures = [];
  results.forEach(result => {
    console.log(`\nLighthouse results for ${result.url}:`);
    result.scores.forEach(score => {
      console.log(
        `Category: ${score.id}, actual: ${score.actualScore}, expected: ${
          score.expectedScore
        }, pass: ${score.pass}`,
      );
      if (!score.pass) {
        failures.push({ url: result.url, category: score.id });
      }
    });
  });
  return failures;
}

function checkFailures(failures) {
  if (failures.length > 0) {
    process.on('exit', () => `Lighthouse tests failed`);
    process.exit(1);
  }
}

Promise.all(lighthouseRuns)
  .then(validateScores)
  .then(logHighLevelScores);
// Uncomment to fail Travis build
// then(failures => checkFailures(failures));
