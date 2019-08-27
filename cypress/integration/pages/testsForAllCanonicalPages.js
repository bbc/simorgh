import envConfig from '../../support/config/envs';
import config from '../../support/config/services';

const serviceIsGNL = service => service === 'japanese';

const testsForAllCanonicalPages = ({ service, pageType }) => {
  if (pageType !== 'errorPage404') {
    describe('ATI', () => {
      it('should have a noscript tag with an 1px image with the ati url', () => {
        if (service === serviceIsGNL) {
          cy.hasNoscriptImgAtiUrl(
            envConfig.atiUrl,
            envConfig.atiAnalyticsGNLBucket,
          );
        } else if (config[service].isWorldService) {
          cy.hasNoscriptImgAtiUrl(
            envConfig.atiUrl,
            envConfig.atiAnalyticsWSBucket,
          );
        } else {
          cy.hasNoscriptImgAtiUrl(envConfig.atiUrl, '');
        }
      });
    });
    describe('Canonical Scripts', () => {
      it('should only have expected bundle script tags', () => {
        cy.get('script[src]').each($p => {
          if ($p.attr('src').includes(envConfig.assetOrigin)) {
            return expect($p.attr('src')).to.match(
              new RegExp(
                `(\\/static\\/js\\/(main|vendor|${service})-\\w+\\.\\w+\\.js)`,
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
                  `(\\/static\\/js\\/${service}-\\w+\\.\\w+\\.js)`,
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
    });
  }
  describe(`Canonical Tests`, () => {
    it('should not have an AMP attribute on the page', () => {
      cy.get('html').should('not.have.attr', 'amp');
    });
  });
};

export default testsForAllCanonicalPages;
