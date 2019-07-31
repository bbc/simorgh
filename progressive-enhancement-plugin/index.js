const memStore = require('@bbc/babel-preset-env-custom/lib/polyfills/corejs3/mem-storage');
const fs = require('fs');
const getProgressiveEnhancementString = require('./progressiveEnhancement');

// This tiny Webpack plugin gets a list of polyfills from a modified preset-env/core-js, and outputs an IIFE function as a string, which will execute on client with 2 params: the assets, and the list of checks as an stringified array of functions. If the browser supports all the features, it gets the bundle without any polyfills (only transpiled).
module.exports = {
  apply: compiler => {
    // Called after emitting assets to output directory:
    compiler.hooks.afterEmit.tap('ProgressiveEnhancementPlugin', () => {
      // additional feature checks for React:
      const additionalFeatureChecks = [
        'es.map',
        'es.set',
        'fetch',
        'es.symbol',
        'es.object.assign',
      ];

      // Get output from Core-js:
      const listCoreJsFeatureChecks = memStore.get();

      const allFeatureChecks = [
        ...listCoreJsFeatureChecks,
        ...additionalFeatureChecks,
      ];
      if (allFeatureChecks) {
        fs.writeFileSync(
          './build/progressive-enhancement-string.txt',
          getProgressiveEnhancementString(allFeatureChecks),
        );
      }
    });
  },
};
