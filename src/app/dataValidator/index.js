const fs = require('fs');
const { log } = require('./utilities/messaging');
const { validateBlock } = require('./helpers/validators/validateNode');

const validateFile = filename => {
  const data = fs.readFileSync(filename);
  validateData(JSON.parse(data));
};

const readAllFiles = (filenames, dirname) =>
  filenames.forEach(filename => {
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

const validateAllDataFiles = dirPath => readdirAsync(dirPath);

console.time('validateAllDataFiles'); // eslint-disable-line no-console
validateAllDataFiles('./././data').then(() => {
  console.timeEnd('validateAllDataFiles'); // eslint-disable-line no-console
  log('\nAll files validated!');
});

module.exports.validateAllDataFiles = validateAllDataFiles;
