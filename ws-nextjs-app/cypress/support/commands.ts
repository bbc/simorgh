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
        id: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) => Chainable<any>;
    }
  }
}
