/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const allServices = require('../../cypress/support/config/settings');
const launchDates = require('./launchDates');

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
    mostReadPage,
    onDemandRadio,
    onDemandTV,
    featureIndexPage,
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

  const mostReadURL = getUrl(mostReadPage, env);
  if (mostReadURL) {
    output.push(`[mostRead](${domain}${mostReadURL})`);
  }

  const onDemandRadioURL = getUrl(onDemandRadio, env);
  if (onDemandRadioURL) {
    output.push(`[onDemandRadio](${domain}${onDemandRadioURL})`);
  }

  const onDemandTVURL = getUrl(onDemandTV, env);
  if (onDemandTVURL) {
    output.push(`[onDemandTV](${domain}${onDemandTVURL})`);
  }

  const featureIndexURL = getUrl(featureIndexPage, env);
  if (featureIndexURL) {
    output.push(`[FIX](${domain}${featureIndexURL})`);
  }

  return output.join('<br/>');
};

const generateLaunchDates = service => {
  const output = [];
  const serviceLaunch = launchDates[service];

  if (serviceLaunch) {
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
      output.push(`__MAP__: ${serviceLaunch.mediaAssetPage}`);
    }

    if (
      serviceLaunch.photoGalleryPage &&
      serviceLaunch.photoGalleryPage !== ''
    ) {
      output.push(`__PGL__: ${serviceLaunch.photoGalleryPage}`);
    }

    if (serviceLaunch.storyPage && serviceLaunch.storyPage !== '') {
      output.push(`__STY__: ${serviceLaunch.storyPage}`);
    }

    if (serviceLaunch.mostReadPage && serviceLaunch.mostReadPage !== '') {
      output.push(`__Most Read__: ${serviceLaunch.mostReadPage}`);
    }

    if (serviceLaunch.onDemandRadio && serviceLaunch.onDemandRadio !== '') {
      output.push(`__On Demand Radio__: ${serviceLaunch.onDemandRadio}`);
    }

    if (serviceLaunch.onDemandTV && serviceLaunch.onDemandTV !== '') {
      output.push(`__On Demand TV__: ${serviceLaunch.onDemandTV}`);
    }

    if (
      serviceLaunch.featureIndexPage &&
      serviceLaunch.featureIndexPage !== ''
    ) {
      output.push(`__FIX__: ${serviceLaunch.featureIndexPage}`);
    }

    return output.join('<br/>');
  }
  return null;
};

const scriptDir = path.resolve(__dirname);
const SimorghReleaseInfo = `${scriptDir}/../../docs/Simorgh-Release-Info.md`;
const stream = fs.createWriteStream(SimorghReleaseInfo);

stream.once('open', () => {
  stream.write(
    '<!--Please update the service launch date in scripts/releaseInfo/launchDates.js\n' +
      'This table can then be generated using the following command: `node scripts/releaseInfo`\n' +
      'Remember to commit and push the changes to both launchDates.js and Simorgh-Release-Info.md -->\n',
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
      generateLinks(service, 'test', 'https://www.stage.bbc.com'),
      generateLinks(service, 'live', 'https://www.bbc.com'),
      generateLaunchDates(service),
    ];

    stream.write(`| ${items.join(' | ')} |\n`);
  });
  console.log(`Completed writing file ${SimorghReleaseInfo}`);
});
