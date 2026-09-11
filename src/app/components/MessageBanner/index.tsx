import { useTheme } from '@emotion/react';
import useViewTracker from '#app/hooks/useViewTracker';
import getSrcSets from '#app/utilities/getSrcSets';
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

  const imageSrcSets = getSrcSets({
    imageUrlTemplate: image,
    mq,
    imageWidthSmall: styles.IMAGE_WIDTH,
    imageWidthLarge: styles.IMAGE_WIDTH_GROUP_3_MIN_WIDTH,
  });
  const imgSrcLarge = image?.replace(
    '{width}',
    `${styles.IMAGE_WIDTH_GROUP_3_MIN_WIDTH}`,
  );

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
        {image && imageSrcSets && (
          <div css={styles.image}>
            <Image
              alt=""
              src={imgSrcLarge as string}
              srcSet={imageSrcSets.srcSet}
              sizes={imageSrcSets.sizes}
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
