import envConfig from '../../../support/config/envs';
import config from '../../../support/config/services';

const tests = ({ service }) =>
  describe(`Canonical Tests`, () => {
    describe('ATI', () => {
      it('should have a noscript tag with an 1px image with the ati url', () => {
        if (service !== 'japanese') {
          cy.hasNoscriptImgAtiUrl(
            envConfig.atiUrl,
            config[service].isWorldService
              ? envConfig.atiAnalyticsWSBucket
              : '',
          );
        } else {
          cy.hasNoscriptImgAtiUrl(
            envConfig.atiUrl,
            envConfig.atiAnalyticsGNLBucket,
          );
        }
      });

      it('should not have an AMP attribute', () => {
        cy.get('html').should('not.have.attr', 'amp');
      });
    });
  });

export default tests;
