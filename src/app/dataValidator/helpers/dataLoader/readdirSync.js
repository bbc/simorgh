const fs = require('fs');
// don't use destructuring assignment otherwise jest spy does not work
const readScenario = require('./readScenario');

module.exports.readdirSync = dirName => {
  const fileNames = fs.readdirSync(dirName);

  return Promise.all(
    fileNames.map(fileName => readScenario.readScenario(fileName, dirName)),
  );
};
