const fs = require('fs');
const path = require('path');
const { validateData } = require('../validators/validateData');
const { countScenarios } = require('../../utilities/countScenarios');
const asyncValidateFilesInDirectory = require('./asyncValidateFilesInDirectory');

const ifDirectoryThenValidateNestedFiles = fullFileName => {
  const fileStats = fs.statSync(fullFileName);

  if (fileStats.isDirectory()) {
    asyncValidateFilesInDirectory.asyncValidateFilesInDirectory(fullFileName);
  }
};

const readScenario = (fileName, dirName) => {
  const fullFileName = `${dirName}/${fileName}`;

  // explicitly ignore c0000000023o as it's a example of invalid data
  if (fileName.includes('c0000000023o.json')) {
    return false;
  }

  if (fileName !== 'onward-journeys') {
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
