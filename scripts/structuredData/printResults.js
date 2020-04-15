/* eslint-disable consistent-return */
/* eslint-disable no-console */
const { cyan, red, green, bold } = require('chalk');

const testSummary = (test) => {
  return `${test.group ? test.group : ''} ${
    test.description ? test.description : ''
  }`;
};

const testDetails = (test) => {
  return `${cyan(test.test)}\n\t└─${JSON.stringify(test.value, null, 2)}`;
};

const errorDetails = (test) => {
  const { error, expect } = test;
  const errorMessage = error ? cyan(error.message) : '';
  if (expect && error.found) {
    return `${errorMessage}\n\tExpected: ${JSON.stringify(
      expect,
      null,
      2,
    )}\n\tActual: ${JSON.stringify(error.found)}`;
  }
  return errorMessage;
};

const printFailures = (overallResult) => {
  const errorsWarnings = [...overallResult.failed, ...overallResult.warnings];
  errorsWarnings.forEach((failure) => {
    console.log(
      `${red('✕', testSummary(failure))}\n    ${errorDetails(failure)}`,
    );
  });
};

const printPassing = (passed) => {
  passed.forEach((pass) => {
    console.log(`${green('✓', testSummary(pass))}\n    ${testDetails(pass)}`);
  });
};

const printStatistics = (overallResults) => {
  const errorsWarnings = [...overallResults.failed, ...overallResults.warnings];
  const totalTests = overallResults.passed.length + errorsWarnings.length;

  console.log(bold(`\nStatistics\n`));
  console.log(`      Number of URLs:`, `${overallResults.urls.length || 0}`);
  console.log(
    `  Number of Metatags:`,
    `${Object.keys(overallResults.structuredData.metatags).length || 0}`,
  );
  console.log(
    `  Schemas in JSON-LD:`,
    `${Object.keys(overallResults.structuredData.jsonld).length || 0}`,
  );
  console.log(
    `  Schema.org schemas:`,
    `${overallResults.schemas.join(', ') || 0}`,
  );

  console.log(` Pass/Fail tests run:`, `${totalTests}`);
  console.log('');

  console.log(bold(`Results\n`));

  console.log(
    `      Passed:`,
    `\t${overallResults.passed.length}`,
    `\t(${
      Math.floor((overallResults.passed.length / totalTests) * 100) || 0
    }%)`,
  );

  console.log(
    `      Failed:`,
    `\t${errorsWarnings.length}`,
    `\t(${Math.floor((errorsWarnings.length / totalTests) * 100) || 0}%)`,
  );
  console.log('');
};

module.exports = {
  printFailures,
  printPassing,
  printStatistics,
};
