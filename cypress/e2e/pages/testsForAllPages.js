/* eslint-disable import/prefer-default-export */
/* eslint-disable cypress/no-unnecessary-waiting */

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
import checkA11y from '../../support/helpers/checkA11y';

export default ({ service, pageType }) => {
  describe(`testForAllPages to run for ${service} ${pageType}`, () => {
    it('should have no detectable a11y violations on page load', () => {
      checkA11y();
    });

    describe(
      'Image Tests',
      {
        retries: 3,
      },
      () => {
        const pageTypesNoImages = ['liveRadio', 'errorPage404'];
        // live radio pages and error pages do not have an image
        if (!pageTypesNoImages.includes(pageType)) {
          it('should have webp images on pages', () => {
            cy.viewport(320, 480);
            cy.document().then(doc => {
              const images = Array.from(
                doc.querySelectorAll(
                  'amp-img[src*="ichef."], img[src*="ichef."]',
                ),
              ).filter(
                item =>
                  !item.parentNode.closest(
                    'section[data-testid="portrait-video-carousel"]',
                  ),
              );

              if (images.length === 0) {
                cy.log('No images on page');
              } else {
                // on amp there are hidden embed images, so we check only ichef ones
                images.forEach($img => {
                  // when you use a .each loop or other JS function that take a callback function (here with $img that is executed for each image element)
                  // you leave the Cypress command queue and are using plain JS. Using .wrap converts
                  // the JQuery element into a Cypress wrapped element so we can execute Cypress commands on it

                  // Images are lazy loaded so we need to scroll to them, check they have loaded before getting currentSrc
                  cy.wrap($img).scrollIntoView();

                  cy.wrap($img)
                    .should('be.visible')
                    .then($visibleImg => {
                      cy.log($visibleImg.src);
                      // eslint-disable-next-line no-unused-expressions
                      expect($visibleImg.src.endsWith('.webp')).to.be.true;
                    });
                });
              }
            });
          });
        }
      },
    );
  });
};
