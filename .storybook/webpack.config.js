const path = require('path');

module.exports = (baseConfig, env, defaultConfig) => {
  const customConfig = defaultConfig;

  customConfig.resolve.extensions.push('.jsx');

  customConfig.module.rules.push({
    test: /\.jsx?$/,
    include: path.resolve(__dirname, '../src'),
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: true,
          cacheDirectory: true,
          presets: [require.resolve('babel-preset-razzle')],
        },
      },
    ],
  });

  return customConfig;
};
