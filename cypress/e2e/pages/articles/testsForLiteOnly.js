/* eslint-disable import/prefer-default-export */
import { liteEnabledServices } from '#app/components/LiteSiteCta/liteSiteConfig';

export const testsForLiteOnly = ({ service, pageType }) => {
  describe(`Running testsForLiteOnly for ${service} ${pageType}`, () => {
    describe('CTA: Lite', () => {
      it('should render a call to action component', () => {
        if (liteEnabledServices.includes(service)) {
          cy.get('[data-e2e="lite-cta"]').should('be.visible');
        }
      });
    });
  });
};
