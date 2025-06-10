export default ({
  pageType,
  testSuites,
  beforeAll = [],
  testIsolation = false,
}) => {
  testSuites.forEach(testData => {
    const { path, tests, runforEnv, ...params } = testData;

    const cypressEnv = Cypress.env('APP_ENV');
    if (runforEnv.includes(cypressEnv)) {
      describe(`${Cypress.config().baseUrl}${path}`, { testIsolation }, () => {
        before(() => {
          beforeAll.forEach(runBeforeAll => runBeforeAll());
          cy.visit(path);
        });

        tests.forEach(test => {
          test({ path, pageType, ...params });
        });
      });
    }
  });
};
