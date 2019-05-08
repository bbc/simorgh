/* eslint-disable class-methods-use-this, no-console */

const fs = require('fs');
const path = require('path');

const getServices = () =>
  fs
    .readdirSync(path.resolve(__dirname, '../src/app/lib/config/services'))
    .filter(filename => !filename.includes('index'))
    .map(filename => filename.split('.')[0]);

const getFilesizeInBytes = filename => {
  const stats = fs.statSync(
    path.resolve(__dirname, '../build/public/', filename),
  );
  const fileSizeInBytes = stats.size;
  return fileSizeInBytes;
};

const getFileSizes = assets => {
  const files = Object.keys(assets)
    .filter(name => name.includes('static/js/'))
    .filter(name => name.endsWith('.js'));

  const fileSizes = {};

  files.forEach(filename => {
    fileSizes[filename] = getFilesizeInBytes(filename);
  });

  return fileSizes;
};

const bytesToKb = bytes => `${Math.ceil(bytes / 1000)}Kb`;

class SimorghBundleAnalyser {
  apply(compiler) {
    compiler.hooks.done.tap('Hello World Plugin', stats => {
      const files = getFileSizes(stats.compilation.assets);
      const services = getServices();
      console.log('\n\n\n');

      services.forEach(service => {
        let totalSize = 0;

        Object.keys(files).forEach(filename => {
          if (
            filename.includes('main') ||
            filename.includes('vendor') ||
            filename.includes(service)
          ) {
            totalSize += files[filename];
          }
        });

        console.log(
          service,
          bytesToKb(totalSize),
          `: ${bytesToKb(totalSize - 496000)} increase`,
        );
      });
      console.log('\n\n\n');
    });
  }
}

module.exports = SimorghBundleAnalyser;
