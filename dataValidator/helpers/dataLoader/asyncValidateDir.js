const fs = require('fs');
// don't use destructuring assignment otherwise jest spy does not work
const readScenario = require('./readScenario');

module.exports.asyncValidateDir = dirName => {
  const fileNames = fs.readdirSync(dirName);

  const fileNamesToIgnore = ['liveradio.json'];

  return Promise.all(
    fileNames
      .filter(fileName => !fileNamesToIgnore.includes(fileName))
      .map(fileName => readScenario.readScenario(fileName, dirName)),
  );
};
