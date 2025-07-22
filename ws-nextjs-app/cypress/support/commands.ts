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

const getPageDataFromWindow = ({
  service,
  pageType,
  variant,
  id,
}: {
  service: Services;
  pageType: PageTypes;
  variant?: Variants;
  id?: string;
}) => {
  const baseUrl =
    Cypress.env('APP_ENV') === 'local'
      ? 'http://localhost:7081'
      : Cypress.config().baseUrl;
  let path = `/${service}/${pageType}/${id}${variant ? `/${variant}` : ''}`;
  if (service === 'ws') {
    path = '/ws/languages';
  }
  cy.visit(`${baseUrl}${path}`);
  return cy.window().then(win => {
    return (
      // eslint-disable-next-line no-underscore-dangle
      (win as CustomWindow)?.__NEXT_DATA__?.props?.pageProps?.pageData || {}
    );
  });
};

Cypress.Commands.add('getPageDataFromWindow', getPageDataFromWindow);
