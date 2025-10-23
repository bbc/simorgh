module.exports = api => {
  api.cache(true);

  return {
    presets: [
      [
        'next/babel',
        {
          'preset-react': {
            runtime: 'automatic',
            importSource: '@emotion/react',
          },
        },
      ],
    ],
    plugins: [
      '@emotion/babel-plugin',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-transform-private-methods',
      [
        'transform-rename-import',
        { original: '@loadable/component', replacement: 'next/dynamic' },
      ],
    ],
    overrides: [
      {
        test: 'app/api',
        presets: ['next/babel'],
        plugins: [],
      },
    ],
  };
};
