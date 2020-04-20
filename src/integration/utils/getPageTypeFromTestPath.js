export default (testPath) => {
  const [pageType] = testPath.match(/(?<=\/integration\/pages\/).+?(?=\/)/g) ||
    testPath.match(/(?<=\/__GENERATED_TEST_FILES__\/.+?\/).+?(?=\/)/g) || [''];

  return pageType;
};
