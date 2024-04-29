/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { forwardRef } from 'react';
import { jsx } from '@emotion/react';
import useViewTracker from '#app/hooks/useViewTracker';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { EventTrackingMetadata } from '#app/models/types/eventTracking';
import idSanitiser from '#app/lib/utilities/idSanitiser';
import Heading from '../Heading';
import LiveLabel from '../LiveLabel';
import MaskedImage from '../MaskedImage';
import styles from './index.styles';
import Text from '../Text';

interface BillboardProps {
  heading: string;
  description: string;
  link: string;
  image: string;
  altText: string;
  eventTrackingData?: EventTrackingMetadata;
  showLiveLabel?: boolean;
}

const Billboard = forwardRef(
  (
    {
      heading,
      description,
      link,
      image,
      altText,
      eventTrackingData,
      showLiveLabel,
    }: BillboardProps,
    viewRef,
  ) => {
    const clickTrackerHandler = useClickTrackerHandler(eventTrackingData);

    const id = `billboard-${idSanitiser(heading)}`;

    return (
      <section
        role="region"
        aria-labelledby={id}
        data-testid={id}
        css={styles.container}
      >
        <div css={styles.headerContainer} ref={viewRef}>
          <div css={styles.backgroundContainer} />
          <div css={styles.contentContainer}>
            <MaskedImage
              imageUrl={image}
              imageUrlTemplate={image}
              altText={altText}
              imageWidth={660}
            />
            <div css={styles.textContainer}>
              <Heading level={2} size="paragon" css={styles.heading} id={id}>
                <a
                  href={link}
                  css={styles.link}
                  className="focusIndicatorDisplayBlock"
                  onClick={clickTrackerHandler}
                >
                  {showLiveLabel ? (
                    <div data-testid="billboard-live-label">
                      <LiveLabel.Pulse
                        width="24"
                        height="24"
                        css={styles.liveLabelPulse}
                      />
                      <LiveLabel.Text css={styles.liveLabelText}>
                        <div>{heading}</div>
                      </LiveLabel.Text>
                    </div>
                  ) : (
                    heading
                  )}
                </a>
              </Heading>
              {description && (
                <Text as="p" css={styles.description}>
                  {description}
                </Text>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  },
);

export default ({
  heading,
  description,
  link,
  image,
  altText,
  eventTrackingData,
  showLiveLabel,
}: BillboardProps) => {
  const viewRef = useViewTracker(eventTrackingData);

  return (
    <Billboard
      heading={heading}
      description={description}
      link={link}
      image={image}
      altText={altText}
      eventTrackingData={eventTrackingData}
      ref={viewRef}
      showLiveLabel={showLiveLabel}
    />
  );
};
