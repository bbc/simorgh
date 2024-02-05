import {
  getCookieBannerAmp,
  getCookieBannerAcceptAmp,
  getPrivacyBanner,
  getPrivacyBannerAccept,
  getCookieBannerManageSettings,
  getCookieBannerManageSettingsButton,
  getCookieBannerAcceptInManageSettings,
  getCookieBannerRejectInManageSettings,
} from '../utilities/cookiePrivacyBanner';
import visitPage from '../../../support/helpers/visitPage';

export default ({ service, variant, pageType, path }) => {
  describe(
    'AMP consent banner',
    {
      retries: 3,
      testIsolation: true,
    },
    () => {
      it('should have a privacy & cookie banner, which disappears once "accepted" ', () => {
        getPrivacyBanner(service, variant).should('be.visible');

        getCookieBannerAmp(service, variant).should('not.be.visible');

        getPrivacyBannerAccept(service, variant).click();

        getCookieBannerAmp(service, variant).should('be.visible');
        getPrivacyBanner(service, variant).should('not.be.visible');

        getCookieBannerAcceptAmp(service, variant).click();

        getCookieBannerAmp(service, variant).should('not.be.visible');
        getPrivacyBanner(service, variant).should('not.be.visible');
      });

      it('should show privacy banner if cookie banner isnt accepted, on reload', () => {
        getPrivacyBannerAccept(service, variant).click();

        visitPage(path, pageType);

        getPrivacyBanner(service, variant).should('be.visible');
        getCookieBannerAmp(service, variant).should('not.be.visible');
      });

      it('should not show privacy & cookie banners once both accepted, on reload', () => {
        getPrivacyBannerAccept(service, variant).click();
        getCookieBannerAcceptAmp(service, variant).click();

        visitPage(path, pageType);

        getPrivacyBanner(service, variant).should('not.be.visible');
        getCookieBannerAmp(service, variant).should('not.be.visible');
      });

      it('should go to manage settings banner once manage settings button is clicked, and when accept button is clicked the banners no longer show', () => {
        getPrivacyBanner(service, variant).should('be.visible');
        getCookieBannerAmp(service, variant).should('not.be.visible');

        getPrivacyBannerAccept(service, variant).click();
        getCookieBannerManageSettingsButton(service, variant).click();
        getCookieBannerAcceptInManageSettings(service, variant).click();
        getCookieBannerManageSettings(service, variant).should(
          'not.be.visible',
        );

        cy.reload();

        getPrivacyBanner(service, variant).should('not.be.visible');
        getCookieBannerAmp(service, variant).should('not.be.visible');
      });

      it('should go to manage settings banner once manage settings button is clicked, and when reject button is clicked the banners no longer show', () => {
        getPrivacyBanner(service, variant).should('be.visible');
        getCookieBannerAmp(service, variant).should('not.be.visible');

        getPrivacyBannerAccept(service, variant).click();
        getCookieBannerManageSettingsButton(service, variant).click();
        getCookieBannerRejectInManageSettings(service, variant).click();
        getCookieBannerManageSettings(service, variant).should(
          'not.be.visible',
        );

        cy.reload();

        getPrivacyBanner(service, variant).should('not.be.visible');
        getCookieBannerAmp(service, variant).should('not.be.visible');
      });

      it('should show privacy banner once you reload the page on the Manage settings expanded view without clicking Accept or Reject buttons', () => {
        getPrivacyBanner(service, variant).should('be.visible');
        getCookieBannerAmp(service, variant).should('not.be.visible');

        getPrivacyBannerAccept(service, variant).click();
        getCookieBannerManageSettingsButton(service, variant).click();
        getCookieBannerManageSettings().should('be.visible');

        cy.reload();

        getPrivacyBanner(service, variant).should('be.visible');
      });

      it('should show the manage cookie settings banner when the cookie settings button in the footer is clicked', () => {
        getPrivacyBannerAccept(service, variant).click();
        getCookieBannerAcceptAmp(service, variant).click();

        cy.get('[data-testid="amp-cookie-settings-button"]').click();
        cy.get('[data-testid="amp-cookie-banner-manage-settings"]').should(
          'be.visible',
        );
      });
    },
  );
};
