const fs = require('fs');
const path = require('path');
const { isOnSimorgh } = require('./helpers');
const articleUrls = require('./pageTypes/articles');
const frontpageUrls = require('./pageTypes/frontpages');
const errorPageUrls = require('./pageTypes/errorpage404');
const liveradioUrls = require('./pageTypes/liveradio');
const mapUrls = require('./pageTypes/map');
// const styUrls = require('./pageTypes/sty');
// const pglUrls = require('./pageTypes/pgl');

const pageTypes = {
  articles: articleUrls,
  frontPage: frontpageUrls,
  errorPage404: errorPageUrls,
  liveRadio: liveradioUrls,
  mediaAssetPage: mapUrls,
  // sty: require('./pageTypes/sty'),
  // pgl: require('./pageTypes/pgl'),
};

const environments = {
  // local: 'http://localhost:7080',
  // test: 'https://www.test.bbc.com',
  stage: 'https://www.stage.bbc.com',
  // live: 'https://www.bbc.com',
};

const requests = [];

Object.keys(environments).forEach(env => {
  Object.keys(pageTypes).forEach(pageType => {
    const domain = environments[env];

    pageTypes[pageType].forEach(pagePath => {
      requests.push(
        isOnSimorgh({
          url: `${domain}${pagePath}`,
          env,
          pageType,
          path: pagePath,
        }),
      );
    });
  });
});

const func = async () => {
  const results = await Promise.all(requests);

  const fresults = results.filter(Boolean);

  console.table(fresults);

  // console.table(parsed);

  const serviceList = {};

  fresults.forEach(value => {
    // eslint-disable-next-line no-prototype-builtins
    if (!serviceList.hasOwnProperty(value.service)) {
      serviceList[value.service] = {
        font: 'undefined',
        isWorldService: true,
        variant: 'default',
        pageTypes: {
          articles: {
            path: 'undefined',
            smoke: false,
          },
          errorPage404: {
            path: 'undefined',
            smoke: false,
          },
          frontPage: {
            path: 'undefined',
            smoke: false,
          },
          liveRadio: {
            path: 'undefined',
            smoke: false,
          },
          mediaAssetPage: {
            path: 'undefined',
            smoke: false,
          },
        },
      };
    }
    serviceList[value.service].pageTypes[value.pageType] = {
      path: value.path,
      smoke: false,
    };
  });

  const jsonContent = JSON.stringify(serviceList, null, 2);

  const outputPath = path.join(
    __dirname,
    '..',
    'cypress',
    'support',
    'config',
    'services.json',
  );
  fs.writeFile(outputPath, jsonContent, 'utf8', err => {
    if (err) {
      console.log(err);
      console.log('An error occured while writing JSON Object to File.');
    } else {
      console.log('JSON file has been saved.');
    }
  });
};

func();
