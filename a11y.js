const pathOr = require('ramda/src/pathOr');

global.Cypress = { env: () => {} }; // Fake Cypress.env
const services = require('./cypress/support/config/services');

const pageWidths = [360]; // allPageWidths = [240, 360, 600, 1008, 1280];
const baseUrl = 'http://localhost.bbc.com:7080';

const getPageTypes = service => pathOr(null, [service, 'pageTypes'], services);

const getFrontPages = pageType => pathOr(null, ['frontPage', 'path'], pageType);

const getArticles = pageType => pathOr(null, ['articles', 'path'], pageType);

const sampleList = list => {
  const numOfService = 5;
  const randomIndex = Math.floor(
    Math.random() * Math.floor(list.length - numOfService),
  );
  return list.slice(randomIndex, randomIndex + numOfService);
};

const getUrls = () => {
  const serviceNames = Object.keys(services);
  const pageTypes = serviceNames.map(getPageTypes);
  const frontPages = pageTypes.map(getFrontPages).filter(page => !!page);
  const articles = pageTypes.map(getArticles).filter(article => !!article);
  return [...sampleList(frontPages), ...sampleList(articles)].map(
    url => `${baseUrl}${url}`,
  );
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
