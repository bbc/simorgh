/* eslint-disable import/prefer-default-export */
import runCanonicalAdsTests from '../../../support/helpers/adsTests/testsForCanonicalOnly';

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForCanonicalOnly = ({ service }) => {
  describe(`Images`, () => {
    it('should have a picture tag around images', () => {
      cy.get('img').each($img => {
        const $section = $img.parents('section');
        if ($section.length > 0) {
          const testId = $section.attr('data-testid');
          if (testId && testId.includes('message-banner')) {
            cy.log(`No picture tag on message banners ${testId}`);
          } else {
            cy.wrap($img).parent().should('match', 'picture');
          }
        }
      });
    });
    it('should have two sources one with webp and one with fallback jpg/png', () => {
      cy.get('picture').each($picture => {
        cy.wrap($picture)
          .find('source')
          .then($sources => {
            expect($sources).to.have.length(2);
            $sources.each((index, source) => {
              // The first <source> srcSet should have webp images
              // The second <source> srcSet should have the fallback jpgs or pngs
              const expectedFileTypes = [/\.webp$/, /\.(jpg|png)$/];
              const srcSet = Cypress.$(source).attr('srcset');
              // remove everything after the file extension including the image widths and the space
              const urls = srcSet
                .split(',')
                .map(url => url.replace(/\s+\S+$/, ''));
              urls.forEach(url => {
                expect(url).to.match(expectedFileTypes[index]);
              });
            });
          });
      });
    });
  });
  if (Cypress.env('APP_ENV') === 'local') {
    runCanonicalAdsTests({ service });
  }
};
