/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const allServices = require('../cypress/support/config/settings');
const simorghLaunchDates = require('./simorghLaunchDates');

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

const generateLinks = (service, env, domain) => {
  const output = [];

  const {
    frontPage,
    liveRadio,
    articles,
    mediaAssetPage,
    photoGalleryPage,
    storyPage,
  } = allServices()[service].pageTypes;

  const frontPageURL = getUrl(frontPage, env);
  if (frontPageURL) {
    output.push(`[home](${domain}${frontPageURL})`);
  }

  const articleURL = getUrl(articles, env);
  if (articleURL) {
    output.push(`[articles](${domain}${articleURL})`);
  }

  const liveRadioURL = getUrl(liveRadio, env);
  if (liveRadioURL) {
    output.push(`[liveRadio](${domain}${liveRadioURL})`);
  }

  const mapURL = getUrl(mediaAssetPage, env);
  if (mapURL) {
    output.push(`[MAP](${domain}${mapURL})`);
  }

  const pglURL = getUrl(photoGalleryPage, env);
  if (pglURL) {
    output.push(`[PGL](${domain}${pglURL})`);
  }

  const styURL = getUrl(storyPage, env);
  if (styURL) {
    output.push(`[STY](${domain}${styURL})`);
  }

  return output.join('<br/>');
};

const generateLaunchDates = (service) => {
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

  if (serviceLaunch.photoGalleryPage && serviceLaunch.photoGalleryPage !== '') {
    output.push(`__PGLs__: ${serviceLaunch.photoGalleryPage}`);
  }

  if (serviceLaunch.storyPage && serviceLaunch.storyPage !== '') {
    output.push(`__STYs__: ${serviceLaunch.storyPage}`);
  }

  return output.join('<br/>');
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

  Object.keys(services).forEach((service) => {
    console.log(`Generating information for ${service}`);
    const items = [
      service,
      generateLinks(service, 'local', 'http://localhost:7080'),
      generateLinks(service, 'test', 'https://www.test.bbc.com'),
      generateLinks(service, 'test', 'https://www.stage.bbc.com'),
      generateLinks(service, 'live', 'https://www.bbc.com'),
      generateLaunchDates(service),
    ];

    stream.write(`| ${items.join(' | ')} |\n`);
  });
  console.log(`Completed writing file ${SimorghPages}`);
});
