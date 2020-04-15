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
  if (error) {
    return `${cyan(error.message)}\n\tExpected: ${JSON.stringify(
      expect,
      null,
      2,
    )}\n\tActual: ${JSON.stringify(error.found)}`;
  }
};

const printFailures = (failures) => {
  failures.forEach((failure) => {
    console.log(
      `${red('✕')} ${red(testSummary(failure))}\n    ${errorDetails(failure)}`,
    );
  });
};

const printPassing = (passed) => {
  passed.forEach((pass) => {
    console.log(`${green('✓', testSummary(pass))}\n    ${testDetails(pass)}`);
  });
};

const printStatistics = (overallResults) => {
  const totalTests =
    overallResults.passed.length +
    overallResults.failed.length +
    overallResults.warnings.length;

  console.log(bold(`\nStatistics\n`));
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
    `    Passed:`,
    `${overallResults.passed.length}`,
    `\t(${
      Math.floor((overallResults.passed.length / totalTests) * 100) || 0
    }%)`,
  );

  console.log(
    `    Warnings:`,
    `${overallResults.warnings.length}`,
    `\t(${
      Math.floor((overallResults.warnings.length / totalTests) * 100) || 0
    }%)`,
  );
  console.log(
    `    Failed:`,
    `${overallResults.failed.length}`,
    `\t(${
      Math.floor((overallResults.failed.length / totalTests) * 100) || 0
    }%)`,
  );
  console.log('');
};

module.exports = {
  printFailures,
  printPassing,
  printStatistics,
};
