/* eslint-disable import/prefer-default-export */
/* eslint-disable cypress/no-unnecessary-waiting */
// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
import topicTagsTest from '../../support/helpers/topicTagsTest';
import checkA11y from '../../support/helpers/checkA11y';

export const testsThatAlwaysRunForAllPages = ({
  service,
  variant,
  pageType,
}) => {
  describe(`testsToAlwaysRunForAllPages to run for ${service} ${pageType}`, () => {
    it('should have no detectable a11y violations on page load', () => {
      checkA11y();
    });
    it('should render topic tags if they are in the json, and they should navigate to correct topic page', () => {
      // topicTagsTest(service, variant, pageType);
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
            cy.document().then(doc => {
              const images = doc.querySelectorAll(
                'amp-img[src*="ichef."], img[src*="ichef."]',
              );
              if (images.length === 0) {
                cy.log('No images on page');
              } else {
                // on amp there are hidden embed images, so we check only ichef ones
                cy.get('amp-img[src*="ichef."], img[src*="ichef."]').each(
                  $img => {
                    // when you use a .each loop or other JS function that take a callback function (here with $img that is executed for each image element)
                    // you leave the Cypress command queue and are using plain JS. Using .wrap converts
                    // the JQuery element into a Cypress wrapped element so we can execute Cypress commands on it

                    // Images are lazy loaded so we need to scroll to them, check they have loaded before getting currentSrc
                    // eslint-disable-next-line cypress/unsafe-to-chain-command
                    cy.wrap($img)
                      .scrollIntoView()
                      .should('be.visible')
                      .then($visibleImg => {
                        const src = $visibleImg.attr('src');
                        cy.log(src);
                        // eslint-disable-next-line no-unused-expressions
                        expect(src.endsWith('.webp')).to.be.true;
                      });
                  },
                );
              }
            });
          });
        }
      },
    );
  });
};
