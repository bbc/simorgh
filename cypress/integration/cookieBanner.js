import {
  retrieveCookieValue,
  expectCookieExpiryDateOneYear,
} from '../support/metaTestHelper';
import config from '../support/config';

const getPrivacyBanner = () =>
  cy.contains("We've updated our Privacy and Cookies Policy");

const getCookieBanner = () => cy.contains('Let us know you agree to cookies');

describe('Article Body Tests', () => {
  // eslint-disable-next-line no-undef
  beforeEach(() => {
    cy.visit(`/news/articles/${config.assets.newsThreeSubheadlines}`);
  });

  it('should have a privacy & cookie banner, which disappears once "accepted" ', () => {
    getPrivacyBanner().should('be.visible');
    getCookieBanner().should('not.be.visible');

    retrieveCookieValue('ckns_privacy', '1');
    retrieveCookieValue('ckns_policy', '000');

    cy.contains('OK').click();

    getCookieBanner().should('be.visible');
    getPrivacyBanner().should('not.be.visible');

    cy.contains('Yes, I agree').click();

    retrieveCookieValue('ckns_explicit', '1');
    retrieveCookieValue('ckns_policy', '111');

    getCookieBanner().should('not.be.visible');
    getPrivacyBanner().should('not.be.visible');

    expectCookieExpiryDateOneYear('ckns_explicit');
    expectCookieExpiryDateOneYear('ckns_policy');
  });

  it('should have a privacy banner that disappears once accepted but a cookie banner that is rejected', () => {
    getPrivacyBanner().should('be.visible');
    getCookieBanner().should('not.be.visible');

    retrieveCookieValue('ckns_privacy', '1');
    retrieveCookieValue('ckns_policy', '000');

    cy.contains('OK').click();
    cy.contains('No, take me to settings').click();

    expectCookieExpiryDateOneYear('ckns_explicit');
    expectCookieExpiryDateOneYear('ckns_policy');

    cy.visit(`/news/articles/${config.assets.newsThreeSubheadlines}`);

    retrieveCookieValue('ckns_explicit', '1');
    retrieveCookieValue('ckns_policy', '000');

    getCookieBanner().should('not.be.visible');
    getPrivacyBanner().should('not.be.visible');
  });

  it('should redirect the user once the privacy banner has been rejected', () => {
    getPrivacyBanner().should('be.visible');
    getCookieBanner().should('not.be.visible');

    retrieveCookieValue('ckns_privacy', '1');
    retrieveCookieValue('ckns_policy', '000');

    cy.contains("Find out what's changed").click();

    cy.visit(`/news/articles/${config.assets.newsThreeSubheadlines}`);

    getCookieBanner().should('be.visible');
    getPrivacyBanner().should('not.be.visible');

    retrieveCookieValue('ckns_policy', '000');
  });
});
