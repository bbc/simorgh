import getAppConfig from '../../config/getAppConfig';

Cypress.Commands.add(
  'hasConsentBannerTranslations',
  (service, serviceVariantConfig) => {
    cy.contains(
      getAppConfig({ service, serviceVariantConfig }).translations.consentBanner
        .privacy.title,
    );
    cy.contains(
      getAppConfig({ service, serviceVariantConfig }).translations.consentBanner
        .privacy.reject,
    );
    cy.contains(
      getAppConfig({ service, serviceVariantConfig }).translations.consentBanner
        .privacy.accept,
    ).click();
    cy.contains(
      getAppConfig({ service, serviceVariantConfig }).translations.consentBanner
        .cookie.title,
    );
    cy.contains(
      getAppConfig({ service, serviceVariantConfig }).translations.consentBanner
        .cookie.reject,
    );
    cy.contains(
      getAppConfig({ service, serviceVariantConfig }).translations.consentBanner
        .cookie.accept,
    );
  },
);
