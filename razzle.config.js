module.exports = {
  modify: (config, { target, dev }) => {
    const appConfig = { ...config };

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
        maxAssetSize: 245760, // 240kb - individual bundles
        maxEntrypointSize: 491520, // 480kb - total bundles
      };
    }

    if (target === 'web') {
      appConfig.output.filename = dev
        ? 'static/js/[name].js'
        : 'static/js/[name].[hash:8].js';

      appConfig.entry.vendor = [
        'razzle/polyfills',
        'react',
        'react-dom',
        'markdown-to-jsx',
        'react-helmet',
        'react-router-dom',
        'styled-components',
        'styled-normalize',
      ];

      appConfig.optimization = {
        splitChunks: {
          chunks: 'initial',
          name: false,
        },
      };
    }

    return appConfig;
  },
};
