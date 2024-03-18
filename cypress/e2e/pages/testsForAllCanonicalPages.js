/* eslint-disable import/prefer-default-export */
import envConfig from '../../support/config/envs';

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForAllCanonicalPages = ({
  pageType,
}) => {
  if (pageType !== 'errorPage404') {
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
  }
};
