/* eslint-disable import/no-relative-packages */
import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';
import { AtiAssertionFnProps } from './type';
import { visitArticlePageAndWaitForOnwardJourney } from '../../../../support/helpers/interceptArticleOnwardJourney';

const { TOP_BAR_OJ } = COMPONENTS;

export const assertTopBarOJComponentView = ({
  pageIdentifier,
  path,
  applicationType,
  siteId,
}: AtiAssertionFnProps) => {
  it('should send a view event for the Top Bar OJ component', function test() {
    interceptATIAnalyticsBeacons();
    visitArticlePageAndWaitForOnwardJourney({
      path,
      applicationType,
      onwardJourney: 'topStoriesAndFeatures',
      testContext: this,
    });

    cy.get('[data-testid="top-bar-onward-journeys"]').scrollIntoView({
      duration: 1000,
    });

    assertATIComponentViewEvent({
      component: TOP_BAR_OJ,
      pageIdentifier,
      applicationType,
      siteId,
    });
  });
};

export const assertTopBarOJComponentClick = ({
  pageIdentifier,
  path,
  applicationType,
  siteId,
}: AtiAssertionFnProps) => {
  it('should send a click event for the Top Bar OJ component', function test() {
    interceptATIAnalyticsBeacons();
    visitArticlePageAndWaitForOnwardJourney({
      path,
      applicationType,
      onwardJourney: 'topStoriesAndFeatures',
      testContext: this,
    });

    cy.get('[data-testid="top-bar-onward-journeys"]').scrollIntoView({
      duration: 1000,
    });

    cy.get('[data-testid="top-bar-onward-journeys"]').find('a').first().click();

    assertATIComponentClickEvent({
      component: TOP_BAR_OJ,
      pageIdentifier,
      applicationType,
      siteId,
    });
  });
};
