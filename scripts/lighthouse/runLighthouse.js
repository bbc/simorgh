const lighthouse = require('lighthouse'); // eslint-disable-line import/no-extraneous-dependencies
const chromeLauncher = require('chrome-launcher'); // eslint-disable-line import/no-extraneous-dependencies

let config = {};

function launchChromeAndRunLighthouse(url, opts, lConfig = null) {
  const options = opts;
  return chromeLauncher
    .launch({ chromeFlags: options.chromeFlags })
    .then(chrome => {
      options.port = chrome.port;
      return lighthouse(url, options, lConfig).then(results =>
        chrome.kill().then(() => results.lhr),
      );
    });
}

function getScoresPerCategory(reportCategories, url) {
  const scores = Object.keys(reportCategories).map(category => ({
    id: reportCategories[category].id,
    score: reportCategories[category].score,
  }));

  return { scores, url };
}

function createLighthouseRuns(configs) {
  return configs.urls.map(url =>
    launchChromeAndRunLighthouse(url, configs.opts).then(results =>
      getScoresPerCategory(results.categories, url),
    ),
  );
}

function mapScores(scores) {
  return scores.map(({ id, score }) => {
    const expectedScore = config.thresholds[id];
    return {
      id,
      score,
      expectedScore,
      pass: score >= expectedScore,
    };
  });
}

function validateScores(resultsArray) {
  return resultsArray.map(({ url, scores }) => ({
    url,
    scores: mapScores(scores),
  }));
}

function launchLighthouse(simorghConfig) {
  config = simorghConfig;
  const lighthouseRuns = createLighthouseRuns(simorghConfig);
  return Promise.all(lighthouseRuns).then(validateScores);
}

module.exports = launchLighthouse;
