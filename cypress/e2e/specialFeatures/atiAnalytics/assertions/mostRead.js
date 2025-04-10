import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';

const { MOST_READ } = COMPONENTS;

export const assertMostReadComponentView = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
}) => {
  it('should send a view event for the Most Read component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-e2e="most-read"]').scrollIntoView({ duration: 1000 });

    assertATIComponentViewEvent({
      component: MOST_READ,
      pageIdentifier,
      contentType,
      useReverb,
    });
  });
};

export const assertMostReadComponentClick = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
}) => {
  it('should send a click event for the Most Read component', () => {
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
    });
  });
};
