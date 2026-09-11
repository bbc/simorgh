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

      // Scroll the media container itself into view rather than the caption
      // text alone. The caption sits at the bottom of a tall figure (video +
      // caption), and useViewTracker's default 50% visibility threshold can
      // be met by the *next* post's video before this one, if only the
      // caption (at the very bottom of the block) is scrolled into view.
      cy.contains(scrollAnchorText)
        .parents('[data-e2e="media-loader__container"]')
        .scrollIntoView({ duration: 1000 });

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
