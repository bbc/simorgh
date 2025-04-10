/** @jsx jsx */
import { useContext, forwardRef, ForwardedRef } from 'react';
import { jsx, useTheme } from '@emotion/react';
import useViewTracker from '#app/hooks/useViewTracker';
import { EventTrackingMetadata } from '#app/models/types/eventTracking';
import Paragraph from '../Paragraph';
import Heading from '../Heading';
import Image from '../Image';
import styles from './index.styles';
import { LeftChevron, RightChevron } from '../icons';
import { ServiceContext } from '../../contexts/ServiceContext';
import CallToActionLink from '../CallToActionLink';

interface MessageBannerProps {
  heading: string;
  description?: string;
  link?: string;
  linkText: string;
  image?: string;
  id?: string;
  eventTrackingData?: EventTrackingMetadata;
}

const Banner = forwardRef(
  (
    {
      heading,
      description,
      link,
      linkText,
      image,
      eventTrackingData,
      id = 'message-banner-1',
    }: MessageBannerProps,
    viewRef: ForwardedRef<HTMLElement>,
  ) => {
    const { dir } = useContext(ServiceContext);
    const { mq } = useTheme();
    const isRtl = dir === 'rtl';

    const IMAGE_SRC_SMALL_2X_UPSCALE_WIDTH = styles.IMAGE_WIDTH * 2;
    const IMAGE_SRC_LARGE_2X_UPSCALE_WIDTH =
      styles.IMAGE_WIDTH_GROUP_3_MIN_WIDTH * 2;

    const replaceWidth = (width: number) =>
      image?.replace('{width}', `${width}`);

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
        <div {...viewRef} css={styles.card}>
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
              href={link}
              css={styles.callToActionLink}
              className="focusIndicatorInvert"
              eventTrackingData={eventTrackingData}
            >
              {linkText}
              {isRtl ? (
                <LeftChevron css={styles.chevron} />
              ) : (
                <RightChevron css={styles.chevron} />
              )}
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
  },
);

const MessageBanner = ({
  heading,
  description,
  link,
  linkText,
  image,
  eventTrackingData,
  id,
}: MessageBannerProps) => {
  const viewRef = useViewTracker(eventTrackingData);

  return (
    <Banner
      heading={heading}
      linkText={linkText}
      description={description}
      link={link}
      image={image}
      eventTrackingData={eventTrackingData}
      // @ts-expect-error TODO need help fixing this!
      ref={viewRef}
      id={id}
    />
  );
};

export default MessageBanner;
