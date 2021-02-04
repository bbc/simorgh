import appConfig from '../../../../../src/server/utilities/serviceConfigs';
import config from '../../../../support/config/services';

export const getPrivacyBanner = (service, variant) =>
  cy.contains(
    appConfig[config[service].name][variant].translations.consentBanner.privacy
      .title,
  );

export const getCookieBannerCanonical = (service, variant) =>
  cy.contains(
    appConfig[config[service].name][variant].translations.consentBanner.cookie
      .canonical.title,
  );

export const getCookieBannerAmp = (service, variant) =>
  cy.contains(
    appConfig[config[service].name][variant].translations.consentBanner.cookie
      .amp.initial.title,
  );

const getPrivacyBannerContainer = (service, variant) =>
  getPrivacyBanner(service, variant).parent();

const getCookieBannerContainerCanonical = (service, variant) =>
  getCookieBannerCanonical(service, variant).parent();

const getCookieBannerContainerAmp = (service, variant) =>
  getCookieBannerAmp(service, variant).parent();

export const getPrivacyBannerAccept = (service, variant) =>
  getPrivacyBannerContainer(service, variant)
    .find('button')
    .contains(
      appConfig[config[service].name][variant].translations.consentBanner
        .privacy.accept,
    );

export const getCookieBannerAcceptCanonical = (service, variant) =>
  getCookieBannerContainerCanonical(service, variant)
    .find('button')
    .contains(
      appConfig[config[service].name][variant].translations.consentBanner.cookie
        .canonical.accept,
    );

export const getCookieBannerAcceptAmp = (service, variant) =>
  getCookieBannerContainerAmp(service, variant)
    .find('button')
    .contains(
      appConfig[config[service].name][variant].translations.consentBanner.cookie
        .amp.accept,
    );

export const getCookieBannerRejectCanonical = (service, variant) =>
  getCookieBannerContainerCanonical(service, variant)
    .find('a')
    .contains(
      appConfig[config[service].name][variant].translations.consentBanner.cookie
        .canonical.reject,
    );

export const getCookieBannerRejectAmp = (service, variant) =>
  getCookieBannerContainerAmp(service, variant)
    .find('a')
    .contains(
      appConfig[config[service].name][variant].translations.consentBanner.cookie
        .amp.reject,
    );

export const getCookieBannerManageSettings = (service, variant) =>
  getCookieBannerContainerAmp(service, variant)
    .find('button')
    .contains(
      appConfig[config[service].name][variant].translations.consentBanner.cookie
        .amp.initial.manage,
    );

export const getCookieBannerAcceptInManageSettings = () =>
  cy.get('data-amp-bind-hidden=isManagingSettings').within(() => {
    cy.get('[data-cookie-banner=accept]').click();
  });
