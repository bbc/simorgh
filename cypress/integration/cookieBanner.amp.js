import services from '../support/config/services';
import describeForEuOnly from '../support/describeForEuOnly';

Cypress.config('chromeWebSecurity', false);

const getPrivacyBanner = () =>
  cy.contains("We've updated our Privacy and Cookies Policy");

const getCookieBanner = () => cy.contains('Let us know you agree to cookies');

describeForEuOnly('Amp Cookie Banner Test', () => {
  beforeEach(() => {
    cy.visit(`/news/articles/${services.news.pageTypes.articles.asset}.amp`);
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

    cy.visit(`/news/articles/${services.news.pageTypes.articles.asset}.amp`);

    getPrivacyBanner().should('be.visible');
    getCookieBanner().should('not.be.visible');
  });

  it('should not show privacy & cookie banners once both accepted, on reload', () => {
    cy.contains('OK').click();
    cy.contains('Yes, I agree').click();

    cy.visit(`/news/articles/${services.news.pageTypes.articles.asset}.amp`);

    getPrivacyBanner().should('not.be.visible');
    getCookieBanner().should('not.be.visible');
  });

  it('should not show privacy & cookie banners once cookie banner declined, on reload', () => {
    getPrivacyBanner().should('be.visible');
    getCookieBanner().should('not.be.visible');

    cy.contains('OK').click();
    cy.contains('No, take me to settings').click();

    cy.visit(`/news/articles/${services.news.pageTypes.articles.asset}.amp`);

    getPrivacyBanner().should('not.be.visible');
    getCookieBanner().should('not.be.visible');
  });
});
