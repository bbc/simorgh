/* eslint-disable import/no-relative-packages */
import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import {
  assertATIComponentClickEvent,
  assertATIComponentViewEvent,
} from '../../../../../../cypress/e2e/specialFeatures/atiAnalytics/assertions';
import { AtiAssertionFnProps } from './type';

import runIfToggleEnabled from '../../../../support/helpers/runIfToggleEnabled';

const { MOST_READ } = COMPONENTS;

export const assertMostReadComponentView = ({
  pageIdentifier,
  contentType,
  useReverb,
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
    cy.visit(path);

    // This duplicate line of code has been added intentionally to get cypress to scroll to the bottom.
    cy.get('[data-e2e="most-read"]').scrollIntoView({ duration: 1000 });
    cy.get('[data-e2e="most-read"]').scrollIntoView({ duration: 1000 });

    assertATIComponentViewEvent({
      component: MOST_READ,
      pageIdentifier,
      contentType,
      useReverb,
      applicationType,
      siteId,
    });
  });
};

export const assertMostReadComponentClick = ({
  pageIdentifier,
  contentType,
  useReverb,
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
    cy.visit(path);

    cy.get('[data-e2e="most-read"]').scrollIntoView({ duration: 1000 });

    // Click on first item
    cy.get('[data-e2e="most-read"]').find('a').first().click();

    assertATIComponentClickEvent({
      component: MOST_READ,
      pageIdentifier,
      contentType,
      useReverb,
      applicationType,
      siteId,
    });
  });
};
