const fs = require('fs');
const { log } = require('./utilities/messaging');
const { validateBlock } = require('./helpers/validators/validateNode');

const validateFile = filename => {
  const data = fs.readFileSync(filename);
  validateData(JSON.parse(data));
};

const readAllFiles = (filenames, dirname) =>
  filenames.forEach(filename => {

    // explicitly ignore scenario-23
    if (filename.includes('scenario-23.json')) {
      return;
    }

    // only validate json files
    if (filename.includes('.json')) {
      validateFile(`${dirname}/${filename}`);
    }
  });

const readdirAsync = dirname =>
  new Promise(resolve => {
    fs.readdir(dirname, (err, filenames) => {
      if (err) {
        throwError(err);
      } else {
        resolve(readAllFiles(filenames, dirname));
      }
    });
  });

console.time('readdirAsync'); // eslint-disable-line no-console
readdirAsync('./././data').then(() => {
  console.timeEnd('readdirAsync'); // eslint-disable-line no-console
  log('\nAll files validated!');
});

module.exports.validateAllDataFiles = validateAllDataFiles;
