import describeForEuOnly from '../support/describeForEuOnly';
import describeForLocalAndTest from '../support/limitEnvRuns';
import services from '../../src/app/lib/config/services';
import newsServices from '../support/config/services';
import {
  assertCookieValue,
  assertCookieExpiryDate,
} from '../support/metaTestHelper';

Object.keys(services).forEach(index => {
  const serviceConfig = services[index];
  const service = index;

  // This should be unhacked when this file is consolidated with other cookie testing files.
  const skippedServices = ['news', 'cymrufyw', 'naidheachdan']; // Not WS
  skippedServices.push('serbian', 'telugu', 'ukchina', 'zhongwen'); // Not on test.bbc.com yet
  skippedServices.push('default'); // Not a service
  if (skippedServices.includes(service)) {
    return;
  }

  describeForLocalAndTest('World Service Cookie banner Translations', () => {
    describe('Canonical', () => {
      it(`should load the relevant translations for ${service}`, () => {
        cy.worldServiceCookieBannerTranslations(
          `${serviceConfig.translations.consentBanner.privacy.title}`,
          `${serviceConfig.translations.consentBanner.cookie.title}`,
          `/${service}`,
          `${serviceConfig.translations.consentBanner.privacy.accept}`,
          `${serviceConfig.translations.consentBanner.cookie.accept}`,
        );
      });
    });

    describeForEuOnly('AMP', () => {
      it(`should load the relevant translations for ${service}`, () => {
        cy.worldServiceCookieBannerTranslations(
          `${serviceConfig.translations.consentBanner.privacy.title}`,
          `${serviceConfig.translations.consentBanner.cookie.title}`,
          `/${service}`,
          `${serviceConfig.translations.consentBanner.privacy.accept}`,
          `${serviceConfig.translations.consentBanner.cookie.accept}`,
        );
      });
    });
  });
});

const getPrivacyBanner = () =>
  cy.contains("We've updated our Privacy and Cookies Policy");

const getCookieBanner = () => cy.contains('Let us know you agree to cookies');

describeForEuOnly('Amp Cookie Banner Test', () => {
  beforeEach(() => {
    cy.visit(
      `/news/articles/${newsServices.news.pageTypes.articles.asset}.amp`,
    );
  });

  it('should have a privacy & cookie banner, which disappears once "accepted" ', () => {
    getPrivacyBanner().should('be.visible');
    getCookieBanner().should('not.be.visible');

    cy.contains('OK').click();

    getCookieBanner().should('be.visible');
    getPrivacyBanner().should('not.be.visible');

    cy.contains('Yes, I agree').click();

    getCookieBanner().should('not.be.visible');
    getPrivacyBanner().should('not.be.visible');
  });

  it('should show privacy banner if cookie banner isnt accepted, on reload', () => {
    cy.contains('OK').click();

    cy.visit(
      `/news/articles/${newsServices.news.pageTypes.articles.asset}.amp`,
    );

    getPrivacyBanner().should('be.visible');
    getCookieBanner().should('not.be.visible');
  });

  it('should not show privacy & cookie banners once both accepted, on reload', () => {
    cy.contains('OK').click();
    cy.contains('Yes, I agree').click();

    cy.visit(
      `/news/articles/${newsServices.news.pageTypes.articles.asset}.amp`,
    );

    getPrivacyBanner().should('not.be.visible');
    getCookieBanner().should('not.be.visible');
  });

  it('should not show privacy & cookie banners once cookie banner declined, on reload', () => {
    getPrivacyBanner().should('be.visible');
    getCookieBanner().should('not.be.visible');

    cy.contains('OK').click();
    cy.contains('No, take me to settings').click();

    cy.visit(
      `/news/articles/${newsServices.news.pageTypes.articles.asset}.amp`,
    );

    getPrivacyBanner().should('not.be.visible');
    getCookieBanner().should('not.be.visible');
  });
});

const getPrivacyBannerContainer = () => getPrivacyBanner().parent();
const getCookieBannerContainer = () => getCookieBanner().parent();

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

const visitArticle = () => {
  cy.visit(`/news/articles/${newsServices.news.pageTypes.articles.asset}`);
};

describe('Canonical Cookie Banner Tests', () => {
  it('should have a privacy & cookie banner, which disappears once "accepted" ', () => {
    cy.clearCookies();
    visitArticle();

    getPrivacyBanner().should('be.visible');
    getCookieBanner().should('not.be.visible');

    assertCookieValues({
      ckns_privacy: '1',
      ckns_policy: '000',
    });

    getPrivacyBannerContainer()
      .contains('OK')
      .click();

    getCookieBanner().should('be.visible');
    getPrivacyBanner().should('not.be.visible');

    getCookieBannerContainer()
      .contains('Yes, I agree')
      .click();

    assertCookieValues({
      ckns_explicit: '1',
      ckns_privacy: '1',
      ckns_policy: '111',
    });

    getCookieBanner().should('not.be.visible');
    getPrivacyBanner().should('not.be.visible');

    ensureCookieExpiryDates();
  });

  it('should have a privacy banner that disappears once accepted but a cookie banner that is rejected', () => {
    cy.clearCookies();
    visitArticle();

    getPrivacyBanner().should('be.visible');
    getCookieBanner().should('not.be.visible');

    assertCookieValues({
      ckns_privacy: '1',
      ckns_policy: '000',
    });

    getPrivacyBannerContainer()
      .contains('OK')
      .click();
    getCookieBannerContainer()
      .contains('No, take me to settings')
      .click();

    cy.visit(`/news/articles/${newsServices.news.pageTypes.articles.asset}`);

    assertCookieValues({
      ckns_explicit: '1',
      ckns_privacy: '1',
      ckns_policy: '000',
    });

    getCookieBanner().should('not.be.visible');
    getPrivacyBanner().should('not.be.visible');

    ensureCookieExpiryDates();
  });

  it("should show cookie banner (and NOT privacy banner) if user has visited the page before and didn't explicitly 'accept' cookies", () => {
    cy.clearCookies();
    cy.setCookie('ckns_privacy', '1');
    visitArticle();

    getPrivacyBanner().should('not.be.visible');
    getCookieBanner().should('be.visible');
  });

  it("should not override the user's default cookie policy", () => {
    cy.clearCookies();
    cy.setCookie('ckns_policy', 'made_up_value');
    visitArticle();

    assertCookieValues({
      ckns_policy: 'made_up_value',
    });
  });
});
