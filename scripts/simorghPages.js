const fs = require('fs');
const allServices = require('../cypress/support/config/allServices');
const simorghLaunchDates = require('./simorghLaunchDates');

const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

const generateLinks = (service, env, domain) => {
  const output = [];

  const { frontPage, liveRadio, articles, mediaAssetPage } = allServices(env)[
    service
  ].pageTypes;

  if (frontPage && frontPage.path) {
    output.push(`[home](${domain}${frontPage.path})`);
  }

  if (articles && articles.path) {
    output.push(`[articles](${domain}${articles.path})`);
  }

  if (liveRadio && liveRadio.path) {
    output.push(`[liveRadio](${domain}${liveRadio.path})`);
  }

  if (mediaAssetPage && mediaAssetPage.path) {
    output.push(`[MAP](${domain}${mediaAssetPage.path})`);
  }

  return output.join(' - ');
};

const generateLaunchDates = service => {
  const output = [];
  const serviceLaunch = simorghLaunchDates[service];

  if (serviceLaunch.frontPage && serviceLaunch.frontPage !== '') {
    output.push(`__Home__: ${serviceLaunch.frontPage}`);
  }

  if (serviceLaunch.articles && serviceLaunch.articles !== '') {
    output.push(`__Articles__: ${serviceLaunch.articles}`);
  }

  if (serviceLaunch.liveRadio && serviceLaunch.liveRadio !== '') {
    output.push(`__Live Radio__: ${serviceLaunch.liveRadio}`);
  }

  if (serviceLaunch.mediaAssetPage && serviceLaunch.mediaAssetPage !== '') {
    output.push(`__MAPs__: ${serviceLaunch.mediaAssetPage}`);
  }

  return output.join(' - ');
};

const SimorghPages = '../docs/Simorgh-Pages.md';
const stream = fs.createWriteStream(SimorghPages);
stream.once('open', () => {
  stream.write(
    '<!--Please update the service launch date in scripts/simorghLaunchDates.js -->\n',
  );
  stream.write(
    '<!--This table can then be generated using the following command: `cd scripts && node simorghPages.js` -->\n',
  );
  stream.write(
    '<!--Remember to commit and push the changes to both simorghLaunchDates.js and Simorgh-Pages.md -->\n',
  );

  stream.write(`| Service | Local | Test | Stage | Live | Launch Dates |\n`);
  stream.write(`|---------|-------|------|-------|------|--------------|\n`);

  const services = allServices('');

  Object.keys(services).forEach(service => {
    console.log(`Generating information for ${service}`);
    const items = [
      capitalizeFirstLetter(service),
      generateLinks(service, 'local', 'http://localhost:7080'),
      generateLinks(service, 'test', 'https://www.test.bbc.com'),
      generateLinks(service, 'stage', 'https://www.stage.bbc.com'),
      generateLinks(service, 'live', 'https://www.bbc.com'),
      generateLaunchDates(service),
    ];

    stream.write(`| ${items.join(' | ')} |\n`);
  });
  console.log(`Completed writing file ${SimorghPages}`);
});
