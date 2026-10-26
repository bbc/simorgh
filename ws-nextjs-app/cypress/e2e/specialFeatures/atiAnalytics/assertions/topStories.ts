/* eslint-disable import/no-relative-packages */
import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';
import { AtiAssertionFnProps } from './type';
import interceptArticleOnwardJourney from '../../../../support/helpers/interceptArticleOnwardJourney';

const { TOP_STORIES } = COMPONENTS;

export const assertTopStoriesComponentView = ({
  pageIdentifier,
  path,
  applicationType,
  siteId,
}: AtiAssertionFnProps) => {
  it('should send a view event for the Top Stories component', () => {
    interceptATIAnalyticsBeacons();
    const onwardJourney = interceptArticleOnwardJourney(
      'topStoriesAndFeatures',
    );
    cy.visit(path);
    cy.wait(onwardJourney);

    // This duplicate line of code has been added intentionally to get cypress to scroll to the bottom.
    cy.get('[data-testid="top-stories"]').scrollIntoView({ duration: 1000 });
    cy.get('[data-testid="top-stories"]').scrollIntoView({ duration: 1000 });

    assertATIComponentViewEvent({
      component: TOP_STORIES,
      pageIdentifier,
      applicationType,
      siteId,
    });
  });
};

export const assertTopStoriesComponentClick = ({
  pageIdentifier,
  path,
  applicationType,
  siteId,
}: AtiAssertionFnProps) => {
  it('should send a click event for the Top Stories component', () => {
    interceptATIAnalyticsBeacons();
    const onwardJourney = interceptArticleOnwardJourney(
      'topStoriesAndFeatures',
    );
    cy.visit(path);
    cy.wait(onwardJourney);

    cy.get('[data-testid="top-stories"]').scrollIntoView({
      duration: 1000,
    });

    // Click on first visible item
    cy.get('[data-testid="top-stories"]').find('a').first().click();

    assertATIComponentClickEvent({
      component: TOP_STORIES,
      pageIdentifier,
      applicationType,
      siteId,
    });
  });
};
