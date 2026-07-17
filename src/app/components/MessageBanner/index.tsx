import { useTheme } from '@emotion/react';
import useViewTracker from '#app/hooks/useViewTracker';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import Paragraph from '../Paragraph';
import Image from '../Image';
import styles from './index.styles';
import CallToActionLink from '../CallToActionLink';

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

  const IMAGE_SRC_SMALL_2X_UPSCALE_WIDTH = styles.IMAGE_WIDTH * 2;
  const IMAGE_SRC_LARGE_2X_UPSCALE_WIDTH =
    styles.IMAGE_WIDTH_GROUP_3_MIN_WIDTH * 2;

  const replaceWidth = (width: number) => image?.replace('{width}', `${width}`);

  const imgSrcSmall = replaceWidth(styles.IMAGE_WIDTH);
  const imgSrcSmall2x = replaceWidth(IMAGE_SRC_SMALL_2X_UPSCALE_WIDTH);
  const imgSrcLarge = replaceWidth(styles.IMAGE_WIDTH_GROUP_3_MIN_WIDTH);
  const imgSrcLarge2x = replaceWidth(IMAGE_SRC_LARGE_2X_UPSCALE_WIDTH);

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
          className="focusIndicatorInvert"
          eventTrackingData={eventTrackingDataWithoutItemCount}
          css={styles.callToActionLink}
        >
          <CallToActionLink.ButtonLikeWrapper>
            <CallToActionLink.Text
              shouldUnderlineOnHoverFocus
              css={styles.callToActionLinkText}
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
              srcSet={`${imgSrcSmall} ${styles.IMAGE_WIDTH}w, 
                          ${imgSrcSmall2x} ${IMAGE_SRC_SMALL_2X_UPSCALE_WIDTH}w, 
                          ${imgSrcLarge} ${styles.IMAGE_WIDTH_GROUP_3_MIN_WIDTH}w, 
                          ${imgSrcLarge2x} ${IMAGE_SRC_LARGE_2X_UPSCALE_WIDTH}w`}
              sizes={`${mq.GROUP_2_MAX_WIDTH.replace('@media ', '')} ${styles.IMAGE_WIDTH}px, ${styles.IMAGE_WIDTH_GROUP_3_MIN_WIDTH}px`}
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
