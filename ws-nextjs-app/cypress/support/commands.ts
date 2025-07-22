/* eslint-disable @typescript-eslint/no-namespace */
import {
  Services,
  Variants,
  PageTypes,
} from '../../../src/app/models/types/global';
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
      getPageDataFromWindow: ({
        service,
        pageType,
        variant,
        id,
      }: {
        service: Services;
        pageType: PageTypes;
        variant?: Variants;
        id?: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) => Chainable<any>;
    }
  }
}

const getPageDataFromWindow = () => {
  return cy.window().then(win => {
    const nextData = (win as CustomWindow).__NEXT_DATA__?.props?.pageProps
      ?.pageData;
    return nextData ?? null;
  });
};

Cypress.Commands.add('getPageDataFromWindow', getPageDataFromWindow);
