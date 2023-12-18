/** @jsx jsx */
import { useContext, forwardRef } from 'react';
import { jsx } from '@emotion/react';
import useViewTracker from '#app/hooks/useViewTracker';
import Paragraph from '../Paragraph';
import Heading from '../Heading';
import Image from '../Image';
import styles from './index.styles';
import { LeftChevron, RightChevron } from '../icons';
import { ServiceContext } from '../../contexts/ServiceContext';
import CallToActionLink from '../CallToActionLink';
import idSanitiser from '../../lib/utilities/idSanitiser';

interface MessageBannerProps {
  heading: string;
  description?: string;
  link?: string;
  linkText: string;
  image?: string;
  position?: number;
  nthCurationByStyleAndProminence?: number;
  eventTrackingData?: {
    componentName: string;
    detailedPlacement: string;
  };
}

const Banner = forwardRef(
  (
    { heading, description, link, linkText, image }: MessageBannerProps,
    ref,
  ) => {
    const { dir } = useContext(ServiceContext);
    const isRtl = dir === 'rtl';

    const id = `message-banner-${idSanitiser(heading)}`;

    return (
      <section
        css={styles.container}
        role="region"
        aria-labelledby={id}
        data-testid={id}
      >
        <div ref={ref} css={styles.card}>
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
                  src={image.replace('{width}', 'raw')}
                  placeholder={false}
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
  position = 1,
  nthCurationByStyleAndProminence = 1,
}: MessageBannerProps) => {
  const eventTrackingData = {
    componentName: `message-banner-${nthCurationByStyleAndProminence}`,
    detailedPlacement: `${position}`,
  };

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
    />
  );
};

export default MessageBanner;
