import { Article, CountryCuration } from '#app/models/types/optimo';
import CurationGrid from '#app/components/Curation/CurationGrid';
import Subheading from '#app/components/Curation/Subhead';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import useViewTracker from '#app/hooks/useViewTracker';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import styles from '#app/components/RelatedContentSection/index.styles';

const LocationBasedTopicOJ = ({ pageData }: { pageData: Article }) => {
  const countryCuration = pageData?.countryCuration as CountryCuration;

  const { title, summaries = [], link, topicId } = countryCuration || {};

  const eventTrackingData: EventTrackingData = {
    componentName: 'location-based-topic-oj',
    sendOptimizelyEvents: true,
    groupTracker: {
      name: title,
      type: 'location-based-topic-oj',
      ...(link && { link }),
      ...(topicId && { topicId }),
      ...(summaries?.length > 0 && { itemCount: summaries.length }),
    },
  };
  const viewTracker = useViewTracker(eventTrackingData);
  const subheadingClickTracker = useClickTrackerHandler(eventTrackingData);

  if (!countryCuration) {
    return null;
  }

  return (
    <section
      aria-labelledby="location-based-topic-oj"
      role="region"
      {...viewTracker}
      css={styles.relatedContentSection}
    >
      {title && (
        <Subheading link={link} {...subheadingClickTracker}>
          {title}
        </Subheading>
      )}
      <CurationGrid
        summaries={summaries}
        headingLevel={3}
        eventTrackingData={eventTrackingData}
      />
    </section>
  );
};

export default LocationBasedTopicOJ;
