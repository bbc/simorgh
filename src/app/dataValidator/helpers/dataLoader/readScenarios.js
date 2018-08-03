const fs = require('fs');
const path = require('path');
const { validateData } = require('../validators/validateData');

const readScenarios = (filenames, dirname) =>
  filenames.map(filename => {
    // explicitly ignore scenario-23 as it's a example of invalid data
    if (filename.includes('scenario-23.json')) {
      return false;
    }

    if (path.extname(filename) === '.json') {
      return new Promise(resolve => {
        resolve(module.exports.fileToValidate(`${dirname}/${filename}`));
      });
    }

    return false;
  });

const fileToValidate = filename => {
  const data = fs.readFileSync(filename);
  validateData(JSON.parse(data));
};

module.exports = { readScenarios, fileToValidate };
