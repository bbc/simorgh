module.exports = ({ resolvePath }) => {
  return {
    target: 'web',
    entry: ['./src/client'],
    output: {
      path: resolvePath('build/public'),
      filename: 'client.js',
    },
  };
};
