import visitPage from '../../../support/helpers/visitPage';
import allVariantAssertions from '../utilities/scriptSwitchingJourneyAssertions';
import {
  clickScriptSwitcher,
  clickHomePageLink,
  clickPromoLinkOnHomePage,
} from '../utilities/scriptSwitchingJourneyActions';
import {
  getPrivacyBannerAccept,
  getCookieBannerAcceptCanonical,
} from '../utilities/cookiePrivacyBanner';

export default ({
  serviceId,
  serviceName,
  pageType,
  path,
  variant,
  otherVariant,
}) => {
  describe.skip(`Script Switching - ${serviceId} - ${pageType} - ${path}`, () => {
    // This test suite is being skipped due to flakey failing within our build pipeline. Being investigated here https://github.com/bbc/simorgh/issues/6399
    beforeEach(() => {
      cy.clearCookies();
      visitPage(path, pageType);
    });

    it(`should change to the correct script when switching script from ${variant} to ${otherVariant}`, () => {
      // Accept privacy banner
      getPrivacyBannerAccept(serviceId, variant).click();

      // Accept cookie banner
      getCookieBannerAcceptCanonical(serviceId, variant).click();

      cy.log(
        `Asserting script switch button, url and document lang for variant: ${variant}`,
      );
      allVariantAssertions(serviceName, variant);

      // Clicks script switcher
      clickScriptSwitcher(otherVariant);

      cy.log(
        `Asserting script switch button, url and document lang for other variant: ${otherVariant}`,
      );
      allVariantAssertions(serviceName, otherVariant);

      // Navigate to home page by clicking link in the banner
      clickHomePageLink(serviceName);

      cy.log(
        `Asserting script switch button, url and document lang has persisted for other variant: ${otherVariant}`,
      );
      allVariantAssertions(serviceName, otherVariant);

      // Finding a link to click on the home page
      clickPromoLinkOnHomePage(pageType);

      cy.log(
        `Asserting script switch button, url and document lang has persisted for other variant: ${otherVariant}`,
      );
      allVariantAssertions(serviceName, otherVariant);

      // Clicks script switcher to original variant
      clickScriptSwitcher(variant);

      cy.log(
        `Asserting script switch button, url and document lang have changed after clicking script switcher to ${variant}`,
      );
      allVariantAssertions(serviceName, variant);
    });
  });
};
