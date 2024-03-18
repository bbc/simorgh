/* eslint-disable import/prefer-default-export */
// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
import topicTagsTest from '../../support/helpers/topicTagsTest';
import checkA11y from '../../support/helpers/checkA11y';
import config from '../../support/config/services';

export const testsThatAlwaysRunForAllPages = ({
  service,
  variant,
  pageType,
}) => {
  it('should have no detectable a11y violations on page load', () => {
    checkA11y();
  });

  it('should render topic tags if they are in the json, and they should navigate to correct topic page', () => {
    if (
      service !== 'sport' &&
      service !== 'newsround' &&
      service !== 'news' &&
      Cypress.env('APP_ENV') !== 'local'
    ) {
      topicTagsTest(service, variant, pageType);
    } else {
      cy.log('Topic tags currently disabled on Sport and Newsround');
    }
  });

  const serviceName = config[service].name;
  // limit number of tests to 2 services for navigation toggling
  const testMobileNav = serviceName === 'mundo' || serviceName === 'persian';

  if (testMobileNav) {
    describe('Header Tests', () => {
      it('should show dropdown menu and hide scrollable menu when menu button is clicked', () => {
        cy.viewport(320, 480);
        cy.get('nav').find('[data-e2e="scrollable-nav"]').should('be.visible');

        cy.get('nav')
          .find('[data-e2e="dropdown-nav"] ul')
          .should('not.be.visible');

        cy.get('nav button').click();

        cy.get('nav').find('[data-e2e="scrollable-nav"]').should('not.exist');

        cy.get('nav').find('[data-e2e="dropdown-nav"] ul').should('be.visible');
      });
    });
  }
};
