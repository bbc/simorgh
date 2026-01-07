import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';
import runIfToggleEnabled from '../../../../support/helpers/runIfToggleEnabled';

const { MOST_READ } = COMPONENTS;

export const assertMostReadComponentView = ({
  pageIdentifier,
  path,
  service,
  applicationType,
  siteId,
}) => {
  it(`should send a view event for the Most Read component`, function test() {
    runIfToggleEnabled({
      service,
      toggleName: 'mostRead',
      testContext: this,
    });

    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-e2e="most-read"]').scrollIntoView({ duration: 1000 });

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
}) => {
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
      applicationType,
      siteId,
    });
  });
};
