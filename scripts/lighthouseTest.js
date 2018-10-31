const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

// run this with
// node scripts/lighthouseTest.js --accessibility=0 --seo=0 --best-practices=0 --pwa=0 --performance=0

const urls = [
  'http://localhost:7080/news/articles/c9rpqy7pmypo',
  'http://localhost:7080/news/articles/c85pqyj5m2ko',
];

const commandLineArguments = process.argv.slice(2);

const requiredThresholds = commandLineArguments.map(threshold => {
  const str = threshold.split(/\=/);
  return {
    id: str[0].substring(2),
    score: str[1],
  };
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
  const categoriesArray = Object.keys(reportCategories).map(
    i => reportCategories[i],
  );
  const results = categoriesArray.map(({ id, score }) => ({ id, score }));

  return { results, url };
}

function threshold(resultsArray, thresholds) {
  resultsArray.forEach(result => {
    thresholds.forEach(thres => {
      if (result.id === thres.id) {
        if (result.score < thres.score) {
          console.log(
            `${result.id} fails with ${result.score}, reuquired threshold was ${
              thres.score
            }`,
          );
          process.exit(1);
        }
      }
    });
  });
}

const url = 'https://www.bbc.co.uk/news';
launchChromeAndRunLighthouse(url, opts).then(results => {
  const scores = getScoresPerCategory(results.categories, url);
  // display where there were failing scores;
  // exits the process if we don't meet a threshold
  console.log(threshold(scores.results, requiredThresholds));
});
