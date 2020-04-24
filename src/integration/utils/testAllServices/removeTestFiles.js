/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

module.exports = () =>
  new Promise(resolve => {
    glob(
      '../../allSnapshots/**/*.test.js',
      {
        cwd: path.join(__dirname),
      },
      (error, files) => {
        if (error) {
          console.log(error);
          return;
        }

        Promise.all(
          files.map(
            file =>
              new Promise((_resolve, reject) => {
                fs.unlink(path.join(__dirname, file), _error => {
                  if (_error) {
                    reject(_error);
                  } else {
                    _resolve();
                  }
                });
              }),
          ),
        );

        resolve(files);
      },
    );
  });
