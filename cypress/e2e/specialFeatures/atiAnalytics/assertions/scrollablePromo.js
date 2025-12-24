import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';

const { ARTICLE_LINKS_BLOCK } = COMPONENTS;

export const assertScrollablePromoComponentView = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
  applicationType,
  siteId,
}) => {
  it('should send a view event for the Scrollable Promo component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-e2e="article-links-block"]').first().scrollIntoView({
      duration: 1000,
    });

    assertATIComponentViewEvent({
      component: ARTICLE_LINKS_BLOCK,
      pageIdentifier,
      contentType,
      useReverb,
      applicationType,
      siteId,
    });
  });
};

export const assertScrollablePromoComponentClick = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
  applicationType,
  siteId,
}) => {
  it('should send a click event for the Scrollable Promo component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-e2e="article-links-block"]').first().scrollIntoView({
      duration: 1000,
    });

    // Click on first item
    cy.get('[data-e2e="article-links-block"]').find('a').first().click();

    assertATIComponentClickEvent({
      component: ARTICLE_LINKS_BLOCK,
      pageIdentifier,
      contentType,
      useReverb,
      applicationType,
      siteId,
    });
  });
};
