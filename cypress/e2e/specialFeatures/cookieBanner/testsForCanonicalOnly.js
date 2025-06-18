/* eslint-disable cypress/no-unnecessary-waiting */
import {
  getCookieBannerCanonical,
  getCookieBannerAcceptCanonical,
  getCookieBannerRejectCanonical,
  getPrivacyBanner,
  getPrivacyBannerAccept,
  shouldRunBannerTest,
} from '../utilities/cookiePrivacyBanner';
import visitPage from '../../../support/helpers/visitPage';

/*
 * The ckns_explicit cookie can have a value of 1 or 2 depending on a user's location.
 * A value of 1 is set when the user is inside the UK.
 * A value of 2 is set when the user is in the EU.
 */
const USER_IS_IN_UK = '1';
const USER_IS_IN_EU = '2';
const ACCEPTED_CKNS_EXPLICIT_COOKIE_VALUES = [USER_IS_IN_UK, USER_IS_IN_EU];

const assertCookieHasValue = (cookieName, value) => {
  cy.getCookie(cookieName).should('have.property', 'value', value);
};

const assertCookieHasOneOfValues = (cookieName, values) => {
  cy.getCookie(cookieName).then(({ value }) => {
    expect(value).to.be.oneOf(values);
  });
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

const inOneYear = (new Date() / 1000 + 60 * 60 * 24 * 365).toFixed();

const ensureAllCookieExpiryDates = () => {
  assertCookieExpiryDate('ckns_explicit', inOneYear);
  assertCookieExpiryDate('ckns_policy', inOneYear);
  assertCookieExpiryDate('ckns_privacy', inOneYear);
};

const ensureExplicitPolicyCookieExpiryDates = () => {
  assertCookieExpiryDate('ckns_explicit', inOneYear);
  assertCookieExpiryDate('ckns_policy', inOneYear);
};

export default ({ service, variant, pageType, path }) => {
  describe('Canonical consent banner', () => {
    before(() => cy.getToggles(service));
    beforeEach(() => cy.fixture(`toggles/${service}.json`).as('toggles'));

    it('should have a privacy & cookie banner, which disappears once "accepted" ', function test() {
      shouldRunBannerTest({ isPrivacyTests: true, testContext: this });
      cy.clearCookies();
      visitPage(path, pageType);

      getPrivacyBanner(service, variant).should('be.visible');
      getCookieBannerCanonical(service, variant).should('not.exist');

      assertCookieHasValue('ckns_privacy', 'july2019');
      assertCookieHasValue('ckns_policy', '000');

      getPrivacyBannerAccept(service, variant).click();

      getCookieBannerCanonical(service, variant).should('be.visible');
      getPrivacyBanner(service, variant).should('not.exist');

      getCookieBannerAcceptCanonical(service, variant).click();

      cy.wait(1000);

      assertCookieHasOneOfValues(
        'ckns_explicit',
        ACCEPTED_CKNS_EXPLICIT_COOKIE_VALUES,
      );
      assertCookieHasValue('ckns_privacy', 'july2019');
      assertCookieHasValue('ckns_policy', '111');

      getCookieBannerCanonical(service, variant).should('not.exist');
      getPrivacyBanner(service, variant).should('not.exist');

      ensureAllCookieExpiryDates();
    });

    it('should have a privacy banner that disappears once accepted but a cookie banner that is rejected', function test() {
      shouldRunBannerTest({ isPrivacyTests: true, testContext: this });
      cy.clearCookies();
      visitPage(path, pageType);

      getPrivacyBanner(service, variant).should('be.visible');
      getCookieBannerCanonical(service, variant).should('not.exist');

      assertCookieHasValue('ckns_privacy', 'july2019');
      assertCookieHasValue('ckns_policy', '000');

      getPrivacyBannerAccept(service, variant).click();
      getCookieBannerRejectCanonical(service, variant).click();

      visitPage(path, pageType);

      assertCookieHasOneOfValues(
        'ckns_explicit',
        ACCEPTED_CKNS_EXPLICIT_COOKIE_VALUES,
      );
      assertCookieHasValue('ckns_privacy', 'july2019');
      assertCookieHasValue('ckns_policy', '000');
      getCookieBannerCanonical(service, variant).should('not.exist');
      getPrivacyBanner(service, variant).should('not.exist');
      ensureAllCookieExpiryDates();
    });

    it("should show cookie banner (and NOT privacy banner) if user has visited the page before and didn't explicitly 'accept' cookies", function test() {
      shouldRunBannerTest({ isPrivacyTests: true, testContext: this });
      cy.clearCookies();
      cy.setCookie('ckns_privacy', 'july2019');
      visitPage(path, pageType);

      getPrivacyBanner(service, variant).should('not.exist');
      getCookieBannerCanonical(service, variant).should('be.visible');
    });

    it("should not override the user's default cookie policy", function test() {
      shouldRunBannerTest({ isPrivacyTests: true, testContext: this });
      cy.clearCookies();
      cy.setCookie('ckns_policy', 'made_up_value');
      visitPage(path, pageType);

      assertCookieHasValue('ckns_policy', 'made_up_value');
    });

    it('should have a cookie banner, which disappears once "accepted" ', function test() {
      shouldRunBannerTest({ isPrivacyTests: false, testContext: this });
      cy.clearCookies();
      visitPage(path, pageType);

      getPrivacyBanner(service, variant).should('not.exist');

      getCookieBannerCanonical(service, variant).should('be.visible');

      getCookieBannerAcceptCanonical(service, variant).click();

      cy.wait(1000);

      assertCookieHasOneOfValues(
        'ckns_explicit',
        ACCEPTED_CKNS_EXPLICIT_COOKIE_VALUES,
      );
      assertCookieHasValue('ckns_policy', '111');

      getCookieBannerCanonical(service, variant).should('not.exist');
      getPrivacyBanner(service, variant).should('not.exist');

      ensureExplicitPolicyCookieExpiryDates();
    });

    it("should show cookie banner (and NOT privacy banner) if user has visited the page before and didn't explicitly 'accept' cookies", function test() {
      shouldRunBannerTest({ isPrivacyTests: false, testContext: this });
      cy.clearCookies();
      visitPage(path, pageType);

      getPrivacyBanner(service, variant).should('not.exist');
      getCookieBannerCanonical(service, variant).should('be.visible');
    });

    it("should not override the user's default cookie policy", function test() {
      shouldRunBannerTest({ isPrivacyTests: false, testContext: this });
      cy.clearCookies();
      cy.setCookie('ckns_policy', 'made_up_value');
      visitPage(path, pageType);

      assertCookieHasValue('ckns_policy', 'made_up_value');
    });
  });
};
