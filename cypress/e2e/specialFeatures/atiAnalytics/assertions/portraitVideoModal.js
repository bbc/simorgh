import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentViewEvent } from '.';

const { PORTRAIT_VIDEO_MODAL } = COMPONENTS;

export const assertPortraitVideoModalComponentView = ({
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
    'should send a view event for the Portrait Video Modal component',
    () => {
      interceptATIAnalyticsBeacons();
      cy.visit(path);

      cy.get('[data-testid="portrait-video-carousel"]').scrollIntoView({
        duration: 1000,
      });

      cy.get('[data-testid="promo-button"]').eq(0).click();

      assertATIComponentViewEvent({
        component: PORTRAIT_VIDEO_MODAL,
        pageIdentifier,
        contentType: componentTrackingContentType || contentType,
        useReverb,
        applicationType,
        siteId,
      });
    },
  );
};

export default assertPortraitVideoModalComponentView;
