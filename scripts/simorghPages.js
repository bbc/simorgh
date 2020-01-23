/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const allServices = require('../cypress/support/config/allServices');
const simorghLaunchDates = require('./simorghLaunchDates');

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

const scriptDir = path.resolve(__dirname);
const SimorghPages = `${scriptDir}/../docs/Simorgh-Release-Info.md`;
const stream = fs.createWriteStream(SimorghPages);

stream.once('open', () => {
  stream.write(
    '<!--Please update the service launch date in scripts/simorghLaunchDates.js\n' +
      'This table can then be generated using the following command: `node scripts/simorghPages.js`\n' +
      'Remember to commit and push the changes to both simorghLaunchDates.js and Simorgh-Release-Info.md -->\n',
  );

  stream.write(
    '| Service | Local | Test | Stage | Live | Launch Dates |\n' +
      '|---------|-------|------|-------|------|--------------|\n',
  );

  const services = allServices('');

  Object.keys(services).forEach(service => {
    console.log(`Generating information for ${service}`);
    const items = [
      service,
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
