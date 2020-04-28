import visitPage from '../../../support/helpers/visitPage';
import { nonCookieVariantAssertions } from '../utilities/scriptSwitchingJourneyAssertions';
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

      cy.log('1st assertion - variant');
      // Assert script switch button, url and document lang against variant
      nonCookieVariantAssertions(serviceName, variant);

      // Clicks script switcher
      clickScriptSwitcher(otherVariant);

      // Assert against other variant after switching script
      cy.log('2nd assertion - otherVariant');
      nonCookieVariantAssertions(serviceName, otherVariant);

      // Navigate to home page by clicking link in the banner
      clickHomePageLink(serviceName);

      // Assert otherVariant has persisted
      cy.log('3rd assertion - otherVariant');
      nonCookieVariantAssertions(serviceName, otherVariant);

      // Finding a link to click on the home page
      clickPromoLinkOnHomePage(pageType);

      // Assert other variant has persisted after navigating to new page
      cy.log('4th assertion - otherVariant');
      nonCookieVariantAssertions(serviceName, otherVariant);

      // Clicks script switcher to original variant
      clickScriptSwitcher(variant);

      // Assert variant values have changed after clicking script switcher
      cy.log('5th assertion - variant');
      nonCookieVariantAssertions(serviceName, variant);
    });
  });
};
