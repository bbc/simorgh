const merge = require('webpack-merge');
const fs = require('fs');
const path = require('path');
const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);

// `shell` parameter populated via CLI, e.g. --env.platform=web
module.exports = (shell = {}) => {
  const IS_PROD = process.env.NODE_ENV === 'production';
  const IS_CI = process.env.CI;
  const START_DEV_SERVER = !IS_PROD;
  const CONFIG_FILE = shell.config;

  const baseConfig = {
    mode: IS_PROD ? 'production' : 'development',
    devtool: IS_PROD ? 'source-map' : 'cheap-eval-source-map',
    output: {
      publicPath: process.env.BASE_URL,
    },
    resolve: { extensions: ['.js', '.jsx'] }, // resolves `import '../Foo'` to `../Foo/index.jsx`
    module: {
      rules: [
        // tell Webpack to use the .babelrc to know how to transform JS/JSX to ES2015 JS
        {
          test: /\.(js|jsx|mjs)$/,
          include: /src/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: true,
                cacheDirectory: true,
                presets: [],
              },
            },
          ],
        },
      ],
    },
    // This is to override bundle performance test. @TODO explain better
    performance: IS_CI
      ? {
          maxAssetSize: 245760, // 240kb - individual bundles
          maxEntrypointSize: 491520, // 480kb - total bundles
        }
      : undefined,
  };

  const configs = CONFIG_FILE ? [CONFIG_FILE] : ['client', 'server']; // compile both unless otherwise specified

  console.log(`COMPILING ${configs}..........`);

  // merge client/server Webpack configs into the base config
  const combinedConfigs = configs.map(app => {
    const specialisedConfig = require(`./webpack.config.${app}.js`)({
      resolvePath,
      IS_PROD,
      IS_CI,
      START_DEV_SERVER,
    });
    return merge(baseConfig, specialisedConfig);
  });

  // if only compiling one file, then return obj - not array
  return combinedConfigs.length === 1 ? combinedConfigs[0] : combinedConfigs;
};
