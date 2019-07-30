const fs = require('fs');
const path = require('path');
const { validateData } = require('../validators/validateData');
const { countScenarios } = require('../../utilities/countScenarios');
const asyncValidateDir = require('./asyncValidateDir');

const ifDirectoryThenValidateNestedFiles = fullFileName => {
  const fileStats = fs.statSync(fullFileName);

  if (fileStats.isDirectory()) {
    asyncValidateDir.asyncValidateDir(fullFileName);
  }
};

const readScenario = (fileName, dirName) => {
  const fullFileName = `${dirName}/${fileName}`;

  const ignoreDirs = ['onward-journeys', 'frontpage', 'most'];
  
  if (!ignoreDirs.includes(fileName)) {
    ifDirectoryThenValidateNestedFiles(fullFileName);
  }

  if (path.extname(fileName) !== '.json') {
    return false;
  }

  countScenarios();

  return new Promise(resolve => {
    resolve(module.exports.fileToValidate(fullFileName));
  }).catch(reason => {
    console.log(fullFileName); // eslint-disable-line no-console
    console.log(reason); // eslint-disable-line no-console
    process.exit(1);
  });
};

const fileToValidate = fileName => {
  const data = fs.readFileSync(fileName);
  validateData(JSON.parse(data));
};

module.exports = {
  readScenario,
  fileToValidate,
};
