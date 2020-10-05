/* eslint-disable no-console */
const fetch = require('isomorphic-fetch');
const amphtmlValidator = require('amphtml-validator');
const { getPageUrls } = require('../../cypress/support/helpers/getPageUrls');

const environment = 'local';
const isSmoke = true;
const baseUrl = 'http://localhost:7080';
const pageTypes = [
  'frontPage',
  'articles',
  'liveRadio',
  'photoGalleryPage',
  'mostReadPage',
  'onDemandRadio',
  'onDemandTV',
  'mediaAssetPage',
  'storyPage',
  'idxPage',
  'featureIndexPage',
];

const getPageString = async url => {
  const response = await fetch(url);
  return response.text();
};

const printResult = result => {
  const consoleMethod = result.status === 'PASS' ? console.log : console.error;
  consoleMethod(result.url);
  consoleMethod(result.status);

  result.errors.forEach(error => {
    let msg = `line ${error.line}, col ${error.col}: ${error.message}`;
    if (error.specUrl !== null) {
      msg += ` (see ${error.specUrl})`;
    }
    console.error(msg);
  });
  console.log('\n');
};

const printSummary = results => {
  const passed = results.filter(result => result.status === 'PASS').length;
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${results.length - passed}`);
};

const validate = async ({ validator, url }) => {
  const pageString = await getPageString(`${baseUrl}${url}.amp`);
  const result = validator.validateString(pageString);
  result.url = url;
  return result;
};

const runValidator = async verbose => {
  const validator = await amphtmlValidator.getInstance();

  const urls = pageTypes
    .map(pageType => getPageUrls({ pageType, environment, isSmoke }).flat())
    .flat();

  return Promise.all(urls.map(url => validate({ validator, url }))).then(
    results => {
      results.forEach(result => {
        if (result.status === 'PASS') {
          if (verbose) printResult(result);
        } else {
          printResult(result);
        }
      });

      printSummary(results);
    },
  );
};

module.exports = {
  getPageString,
  printResult,
  printSummary,
  runValidator,
  validate,
};
