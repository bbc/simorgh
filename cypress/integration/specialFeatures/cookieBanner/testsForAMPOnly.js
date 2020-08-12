import {
  getCookieBanner,
  getCookieBannerAccept,
  getCookieBannerReject,
  getPrivacyBanner,
  getPrivacyBannerAccept,
} from '../utilities/cookiePrivacyBanner';
import visitPage from '../../../support/helpers/visitPage';

export default ({ service, variant, pageType, path }) => {
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

    visitPage(path, pageType);

    getPrivacyBanner(service, variant).should('be.visible');
    getCookieBanner(service, variant).should('not.be.visible');
  });

  it('should not show privacy & cookie banners once both accepted, on reload', () => {
    getPrivacyBannerAccept(service, variant).click();
    getCookieBannerAccept(service, variant).click();

    visitPage(path, pageType);

    getPrivacyBanner(service, variant).should('not.be.visible');
    getCookieBanner(service, variant).should('not.be.visible');
  });

  it('should not show privacy & cookie banners once cookie banner declined, on reload', () => {
    getPrivacyBanner(service, variant).should('be.visible');
    getCookieBanner(service, variant).should('not.be.visible');

    getPrivacyBannerAccept(service, variant).click();
    getCookieBannerReject(service, variant).click();

    visitPage(path, pageType);

    getPrivacyBanner(service, variant).should('not.be.visible');
    getCookieBanner(service, variant).should('not.be.visible');
  });
};
