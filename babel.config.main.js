const plugins = [
  '@babel/plugin-proposal-object-rest-spread', // allows ...spread notation
  '@babel/plugin-syntax-dynamic-import', // allows `await import()` syntax
  '@babel/plugin-proposal-export-default-from',
  '@babel/plugin-transform-runtime',
  '@loadable/babel-plugin',
];

// allows dynamic `import()` in Node tests.
if (process.env.NODE_ENV === 'test') {
  plugins.push('dynamic-import-node');
  plugins.push('@babel/plugin-proposal-throw-expressions'); // allows `throw new Error();`
}

const overrides = [
  {
    test: /.*logger\..*/,
    sourceType: 'script',
  },
];

module.exports = api => {
  const env = api.env();
  const useModern = env === 'modern';

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          ...(useModern
            ? {
                browsers: ['safari > 12', 'supports es6-module'],
              }
            : {
                browsers: [
                  'chrome >= 53',
                  'firefox >= 45.0',
                  'ie >= 11',
                  'edge >= 100',
                  'safari >= 10',
                  'opera >= 40',
                  'op_mini >= 18',
                  'Android >= 7',
                  'and_chr >= 53',
                  'and_ff >= 49',
                  'ios_saf >= 10',
                ],
              }),
          node: 'current',
        },
        // analyses code & polyfills only the features that are used, only for the targeted browsers
        useBuiltIns: 'usage',
        corejs: '3',
      },
    ],
    '@babel/preset-react', // transform JSX to JS
    '@babel/preset-typescript',
    '@emotion/babel-preset-css-prop',
  ];

  return {
    presets,
    plugins,
    overrides,
  };
};
