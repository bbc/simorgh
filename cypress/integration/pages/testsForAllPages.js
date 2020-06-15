import config from '../../support/config/services';
import appConfig from '../../../src/server/utilities/serviceConfigs';
import describeForEuOnly from '../../support/helpers/describeForEuOnly';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRunForAllPages = ({ service, pageType }) => {
  describe(`No testsToAlwaysRunForAllPages to run for ${service} ${pageType}`, () => {});
};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigforAllPages = ({
  service,
  pageType,
  variant,
}) => {
  describe(`Running testsForAllPages for ${service} ${pageType}`, () => {
    describeForEuOnly('Consent Banners', () => {
      it('have correct translations', () => {
        cy.contains(
          appConfig[config[service].name][variant].translations.consentBanner
            .privacy.title,
        );
        cy.contains(
          appConfig[config[service].name][variant].translations.consentBanner
            .privacy.reject,
        );
        cy.contains(
          appConfig[config[service].name][variant].translations.consentBanner
            .privacy.accept,
        ).click();
        cy.contains(
          appConfig[config[service].name][variant].translations.consentBanner
            .cookie.title,
        );
        cy.contains(
          appConfig[config[service].name][variant].translations.consentBanner
            .cookie.reject,
        );
        cy.contains(
          appConfig[config[service].name][variant].translations.consentBanner
            .cookie.accept,
        );
      });
    });

    describe('Header Tests', () => {
      const serviceName = config[service].name;
      // limit number of tests to 2 services for navigation toggling
      const testMobileNav =
        serviceName === 'ukchina' || serviceName === 'persian';

      if (testMobileNav) {
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
      }
    });

    describe('Footer Tests', () => {
      describe('footer tests', () => {
        it('should have a visible footer', () => {
          cy.get('footer')
            .should('have.length', 1)
            .should('have.attr', 'role', 'contentinfo')
            .find('a')
            .should('have.attr', 'href', `/${config[service].name}`)
            .find('svg')
            .should('be.visible');
        });
      });

      it('should render the BBC branding', () => {
        cy.get('footer a')
          .eq(0)
          .should(
            'contain',
            appConfig[config[service].name][variant].serviceLocalizedName !==
              undefined
              ? `${appConfig[config[service].name][variant].product}, ${
                  appConfig[config[service].name][variant].serviceLocalizedName
                }`
              : appConfig[config[service].name][variant].product,
          );
      });
    });
    if (
      ['mediaAssetPage', 'photoGalleryPage', 'storyPage'].includes(pageType)
    ) {
      describe('Photo Gallery, Story Page and MAP Tests', () => {
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
        if (['photoGalleryPage', 'storyPage'].includes(pageType)) {
          it('should render a H1, which displays the headline', () => {
            cy.request(`${Cypress.env('currentPath')}.json`).then(
              ({ body }) => {
                cy.get('h1').should('contain', body.promo.headlines.headline);
              },
            );
          });
        }
      });
    }
    // End of block (['mediaAssetPage', 'photoGalleryPage', 'storyPage'].includes(pageType))
  });
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForAllPageTypes = ({
  service,
  pageType,
}) => {
  describe(`Running testsToNeverSmokeTestForAllPageTypes for ${service} ${pageType}`, () => {});
};
