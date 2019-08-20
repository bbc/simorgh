import {
  assertCookieValue,
  assertCookieExpiryDate,
} from '../../support/metaTestHelper';
import getAppConfig from '../../support/config/getAppConfig';
import config from '../../support/config/services';

// Limited to 1 UK & 1 WS service for now due to time test takes to run per page.
const serviceFilter = service => ['news', 'persian'].includes(service);

const filterPageTypes = (pageType, service) =>
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
const getPrivacyBannerContainer = (service, serviceVariantConfig) =>
  getPrivacyBanner(service, serviceVariantConfig).parent();
const getCookieBannerContainer = (service, serviceVariantConfig) =>
  getCookieBanner(service, serviceVariantConfig).parent();
const getPrivacyBannerAccept = (service, serviceVariantConfig) =>
  getPrivacyBannerContainer(service, serviceVariantConfig).contains(
    getAppConfig({ service, serviceVariantConfig }).translations.consentBanner
      .privacy.accept,
  );
const getCookieBannerAccept = (service, serviceVariantConfig) =>
  getCookieBannerContainer(service, serviceVariantConfig).contains(
    getAppConfig({ service, serviceVariantConfig }).translations.consentBanner
      .cookie.accept,
  );
const getCookieBannerReject = (service, serviceVariantConfig) =>
  getCookieBannerContainer(service, serviceVariantConfig).contains(
    getAppConfig({ service, serviceVariantConfig }).translations.consentBanner
      .cookie.reject,
  );

const ensureCookieExpiryDates = () => {
  const inOneYear = (new Date() / 1000 + 60 * 60 * 24 * 365).toFixed();
  assertCookieExpiryDate('ckns_explicit', inOneYear);
  assertCookieExpiryDate('ckns_policy', inOneYear);
  assertCookieExpiryDate('ckns_privacy', inOneYear);
};

const assertCookieValues = cookies => {
  Object.keys(cookies).forEach(cookie => {
    assertCookieValue(cookie, cookies[cookie]);
  });
};

const visitPage = (service, pageType) => {
  cy.visit(config[service].pageTypes[pageType].path, {
    failOnStatusCode: !pageType.includes('error'),
  });
};

Object.keys(config)
  .filter(serviceFilter)
  .forEach(service => {
    const serviceVariantConfig = serviceConfigOverride(service);
    Object.keys(config[service].pageTypes)
      .filter(pageType => filterPageTypes(pageType, service))
      .forEach(pageType => {
        describe(`Canonical Cookie Banner Test for ${service} ${pageType}`, () => {
          it('should have a privacy & cookie banner, which disappears once "accepted" ', () => {
            cy.clearCookies();
            visitPage(service, pageType);

            getPrivacyBanner(service, serviceVariantConfig).should(
              'be.visible',
            );
            getCookieBanner(service, serviceVariantConfig).should(
              'not.be.visible',
            );

            assertCookieValues({
              ckns_privacy: '1',
              ckns_policy: '000',
            });

            getPrivacyBannerAccept(service, serviceVariantConfig).click();

            getCookieBanner(service, serviceVariantConfig).should('be.visible');
            getPrivacyBanner(service, serviceVariantConfig).should(
              'not.be.visible',
            );

            getCookieBannerAccept(service, serviceVariantConfig).click();

            assertCookieValues({
              ckns_explicit: '1',
              ckns_privacy: '1',
              ckns_policy: '111',
            });

            getCookieBanner(service, serviceVariantConfig).should(
              'not.be.visible',
            );
            getPrivacyBanner(service, serviceVariantConfig).should(
              'not.be.visible',
            );

            ensureCookieExpiryDates();
          });

          it('should have a privacy banner that disappears once accepted but a cookie banner that is rejected', () => {
            cy.clearCookies();
            visitPage(service, pageType);

            getPrivacyBanner(service, serviceVariantConfig).should(
              'be.visible',
            );
            getCookieBanner(service, serviceVariantConfig).should(
              'not.be.visible',
            );

            assertCookieValues({
              ckns_privacy: '1',
              ckns_policy: '000',
            });

            getPrivacyBannerAccept(service, serviceVariantConfig).click();
            getCookieBannerReject(service, serviceVariantConfig).click();

            visitPage(service, pageType);

            assertCookieValues({
              ckns_explicit: '1',
              ckns_privacy: '1',
              ckns_policy: '000',
            });

            getCookieBanner(service, serviceVariantConfig).should(
              'not.be.visible',
            );
            getPrivacyBanner(service, serviceVariantConfig).should(
              'not.be.visible',
            );

            ensureCookieExpiryDates();
          });

          it("should show cookie banner (and NOT privacy banner) if user has visited the page before and didn't explicitly 'accept' cookies", () => {
            cy.clearCookies();
            cy.setCookie('ckns_privacy', '1');
            visitPage(service, pageType);

            getPrivacyBanner(service, serviceVariantConfig).should(
              'not.be.visible',
            );
            getCookieBanner(service, serviceVariantConfig).should('be.visible');
          });

          it("should not override the user's default cookie policy", () => {
            cy.clearCookies();
            cy.setCookie('ckns_policy', 'made_up_value');
            visitPage(service, pageType);

            assertCookieValues({
              ckns_policy: 'made_up_value',
            });
          });
        });
      });
  });
