/** @jsx jsx */
import { useContext, forwardRef } from 'react';
import { jsx } from '@emotion/react';
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
    viewRef,
  ) => {
    const { dir } = useContext(ServiceContext);
    const isRtl = dir === 'rtl';

    return (
      <section
        css={styles.container}
        role="region"
        aria-labelledby={id}
        data-testid={id}
      >
        <div ref={viewRef} css={styles.card}>
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
              <div css={isRtl ? styles.imageRtl : styles.imageLtr}>
                <Image
                  alt=""
                  src={`${image.replace('{width}', '240')}`}
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
      ref={viewRef}
      id={id}
    />
  );
};

export default MessageBanner;
