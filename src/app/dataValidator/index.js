const fs = require('fs');
const { log } = require('./utilities/messaging');
const { validateBlock } = require('./helpers/validators/validateNode');

const readFileSync = filename => {
  const data = fs.readFileSync(filename);
  validateData(JSON.parse(data));
};

const readdirAsync = dirname =>
  new Promise((resolve, reject) => {
    fs.readdir(dirname, (err, filenames) => {
      if (err) {
        reject(err);
      } else {
        resolve(
          filenames.forEach(filename => {
            // only validate json files
            if (filename.includes('.json')) {
              readFileSync(`${dirname}/${filename}`);
            }
          }),
        );
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
