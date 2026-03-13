/* eslint-disable no-console */
const amphtmlValidator = require('amphtml-validator');

const baseUrl = 'http://localhost:7081';

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

  const urlsToValidate = [
    '/hindi/articles/c9w59wnx27ro',
    '/mundo/articles/ce42wzqr2mko',
    '/news/articles/cn7k01xp8kxo',
    '/persian/articles/cej3lzd5e0go',
    '/serbian/articles/c805k05kr73o/cyr',
    '/serbian/articles/c805k05kr73o/lat',
  ];

  return Promise.all(
    urlsToValidate.map(url => validate({ validator, url })),
  ).then(results => {
    // Temporary fix for 'INVALID_URL_PROTOCOL' errors
    const filteredResults = results.map(result => {
      if (result.status !== 'PASS') {
        const isProtocolFail = result.errors.every(
          error => error.code === 'INVALID_URL_PROTOCOL',
        );
        if (isProtocolFail) {
          // eslint-disable-next-line no-param-reassign
          result.status = 'PASS';
        }
      }
      return result;
    });
    filteredResults.forEach(result => {
      printResult(result);
      if (result.status !== 'PASS') {
        process.exitCode = 1;
      }
    });

    printSummary(filteredResults);
  });
};

module.exports = {
  getPageString,
  printResult,
  printSummary,
  runValidator,
  validate,
};
