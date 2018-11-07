const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

let config = {};

// just mock lighthouse, beacuse although chromeLancher is a dep
// ultimately it is just lighthouse which is returned (an object with a lhr property)
// jest.mock('lighthouse', () => Promise.resolve({ lhr: {} }));

function launchChromeAndRunLighthouse(url, opts, lConfig = null) {
  return chromeLauncher
    .launch({ chromeFlags: opts.chromeFlags })
    .then(chrome => {
      opts.port = chrome.port;
      return lighthouse(url, opts, lConfig).then(results =>
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

const mapScores = scores =>
  scores.map(({ id, score }) => {
    const expectedScore = config.thresholds[id];
    console.log('mapScores', {
      id,
      score,
      expectedScore,
      pass: score >= expectedScore,
    });
    return {
      id,
      score,
      expectedScore,
      pass: score >= expectedScore,
    };
  });

function validateScores(resultsArray) {
  console.log(
    'validateScores',
    resultsArray.map(({ url, scores }) => ({
      url,
      scores: mapScores(scores),
    })),
  );
  return resultsArray.map(({ url, scores }) => ({
    url,
    scores: mapScores(scores),
  }));
}

const createLighthouseRuns = configs =>
  configs.urls.map(url =>
    launchChromeAndRunLighthouse(url, configs.opts).then(results =>
      getScoresPerCategory(results.categories, url),
    ),
  );

const launchLighthouse = simorghConfig => {
  config = simorghConfig;
  const lighthouseRuns = createLighthouseRuns(simorghConfig);
  return Promise.all(lighthouseRuns).then(validateScores);
};

module.exports = launchLighthouse;
