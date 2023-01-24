import config from '../../support/config/services';

// For testing features that may differ across services but share a common logic e.g. translated strings.
export default ({ service, pageType }) => {
  describe(`testsThatFollowSmokeTestConfigForAllAMPPages for ${service} ${pageType}`, () => {
    describe('Header Tests', () => {
      const serviceName = config[service].name;
      // limit number of tests to 2 services for navigation toggling
      const testMobileNav =
        serviceName === 'ukchina' || serviceName === 'persian';

      if (testMobileNav) {
        it('should show dropdown menu and hide scrollable menu when menu button is clicked', () => {
          cy.viewport(320, 480);
          cy.get('nav')
            .find('[data-e2e="scrollable-nav"]')
            .should('be.visible');

          cy.get('nav')
            .find('[data-e2e="dropdown-nav"] ul')
            .should('not.be.visible');

          cy.get('nav button').click();

          cy.get('nav')
            .find('[data-e2e="scrollable-nav"]')
            .should('not.be.visible');

          cy.get('nav')
            .find('[data-e2e="dropdown-nav"] ul')
            .should('be.visible');
        });
      }
    });
  });
};
