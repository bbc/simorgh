import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentViewEvent } from '.';

const { STREAM } = COMPONENTS;

export const assertStreamEmbeddedVideoComponentView = ({
  pageIdentifier,
  path,
  applicationType,
  siteId,
  scrollAnchorText,
  expectedItemType,
  expectedItemText,
}) => {
  const itOrSkip = applicationType === 'lite' ? it.skip : it;

  itOrSkip(
    `should send a view event for a ${expectedItemType} embedded in the Live page stream ("${expectedItemText}")`,
    () => {
      interceptATIAnalyticsBeacons();
      cy.visit(path);

      cy.contains(scrollAnchorText).scrollIntoView({ duration: 1000 });

      assertATIComponentViewEvent({
        component: STREAM,
        pageIdentifier,
        applicationType,
        siteId,
        expectedItemType,
        expectedGroupType: STREAM,
        expectedItemText,
      });
    },
  );
};

export default assertStreamEmbeddedVideoComponentView;
