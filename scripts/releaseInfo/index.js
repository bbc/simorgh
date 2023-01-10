/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const allServices = require('../../cypress/support/config/settings/index.js');

const getUrl = (pageType, env) => {
  let url;

  if (
    pageType &&
    pageType.environments &&
    pageType.environments[env] &&
    pageType.environments[env].paths
  ) {
    [url] = pageType.environments[env].paths;
  }

  return url;
};

const pageTypeTitleMappings = {
  frontPage: 'Home',
  articles: 'Articles',
  liveRadio: 'Live Radio',
  mediaAssetPage: 'MAP',
  photoGalleryPage: 'PGL',
  storyPage: 'STY',
  mostReadPage: 'Most Read',
  onDemandRadio: 'On Demand Radio',
  idxPage: 'IDX',
  onDemandTV: 'On Demand TV',
  featureIndexPage: 'FIX',
  mostWatchedPage: 'Most Watched',
  onDemandAudio: 'On Demand Audio',
  topicPage: 'Topics',
};

const excludedPageTypes = ['errorPage404'];

const environmentDomainMappings = {
  local: 'http://localhost:7080',
  test: 'https://www.test.bbc.com',
  live: 'https://www.bbc.com',
};

const generateLinks = (service, env) => {
  const output = [];

  const serviceData = allServices[service];

  Object.keys(serviceData?.pageTypes)
    .sort()
    .forEach(pageType => {
      if (!excludedPageTypes.includes(pageType)) {
        const url = getUrl(serviceData?.pageTypes[pageType], env);

        if (url) {
          output.push(
            `[${env}: ${pageTypeTitleMappings[pageType] || pageType}](${
              environmentDomainMappings[env]
            }${url})`,
          );
        }
      }
    });

  return output.join('<br/>');
};

const scriptDir = path.resolve(__dirname);
const SimorghReleaseInfo = `${scriptDir}/../../docs/Simorgh-Release-Info.md`;
const stream = fs.createWriteStream(SimorghReleaseInfo);

stream.once('open', () => {
  stream.write(
    '<!--Please generate the Simorgh Release Info using the following command: `node scripts/releaseInfo`\n' +
      'Remember to commit and push the changes to Simorgh-Release-Info.md -->\n',
  );

  stream.write(
    '| Service | Local | Test | Live |\n' +
      '| :--: | :-- | :-- | :-- |\n',
  );

  Object.keys(allServices).forEach(service => {
    console.log(`Generating information for ${service}`);
    const items = [
      service,
      generateLinks(service, 'local'),
      generateLinks(service, 'test'),
      generateLinks(service, 'live'),
    ];

    stream.write(`| ${items.join(' | ')} |\n`);
  });
  console.log(`Completed writing file ${SimorghReleaseInfo}`);
});
