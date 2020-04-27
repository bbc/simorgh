import visitPage from '../../../support/helpers/visitPage';
import { nonCookieVariantAssertions } from '../utilities/scriptSwitchingJourneyAssertions';
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

      // Assert script switch button, url and document lang against variant
      nonCookieVariantAssertions(serviceName, variant);

      // Clicks script switcher
      clickScriptSwitcher(otherVariant);

      // Assert script switch button, url and document lang against variant after clicking script switcher
      nonCookieVariantAssertions(serviceName, variant);

      // Navigate to home page
      visitPage(`${serviceName}/${otherVariant}.amp`, pageType);

      // Navigates back to the original page, but for other variant
      visitPage(path.replace(`/${variant}`, `/${otherVariant}`), pageType);

      // Clicks script switcher to original variant
      clickScriptSwitcher(variant);

      // Assert script switch button, url and document lang against variant after clicking script switcher
      nonCookieVariantAssertions(serviceName, variant);
    });
  });
};
