/* eslint-disable @typescript-eslint/no-namespace */
import memoizeWith from 'ramda/src/memoizeWith';
import identity from 'ramda/src/identity';
import defaultToggles from '#app/lib/config/toggles';
import { LanguagesPageProps } from '../../pages/ws/types';
import testResponseCodeAndRetry from './helpers/testResponseCodeAndRetry';
import getAppEnv from './helpers/getAppEnv';
import envConfig, { EnvironmentConfigType } from './config/envs';

interface CustomWindow extends Window {
  __NEXT_DATA__?: {
    props?: {
      pageProps?: LanguagesPageProps;
    };
  };
}

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
      getPageDataFromWindow: () => Chainable<Record<string, unknown>>;
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
      (win as CustomWindow)?.__NEXT_DATA__?.props?.pageProps?.pageData || {}
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

Cypress.Commands.add('getPageDataFromWindow', getPageDataFromWindow);
Cypress.Commands.add('testResponseCodeAndRetry', testResponseCodeAndRetry);
Cypress.Commands.add('getToggles', getToggles);
