/* eslint-disable import/prefer-default-export */
export const testsForLiteOnly = ({ service, pageType }) => {
  describe(`Running testsForLiteOnly for ${service} ${pageType}`, () => {
    describe('CTA: Lite', () => {
      it('should render a call to action component', () => {
        const liteSiteEnabledList = ['gahuza'];
        if (liteSiteEnabledList.includes(service)) {
          cy.get('[data-e2e="lite-cta"]').should('be.visible');
        }
      });
    });
  });
};
