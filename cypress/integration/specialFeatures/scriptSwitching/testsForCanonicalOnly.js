import config from '../../../support/config/services';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import visitPage from '../../../support/helpers/visitPage';
import getPaths from '../../../support/helpers/getPaths';
import serviceHasPageType from '../../../support/helpers/serviceHasPageType';
import clickScriptSwitcher from '../utilities/clickScriptSwitcher';
import {
  getPrivacyBannerAccept,
  getCookieBannerAccept,
} from '../utilities/cookiePrivacyBanner';

const assertScriptCookie = (product, cookieValue) => {
  const cookieSuffix = ['ukchina', 'zhongwen'].includes(product)
    ? 'chinese'
    : product;

  cy.getCookie(`ckps_${cookieSuffix}`).should(
    'have.property',
    'value',
    cookieValue,
  );
};

const assertURLContains = (product, variantValue) => {
  cy.url().should(url => {
    url.includes(`${product}/${variantValue}/`);
  });
};

const hasVariant = service => {
  return config[service] && config[service].variant !== 'default';
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

              // Checks URL is in current variant
              assertURLContains(product, variant);

              // Clicks script switcher
              clickScriptSwitcher(otherVariant);

              // Checks cookie is set to other variant
              assertScriptCookie(product, otherVariant);

              // Checks URL is in other variant
              assertURLContains(product, otherVariant);

              // Navigate to home page
              visitPage(`${product}/${otherVariant}`, pageType);

              // Checks correct cookie has persisted
              assertScriptCookie(product, otherVariant);

              // Navigates back to the original MAP page, but for other variant
              visitPage(
                path.replace(`/${variant}`, `/${otherVariant}`),
                pageType,
              );

              // Clicks script switcher to original variant
              clickScriptSwitcher(variant);

              // Checks cookie is correct after script switch
              assertScriptCookie(product, variant);

              // Checks URL is correct variant
              assertURLContains(product, variant);
            });
          });
        });
      });
  });
