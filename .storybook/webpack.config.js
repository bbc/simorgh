const webpack = require('webpack');

module.exports = {
  plugins: [
    /*
     * This replaces calls to logger.node.js with logger.web.js, a client
     * side replacement. This mimics the behaviour of the client side
     * bundle generation in webpack.config.client.js
     */
    new webpack.NormalModuleReplacementPlugin(
      /(.*)logger.node(\.*)/,
      resource => {
        // eslint-disable-next-line no-param-reassign
        resource.request = resource.request.replace(
          /logger.node/,
          `logger.web`,
        );
      },
    ),
    new webpack.DefinePlugin({
      'process.env': {
        /*
         * This is needed so that we can pass the AV embed URL to Storybook
         * as it does not immediately make process.env variables available
         * to its components
         */
        SIMORGH_AV_EMBED_BASE_URL: JSON.stringify(
          'https://www.test.bbc.co.uk/ws/av-embeds',
        ),
      },
    }),
  ],
};
