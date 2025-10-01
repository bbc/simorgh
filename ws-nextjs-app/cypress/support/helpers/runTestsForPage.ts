/* eslint-disable import/no-relative-packages */
import { PageTypes } from '#app/models/types/global';
import { ServiceParametersType } from '../../types';
import getOptimizelyKey from '../../../../cypress/support/helpers/getOptimizelyKey';

type TestType = (props: ServiceParametersType) => void;

type TestDataType = {
  path: string;
  tests: TestType[];
  runforEnv: string[];
  service: string;
};

type FunctionProps = {
  pageType: PageTypes;
  testSuites: TestDataType[];
  beforeAll?: (() => void)[];
  failOnStatusCode?: boolean;
  testIsolation?: boolean;
  deleteServiceWorker?: boolean;
};

export default ({
  pageType,
  testSuites,
  beforeAll = [],
  failOnStatusCode = true,
  testIsolation = false,
  deleteServiceWorker = false,
}: FunctionProps) => {
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
            if (failOnStatusCode) {
              cy.testResponseCodeAndRetry({
                url: path,
              });
            }

            // Potential fix for a11y tests causing a 'Failed to register a ServiceWorker: The document is in an invalid state.' error.
            const removeServiceWorker = (win: Window) => {
              if (win.navigator.serviceWorker) {
                win.navigator.serviceWorker
                  .getRegistrations()
                  .then(registrations => {
                    for (let i = 0; i < registrations.length; i += 1) {
                      const registration = registrations[i];
                      registration.unregister();
                    }
                  });
              }
            };

            cy.visit(path, {
              failOnStatusCode,
              ...(deleteServiceWorker && { onBeforeLoad: removeServiceWorker }),
            });
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

          const testParams = {
            path,
            pageType,
            ...params,
          } as unknown as ServiceParametersType;

          tests.forEach(test => {
            test(testParams);
          });
        },
      );
    }
  });
};
