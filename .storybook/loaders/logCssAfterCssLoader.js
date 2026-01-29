module.exports = function logCssAfterCssLoader(source) {
  // eslint-disable-next-line no-console
  console.log("[storybook] CSS after css-loader:\n", source); // Print first 1000 chars
  return source;
};
