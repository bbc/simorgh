module.exports = function logMatchedScssLoader(source) {
  // eslint-disable-next-line no-console
  console.log("[storybook] Matched global SCSS:", this.resourcePath);
  return source;
};
