import { useTheme } from '@emotion/react';
import useViewTracker from '#app/hooks/useViewTracker';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import Paragraph from '../Paragraph';
import Heading from '../Heading';
import Image from '../Image';
import styles from './index.styles';
import CallToActionLink from '../CallToActionLink';

interface MessageBannerProps {
  heading: string;
  description?: string;
  link: string;
  linkText: string;
  image?: string;
  id?: string;
  eventTrackingData?: EventTrackingData;
}
const MessageBanner = ({
  heading,
  description,
  link,
  linkText,
  image,
  id = 'message-banner-1',
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
    <section
      css={styles.container}
      role="region"
      aria-labelledby={id}
      data-testid={id}
    >
      <div {...viewTracker} css={styles.card}>
        <div css={styles.textWrap}>
          <Heading level={2} size="paragon" css={styles.heading} id={id}>
            {heading}
          </Heading>
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
              <CallToActionLink.Text shouldUnderlineOnHoverFocus>
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
    </section>
  );
};

export default MessageBanner;
