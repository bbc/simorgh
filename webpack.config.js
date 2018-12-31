const fs = require('fs');
const path = require('path');
const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);
const merge = require('webpack-merge');

// `shell` parameter populated via CLI, e.g. webpack --env.production  --env.platform=web
module.exports = (shell = {}) => {
  const IS_DEV = !shell.production;
  const IS_CI = process.env.CI;
  const START_SERVER = shell.startServer;

  const baseConfig = {
    mode: shell.production ? 'production' : 'development',
    devtool: shell.production ? 'source-map' : 'cheap-eval-source-map',
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
    // This is to override bundle performance test
    performance: IS_CI
      ? {
          maxAssetSize: 245760, // 240kb - individual bundles
          maxEntrypointSize: 491520, // 480kb - total bundles
        }
      : undefined,
  };

  // merge client/server Webpack configs into the base config
  const combinedConfigs = ['client', 'server'].map(app => {
    const specialisedConfig = require(`./webpack.config.${app}.js`)({
      resolvePath,
      IS_DEV,
      IS_CI,
      START_SERVER,
    });
    return merge(baseConfig, specialisedConfig);
  });

  return combinedConfigs;
};
