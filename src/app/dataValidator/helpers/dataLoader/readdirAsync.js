const fs = require('fs');
const { readScenarios } = require('./readScenarios');

const promises = [];

module.exports.readdirAsync = dirname => {
  fs.readdir(dirname, (err, filenames) => {
    if (err) {
      throw err;
    } else {
      promises.push(readScenarios(filenames, dirname));
    }
  });

  return Promise.all(promises);
};
