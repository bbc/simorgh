import {
  getCookieBannerAmp,
  getCookieBannerAcceptAmp,
  getPrivacyBanner,
  getPrivacyBannerAccept,
  getCookieBannerManageSettings,
  getCookieBannerAcceptInManageSettings,
} from '../utilities/cookiePrivacyBanner';
import visitPage from '../../../support/helpers/visitPage';

export default ({ service, variant, pageType, path }) => {
  it('should have a privacy & cookie banner, which disappears once "accepted" ', () => {
    getPrivacyBanner(service, variant).should('be.visible');
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

  it('should go to manage settings banner once manage settings button is clicked, and save cookies when accepted', () => {
    getPrivacyBanner(service, variant).should('be.visible');
    getCookieBannerAmp(service, variant).should('not.be.visible');

    getPrivacyBannerAccept(service, variant).click();
    getCookieBannerManageSettings(service, variant).click();
    getCookieBannerAcceptInManageSettings(service, variant).click();
  });
};
