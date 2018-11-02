const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

const config = require(`./../lighthouse`);

function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher
    .launch({ chromeFlags: opts.chromeFlags })
    .then(chrome => {
      opts.port = chrome.port;
      return lighthouse(url, opts, config).then(results => {
        return chrome.kill().then(() => results.lhr);
      });
    });
}

function getScoresPerCategory(reportCategories, audits, url) {
  const categoriesArray = Object.keys(reportCategories).map(
    category => reportCategories[category],
  );
  const scores = categoriesArray.map(({ id, score }) => ({ id, score }));

  return { scores, url, audits };
}

function validateScores(resultsArray, thresholds) {
  const validatedResults = [];

  resultsArray.forEach(result => {
    const minThresholds = thresholds;

    const resultsObj = {
      url: result.url,
      scores: [],
    };

    result.scores.forEach(actual => {
      const key = actual.id;
      const expectedScore = minThresholds[`${key}`];
      resultsObj.scores.push({
        id: key,
        actualScore: actual.score,
        expectedScore,
        pass: actual.score >= expectedScore,
      });
    });

    validatedResults.push(resultsObj);
  });
  return validatedResults;
}

const lighthouseRuns = config.urls.map(url => {
  return launchChromeAndRunLighthouse(url, config.opts).then(results => {
    return getScoresPerCategory(results.categories, results.audits, url);
  });
});

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

Promise.all(lighthouseRuns).then(scoresArray => {
  const results = validateScores(scoresArray, config.thresholds);
  const failures = logHighLevelScores(results);

  // Uncomment to fail Travis build
  // if (failures.length > 0) {
  //   process.on('exit', () => `Lighthouse tests failed`);
  //   process.exit(1);
  // }
});
