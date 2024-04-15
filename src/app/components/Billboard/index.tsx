/** @jsx jsx */
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
  description?: string;
  lang?: string;
  link?: string;
  image: string;
  eventTrackingData?: EventTrackingMetadata;
  showLiveLabel: boolean;
}

const Banner = forwardRef(
  (
    {
      heading,
      description,
      link,
      image,
      eventTrackingData,
      showLiveLabel,
      lang,
    }: BillboardProps,
    viewRef,
  ) => {

    const clickTrackerHandler = useClickTrackerHandler(eventTrackingData);

    const id = `billboard-${idSanitiser(heading)}`;

    return (
      <section role="region" aria-labelledby={id} data-testid={id}>
        <a
          href={link}
          css={styles.clickAreaContainer}
          onClick={clickTrackerHandler}
        >
          <div css={styles.headerContainer} ref={viewRef}>
            <div css={styles.backgroundContainer} />
            <div css={styles.contentContainer}>
              <MaskedImage
                imageUrl={image}
                imageUrlTemplate={image}
                imageWidth={660}
              />
              <div css={styles.textContainerWithImage}>
                <Heading level={2} size="paragon" css={styles.heading} id={id}>
                  {showLiveLabel ? (
                    <LiveLabel lang={lang} id={id}>
                      {heading}
                    </LiveLabel>
                  ) : (
                    heading
                  )}
                </Heading>
                {description && (
                  <Text as="p" css={[styles.description, showLiveLabel]}>
                    {description}
                  </Text>
                )}
              </div>
            </div>
          </div>
        </a>
      </section>
    );
  },
);

const Billboard = ({
  heading,
  description,
  lang,
  link,
  image,
  eventTrackingData,
  showLiveLabel,
}: BillboardProps) => {
  const viewRef = useViewTracker(eventTrackingData);

  return (
    <Banner
      heading={heading}
      description={description}
      lang={lang}
      link={link}
      image={image}
      eventTrackingData={eventTrackingData}
      ref={viewRef}
      showLiveLabel={showLiveLabel}
    />
  );
};

export default Billboard;
