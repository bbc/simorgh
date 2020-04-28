const pathOr = require('ramda/src/pathOr');

global.Cypress = { env: () => {} }; // Fake Cypress.env
const services = require('./cypress/support/config/services');

// allPageWidths = [240, 360, 600, 1008, 1280];
// Run a11y on 360px only since designs are done in this width
// This functionality can be extended to allow for testing on all widths
const pageWidths = [360];
const baseUrl = 'http://localhost:7080';

const getPageTypes = service => pathOr(null, [service, 'pageTypes'], services);

const getSmokePaths = config => {
  const { environments, smoke } = config;
  return smoke && environments ? environments.local.paths : null;
};

const getUrls = pageType =>
  Object.keys(services)
    .map(getPageTypes)
    .map(pageTypes => pathOr(null, [pageType], pageTypes))
    .map(getSmokePaths)
    .filter(page => !!page)
    .map(url => `${baseUrl}${url}`);

// '/html/head/iframe' Added to prevent false negatives from mPulse beacon
// which creates iframe in document head

// '//div[@id='root']/main/div/div/div/div/iframe' Added to hide
// iframe errors to be fixed in https://github.com/bbc/bbc-a11y/issues/298

// '//div[@id='root']/header/nav/div/div[1]/div/ul' Added to hide
// errors in scrollable navigation for RTL languages to be fixed in
// https://github.com/bbc/simorgh/issues/5222

const pageTypes = {
  frontPage: [
    '/html/head/iframe',
    "//div[@id='root']/header/nav/div/div[1]/div/ul",
  ],
  articles: [
    '/html/head/iframe',
    "//div[@id='root']/header/nav/div/div[1]/div/ul",
  ],
  liveRadio: [
    '/html/head/iframe',
    "//div[@id='root']/main/div/div/div/iframe",
    "//div[@id='root']/header/nav/div/div[1]/div/ul",
  ],
  photoGalleryPage: [
    '/html/head/iframe',
    "//div[@id='root']/header/nav/div/div[1]/div/ul",
  ],
};

Object.keys(pageTypes).forEach(pageType => {
  getUrls(pageType).forEach(url =>
    pageWidths.forEach(width =>
      // eslint-disable-next-line no-undef
      page(url, { width, hide: pageTypes[pageType] }),
    ),
  );
});
