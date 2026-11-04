import { useTheme } from '@emotion/react';
import clsx from 'clsx';
import useViewTracker from '#app/hooks/useViewTracker';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import {
  createResponsiveSrcSet,
  MULTILINE_SRCSET_SEPARATOR,
} from '#app/utilities/imageSrcSets';
import Paragraph from '../Paragraph';
import Image from '../Image';
import styles from './index.module.scss';
import CallToActionLink from '../CallToActionLink';

const IMAGE_WIDTH = 184;
const IMAGE_WIDTH_GROUP_3_MIN_WIDTH = 224;

interface MessageBannerProps {
  description?: string;
  link: string;
  linkText: string;
  image?: string;
  eventTrackingData?: EventTrackingData;
  children?: React.ReactNode;
}
const MessageBanner = ({
  description,
  link,
  linkText,
  image,
  children,
  eventTrackingData,
}: MessageBannerProps) => {
  // Remove itemCount from groupTracker as it's not needed for MessageBanner
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { itemCount, ...groupTrackerRest } =
    eventTrackingData?.groupTracker || {};

  const eventTrackingDataWithoutItemCount = eventTrackingData && {
    ...eventTrackingData,
    groupTracker: groupTrackerRest,
  };

  const viewTracker = useViewTracker(eventTrackingDataWithoutItemCount);

  const { mq } = useTheme();

  const imgSrcLarge = image?.replace(
    '{width}',
    `${IMAGE_WIDTH_GROUP_3_MIN_WIDTH}`,
  );

  const responsiveImage = createResponsiveSrcSet({
    imageUrlTemplate: image,
    mq,
    imageWidthSmall: IMAGE_WIDTH,
    imageWidthLarge: IMAGE_WIDTH_GROUP_3_MIN_WIDTH,
    srcSetSeparator: MULTILINE_SRCSET_SEPARATOR,
  });

  return (
    <div {...viewTracker} className={styles.card}>
      <div className={styles.textWrap}>
        {children}
        <Paragraph size="longPrimer" className={styles.paragraph}>
          {description}
        </Paragraph>
      </div>
      <div className={styles.flex}>
        <CallToActionLink
          url={link}
          enableGlow
          className={clsx('focusIndicatorInvert', styles.callToActionLink)}
          eventTrackingData={eventTrackingDataWithoutItemCount}
        >
          <CallToActionLink.ButtonLikeWrapper>
            <CallToActionLink.Text
              shouldUnderlineOnHoverFocus
              className={styles.callToActionLinkText}
            >
              {linkText}
              <CallToActionLink.Chevron />
            </CallToActionLink.Text>
          </CallToActionLink.ButtonLikeWrapper>
        </CallToActionLink>
        {image && (
          <div className={styles.image}>
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

export default MessageBanner;
