const fs = require('fs');
const { readScenario } = require('./readScenario');

module.exports.readdirSync = dirName => {
  const fileNames = fs.readdirSync(dirName);

  return Promise.all(
    fileNames.map(fileName => readScenario(fileName, dirName)),
  );
};
