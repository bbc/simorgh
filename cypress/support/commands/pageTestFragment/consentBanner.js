import appConfig from '../../../../src/app/lib/config/services';

Cypress.Commands.add('hasConsentBannerTranslations', service => {
  cy.contains(appConfig[service].translations.consentBanner.privacy.title);
  cy.contains(appConfig[service].translations.consentBanner.privacy.reject);
  cy.contains(
    appConfig[service].translations.consentBanner.privacy.accept,
  ).click();
  cy.contains(appConfig[service].translations.consentBanner.cookie.title);
  cy.contains(appConfig[service].translations.consentBanner.cookie.reject);
  cy.contains(appConfig[service].translations.consentBanner.cookie.accept);
});
