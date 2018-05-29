const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  modify(config, { target, dev }, webpack) {
    const appConfig = config; // stay immutable here

    if (target === 'node' && dev) {
      appConfig.plugins = [
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          reportFilename: 'webpackBundleReport.html',
          statsFilename: 'webpackBundleStats.json',
        }),
      ];
    }

    return appConfig;
  },
};
