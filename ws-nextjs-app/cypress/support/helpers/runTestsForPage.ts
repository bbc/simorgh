export default ({ pageType, testSuites }) => {
  testSuites.forEach(testData => {
    const { path, id, service, tests } = testData;

    const params = {
      pageType,
      path,
      id,
      service,
    };

    before(() => {
      cy.visit(path);
    });

    tests.forEach(test => test(params));
  });
};
