/* eslint-disable @typescript-eslint/no-namespace */
import {
  Services,
  Variants,
  PageTypes,
} from '../../../src/app/models/types/global';

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
    // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/no-explicit-any
    const nextData = (win as any).__NEXT_DATA__?.props?.pageProps?.pageData;
    if (!nextData) {
      throw new Error('__NEXT_DATA__ not found on window');
    }

    return nextData;
  });
};

Cypress.Commands.add('getPageDataFromWindow', getPageDataFromWindow);
