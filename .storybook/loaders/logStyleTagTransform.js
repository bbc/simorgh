module.exports.default = function logStyleTagTransform(css, styleTag) {
  // eslint-disable-next-line no-console
  console.log('[storybook] CSS injected by style-loader (global rule):', css);
  return css;
};
