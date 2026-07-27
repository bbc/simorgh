import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentViewEvent } from '.';

const { PORTRAIT_VIDEO_CAROUSEL } = COMPONENTS;

export const assertPortraitVideoCarouselComponentView = ({
  pageIdentifier,
  path,
  applicationType,
  siteId,
  expectedItemType,
  expectedGroupType,
  expectedItemText,
}) => {
  const itOrSkip = applicationType === 'lite' ? it.skip : it;

  itOrSkip(
    'should send a view event for the Portrait Video Carousel component',
    () => {
      interceptATIAnalyticsBeacons();
      cy.visit(path);

      cy.get('[data-testid="portrait-video-carousel"]').scrollIntoView({
        duration: 1000,
      });

      assertATIComponentViewEvent({
        component: PORTRAIT_VIDEO_CAROUSEL,
        pageIdentifier,
        applicationType,
        siteId,
        expectedItemType,
        expectedGroupType,
        expectedItemText,
      });
    },
  );
};

export default assertPortraitVideoCarouselComponentView;
