module.exports = {
  modify: (config, { target, dev }) => {
    const appConfig = config;

    if (!dev) {
      /*
        This is a hack to disable linting on the production build.
        Linting is the first object in the rules away and this removes it.
        A prod build will fail if the API changes so it is fairly safe.
      */
      appConfig.module.rules.shift();

      // Setup bundle analyser
      if (target === 'web' && !process.env.CI) {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); // eslint-disable-line import/no-extraneous-dependencies, global-require
        appConfig.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            defaultSizes: 'gzip',
            generateStatsFile: true,
            openAnalyzer: false,
            reportFilename: '../../reports/webpackBundleReport.html',
            statsFilename: '../../reports/webpackBundleReport.json',
          }),
        );
      }
    }

    // This is to override bundle performance test
    if (process.env.CI) {
      appConfig.performance = {
        maxAssetSize: 400000,
        maxEntrypointSize: 400000,
      };
    }

    return appConfig;
  },
};
