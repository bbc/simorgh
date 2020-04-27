import config from '../../../support/config/services';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import visitPage from '../../../support/helpers/visitPage';
import getPaths from '../../../support/helpers/getPaths';
import serviceHasPageType from '../../../support/helpers/serviceHasPageType';
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

const hasVariant = serviceName => {
  return config[serviceName] && config[serviceName].variant !== 'default';
};

Object.keys(config)
  .filter(hasVariant)
  .forEach(service => {
    Object.keys(config[service].pageTypes)
      .filter(
        pageType =>
          serviceHasPageType(service, pageType) && !pageType.includes('error'),
      )
      .forEach(pageType => {
        const paths = getPaths(service, pageType);
        paths.forEach(path => {
          const { variant } = config[service];
          const product = config[service].name;
          const otherVariant = appConfig[product][variant].scriptLink.variant;

          describe(`Script Switching - ${service} - ${pageType} - ${path}`, () => {
            beforeEach(() => {
              cy.clearCookies();
              visitPage(path, pageType);
            });

            it(`should change to the correct script when switching script between ${variant} and ${otherVariant}`, () => {
              // Accept privacy banner
              getPrivacyBannerAccept(service, variant).click();

              // Accept cookie banner
              getCookieBannerAccept(service, variant).click();

              // Assert the script switch button is correct for variant
              assertScriptSwitchButton(product, variant);

              // Assert URL contains correct variant
              assertURLContains(product, variant);

              // Assert lang for document is correct for variant
              assertLang(product, variant);

              // Clicks script switcher
              clickScriptSwitcher(otherVariant);

              // Assert against other variant after switching script
              allVariantAssertions(product, otherVariant);

              // Navigate to home page by clicking link in the banner
              clickHomePageLink(product);

              // Assert other variant has persisted
              allVariantAssertions(product, otherVariant);

              // Finding a link to click on the home page
              clickPromoLinkOnHomePage(pageType);

              // Assert other variant has persisted after navigating to new page
              allVariantAssertions(product, otherVariant);

              // Clicks script switcher to original variant
              clickScriptSwitcher(variant);

              // Assert variant values have changed after clicking script switcher
              allVariantAssertions(product, variant);
            });
          });
        });
      });
  });
