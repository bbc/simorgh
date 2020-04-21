import config from '../../../support/config/services';
import getPaths from '../../../support/helpers/getPaths';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import describeForEuOnly from '../../../support/helpers/describeForEuOnly';
import serviceHasPageType from '../../../support/helpers/serviceHasPageType';

// Limited to 1 UK & 1 WS service when a smoke test due to time test takes to run per page.
// This is why this file doesn't check smoke test values.
const serviceFilter = service =>
  Cypress.env('SMOKE') ? ['news', 'thai'].includes(service) : service;

const getPrivacyBanner = (service, variant) =>
  cy.contains(
    appConfig[config[service].name][variant].translations.consentBanner.privacy
      .title,
  );
const getCookieBanner = (service, variant) =>
  cy.contains(
    appConfig[config[service].name][variant].translations.consentBanner.cookie
      .title,
  );
const getPrivacyBannerContainer = (service, variant) =>
  getPrivacyBanner(service, variant).parent();
const getCookieBannerContainer = (service, variant) =>
  getCookieBanner(service, variant).parent();
const getPrivacyBannerAccept = (service, variant) =>
  getPrivacyBannerContainer(service, variant)
    .find('button')
    .contains(
      appConfig[config[service].name][variant].translations.consentBanner
        .privacy.accept,
    );
const getCookieBannerAccept = (service, variant) =>
  getCookieBannerContainer(service, variant)
    .find('button')
    .contains(
      appConfig[config[service].name][variant].translations.consentBanner.cookie
        .accept,
    );
const getCookieBannerReject = (service, variant) =>
  getCookieBannerContainer(service, variant)
    .find('a')
    .contains(
      appConfig[config[service].name][variant].translations.consentBanner.cookie
        .reject,
    );

const visitPage = (pageType, path) => {
  cy.visit(`${path}.amp`, {
    failOnStatusCode: !pageType.includes('error'),
  });
};

Object.keys(config)
  .filter(serviceFilter)
  .forEach(service => {
    Object.keys(config[service].pageTypes)
      .filter(pageType => serviceHasPageType(service, pageType))
      .forEach(pageType => {
        const paths = getPaths(service, pageType);
        paths.forEach(path => {
          describeForEuOnly(
            `Amp Cookie Banner Test for ${service} ${pageType} ${path}`,
            () => {
              beforeEach(() => {
                visitPage(pageType, path);
              });

              const { variant } = config[service];

              it('should have a privacy & cookie banner, which disappears once "accepted" ', () => {
                getPrivacyBanner(service, variant).should('be.visible');
                getCookieBanner(service, variant).should('not.be.visible');

                getPrivacyBannerAccept(service, variant).click();

                getCookieBanner(service, variant).should('be.visible');
                getPrivacyBanner(service, variant).should('not.be.visible');

                getCookieBannerAccept(service, variant).click();

                getCookieBanner(service, variant).should('not.be.visible');
                getPrivacyBanner(service, variant).should('not.be.visible');
              });

              it('should show privacy banner if cookie banner isnt accepted, on reload', () => {
                getPrivacyBannerAccept(service, variant).click();

                visitPage(pageType, path);

                getPrivacyBanner(service, variant).should('be.visible');
                getCookieBanner(service, variant).should('not.be.visible');
              });

              it('should not show privacy & cookie banners once both accepted, on reload', () => {
                getPrivacyBannerAccept(service, variant).click();
                getCookieBannerAccept(service, variant).click();

                visitPage(pageType, path);

                getPrivacyBanner(service, variant).should('not.be.visible');
                getCookieBanner(service, variant).should('not.be.visible');
              });

              it('should not show privacy & cookie banners once cookie banner declined, on reload', () => {
                getPrivacyBanner(service, variant).should('be.visible');
                getCookieBanner(service, variant).should('not.be.visible');

                getPrivacyBannerAccept(service, variant).click();
                getCookieBannerReject(service, variant).click();

                visitPage(pageType, path);

                getPrivacyBanner(service, variant).should('not.be.visible');
                getCookieBanner(service, variant).should('not.be.visible');
              });
            },
          );
        });
      });
  });
