import envConfig from '../../support/config/envs';

export const testsToAlwaysRunForCanonicalPages = () => {
  describe(`No testsToAlwaysRunForCanonicalPages to run`, () => {});
};

export const testsForAllCanonicalPages = ({ service, pageType }) => {
  if (pageType !== 'errorPage404') {
    describe('Running testsForAllCanonicalPages', () => {
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

export const testsToNeverSmokeTestForCanonicalPages = () => {
  describe(`No testsToNeverSmokeTestForCanonicalPages to run`, () => {});
};
