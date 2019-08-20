import config from '../../support/config/services';
import getAppConfig from '../../support/config/getAppConfig';
import describeForEuOnly from '../../support/describeForEuOnly';

// Limited to 1 UK & 1 WS service for now due to time test takes to run per page.
const serviceFilter = service => ['news', 'persian'].includes(service);

const filterPageTypes = (service, pageType) =>
  config[service].pageTypes[pageType].path !== undefined;

const serviceConfigOverride = service =>
  config[service].serviceOverride || null;

const getPrivacyBanner = (service, serviceVariantConfig) =>
  cy.contains(
    getAppConfig({ service, serviceVariantConfig }).translations.consentBanner
      .privacy.title,
  );

const getCookieBanner = (service, serviceVariantConfig) =>
  cy.contains(
    getAppConfig({ service, serviceVariantConfig }).translations.consentBanner
      .cookie.title,
  );

const getPrivacyAccept = (service, serviceVariantConfig) =>
  cy.contains(
    getAppConfig({ service, serviceVariantConfig }).translations.consentBanner
      .privacy.accept,
  );

const getCookieAccept = (service, serviceVariantConfig) =>
  cy.contains(
    getAppConfig({ service, serviceVariantConfig }).translations.consentBanner
      .cookie.accept,
  );

const getCookieReject = (service, serviceVariantConfig) =>
  cy.contains(
    getAppConfig({ service, serviceVariantConfig }).translations.consentBanner
      .cookie.reject,
  );

const visitPage = (service, pageType) => {
  cy.visit(`${config[service].pageTypes[pageType].path}.amp`, {
    failOnStatusCode: !pageType.includes('error'),
  });
};

Object.keys(config)
  .filter(serviceFilter)
  .forEach(service => {
    const serviceVariantConfig = serviceConfigOverride(service);
    Object.keys(config[service].pageTypes)
      .filter(pageType => filterPageTypes(service, pageType))
      .forEach(pageType => {
        describeForEuOnly(
          `Amp Cookie Banner Test for ${service} ${pageType}`,
          () => {
            beforeEach(() => {
              visitPage(service, pageType);
            });

            it('should have a privacy & cookie banner, which disappears once "accepted" ', () => {
              getPrivacyBanner(service, serviceVariantConfig).should(
                'be.visible',
              );
              getCookieBanner(service, serviceVariantConfig).should(
                'not.be.visible',
              );

              getPrivacyAccept(service, serviceVariantConfig).click();

              getCookieBanner(service, serviceVariantConfig).should(
                'be.visible',
              );
              getPrivacyBanner(service, serviceVariantConfig).should(
                'not.be.visible',
              );

              getCookieAccept(service, serviceVariantConfig).click();

              getCookieBanner(service, serviceVariantConfig).should(
                'not.be.visible',
              );
              getPrivacyBanner(service, serviceVariantConfig).should(
                'not.be.visible',
              );
            });

            it('should show privacy banner if cookie banner isnt accepted, on reload', () => {
              getPrivacyAccept(service, serviceVariantConfig).click();

              visitPage(service, pageType);

              getPrivacyBanner(service, serviceVariantConfig).should(
                'be.visible',
              );
              getCookieBanner(service, serviceVariantConfig).should(
                'not.be.visible',
              );
            });

            it('should not show privacy & cookie banners once both accepted, on reload', () => {
              getPrivacyAccept(service, serviceVariantConfig).click();
              getCookieAccept(service, serviceVariantConfig).click();

              visitPage(service, pageType);

              getPrivacyBanner(service, serviceVariantConfig).should(
                'not.be.visible',
              );
              getCookieBanner(service, serviceVariantConfig).should(
                'not.be.visible',
              );
            });

            it('should not show privacy & cookie banners once cookie banner declined, on reload', () => {
              getPrivacyBanner(service, serviceVariantConfig).should(
                'be.visible',
              );
              getCookieBanner(service, serviceVariantConfig).should(
                'not.be.visible',
              );

              getPrivacyAccept(service, serviceVariantConfig).click();
              getCookieReject(service, serviceVariantConfig).click();

              visitPage(service, pageType);

              getPrivacyBanner(service, serviceVariantConfig).should(
                'not.be.visible',
              );
              getCookieBanner(service, serviceVariantConfig).should(
                'not.be.visible',
              );
            });
          },
        );
      });
  });
