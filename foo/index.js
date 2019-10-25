const { isOnSimorgh } = require('./helpers');
const getData = require('./data');
const table = require('./table');

const pageTypes = {
  articles: require('./pageTypes/articles'),
  frontpages: require('./pageTypes/frontpages'),
  liveradio: require('./pageTypes/liveradio'),
  map: require('./pageTypes/map'),
  sty: require('./pageTypes/sty'),
  pgl: require('./pageTypes/pgl'),
};

const environments = {
  local: 'http://localhost:7080',
  test: 'https://www.test.bbc.com',
  stage: 'https://www.stage.bbc.com',
  live: 'https://www.bbc.com',
};

const requests = [];

Object.keys(environments).forEach(env => {
  Object.keys(pageTypes).forEach(pageType => {
    const domain = environments[env];

    pageTypes[pageType].forEach(path => {
      requests.push(() =>
        isOnSimorgh({ url: `${domain}${path}`, env, pageType, path }),
      );
    });
  });
});

const func = async () => {
  requests
    .reduce((promiseChain, currentTask) => {
      return promiseChain.then(chainResults =>
        currentTask().then(currentResult => [...chainResults, currentResult]),
      );
    }, Promise.resolve([]))
    .then(results => results.filter(Boolean))
    .then(getData)
    .then(table);
};

func();
