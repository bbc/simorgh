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

// START OF SCRIPT

const budget = {
  ally: 90,
  bestPractises: 90,
  seo: 90,
};

const testableProperties = ['ally', 'bestPractises', 'seo'];

const rawdata = fs.readFileSync('simorgh.report.json');
const lighthouseReport = JSON.parse(rawdata);
const extractedCategories = getCategoryScores(lighthouseReport);

const result = compareToBudget(testableProperties, extractedCategories, budget);

process.on('exit', code => console.log(`Exiting with code ${code}`));

if (!result) {
  console.log('Lighthouse tests failed. See log table for details');
  process.exit(1);
}

console.log('All tests passed!');
process.exit(0);
