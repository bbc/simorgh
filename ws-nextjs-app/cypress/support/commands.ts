/* eslint-disable @typescript-eslint/no-namespace */
import {
  Services,
  Variants,
  PageTypes,
} from '../../../src/app/models/types/global';

declare global {
  namespace Cypress {
    interface Chainable {
      getPageData: ({
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

const getPageData = ({
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

  return cy
    .request({
      url: `${baseUrl}${path}`,
      failOnStatusCode: false,
    })
    .then(response => {
      return response.body;
    });
};

Cypress.Commands.add('getPageData', getPageData);
