import visitPage from '../../../support/helpers/visitPage';

export default ({ serviceName, pageType, path }) => {
  describe(`Canonical tests for PreRoll ads for ${serviceName} ${pageType} ${path}`, () => {
    it('should load pre-roll ad plugin', () => {
      visitPage(path, pageType);

      cy.get(`script[src*="dotcom-preroll.js"]`).should('exist');
    });
  });
};
