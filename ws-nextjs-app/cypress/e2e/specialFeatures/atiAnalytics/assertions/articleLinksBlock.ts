/* eslint-disable import/no-relative-packages */
import { COMPONENTS, interceptATIAnalyticsBeacons } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';
import { AtiAssertionFnProps } from './type';

const { ARTICLE_LINKS_BLOCK } = COMPONENTS;

export const assertArticleLinksBlockComponentView = ({
  pageIdentifier,
  path,
  applicationType,
  siteId,
}: AtiAssertionFnProps) => {
  it('should send a view event for the Article Links Block component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    // This duplicate line of code has been added intentionally to get cypress to scroll to the bottom.
    cy.get('[data-e2e="article-links-block"]').first().scrollIntoView({
      duration: 1000,
    });
    cy.get('[data-e2e="article-links-block"]').first().scrollIntoView({
      duration: 1000,
    });

    assertATIComponentViewEvent({
      component: ARTICLE_LINKS_BLOCK,
      pageIdentifier,
      applicationType,
      siteId,
    });
  });
};

export const assertArticleLinksBlockComponentClick = ({
  pageIdentifier,
  path,
  applicationType,
  siteId,
}: AtiAssertionFnProps) => {
  it('should send a click event for the Article Links Block component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-e2e="article-links-block"]').first().scrollIntoView({
      duration: 1000,
    });

    // Click on first item
    cy.get(
      '[data-e2e="article-links-block"] a:not([href^="#end-of-article-links-block"])',
    )
      .first()
      .click();

    assertATIComponentClickEvent({
      component: ARTICLE_LINKS_BLOCK,
      pageIdentifier,
      applicationType,
      siteId,
    });
  });
};
