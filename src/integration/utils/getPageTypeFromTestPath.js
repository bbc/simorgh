export default testPath => {
  const [pageType] = testPath.match(
    /(?<=\/integration\/pages\/).+?(?=\/)/g,
  ) || [''];

  return pageType;
};
