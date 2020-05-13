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

export const clickScriptSwitcher = variant => {
  cy.get(`a[data-variant="${variant}"]`).click();
};

export const clickHomePageLink = product => {
  cy.get('header[role="banner"]').within(() => {
    cy.get(`a[href="/${product}"]`).click();
  });
};

export const clickPromoLinkOnHomePage = pageType => {
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
