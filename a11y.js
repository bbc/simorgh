const pathOr = require('ramda/src/pathOr');

global.Cypress = { env: () => {} }; // Fake Cypress.env
const services = require('./cypress/support/config/services');

// allPageWidths = [240, 360, 600, 1008, 1280];
// Run a11y on 360px only since designs are done in this width
// This functionality can be extended to allow for testing on all widths
const pageWidths = [360];
const baseUrl = 'http://localhost.bbc.com:7080';

const getPageTypes = service => pathOr(null, [service, 'pageTypes'], services);

const getFrontPages = pageType => pathOr(null, ['frontPage'], pageType);

const getArticles = pageType => pathOr(null, ['articles'], pageType);

const getSmokePaths = config => {
  const { path, smoke } = config;
  return smoke && path ? path : null;
};

const getUrls = () => {
  const serviceNames = Object.keys(services);
  const pageTypes = serviceNames.map(getPageTypes);
  const frontPages = pageTypes
    .map(getFrontPages)
    .map(getSmokePaths)
    .filter(page => !!page);
  const articles = pageTypes
    .map(getArticles)
    .map(getSmokePaths)
    .filter(article => !!article);
  return [...frontPages, ...articles].map(url => `${baseUrl}${url}`);
};

const urls = getUrls();

// Added to prevent false negatives from mPulse beacon
// which creates iframe in document head
const hide = ['/html/head/iframe'];

urls.forEach(url =>
  pageWidths.forEach(width =>
    // eslint-disable-next-line no-undef
    page(url, { width, hide }),
  ),
);
