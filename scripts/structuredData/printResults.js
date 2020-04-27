/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const { cyan, red, green, bold } = require('chalk');

const testSummary = test => {
  return test.description || '';
};

const testDetails = test => {
  const value =
    typeof test.value === 'object'
      ? JSON.stringify(test.value, null, 4)
      : test.value;

  return `${cyan('└─', test.test)}\n\t  └─ ${value}`;
};

const errorDetails = test => {
  const { error } = test;
  return error ? cyan(error.message) : '';
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

const populateTestValues = result => {
  Object.entries(result.structuredData.metatags).forEach(entry => {
    const metatag = entry[0];
    const value = entry[1];
    const test = result.passed.find(pass => {
      return pass.test.includes(metatag);
    });

    if (test) {
      test.value = value.toString();
    }
  });
};

const printPassing = results => {
  populateTestValues(results);
  results.passed.forEach(pass => {
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
    schemas: [...new Set(...results.map(result => result.schemas))],
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
  console.log(`              URLs: ${overallResults.urls.length || 0}`);
  console.log(
    `          Metatags: ${
      Object.keys(overallResults.structuredData.metatags).length || 0
    }`,
  );
  console.log(`schema.org schemas: ${overallResults.schemas.join(', ') || 0}`);

  console.log(`       Total Tests: ${totalTests}`);

  console.log(bold(`\nResults\n`));

  console.log(
    `      Passed:\t${overallResults.passed.length}\t(${
      ((overallResults.passed.length / totalTests) * 100).toFixed(2) || 0
    }%)`,
  );

  console.log(
    `      Failed:\t${overallResults.failed.length}\t(${
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
