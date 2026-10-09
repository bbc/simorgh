import { Article } from '#app/models/types/optimo';
import CurationGrid from '#app/components/Curation/CurationGrid';
import Subheading from '#app/components/Curation/Subhead';
import { Summary } from '#app/models/types/curationData';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import useViewTracker from '#app/hooks/useViewTracker';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import styles from '#app/components/RelatedContentSection/index.styles';

const PersonalisedContent = ({
  pageData,
  personalisedTopicCurationExperimentVariant,
}: {
  pageData: Article;
  personalisedTopicCurationExperimentVariant: string;
}) => {
  type PersonalisedContentType = {
    title?: string;
    summaries?: Summary[];
    id?: string;
    link?: string;
    topicId?: string;
  };

  const personalisedContentArray = pageData.secondaryColumn
    ?.personalisedContent as PersonalisedContentType[] | undefined;

  const getPersonalisedContentData = () => {
    if (
      !Array.isArray(personalisedContentArray) ||
      personalisedContentArray.length === 0
    ) {
      return undefined;
    }
    return personalisedContentArray[0];
  };

  const personalisedContentData = getPersonalisedContentData();
  const {
    title,
    summaries = [],
    id = 'personalised-content',
    link = '',
    topicId = '',
  } = personalisedContentData || {};

  const eventTrackingData: EventTrackingData = {
    componentName: 'personalised-topic-curation',
    sendOptimizelyEvents: true,
    experimentName: 'newswb_ws_location_based_topics',
    experimentVariant: personalisedTopicCurationExperimentVariant,
    groupTracker: {
      name: title,
      type: 'personalised-topic-curation',
      ...(link && { link }),
      ...(topicId && { resourceId: topicId }),
      ...(summaries?.length > 0 && { itemCount: summaries.length }),
    },
  };
  const viewTracker = useViewTracker(eventTrackingData);
  const subheadingClickTracker = useClickTrackerHandler(eventTrackingData);

  if (!personalisedContentData) {
    return null;
  }

  return (
    <section
      aria-labelledby={id}
      role="region"
      {...viewTracker}
      css={styles.relatedContentSection} // use the same style as related content for padding unless we want to make it look different
    >
      {title && (
        <Subheading id={id} link={link} {...subheadingClickTracker}>
          {`Más información sobre ${title}`}
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

export default PersonalisedContent;
