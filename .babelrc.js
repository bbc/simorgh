var plugins = [
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

if (process.env.NODE_ENV === 'production') {
  plugins.push([
    'transform-react-remove-prop-types',
    {
      mode: 'remove',
      removeImport: true,
    },
  ]);
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
                browsers: ['safari > 9', 'supports es6-module'],
              }
            : {
                browsers: [
                  'chrome >= 53',
                  'firefox >= 45.0',
                  'ie >= 11',
                  'edge >= 37',
                  'safari >= 9',
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
