import config from '../../support/cookieConfig';
import describeForEuOnly from '../../support/describeForEuOnly';
import { describeForLocalOnly } from '../../support/limitEnvRuns';

const services = Object.keys(config);
const worldServiceCookieBannerTranslations = (
  privacyStatement,
  performanceStatement,
  service,
  cookieAgreement,
  privacyAgreement,
) => {
  const getPrivacyBanner = () => cy.contains(privacyStatement);

  const getCookieBanner = () => cy.contains(performanceStatement);
  const getPrivacyBannerContainer = () => getPrivacyBanner().parent();
  const getCookieBannerContainer = () => getCookieBanner().parent();

  const visitArticle = () => {
    cy.visit(service, {
      failOnStatusCode: false,
    });
  };

  cy.clearCookies();
  visitArticle();

  getPrivacyBanner().should('be.visible');
  getCookieBanner().should('not.be.visible');

  getPrivacyBannerContainer()
    .contains(cookieAgreement)
    .click();

  getCookieBanner().should('be.visible');
  getPrivacyBanner().should('not.be.visible');

  getCookieBannerContainer()
    .contains(privacyAgreement)
    .click();

  getCookieBanner().should('not.be.visible');
  getPrivacyBanner().should('not.be.visible');
};

// These tests work locally, but fail on Test & Live environments since they have
// not yet been set up to have the correct translated cookie banners on the error pages
describeForLocalOnly('World Service Cookie banner Translations', () => {
  describe('Canonical', () => {
    services.forEach(serviceName => {
      it(`should load the relevant translations for ${serviceName}`, () => {
        worldServiceCookieBannerTranslations(
          `${config[serviceName].assets.privacyStatement}`,
          `${config[serviceName].assets.performanceStatement}`,
          `${config[serviceName].assets.mockArticleURL}`,
          `${config[serviceName].assets.privacyAgreement}`,
          `${config[serviceName].assets.cookieAgreement}`,
        );
      });
    });
  });

  describeForEuOnly('AMP', () => {
    services.forEach(serviceName => {
      it(`should load the relevant translations for ${serviceName}`, () => {
        worldServiceCookieBannerTranslations(
          `${config[serviceName].assets.privacyStatement}`,
          `${config[serviceName].assets.performanceStatement}`,
          `${config[serviceName].assets.mockAmpArticleURL}`,
          `${config[serviceName].assets.privacyAgreement}`,
          `${config[serviceName].assets.cookieAgreement}`,
        );
      });
    });
  });
});
