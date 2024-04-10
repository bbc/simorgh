/** @jsx jsx */
import { useContext, forwardRef } from 'react';
import { jsx } from '@emotion/react';
import useViewTracker from '#app/hooks/useViewTracker';
import { EventTrackingMetadata } from '#app/models/types/eventTracking';
import idSanitiser from '#app/lib/utilities/idSanitiser';
import Heading from '../Heading';
import MaskedImage from '../MaskedImage';
import { ServiceContext } from '../../contexts/ServiceContext';
import styles from './index.styles';
import Text from '../Text';

interface BillboardProps {
  heading: string;
  description?: string;
  link?: string;
  image: string;
  eventTrackingData?: EventTrackingMetadata;
}

const Banner = forwardRef(
  (
    { heading, description, link, image, eventTrackingData }: BillboardProps,
    viewRef,
  ) => {
    const { dir } = useContext(ServiceContext);
    const isRtl = dir === 'rtl';

    const id = `billboard-${idSanitiser(heading)}`;

    return (
      <section role="region" aria-labelledby={id} data-testid={id}>
        <div css={styles.headerContainer}>
          <div css={styles.backgroundContainer}>
            <div css={styles.backgroundColor} />
          </div>
          <div css={styles.contentContainer}>
            <MaskedImage
              imageUrl={image}
              imageUrlTemplate={image}
              imageWidth={660}
            />
            <div css={styles.textContainerWithImage}>
              <Heading level={2} size="paragon" css={styles.heading} id={id}>
                {/* {showLiveLabel ? (
                  <LiveLabelHeader isHeaderImage={isHeaderImage}>
                     {heading}
                  </LiveLabelHeader>
                ) : ( */}
                {heading}
                {/* )} */}
              </Heading>
              {description && (
                <Text as="p" css={[styles.description]}>
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

const Billboard = ({
  heading,
  description,
  link,
  linkText,
  image,
  eventTrackingData,
}: BillboardProps) => {
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

export default Billboard;
