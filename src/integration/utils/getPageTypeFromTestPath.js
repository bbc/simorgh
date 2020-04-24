module.exports = testPath => {
  const [pageType] = testPath.match(/(?<=\/integration\/pages\/).+?(?=\/)/g) ||
    testPath.match(/(?<=\/integration\/allServices\/.+?\/).+?(?=\/)/g) || [''];

  return pageType;
};
