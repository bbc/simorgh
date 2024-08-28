export default ({ pageType, testSuites }) => {
  testSuites.forEach(testData => {
    const { path, tests, ...params } = testData;
    before(() => {
      cy.visit(path);
    });
    tests.forEach(test => test({ path, pageType, ...params }));
  });
};
