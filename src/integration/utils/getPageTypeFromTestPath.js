module.exports = testPath => {
  const [pageType] = testPath.match(/(?<=\/integration\/pages\/).+?(?=\/)/g);

  return pageType;
};
