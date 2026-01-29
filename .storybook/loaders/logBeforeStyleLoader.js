module.exports = function logBeforeStyleLoader(source) {
  // eslint-disable-next-line no-console
  console.log("[storybook] CSS just before style-loader:\n", source); // Print first 1000 chars
  return source;
};
