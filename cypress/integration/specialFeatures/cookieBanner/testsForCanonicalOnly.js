import {
  getCookieBanner,
  getCookieBannerAccept,
  getCookieBannerReject,
  getPrivacyBanner,
  getPrivacyBannerAccept,
} from '../utilities/cookiePrivacyBanner';
import visitPage from '../../../support/helpers/visitPage';

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

export default ({ service, variant, pageType, path }) => {
  it('should have a privacy & cookie banner, which disappears once "accepted" ', () => {
    cy.clearCookies();
    visitPage(path, pageType);

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
    visitPage(path, pageType);

    getPrivacyBanner(service, variant).should('be.visible');
    getCookieBanner(service, variant).should('not.be.visible');

    assertCookieValues({
      ckns_privacy: 'july2019',
      ckns_policy: '000',
    });

    getPrivacyBannerAccept(service, variant).click();
    getCookieBannerReject(service, variant).click();

    visitPage(path, pageType);

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
    visitPage(path, pageType);

    getPrivacyBanner(service, variant).should('not.be.visible');
    getCookieBanner(service, variant).should('be.visible');
  });

  it("should not override the user's default cookie policy", () => {
    cy.clearCookies();
    cy.setCookie('ckns_policy', 'made_up_value');
    visitPage(path, pageType);

    assertCookieValues({
      ckns_policy: 'made_up_value',
    });
  });
};
