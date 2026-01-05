import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentViewEvent } from '.';

const { PORTRAIT_VIDEO_CAROUSEL } = COMPONENTS;

export const assertPortraitVideoCarouselComponentView = ({
  pageIdentifier,
  contentType,
  componentTrackingContentType,
  useReverb,
  path,
  applicationType,
  siteId,
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
        contentType: componentTrackingContentType || contentType,
        useReverb,
        applicationType,
        siteId,
      });
    },
  );
};

export default assertPortraitVideoCarouselComponentView;
