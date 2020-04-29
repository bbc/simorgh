import visitPage from '../../../support/helpers/visitPage';
import {
  allVariantAssertions,
  nonCookieVariantAssertions,
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

      cy.log(
        `Asserting script switch button, url and document lang against variant: ${variant}`,
      );
      nonCookieVariantAssertions(serviceName, variant);

      // Clicks script switcher
      clickScriptSwitcher(otherVariant);

      cy.log(
        `Asserting cookies, script switch button, url and document lang against other variant: ${otherVariant}`,
      );
      allVariantAssertions(serviceName, otherVariant);

      // Navigate to home page by clicking link in the banner
      clickHomePageLink(serviceName);

      cy.log(
        `Asserting cookies, script switch button, url and document lang has persisted for other variant: ${otherVariant}`,
      );
      allVariantAssertions(serviceName, otherVariant);

      // Finding a link to click on the home page
      clickPromoLinkOnHomePage(pageType);

      cy.log(
        `Asserting cookies, script switch button, url and document lang has persisted for other variant: ${otherVariant}`,
      );
      allVariantAssertions(serviceName, otherVariant);

      // Clicks script switcher to original variant
      clickScriptSwitcher(variant);

      cy.log(
        `Asserting cookies, script switch button, url and document lang have changed after clicking script switcher to ${variant}`,
      );
      allVariantAssertions(serviceName, variant);
    });
  });
};
