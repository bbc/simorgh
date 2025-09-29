/* eslint-disable @typescript-eslint/no-namespace */
import memoizeWith from 'ramda/src/memoizeWith';
import identity from 'ramda/src/identity';
import defaultToggles from '#app/lib/config/toggles';
import testResponseCodeAndRetry from './helpers/testResponseCodeAndRetry';
import getAppEnv from './helpers/getAppEnv';
import envConfig, { EnvironmentConfigType } from './config/envs';

interface TestResponseCodeAndRetry {
  url: string;
  responseCode?: number;
  type?: string;
  retriesLeft?: number;
  allowFallback?: boolean;
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

Cypress.Commands.add('getPageDataFromWindow', getPageDataFromWindow);
Cypress.Commands.add('testResponseCodeAndRetry', testResponseCodeAndRetry);
Cypress.Commands.add('getToggles', getToggles);
Cypress.Commands.add('hasNoscriptImgAtiUrl', hasNoscriptImgAtiUrl);
