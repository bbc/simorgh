import { use } from 'react';
import { useTheme } from '@emotion/react';
import clsx from 'clsx';
import useViewTracker from '#app/hooks/useViewTracker';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import {
  createResponsiveSrcSet,
  MULTILINE_SRCSET_SEPARATOR,
} from '#app/utilities/imageSrcSets';
import { RequestContext } from '#app/contexts/RequestContext';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import Experiment, { ExperimentType } from '#app/components/Experiment';
import CallToActionLink from '../CallToActionLink';
import Paragraph from '../Paragraph';
import Image from '../Image';
import ctaStyles from './index.module.scss';
import styles from './index.styles';

interface MessageBannerProps {
  description?: string;
  link: string;
  linkText: string;
  image?: string;
  eventTrackingData?: EventTrackingData;
  children?: React.ReactNode;
}

const CTA_GLOW_EXPERIMENT = 'newswb_ws_message_banner_cta_glow';

const MessageBannerContent = ({
  description,
  link,
  linkText,
  image,
  children,
  eventTrackingData,
  shouldEnableGlow,
}: MessageBannerProps & { shouldEnableGlow: boolean }) => {
  const { mq } = useTheme();

  // Remove itemCount from groupTracker as it's not needed for MessageBanner
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { itemCount, ...groupTrackerRest } =
    eventTrackingData?.groupTracker || {};

  const eventTrackingDataWithoutItemCount = eventTrackingData && {
    ...eventTrackingData,
    groupTracker: groupTrackerRest,
    optimizelyComponentName: 'cta',
  };

  const viewTracker = useViewTracker(eventTrackingDataWithoutItemCount);

  const imgSrcLarge = image?.replace(
    '{width}',
    `${styles.IMAGE_WIDTH_GROUP_3_MIN_WIDTH}`,
  );

  const responsiveImage = createResponsiveSrcSet({
    imageUrlTemplate: image,
    mq,
    imageWidthSmall: styles.IMAGE_WIDTH,
    imageWidthLarge: styles.IMAGE_WIDTH_GROUP_3_MIN_WIDTH,
    srcSetSeparator: MULTILINE_SRCSET_SEPARATOR,
  });

  return (
    <div {...viewTracker} css={styles.card}>
      <div css={styles.textWrap}>
        {children}
        <Paragraph size="longPrimer" css={styles.paragraph}>
          {description}
        </Paragraph>
      </div>
      <div css={styles.flex}>
        <CallToActionLink
          url={link}
          className={clsx('focusIndicatorInvert', ctaStyles.callToActionLink)}
          enableGlow={shouldEnableGlow}
          eventTrackingData={eventTrackingDataWithoutItemCount}
        >
          <CallToActionLink.ButtonLikeWrapper>
            <CallToActionLink.Text
              shouldUnderlineOnHoverFocus
              className={ctaStyles.callToActionLinkText}
            >
              {linkText}
              <CallToActionLink.Chevron />
            </CallToActionLink.Text>
          </CallToActionLink.ButtonLikeWrapper>
        </CallToActionLink>
        {image && (
          <div css={styles.image}>
            <Image
              alt=""
              src={imgSrcLarge as string}
              srcSet={responsiveImage?.srcSet}
              sizes={responsiveImage?.sizes}
              placeholder={false}
              aspectRatio={[16, 9]}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const MessageBanner = (props: MessageBannerProps) => {
  const { pageType } = use(RequestContext);

  if (pageType !== HOME_PAGE) {
    return <MessageBannerContent {...props} shouldEnableGlow={false} />;
  }

  return (
    <Experiment name={CTA_GLOW_EXPERIMENT} type={ExperimentType.CLIENT_SIDE}>
      {variation => (
        <MessageBannerContent
          {...props}
          shouldEnableGlow={variation === 'variant'}
        />
      )}
    </Experiment>
  );
};

export default MessageBanner;
