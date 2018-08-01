const fs = require('fs');
const path = require('path');
const { validateData } = require('../validators/validateData');

const readScenario = (fileName, dirName) => {
  // explicitly ignore scenario-23 as it's a example of invalid data
  if (fileName.includes('scenario-23.json')) {
    return false;
  }

  if (path.extname(fileName) !== '.json') {
    return false;
  }

  return new Promise(resolve => {
    resolve(module.exports.fileToValidate(`${dirName}/${fileName}`));
  });
};

const fileToValidate = fileName => {
  const data = fs.readFileSync(fileName);
  validateData(JSON.parse(data));
};

module.exports = { readScenario, fileToValidate };
