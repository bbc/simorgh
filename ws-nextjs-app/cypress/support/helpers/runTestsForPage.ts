import getOptimizelyKey from '../../../../cypress/support/helpers/getOptimizelyKey';

export default ({
  pageType,
  testSuites,
  beforeAll = [],
  failOnStatusCode = true,
  testIsolation = false,
}) => {
  const serviceToRun = Cypress.env('ONLY_SERVICE');

  let testSuitesToRun = testSuites;
  if (serviceToRun) {
    testSuitesToRun = testSuites.filter(
      ({ service }) => service === serviceToRun,
    );
  }

  testSuitesToRun.forEach(testData => {
    const { path, tests, runforEnv, ...params } = testData;

    const cypressEnv = Cypress.env('APP_ENV');

    if (runforEnv.includes(cypressEnv)) {
      describe(`${Cypress.config().baseUrl}${path}`, { testIsolation }, () => {
        before(() => {
          beforeAll.forEach(runBeforeAll => runBeforeAll());
          cy.visit(path, { failOnStatusCode });
        });

        beforeEach(() => {
          cy.intercept(
            {
              url: `https://cdn.optimizely.com/datafiles/${getOptimizelyKey()}.json`,
            },
            request => {
              request.reply({ statusCode: 404 });
            },
          ).as('disable-optimizely');
        });

        tests.forEach(test => {
          test({ path, pageType, ...params });
        });
      });
    }
  });
};
