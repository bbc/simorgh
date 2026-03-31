/* eslint-disable @typescript-eslint/no-namespace */
import memoizeWith from 'ramda/src/memoizeWith';
import identity from 'ramda/src/identity';
import defaultToggles from '#app/lib/config/toggles';
import testResponseCodeAndRetry from './helpers/testResponseCodeAndRetry';
import getAppEnv from './helpers/getAppEnv';
import envConfig, { EnvironmentConfigType } from './config/envs';
import handleContinueReadingButton from './helpers/handleContinueReadingButton';

interface TestResponseCodeAndRetry {
  url: string;
  responseCode?: number;
  type?: string;
  retriesLeft?: number;
  allowFallback?: boolean;
  headers?: Record<string, string>;
}

declare global {
  namespace Cypress {
    interface Chainable {
      getPageDataFromWindow: () => Chainable;
      testResponseCodeAndRetry: (
        props: TestResponseCodeAndRetry,
      ) => Chainable<Record<string, unknown>>;
      getToggles(serviceID: string): Chainable;
      hasNoscriptImgAtiUrl(atiUrl: string): Chainable;
      testResponseCodeAndType(
        props: TestResponseAndTypeFunctionProps,
      ): Chainable;
    }
  }
}

const getPageDataFromWindow = () => {
  return cy.window().then(win => {
    return (
      // eslint-disable-next-line no-underscore-dangle
      win?.__NEXT_DATA__?.props?.pageProps?.pageData
    );
  });
};

const keyGenFn = identity as (...v: unknown[]) => string;
const environmentConfig = envConfig as EnvironmentConfigType;
const getToggles = memoizeWith(keyGenFn, service => {
  const togglesFixture = `cypress/fixtures/toggles/${service}.json`;

  if (getAppEnv() === 'local') {
    cy.writeFile(togglesFixture, defaultToggles.local);
  } else {
    cy.request({
      url: `${environmentConfig.togglesUrl}?application=simorgh&service=${service}&__amp_source_origin=${environmentConfig.baseUrl}`,
      headers: {
        Origin: 'https://www.bbc.com',
      },
    }).then(response => {
      cy.writeFile(togglesFixture, response.body.toggles);
    });
  }
});

const hasNoscriptImgAtiUrl = (atiUrl: string) => {
  cy.get('noscript[id="analytics-noscript"]')
    .invoke('text')
    .then(text => {
      const noscriptString = text.toString();
      cy.log(noscriptString);

      if (noscriptString) {
        cy.get('noscript[id="analytics-noscript"]').should(
          'contain',
          `<img height="1px" width="1px" alt="" style="position:absolute" src="${atiUrl}`,
        );
      }
    });
};

type TestResponseAndTypeFunctionProps = {
  path: string;
  responseCode: number;
  type: string;
  retriesLeft?: number;
  allowFallback?: boolean;
};
const testResponseCodeAndType = ({
  path,
  responseCode,
  type,
  retriesLeft = 2,
  allowFallback = false,
}: TestResponseAndTypeFunctionProps) => {
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

Cypress.Commands.add('getPageDataFromWindow', getPageDataFromWindow);
Cypress.Commands.add('testResponseCodeAndRetry', testResponseCodeAndRetry);
Cypress.Commands.add('getToggles', getToggles);
Cypress.Commands.add('hasNoscriptImgAtiUrl', hasNoscriptImgAtiUrl);
Cypress.Commands.add('testResponseCodeAndType', testResponseCodeAndType);

Cypress.Commands.overwrite(
  'visit',
  (originalFn, urlOrOptions, ...rest): Cypress.Chainable => {
    // Keeps the original signature of cy.visit() intact while allowing for flexible options handling https://docs.cypress.io/api/commands/visit#Usage
    const [options] = rest as [Partial<Cypress.VisitOptions>?];

    const visitUrl =
      typeof urlOrOptions === 'string' ? urlOrOptions : urlOrOptions.url;
    const visitOptionsObj =
      typeof urlOrOptions === 'string' ? (options ?? {}) : urlOrOptions;
    const { failOnStatusCode = true, headers } = visitOptionsObj;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const originalFnAsAny = originalFn as (...args: any[]) => Cypress.Chainable;
    const runVisit = () => {
      if (typeof urlOrOptions === 'string') {
        return originalFnAsAny(urlOrOptions, options);
      }

      return originalFnAsAny(urlOrOptions);
    };

    if (!failOnStatusCode || getAppEnv() === 'local') {
      return runVisit().then(() => {
        // Handle Continue Reading button if it appears when cy.visit() is called
        handleContinueReadingButton();
      });
    }

    const checkStatus = (retriesLeft = 2): Cypress.Chainable => {
      return cy
        .request({
          url: visitUrl,
          failOnStatusCode: false,
          ...(headers && { headers }),
        })
        .then(({ status }) => {
          if (status === 200) {
            const noOp = () => undefined;
            return cy.then(noOp);
          }

          if (retriesLeft > 0) {
            // eslint-disable-next-line cypress/no-unnecessary-waiting
            return cy.wait(5000).then(() => checkStatus(retriesLeft - 1));
          }

          throw new Error(
            `Expected status 200 but got ${status} for ${visitUrl} after all retries`,
          );
        });
    };

    // Pre-check: Verify the page returns a 200 response before visiting.
    // This mitigates Lambda cold-start failures where the first request returns a 500,
    // retrying here means before() hooks never surface these transient failures directly.
    return checkStatus().then(() => {
      return runVisit().then(() => {
        // Handle Continue Reading button if it appears when cy.visit() is called
        handleContinueReadingButton();
      });
    });
  },
);
