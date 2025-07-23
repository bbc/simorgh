/* eslint-disable @typescript-eslint/no-namespace */
import { LanguagesPageProps } from '../../pages/ws/types';

interface CustomWindow extends Window {
  __NEXT_DATA__?: {
    props?: {
      pageProps?: LanguagesPageProps;
    };
  };
}

declare global {
  namespace Cypress {
    interface Chainable {
      getPageDataFromWindow: () => Chainable<Record<string, unknown>>;
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

Cypress.Commands.add('getPageDataFromWindow', getPageDataFromWindow);
