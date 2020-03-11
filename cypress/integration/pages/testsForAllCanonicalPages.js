import envConfig from '../../support/config/envs';
import config from '../../support/config/services';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRunForAllCanonicalPages = ({
  service,
  pageType,
}) => {
  describe(`No testsToAlwaysRunForCanonicalPages to run for ${service} ${pageType}`, () => {});
};

// For testing feastures that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForAllCanonicalPages = ({
  service,
  pageType,
}) => {
  if (pageType !== 'errorPage404') {
    describe(`Running testsForAllCanonicalPages for ${service} ${pageType}`, () => {
      if (Cypress.env('SMOKE')) {
        describe('ATI', () => {
          it('should have a noscript img tag with the ati url', () => {
            cy.hasNoscriptImgAtiUrl(envConfig.atiUrl);
          });
        });
      }
      it('should only have expected bundle script tags', () => {
        cy.get('script[src]').each($p => {
          if ($p.attr('src').includes(envConfig.assetOrigin)) {
            return expect($p.attr('src')).to.match(
              new RegExp(
                `(\\/static\\/js\\/(main|vendor|${config[service].name}|.+Page)-\\w+\\.\\w+\\.js)`,
                'g',
              ),
            );
          }
          return null;
        });
      });

      it('should have 1 bundle for its service', () => {
        let matches = 0;

        cy.get('script[src]')
          .each($p => {
            const match = $p
              .attr('src')
              .match(
                new RegExp(
                  `(\\/static\\/js\\/${config[service].name}-\\w+\\.\\w+\\.js)`,
                  'g',
                ),
              );

            if (match) {
              matches += 1;
            }
          })
          .then(() => {
            expect(matches).to.equal(1);
          });
      });
      if (['photoGalleryPage', 'storyPage'].includes(pageType)) {
        describe('CPS PGL and STY Tests', () => {
          it('should render at least one image', () => {
            cy.get('figure')
              .first()
              .find('img')
              .should('be.visible');
          });
        });
      }
    });
  }
  describe(`Canonical Tests`, () => {
    it('should not have an AMP attribute on the page', () => {
      cy.get('html').should('not.have.attr', 'amp');
    });
  });
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForAllCanonicalPages = ({
  service,
  pageType,
}) => {
  describe(`No testsToNeverSmokeTestForCanonicalPages to run for ${service} ${pageType}`, () => {});
};
