/* eslint-disable import/no-relative-packages */
import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';
import { AtiAssertionFnProps } from './type';

import runIfToggleEnabled from '../../../../support/helpers/runIfToggleEnabled';
import { visitArticlePageAndWaitForOnwardJourney } from '../../../../support/helpers/interceptArticleOnwardJourney';

const { MOST_READ } = COMPONENTS;

export const assertMostReadComponentView = ({
  pageIdentifier,
  path,
  service,
  applicationType,
  siteId,
}: AtiAssertionFnProps) => {
  it(`should send a view event for the Most Read component`, function test() {
    runIfToggleEnabled({
      service,
      toggleName: 'mostRead',
      testContext: this,
    });

    interceptATIAnalyticsBeacons();
    visitArticlePageAndWaitForOnwardJourney({
      path,
      applicationType,
      onwardJourney: 'mostRead',
      testContext: this,
    });

    cy.get('[data-e2e="most-read"] li').first().scrollIntoView();
    cy.get('[data-e2e="most-read"] li')
      .first()
      .should($item => {
        const { top, bottom, height } = $item[0].getBoundingClientRect();
        const viewportHeight =
          $item[0].ownerDocument.documentElement.clientHeight;
        const visibleHeight =
          Math.min(bottom, viewportHeight) - Math.max(top, 0);

        expect(visibleHeight).to.be.greaterThan(height * 0.5);
      });

    assertATIComponentViewEvent({
      component: MOST_READ,
      pageIdentifier,
      applicationType,
      siteId,
    });
  });
};

export const assertMostReadComponentClick = ({
  pageIdentifier,
  path,
  service,
  applicationType,
  siteId,
}: AtiAssertionFnProps) => {
  it('should send a click event for the Most Read component', function test() {
    runIfToggleEnabled({
      service,
      toggleName: 'mostRead',
      testContext: this,
    });

    interceptATIAnalyticsBeacons();
    visitArticlePageAndWaitForOnwardJourney({
      path,
      applicationType,
      onwardJourney: 'mostRead',
      testContext: this,
    });

    cy.get('[data-e2e="most-read"]').scrollIntoView({ duration: 1000 });

    // Click on first item
    cy.get('[data-e2e="most-read"]').find('a').first().click();

    assertATIComponentClickEvent({
      component: MOST_READ,
      pageIdentifier,
      applicationType,
      siteId,
    });
  });
};
