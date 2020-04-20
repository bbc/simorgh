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

const STORY_PROMO_LIST_ITEM_SELECTOR = 'li[class^="StoryPromoLi"]';

const STYLED_MEDIA_INDICATOR_SELECTOR = 'div[class^="StyledMediaIndicator"]';

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
  cy.get('header[role="banner"]').within(() => {
    cy.contains(appConfig[config[service].name][variantValue].scriptLink.text);
  });
};

const clickHomePageLink = product => {
  cy.get('div[class^="Banner"]').within(() => {
    cy.get(`a[href="/${product}"]`).first().click();
  });
};

const clickFirstLink = () => {
  cy.get('a[class^="Link"]').first().click();
};

const findAndClickFirstMapLink = () => {
  cy.get(STYLED_MEDIA_INDICATOR_SELECTOR).then($styledMediaIndicators => {
    if ($styledMediaIndicators.length > 0) {
      cy.get(STYLED_MEDIA_INDICATOR_SELECTOR)
        .first()
        .parentsUntil(STORY_PROMO_LIST_ITEM_SELECTOR)
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

              // Checks URL is in current variant
              assertURLContains(product, variant);

              // Assert the script switch button is correct for variant
              assertScriptSwitchButton(service, variant);

              // Clicks script switcher
              clickScriptSwitcher(otherVariant);

              // Checks cookie is set to other variant
              assertScriptCookie(product, otherVariant);

              // Checks URL is in other variant
              assertURLContains(product, otherVariant);

              // Assert the script switch button is for other variant
              assertScriptSwitchButton(service, otherVariant);

              // Navigate to home page by clicking link in the banner
              clickHomePageLink(product);

              // Checks correct cookie has persisted
              assertScriptCookie(product, otherVariant);

              // Checks correct url variant has persisted
              assertURLContains(product, otherVariant);

              // Finding a link to click on the home page
              cy.get(STORY_PROMO_LIST_ITEM_SELECTOR).within(() => {
                // If it is a MAP test, find first MAP within a StoryPromoLi item and click it
                if (pageType === 'mediaAssetPage') {
                  findAndClickFirstMapLink();
                } else {
                  // If it isn't a MAP page being tested, click the first promo item
                  clickFirstLink();
                }
              });

              // Checks correct cookie has persisted
              assertScriptCookie(product, otherVariant);

              // Checks correct url variant has persisted
              assertURLContains(product, otherVariant);

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
