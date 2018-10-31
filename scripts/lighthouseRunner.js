const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

// run this with
// node scripts/lighthouseRunner.js --accessibility=2 --seo=2 --best-practices=2 --pwa=2 --performance=2

const commandLineArguments = process.argv.slice(2);

// const requiredThresholds = commandLineArguments.map(metric => {
//   const str = metric.split(/=/);
//   return {
//     id: str[0].substring(2),
//     score: str[1],
//   };
// });

const minimumThresholds = {};
commandLineArguments.forEach(metric => {
  const str = metric.split(/=/);
  const id = str[0].substring(2);
  const score = str[1];
  minimumThresholds[id] = score;
});

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

const opts = {
  chromeFlags: ['--show-paint-rects'],
};

function getScoresPerCategory(reportCategories, url) {
  console.log(`Checking URL: ${url}`);
  const categoriesArray = Object.keys(reportCategories).map(
    category => reportCategories[category],
  );
  const scores = categoriesArray.map(({ id, score }) => ({ id, score }));

  return { scores, url };
}

function validateScores(resultsArray, thresholds) {
  resultsArray.forEach(result => {
    console.log('result', result);
    const resultsObject = { url: result.url };
    // const keys = Object.keys(thresholds);
    result.scores.forEach(actual => {
      resultsObject.id = actual.id;
      resultsObject.score = actual.score;
      // why are some scores null?
      console.log(resultsObject);
    });
  });
}

const urls = [
  'http://localhost:7080/news/articles/c9rpqy7pmypo',
  'http://localhost:7080/news/articles/c85pqyj5m2ko',
];

const lighthouseRuns = urls.map(url =>
  launchChromeAndRunLighthouse(url, opts).then(results =>
    // no results.categories here are null..
    getScoresPerCategory(results.categories, url),
  ),
);

Promise.all(lighthouseRuns).then(scoresArray => {
  validateScores(scoresArray, minimumThresholds);
});
