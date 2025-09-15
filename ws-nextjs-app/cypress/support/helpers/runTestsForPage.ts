import getOptimizelyKey from '../../../../cypress/support/helpers/getOptimizelyKey';

export default ({
  pageType,
  testSuites,
  beforeAll = [],
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
      describe(
        `${Cypress.config().baseUrl}${path}`,
        { testIsolation, retries: 3 },
        () => {
          before(() => {
            beforeAll.forEach(runBeforeAll => runBeforeAll());

            // Ensure that the page is returning a 200 response code
            cy.testResponseCodeAndRetry({
              url: path,
            });

            cy.visit(path);
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
        },
      );
    }
  });
};
