const fs = require('fs');
const { readScenario } = require('./readScenario');

module.exports.readdirSync = dirname => {
  const filenames = fs.readdirSync(dirname);

  return Promise.all(
    filenames.map(filename => readScenario(filename, dirname)),
  );
};
