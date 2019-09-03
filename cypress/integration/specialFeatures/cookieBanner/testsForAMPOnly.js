import config from '../../../support/config/services';
import appConfig from '#app/lib/config/services';
import describeForEuOnly from '../../../support/helpers/describeForEuOnly';

// Limited to 1 UK & 1 WS service when a smoke test due to time test takes to run per page.
// This is why this file doesn't check smoke test values.
const serviceFilter = service =>
  Cypress.env('SMOKE') ? ['news', 'thai'].includes(service) : service;

const filterPageTypes = (service, pageType) =>
  config[service].pageTypes[pageType].path !== undefined;

const getPrivacyBanner = service =>
  cy.contains(appConfig[service].translations.consentBanner.privacy.title);
const getCookieBanner = service =>
  cy.contains(appConfig[service].translations.consentBanner.cookie.title);
const getPrivacyBannerContainer = service => getPrivacyBanner(service).parent();
const getCookieBannerContainer = service => getCookieBanner(service).parent();
const getPrivacyBannerAccept = service =>
  getPrivacyBannerContainer(service)
    .find('button')
    .contains(appConfig[service].translations.consentBanner.privacy.accept);
const getCookieBannerAccept = service =>
  getCookieBannerContainer(service)
    .find('button')
    .contains(appConfig[service].translations.consentBanner.cookie.accept);
const getCookieBannerReject = service =>
  getCookieBannerContainer(service)
    .find('a')
    .contains(appConfig[service].translations.consentBanner.cookie.reject);

const visitPage = (service, pageType) => {
  cy.visit(`${config[service].pageTypes[pageType].path}.amp`, {
    failOnStatusCode: !pageType.includes('error'),
  });
};

Object.keys(config)
  .filter(serviceFilter)
  .forEach(service => {
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
              getPrivacyBanner(service).should('be.visible');
              getCookieBanner(service).should('not.be.visible');

              getPrivacyBannerAccept(service).click();

              getCookieBanner(service).should('be.visible');
              getPrivacyBanner(service).should('not.be.visible');

              getCookieBannerAccept(service).click();

              getCookieBanner(service).should('not.be.visible');
              getPrivacyBanner(service).should('not.be.visible');
            });

            it('should show privacy banner if cookie banner isnt accepted, on reload', () => {
              getPrivacyBannerAccept(service).click();

              visitPage(service, pageType);

              getPrivacyBanner(service).should('be.visible');
              getCookieBanner(service).should('not.be.visible');
            });

            it('should not show privacy & cookie banners once both accepted, on reload', () => {
              getPrivacyBannerAccept(service).click();
              getCookieBannerAccept(service).click();

              visitPage(service, pageType);

              getPrivacyBanner(service).should('not.be.visible');
              getCookieBanner(service).should('not.be.visible');
            });

            it('should not show privacy & cookie banners once cookie banner declined, on reload', () => {
              getPrivacyBanner(service).should('be.visible');
              getCookieBanner(service).should('not.be.visible');

              getPrivacyBannerAccept(service).click();
              getCookieBannerReject(service).click();

              visitPage(service, pageType);

              getPrivacyBanner(service).should('not.be.visible');
              getCookieBanner(service).should('not.be.visible');
            });
          },
        );
      });
  });
