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

const assertScriptSwitchButton = (service, variantValue) => {
  const scriptToSwitchTo =
    appConfig[config[service].name][variantValue].scriptLink.variant;

  cy.get('header[role="banner"]').within(() => {
    cy.get(`a[data-variant="${scriptToSwitchTo}"]`).should('exist');
  });
};

const variantAssertions = (product, service, variantValue) => {
  // Assert the script switch button is correct for variant
  assertScriptSwitchButton(service, variantValue);
  // Assert URL contains correct variant
  assertURLContains(product, variantValue);
  // Checks correct variant is saved in cookie
  assertScriptCookie(product, variantValue);
  // // Assert lang for page is as expected for variant
  // assertLang(service, variantValue);
};

// const assertLang = (service, variantValue) => {
//   const expectedLang = appConfig[config[service].name][variantValue].lang;
//   cy.get('html').should('have.property', 'lang', expectedLang);
// };

const clickHomePageLink = product => {
  cy.get('header[role="banner"]').within(() => {
    cy.get(`a[href="/${product}"]`).click();
  });
};

const clickFirstLink = () => {
  cy.get('a[class^="Link"]').first().click();
};

const clickFirstMapLink = () => {
  cy.get('div[class^="StyledMediaIndicator"]').then($styledMediaIndicators => {
    if ($styledMediaIndicators.length > 0) {
      cy.get('div[class^="StyledMediaIndicator"]')
        .first()
        .parentsUntil('li[class^="StoryPromoLi"]')
        .within(() => {
          clickFirstLink();
        });
    } else {
      // If a MAP item isn't found on the home page, click the first promo item.
      clickFirstLink();
    }
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

              // Assert things have been correctly set for this variant
              // TODO: What is the difference between service & variant?
              // TODO: How do we make this not assert cookies in the first instance?
              variantAssertions(product, service, variant);

              // Clicks script switcher
              clickScriptSwitcher(otherVariant);

              // Assert against other variant after switching script
              variantAssertions(product, service, otherVariant);

              // Navigate to home page by clicking link in the banner
              clickHomePageLink(product);

              // Assert other variant has persisted
              variantAssertions(product, service, otherVariant);

              // TODO: Push this entire block into its own const
              // Finding a link to click on the home page
              cy.get('li[class^="StoryPromoLi"]').within(() => {
                // If it is a MAP test, find first MAP within a StoryPromoLi item and click it
                if (pageType === 'mediaAssetPage') {
                  clickFirstMapLink();
                } else {
                  // If it isn't a MAP page being tested, click the first promo item
                  clickFirstLink();
                }
              });

              // Assert other variant has persisted after navigating to new page
              variantAssertions(product, service, otherVariant);

              // Clicks script switcher to original variant
              clickScriptSwitcher(variant);

              // Assert variant values have changed after clicking script switcher
              variantAssertions(product, service, variant);
            });
          });
        });
      });
  });
