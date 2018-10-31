const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

// run this with
// node scripts/lighthouseRunner.js --accessibility=2 --seo=2 --best-practices=2 --pwa=2 --performance=2

const commandLineArguments = process.argv.slice(2);

const minimumThresholds = {};

commandLineArguments.forEach(metric => {
  const str = metric.split(/=/);
  const id = str[0].substring(2);
  const score = str[1];
  minimumThresholds[id] = score;
});

function launchChromeAndRunLighthouse(url, opts, config = null) {
  console.log(`Checking URL: ${url}`);

  return chromeLauncher
    .launch({ chromeFlags: opts.chromeFlags })
    .then(chrome => {
      opts.port = chrome.port;
      return lighthouse(url, opts, config).then(results => {
        return chrome.kill().then(() => results.lhr);
      });
    });
}

const opts = {
  chromeFlags: ['--show-paint-rects'],
};

function getScoresPerCategory(reportCategories, url) {
  const categoriesArray = Object.keys(reportCategories).map(
    category => reportCategories[category],
  );
  const scores = categoriesArray.map(({ id, score }) => ({ id, score }));

  return { scores, url };
}

function validateScores(resultsArray, thresholds) {
  const validatedResults = [];

  resultsArray.forEach(result => {
    const minThresholds = thresholds;
    result.scores.forEach(actual => {
      const key = actual.id;
      const expectedScore = minThresholds[`${key}`];
      validatedResults.push({
        url: result.url,
        id: key,
        actualScore: actual.score,
        expectedScore,
        passes: actual.score < expectedScore,
      });
    });
  });
  return validatedResults;
}

const urls = [
  'http://localhost:7080/news/articles/c9rpqy7pmypo',
  'http://localhost:7080/news/articles/c85pqyj5m2ko',
];

const lighthouseRuns = urls.map(url =>
  launchChromeAndRunLighthouse(url, opts).then(results =>
    getScoresPerCategory(results.categories, url),
  ),
);

function returnFailures(failuresArray) {
  failuresArray.forEach(failure => {
    console.log('failure.id', failure.id);
    console.log('failure.actualScore', failure.actualScore);
    console.log('failure.expectedScore', failure.expectedScore);
  });

  // to-do: 
  // provide detailed metric of failure
  // exit script so travis fails
}

Promise.all(lighthouseRuns).then(scoresArray => {
  const results = validateScores(scoresArray, minimumThresholds);
  const failures = results.filter(url => url.passes === false);
  failures.length > 0
    ? returnFailures(failures)
    : console.log('there are no failures');
});
