import visitPage from '../../../support/helpers/visitPage';
import {
  // assertScriptSwitchButton,
  assertURLContains,
  // assertLang,
  // allVariantAssertions,
} from '../utilities/scriptSwitchingJourneyAssertions';
import {
  clickScriptSwitcher,
  // clickHomePageLink,
  // clickPromoLinkOnHomePage,
} from '../utilities/scriptSwitchingJourneyActions';
import {
  getPrivacyBannerAccept,
  getCookieBannerAccept,
} from '../utilities/cookiePrivacyBanner';

export default ({
  serviceId,
  serviceName,
  pageType,
  path,
  variant,
  otherVariant,
}) => {
  describe(`Script Switching - ${serviceId} - ${pageType} - ${path}`, () => {
    beforeEach(() => {
      cy.clearCookies();
      visitPage(path, pageType);
    });

    it(`should change to the correct script when switching script between ${variant} and ${otherVariant}`, () => {
      // Accept privacy banner
      getPrivacyBannerAccept(serviceId, variant).click();

      // Accept cookie banner
      getCookieBannerAccept(serviceId, variant).click();

      // Checks URL is in current variant
      assertURLContains(serviceName, variant);

      // Clicks script switcher
      clickScriptSwitcher(otherVariant);

      // Checks URL is in other variant
      assertURLContains(serviceName, otherVariant);

      // Navigate to home page
      visitPage(`${serviceName}/${otherVariant}.amp`, pageType);

      // Navigates back to the original page, but for other variant
      visitPage(path.replace(`/${variant}`, `/${otherVariant}`), pageType);

      // Clicks script switcher to original variant
      clickScriptSwitcher(variant);

      // Checks URL is correct variant
      assertURLContains(serviceName, variant);
    });
  });
};
