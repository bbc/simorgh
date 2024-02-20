/* eslint-disable @typescript-eslint/no-namespace */
import { getPageData } from '../../../cypress/support/commands/application';
import {
  Services,
  Variants,
  PageTypes,
} from '../../../src/app/models/types/global';

Cypress.Commands.add('getPageData', getPageData);

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
        id: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) => Chainable<any>;
    }
  }
}
