const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);
const outputPath = resolvePath('build');
const assetsManifestFile = 'assets.json';

module.exports = {
  assetsManifestFile,
  assetsManifestPath: resolvePath(`build/${assetsManifestFile}`),
  appDirectory,
  outputPath,
  web: {
    entryPath: resolvePath('src/client'),
    outputFile: 'client.js',
    outputPath: resolvePath('build/public'),
  },
  node: {
    entryPath: resolvePath('src/index'),
    outputFile: 'server.js',
    outputPath,
  }
};
