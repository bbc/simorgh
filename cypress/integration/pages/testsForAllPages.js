import config from '../../support/config/services';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRunForAllPages = () => {};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigforAllPages = ({
  service,
  pageType,
}) => {
  describe(`Running testsThatFollowSmokeTestConfigforAllPages for ${service} ${pageType}`, () => {
    const serviceName = config[service].name;

    // limit number of tests to 2 services for navigation toggling
    const testMobileNav =
      serviceName === 'ukchina' || serviceName === 'persian';

    if (testMobileNav) {
      describe('Header Tests', () => {
        it('should show dropdown menu and hide scrollable menu when menu button is clicked', () => {
          cy.viewport(320, 480);
          cy.get('nav')
            .find('div[class^="StyledScrollableNav"]')
            .should('be.visible');

          cy.get('nav')
            .find('ul[class^="DropdownUl"]')
            .should('not.be.visible');

          cy.get('nav button').click();

          cy.get('nav')
            .find('div[class^="StyledScrollableNav"]')
            .should('not.be.visible');

          cy.get('nav').find('ul[class^="DropdownUl"]').should('be.visible');
        });
      });
    }

    if (['photoGalleryPage', 'storyPage'].includes(pageType)) {
      describe('Photo Gallery and Story Pages', () => {
        it('should render a timestamp', () => {
          cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
            if (body.metadata.options.allowDateStamp) {
              cy.get('time')
                .eq(0)
                .should('be.visible')
                .should('have.attr', 'datetime')
                .should('not.be.empty');
            } else {
              cy.log('Test skipped - allowDateStamp false within metadata');
            }
          });
        });

        it('should render a H1, which displays the headline', () => {
          cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
            cy.get('h1').should('contain', body.promo.headlines.headline);
          });
        });
      });
    }
  });
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForAllPageTypes = () => {};
