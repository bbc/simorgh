import { MEDIA_ASSET_PAGE } from '../../../../../src/app/routes/utils/pageTypes';

const clickFirstLink = () => {
  cy.get('a').first().click();
};

const clickFirstMapLink = () => {
  cy.get('body').then($bodyElement => {
    if ($bodyElement.find('[data-e2e="media-icon"]').length > 0) {
      cy.get('[data-e2e="media-icon"]')
        .first()
        .parentsUntil('[data-testid="topic-promos"]')
        .first()
        .within(() => {
          clickFirstLink();
        });
    } else {
      // If a MAP item isn't found on the home page, click the first promo item.
      clickFirstLink();
    }
  });
};

export const clickScriptSwitcher = variant => {
  cy.get(`a[data-variant="${variant}"]`).click();
};
export const clickHomePageLink = (product, variant) => {
  cy.get('header[role="banner"]').within(() => {
    cy.get(
      `a[aria-labelledby="BrandLink-topPage"][href="/${product}/${variant}"]`,
    ).click();
  });
};

export const clickPromoLinkOnHomePage = pageType => {
  // If it is a MAP test, find first MAP on the homepage and click it
  if (pageType === MEDIA_ASSET_PAGE) {
    clickFirstMapLink();
  } else {
    cy.get('[data-testid="topic-promos"]')
      .first()
      .within(() => {
        // If it isn't a MAP page being tested, click the first promo item
        clickFirstLink();
      });
  }
};
