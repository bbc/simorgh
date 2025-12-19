import { use } from 'react';
import useViewTracker from '#app/hooks/useViewTracker';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { Summary } from '#app/models/types/curationData';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import Heading from '../Heading';
import MaskedImage from '../MaskedImage';
import styles from './index.styles';
import Text from '../Text';
import LivePulse from '../LivePulse';
import LiveText from '../LiveText';
import { ServiceContext } from '../../contexts/ServiceContext';
import BillboardCurationGrid from './BillboardCurationGrid';

interface BillboardProps {
  heading: string;
  description: string;
  link: string;
  image: string;
  altText: string;
  id?: string;
  eventTrackingData?: EventTrackingData;
  showLiveLabel?: boolean;
  summaries?: Summary[];
  timeOfDayExperimentName?: string;
  timeOfDayVariant?: string;
}

export default ({
  heading,
  description,
  link,
  image,
  altText,
  id = 'billboard',
  showLiveLabel,
  eventTrackingData = { componentName: 'billboard' },
  summaries = [],
  timeOfDayExperimentName,
  timeOfDayVariant,
}: BillboardProps) => {
  const { translations } = use(ServiceContext);
  const showMoreOnThisTitle = translations.moreOnThis;
  const hasPromoItems = summaries.length > 1;
  const isSingleImageLayout = !hasPromoItems;
  // this curation type is used in the home page experiment as well.
  // if they will not be running at the same time (?) we can make it so the experiment name is only for the current experiment
  const eventTrackingDataWithOptimizelyEvents = {
    ...eventTrackingData,
    ...(timeOfDayVariant && {
      sendOptimizelyEvents: true,
      experimentName: timeOfDayExperimentName, // might want to change this to just the article page experiment name and not need to pass it into this component
      experimentVariant: timeOfDayVariant,
    }),
  };
  const viewTracker = useViewTracker(eventTrackingDataWithOptimizelyEvents);
  const clickTrackerHandler = useClickTrackerHandler(
    eventTrackingDataWithOptimizelyEvents,
  );

  return (
    <section role="region" aria-labelledby={id} data-testid={id}>
      <div css={styles.headerContainer} {...viewTracker}>
        <div css={[styles.backgroundContainer, styles.backgroundRedGradient]} />
        <div
          css={[
            styles.contentContainer,
            !hasPromoItems && styles.contentContainerNoPromos,
          ]}
        >
          <MaskedImage
            imageUrl={image.replace('{width}', '240')}
            imageUrlTemplate={image}
            altText={altText}
            imageWidth={660}
            showPlaceholder={false}
            showVignette={hasPromoItems}
            singleImageLayout={isSingleImageLayout}
          />
          <div css={styles.textContainer}>
            <Heading level={2} size="paragon" css={styles.heading} id={id}>
              <a href={link} css={styles.link} {...clickTrackerHandler}>
                {showLiveLabel ? (
                  <div data-testid="billboard-live-label">
                    <LivePulse
                      width="24"
                      height="24"
                      css={styles.liveLabelPulse}
                    />
                    <LiveText css={styles.liveLabelText}>
                      <div>{heading}</div>
                    </LiveText>
                  </div>
                ) : (
                  <div>{heading}</div>
                )}
              </a>
            </Heading>
            {description && (
              <Text as="p" css={styles.description}>
                {description}
              </Text>
            )}
          </div>
          {hasPromoItems && (
            <div css={styles.curationGridSection}>
              {showMoreOnThisTitle && (
                <Heading
                  level={2}
                  size="greatPrimer"
                  css={[styles.billboardMoreOnThisHeading]}
                >
                  {showMoreOnThisTitle}
                </Heading>
              )}

              <BillboardCurationGrid
                summaries={summaries.slice(1)}
                eventTrackingData={eventTrackingData}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
