/* eslint-disable no-console */
const amphtmlValidator = require('amphtml-validator');
const { getPageUrls } = require('../../../cypress/support/helpers/getPageUrls');

const environment = 'local';
const isSmoke = true;
const baseUrl = 'http://localhost:7080';
const pageTypes = [
  'photoGalleryPage',
  'mostReadPage',
  'mediaAssetPage',
  'storyPage',
];

// list of urls we have decided are acceptable to fail amp validation
const excludedUrls = [
  '/mundo/23263889' /* https://github.com/bbc/simorgh/issues/8104 */,
  '/mundo/noticias-internacional-51266689',
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

const runValidator = async () => {
  const validator = await amphtmlValidator.getInstance();

  const urls = pageTypes
    .map(pageType => getPageUrls({ pageType, environment, isSmoke }).flat())
    .flat()
    .filter(url => !excludedUrls.includes(url));

  const urlsToValidate = [
    ...urls,
    '/mundo/articles/ce42wzqr2mko',
    '/news/articles/cn7k01xp8kxo',
    '/persian/articles/cej3lzd5e0go',
    '/serbian/articles/c805k05kr73o/cyr',
    '/serbian/articles/c805k05kr73o/lat',
  ];

  return Promise.all(
    urlsToValidate.map(url => validate({ validator, url })),
  ).then(results => {
    results.forEach(result => {
      printResult(result);
      if (result.status !== 'PASS') {
        process.exitCode = 1;
      }
    });

    printSummary(results);
  });
};

module.exports = {
  getPageString,
  printResult,
  printSummary,
  runValidator,
  validate,
};
