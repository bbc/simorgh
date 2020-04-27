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

const assertScriptSwitchButton = (product, variantValue) => {
  const scriptToSwitchTo = appConfig[product][variantValue].scriptLink.variant;

  cy.get('header[role="banner"]').within(() => {
    cy.get(`a[data-variant="${scriptToSwitchTo}"]`).should('exist');
  });
};

const assertURLContains = (product, variantValue) => {
  cy.url().should(url => {
    url.includes(`${product}/${variantValue}/`);
  });
};

const assertLang = (serviceName, variantValue) => {
  const expectedLang = appConfig[serviceName][variantValue].lang;
  cy.get('html')
    .should('have.attr', 'lang')
    .then($lang => {
      expect($lang.toLowerCase()).to.equal(expectedLang);
    });
};

const allVariantAssertions = (serviceName, variantValue) => {
  // Checks correct variant is saved in cookie
  assertScriptCookie(serviceName, variantValue);
  // Assert the script switch button is correct for variant
  assertScriptSwitchButton(serviceName, variantValue);
  // Assert URL contains correct variant
  assertURLContains(serviceName, variantValue);
  // Issue with 'have.property' assertion
  assertLang(serviceName, variantValue);
};

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

const clickPromoLinkOnHomePage = pageType => {
  cy.get('li[class^="StoryPromoLi"]').within(() => {
    // If it is a MAP test, find first MAP within a StoryPromoLi item and click it
    if (pageType === 'mediaAssetPage') {
      clickFirstMapLink();
    } else {
      // If it isn't a MAP page being tested, click the first promo item
      clickFirstLink();
    }
  });
};

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
