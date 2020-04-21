/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const { cyan, red, green, bold } = require('chalk');

const testSummary = test => {
  return `${test.group ? test.group : ''} ${
    test.description ? test.description : ''
  }`;
};

const testDetails = test => {
  return `${cyan('└─', test.test)}\n\t\t└─${JSON.stringify(
    test.value,
    null,
    2,
  )}`;
};

const errorDetails = test => {
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

const printFailures = failed => {
  if (failed.length > 0) {
    console.log(red(`${failed.length} tests failed`));
  }
  failed.forEach(failure => {
    console.log(
      `${red('  ✕ ', testSummary(failure))}\n \t${errorDetails(failure)}`,
    );
  });
};

const printPassing = passed => {
  passed.forEach(pass => {
    console.log(`${green('  ✓ ', testSummary(pass))}\n \t${testDetails(pass)}`);
  });
};

const aggregateResults = results => {
  return {
    urls: results.map(result => result.url),
    tests: results.map(result => result.tests).flat(),
    passed: results.map(result => result.passed).flat(),
    failed: results
      .map(result => [...result.failed, ...result.warnings])
      .flat(),
    schemas: [...new Set(results.map(result => result.schemas).flat())],
    structuredData: Object.assign(
      ...results.map(result => result.structuredData),
    ),
  };
};

const printStatistics = results => {
  const overallResults = aggregateResults(results);
  const totalTests =
    overallResults.passed.length + overallResults.failed.length;

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

  console.log(`         Total tests:`, `${totalTests}`);
  console.log('');

  console.log(bold(`Results\n`));

  console.log(
    `      Passed:`,
    `\t${overallResults.passed.length}`,
    `\t(${
      ((overallResults.passed.length / totalTests) * 100).toFixed(2) || 0
    }%)`,
  );

  console.log(
    `      Failed:`,
    `\t${overallResults.failed.length}`,
    `\t(${
      ((overallResults.failed.length / totalTests) * 100).toFixed(2) || 0
    }%)`,
  );
  console.log('');
};

module.exports = {
  printFailures,
  printPassing,
  printStatistics,
};
