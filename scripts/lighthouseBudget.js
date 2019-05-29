/* eslint-disable no-console */
const fs = require('fs');

const getCategoryScores = data => {
  const { categories } = data;

  const result = {
    ally: categories.accessibility.score * 100,
    bestPractises: categories['best-practices'].score * 100,
    seo: categories.seo.score * 100,
  };

  return result;
};

const isAboveThreshold = (scoreValue, budgetValue) => {
  if (scoreValue >= budgetValue) {
    return true;
  }
  return false;
};

const logRow = (category, scoreValue, budgetValue, result) => ({
  category,
  scoreValue,
  budgetValue,
  result,
});

const compareToBudget = (categories, scoreResult, scoreBudget) => {
  let result = true;
  const logArray = [];
  // eslint-disable-next-line consistent-return
  categories.forEach(prop => {
    const test = isAboveThreshold(scoreResult[prop], scoreBudget[prop]);
    const b = logRow(prop, scoreResult[prop], scoreBudget[prop], test);
    logArray.push(b);
    if (!test) result = false;
  });

  console.table(logArray);
  return result;
};

const readReport = path => {
  console.log('Reading the report');
  const rawdata = fs.readFileSync(path);
  const result = JSON.parse(rawdata);

  return result;
};

// START OF SCRIPT

const budget = {
  ally: 90,
  bestPractises: 90,
  seo: 90,
};

const run = () => {
  const testableProperties = ['ally', 'bestPractises', 'seo'];

  const report = readReport('simorgh.report.json');
  const extractedCategories = getCategoryScores(report);

  const result = compareToBudget(
    testableProperties,
    extractedCategories,
    budget,
  );

  process.on('exit', code => console.log(`Exiting with code ${code}`));

  if (!result) {
    console.log('Lighthouse tests failed. See log table for details');
    process.exit(1);
  }

  console.log('All tests passed!');
  process.exit(0);
};

module.exports = {
  getCategoryScores,
  isAboveThreshold,
  logRow,
  compareToBudget,
  readReport,
  run,
};

// Script run
// A 'run' argument need to be passed in for the script to work
// This was done to make the script unit testable without spliting
// it to different files.
const args = process.argv.slice(2);

if (args[0] === 'run') {
  run();
}
