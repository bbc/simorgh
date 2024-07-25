// Custom command to test that the specified path returns the expected status code and
// content type, as well as (for smoke tests) that the response was not a Mozart fallback.
// Automatically retries twice after a delay if it gets an unexpected response
// NB:
// - Default timeout for cy.request is 50s
// - Certain types of network error are retried automatically (retryOnNetworkFailure)
import config from '../config/services';

const getOptimoOrTipoId = path => path.match(/(c[a-zA-Z0-9]{10}(o|t))/)?.[1];

export const testResponseCodeAndType = ({
  path,
  responseCode,
  type,
  retriesLeft = 2,
  allowFallback = false,
}) => {
  cy.request({ url: path, failOnStatusCode: false }).then(
    ({ status, headers }) => {
      expect(status, `Unexpected status code for ${path}`).to.equal(
        responseCode,
      );
      expect(
        headers['content-type'],
        `Unexpected content-type for ${path}`,
      ).to.include(type);

      // Ensure we're not seeing the Mozart fallback during smoke testing
      if (Cypress.env('SMOKE') && !allowFallback) {
        try {
          expect(
            headers,
            `Belfrage fallback response detected for ${path}`,
          ).not.to.have.property('belfrage-cache-status: STALE');
        } catch (e) {
          if (retriesLeft < 1) {
            throw e;
          }

          // Wait before retrying to allow for transient problems to go away
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(5000).testResponseCodeAndType({
            path,
            responseCode,
            type,
            retriesLeft: retriesLeft - 1,
            allowFallback: false,
          });
        }
      }
    },
  );
};

export const testResponseCodeAndTypeRetry = ({
  path,
  responseCode,
  type,
  retriesLeft = 2,
  allowFallback = false,
}) => {
  cy.request({ url: path, retryOnStatusCodeFailure: true }).then(
    ({ status, headers }) => {
      expect(status, `Unexpected status code for ${path}`).to.equal(
        responseCode,
      );
      expect(
        headers['content-type'],
        `Unexpected content-type for ${path}`,
      ).to.include(type);

      if (Cypress.env('SMOKE') && !allowFallback) {
        try {
          expect(
            headers,
            `Mozart fallback response detected for ${path}`,
          ).not.to.have.property('x-mfa');
        } catch (e) {
          if (retriesLeft < 1) {
            throw e;
          }

          // Wait before retrying to allow for transient problems to go away
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(5000).testResponseCodeAndTypeRetry({
            path,
            responseCode,
            type,
            retriesLeft: retriesLeft - 1,
            allowFallback: false,
          });
        }
      }
    },
  );
};

export const getPageData = ({ service, pageType, variant = 'default', id }) => {
  // eslint-disable-next-line no-param-reassign
  service = config[service]?.name || service;

  const env = Cypress.env('APP_ENV');
  const isNextJs = Cypress.env('isNextJs');
  if (isNextJs) {
    const bffUrl = `https://web-cdn.test.api.bbci.co.uk/fd/simorgh-bff?pageType=${pageType}&id=${id}&service=${service}${
      variant !== 'default' ? `&variant=${variant}` : ''
    }`;
    return cy.request({
      url: bffUrl,
      headers: { 'ctx-service-env': 'test' },
    });
  }

  if (env !== 'local') {
    let ctxEnv = null;
    if (pageType === 'topic') {
      ctxEnv = Cypress.env('currentPath').includes('?renderer_env=test')
        ? 'test'
        : 'live';
    }
    const ctxServEnv = ctxEnv || env;

    const assetId =
      id || // passed in as an argument
      getOptimoOrTipoId(Cypress.env('currentPath')) || // Extract Optimo or Tipo ID from the current path
      `${Cypress.env('currentPath')}`; // Extract the current path as the asset ID (typically CPS pages)

    const bffUrl = `https://web-cdn.${
      env === 'live' ? '' : `${env}.`
    }api.bbci.co.uk/fd/simorgh-bff?pageType=${pageType}&id=${assetId}&service=${service}${
      variant !== 'default' ? `&variant=${variant}` : ''
    }`;
    return cy.request({
      url: bffUrl,
      headers: { 'ctx-service-env': ctxServEnv },
    });
  }
  return cy.request(`${Cypress.env('currentPath')}.json`);
};

export const getPageDataFromWindow = () => {
  cy.window().then(win => {
    const pageData = win.SIMORGH_DATA;
    return pageData;
  });
};

Cypress.Commands.add('testResponseCodeAndType', testResponseCodeAndType);
Cypress.Commands.add('testResponseCodeAndTypeRetry', testResponseCodeAndType);
Cypress.Commands.add('getPageData', getPageData);
Cypress.Commands.add('getPageDataFromWindow', getPageDataFromWindow);
