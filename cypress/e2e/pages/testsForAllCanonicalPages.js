/* eslint-disable no-unused-expressions */
/* eslint-disable cypress/unsafe-to-chain-command */
/* eslint-disable import/prefer-default-export */
import envConfig from '../../support/config/envs';
import config from '../../support/config/services';

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForAllCanonicalPages = ({
  service,
  pageType,
}) => {
  if (pageType !== 'errorPage404') {
    describe(`Running testsForAllCanonicalPages for ${service} ${pageType}`, () => {
      describe(
        'Image Tests',
        {
          retries: 3,
        },
        () => {
          const pageTypesNoImages = [
            'liveRadio',
            'errorPage404',
            'mediaAssetPage',
          ];
          // live radio pages and error pages do not have an image, media asset pages do not reliably show most watched list so this will cause flakes
          if (!pageTypesNoImages.includes(pageType)) {
            it('should have webp images on pages', () => {
              cy.get('img').each($img => {
                // when you use a .each loop or other JS function that take a callback function (here with $img that is executed for each image element)
                // you leave the Cypress command queue and are using plain JS. Using .wrap converts
                // the JQuery element into a Cypress wrapped element so we can execute Cypress commands on it

                // Images are lazy loaded so we need to scroll to them, check they have loaded before getting currentSrc
                cy.wrap($img)
                  .scrollIntoView()
                  .should('be.visible')
                  .then($visibleImg => {
                    cy.wrap($visibleImg)
                      .should($loadedImg => {
                        expect($loadedImg.prop('currentSrc')).to.not.be.empty;
                      })
                      .then($imgWithCurrentSrc => {
                        const currentSrc =
                          $imgWithCurrentSrc.prop('currentSrc');
                        cy.log('currentSrc', currentSrc);
                        expect(currentSrc.endsWith('.webp')).to.be.true;
                      });
                  });
              });
            });
          }
        },
      );
      if (Cypress.env('SMOKE')) {
        describe(
          'ATI',
          {
            retries: 3,
          },
          () => {
            it('should have a noscript img tag with the ati url', () => {
              cy.hasNoscriptImgAtiUrl(envConfig.atiUrl);
            });
          },
        );
      }
    });
  }

  describe('Header Tests', () => {
    const serviceName = config[service].name;
    // limit number of tests to 2 services for navigation toggling
    const testMobileNav =
      serviceName === 'ukchina' || serviceName === 'persian';

    if (testMobileNav) {
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
    }
  });
};
