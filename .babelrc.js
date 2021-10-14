var plugins = [
  '@emotion',
  '@babel/plugin-proposal-object-rest-spread', // allows ...spread notation
  '@babel/plugin-syntax-dynamic-import', // allows `await import()` syntax
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

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          esmodules: true,
        },
      },
    ],
    '@babel/preset-react', // transform JSX to JS
  ],
  plugins: plugins,
  overrides: [
    {
      test: /.*logger\..*/,
      sourceType: 'script',
    },
  ],
};
