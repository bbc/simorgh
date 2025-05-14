/* eslint-disable no-console */
const fs = require('fs');

const getCategoryScores = data => {
  const { categories } = data;

  return {
    ally: categories.accessibility.score * 100,
    bestPractises: categories['best-practices'].score * 100,
    seo: categories.seo.score * 100,
  };
};

const isAboveThreshold = (scoreValue, budgetValue) => {
  if (scoreValue >= budgetValue) {
    return true;
  }
  return false;
};

const logRow = (category, scoreValue, budgetValue, isPassing) => ({
  category,
  scoreValue,
  budgetValue,
  status: isPassing ? 'Pass' : 'Fail',
});

const compareToBudget = (categories, scoreResult, scoreBudget) => {
  let result = true;
  const logArray = [];
  // eslint-disable-next-line consistent-return
  categories.forEach(prop => {
    const isPassing = isAboveThreshold(scoreResult[prop], scoreBudget[prop]);
    const passLog = logRow(
      prop,
      scoreResult[prop],
      scoreBudget[prop],
      isPassing,
    );
    logArray.push(passLog);
    if (!isPassing) result = false;
  });
  return result;
};

const readReport = path => {
  const rawdata = fs.readFileSync(path);
  const result = JSON.parse(rawdata);

  if (result) {
  }

  return result;
};

const exitResult = isPassing => {
  process.on('exit', _code => );

  if (!isPassing) {
    process.exit(1);
  }
  process.exit(0);
};

// START OF SCRIPT

const budget = {
  ally: 90,
  bestPractises: 90,
  seo: 100,
};

const testableProperties = ['ally', 'bestPractises', 'seo'];

const run = () => {
  const report = readReport('simorgh.report.json');
  const extractedCategories = getCategoryScores(report);

  const result = compareToBudget(
    testableProperties,
    extractedCategories,
    budget,
  );

  exitResult(result);
};

module.exports = {
  getCategoryScores,
  isAboveThreshold,
  logRow,
  compareToBudget,
  readReport,
  run,
  exitResult,
};

// Script run
// A 'run' argument need to be passed in for the script to work
// This was done to make the script unit testable without spliting
// it to different files.
const args = process.argv.slice(2);

if (args[0] === 'run') {
  run();
}
