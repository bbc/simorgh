export default ({ pageType, testSuites, testIsolation = false }) => {
  testSuites.forEach(testData => {
    const { path, tests, runforEnv, ...params } = testData;

    const cypressEnv = Cypress.env('APP_ENV');
    if (runforEnv.includes(cypressEnv)) {
      describe(`${Cypress.config().baseUrl}${path}`, { testIsolation }, () => {
        before(() => {
          cy.visit(path);
        });

        tests.forEach(test => {
          test({ path, pageType, ...params });
        });
      });
    }
  });
};
