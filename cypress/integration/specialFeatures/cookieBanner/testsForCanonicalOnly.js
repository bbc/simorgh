import appConfig from '../../../../src/server/utilities/serviceConfigs';
import config from '../../../support/config/services';
import serviceHasPageType from '../../../support/helpers/serviceHasPageType';
import getPaths from '../../../support/helpers/getPaths';

// Limited to 1 UK & 1 WS service when a smoke test due to time test takes to run per page.
// This is why this file doesn't check smoke test values.
const serviceFilter = service =>
  Cypress.env('SMOKE') ? ['news', 'thai'].includes(service) : service;

const assertCookieValue = (cookieName, value) => {
  cy.getCookie(cookieName).should('have.property', 'value', value);
};

const assertCookieExpiryDate = (cookieName, timestamp) => {
  const testBuffer = 60;
  cy.getCookie(cookieName).then(c => {
    expect(c.expiry).to.be.within(
      timestamp - testBuffer,
      parseInt(timestamp + testBuffer, 10),
    );
  });
};

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

const visitPage = (pageType, path) => {
  cy.visit(path, {
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
          const { variant } = config[service];

          describe(`Canonical Cookie Banner Test for ${service} ${pageType} ${path}`, () => {
            it('should have a privacy & cookie banner, which disappears once "accepted" ', () => {
              cy.clearCookies();
              visitPage(pageType, path);

              getPrivacyBanner(service, variant).should('be.visible');
              getCookieBanner(service, variant).should('not.be.visible');

              assertCookieValues({
                ckns_privacy: 'july2019',
                ckns_policy: '000',
              });

              getPrivacyBannerAccept(service, variant).click();

              getCookieBanner(service, variant).should('be.visible');
              getPrivacyBanner(service, variant).should('not.be.visible');

              getCookieBannerAccept(service, variant).click();

              assertCookieValues({
                ckns_explicit: '1',
                ckns_privacy: 'july2019',
                ckns_policy: '111',
              });

              getCookieBanner(service, variant).should('not.be.visible');
              getPrivacyBanner(service, variant).should('not.be.visible');

              ensureCookieExpiryDates();
            });

            it('should have a privacy banner that disappears once accepted but a cookie banner that is rejected', () => {
              cy.clearCookies();
              visitPage(pageType, path);

              getPrivacyBanner(service, variant).should('be.visible');
              getCookieBanner(service, variant).should('not.be.visible');

              assertCookieValues({
                ckns_privacy: 'july2019',
                ckns_policy: '000',
              });

              getPrivacyBannerAccept(service, variant).click();
              getCookieBannerReject(service, variant).click();

              visitPage(pageType, path);

              assertCookieValues({
                ckns_explicit: '1',
                ckns_privacy: 'july2019',
                ckns_policy: '000',
              });

              getCookieBanner(service, variant).should('not.be.visible');
              getPrivacyBanner(service, variant).should('not.be.visible');

              ensureCookieExpiryDates();
            });

            it("should show cookie banner (and NOT privacy banner) if user has visited the page before and didn't explicitly 'accept' cookies", () => {
              cy.clearCookies();
              cy.setCookie('ckns_privacy', 'july2019');
              visitPage(pageType, path);

              getPrivacyBanner(service, variant).should('not.be.visible');
              getCookieBanner(service, variant).should('be.visible');
            });

            it("should not override the user's default cookie policy", () => {
              cy.clearCookies();
              cy.setCookie('ckns_policy', 'made_up_value');
              visitPage(pageType, path);

              assertCookieValues({
                ckns_policy: 'made_up_value',
              });
            });
          });
        });
      });
  });
