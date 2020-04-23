import appConfig from '../../../../../src/server/utilities/serviceConfigs';
import config from '../../../../support/config/services';

export const getPrivacyBanner = (product, variant) =>
  cy.contains(
    appConfig[product][variant].translations.consentBanner.privacy.title,
  );

export const getCookieBanner = (service, variant) =>
  cy.contains(
    appConfig[config[service].name][variant].translations.consentBanner.cookie
      .title,
  );

const getPrivacyBannerContainer = (product, variant) =>
  getPrivacyBanner(product, variant).parent();

const getCookieBannerContainer = (service, variant) =>
  getCookieBanner(service, variant).parent();

export const getPrivacyBannerAccept = (product, variant) =>
  getPrivacyBannerContainer(product, variant)
    .find('button')
    .contains(
      appConfig[product][variant].translations.consentBanner.privacy.accept,
    );

export const getCookieBannerAccept = (service, variant) =>
  getCookieBannerContainer(service, variant)
    .find('button')
    .contains(
      appConfig[config[service].name][variant].translations.consentBanner.cookie
        .accept,
    );

export const getCookieBannerReject = (service, variant) =>
  getCookieBannerContainer(service, variant)
    .find('a')
    .contains(
      appConfig[config[service].name][variant].translations.consentBanner.cookie
        .reject,
    );
