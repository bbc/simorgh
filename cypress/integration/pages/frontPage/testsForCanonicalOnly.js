import envConfig from '../../../support/config/envs';
import config from '../../../support/config/services';

const tests = ({ service }) =>
  describe(`Canonical Tests`, () => {
    describe('ATI', () => {
      it('should have a noscript tag with an 1px image with the ati url', () => {
        cy.hasNoscriptImgAtiUrl(
          envConfig.atiUrl,
          config[service].isWorldService ? envConfig.atiAnalyticsWSBucket : '',
        );
      });

      it('should not have an AMP attribute', () => {
        cy.get('html').should('not.have.attr', 'amp');
      });
    });
  });

export default tests;
