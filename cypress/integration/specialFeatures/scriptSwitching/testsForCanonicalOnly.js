import visitPage from '../../../support/helpers/visitPage';
import {
  assertScriptSwitchButton,
  assertURLContains,
  assertLang,
  allVariantAssertions,
} from '../utilities/scriptSwitchingJourneyAssertions';
import {
  clickScriptSwitcher,
  clickHomePageLink,
  clickPromoLinkOnHomePage,
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

      // Assert the script switch button is correct for variant
      assertScriptSwitchButton(serviceName, variant);

      // Assert URL contains correct variant
      assertURLContains(serviceName, variant);

      // Assert lang for document is correct for variant
      assertLang(serviceName, variant);

      // Clicks script switcher
      clickScriptSwitcher(otherVariant);

      // Assert against other variant after switching script
      allVariantAssertions(serviceName, otherVariant);

      // Navigate to home page by clicking link in the banner
      clickHomePageLink(serviceName);

      // Assert other variant has persisted
      allVariantAssertions(serviceName, otherVariant);

      // Finding a link to click on the home page
      clickPromoLinkOnHomePage(pageType);

      // Assert other variant has persisted after navigating to new page
      allVariantAssertions(serviceName, otherVariant);

      // Clicks script switcher to original variant
      clickScriptSwitcher(variant);

      // Assert variant values have changed after clicking script switcher
      allVariantAssertions(serviceName, variant);
    });
  });
};
