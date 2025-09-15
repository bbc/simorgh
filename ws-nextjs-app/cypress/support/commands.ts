/* eslint-disable @typescript-eslint/no-namespace */
import { LanguagesPageProps } from '../../pages/ws/types';

interface CustomWindow extends Window {
  __NEXT_DATA__?: {
    props?: {
      pageProps?: LanguagesPageProps;
    };
  };
}

interface testResponseCodeAndRetry {
  url: string;
  responseCode?: number;
  type?: string;
  retriesLeft?: number;
  allowFallback?: boolean;
}

declare global {
  namespace Cypress {
    interface Chainable {
      getPageDataFromWindow: () => Chainable<Record<string, unknown>>;
      testResponseCodeAndRetry: (
        props: testResponseCodeAndRetry,
      ) => Chainable<Record<string, unknown>>;
    }
  }
}

const getPageDataFromWindow = () => {
  return cy.window().then(win => {
    return (
      // eslint-disable-next-line no-underscore-dangle
      (win as CustomWindow)?.__NEXT_DATA__?.props?.pageProps?.pageData || {}
    );
  });
};

const testResponseCodeAndRetry = ({
  url,
  responseCode = 200,
  retriesLeft = 2,
  allowFallback = false,
}: testResponseCodeAndRetry) => {
  cy.request({ url, retryOnStatusCodeFailure: true }).then(
    ({ status, headers }) => {
      expect(status, `Unexpected status code for ${url}`).to.equal(
        responseCode,
      );

      if (!allowFallback) {
        try {
          expect(
            headers,
            `Belfrage fallback response detected for ${url}`,
          ).not.to.have.property('belfrage-cache-status: STALE');
        } catch (e) {
          if (retriesLeft < 1) {
            throw e;
          }

          // Wait before retrying to allow for transient problems to go away
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(5000).testResponseCodeAndRetry({
            url,
            responseCode,
            retriesLeft: retriesLeft - 1,
            allowFallback,
          });
        }
      }
    },
  );
};

Cypress.Commands.add('getPageDataFromWindow', getPageDataFromWindow);
Cypress.Commands.add('testResponseCodeAndRetry', testResponseCodeAndRetry);
