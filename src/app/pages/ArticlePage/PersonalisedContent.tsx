/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';

import { Article } from '#app/models/types/optimo';
import CurationGrid from '#app/components/Curation/CurationGrid';
import Subheading from '#app/components/Curation/Subhead';
import { Summary } from '#app/models/types/curationData';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import useViewTracker from '#app/hooks/useViewTracker';

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
    curationLength?: number;
    id?: string;
    link?: string;
    renderVisuallyHiddenH2Title?: boolean;
    curationSubheading?: string;
    isFirstCuration?: boolean;
    topicId?: string;
  };

  // const {
  //   palette: { GREY_2 },
  // } = useTheme();

  const personalisedContentArray = pageData.secondaryColumn
    ?.PersonalisedContent as PersonalisedContentType[] | undefined;

  const getPersonalisedContentData = () => {
    if (
      !Array.isArray(personalisedContentArray) ||
      personalisedContentArray.length === 0
    ) {
      return undefined;
    }
    if (personalisedTopicCurationExperimentVariant === 'personalised') {
      // Country-specific data is always first
      return personalisedContentArray[0];
    }
    if (personalisedTopicCurationExperimentVariant === 'default') {
      // Default data is always last (or only)
      return personalisedContentArray[personalisedContentArray.length - 1];
    }
    return undefined;
  };

  const personalisedContentData = getPersonalisedContentData();
  console.log('yyy', personalisedContentData);
  const {
    title,
    summaries = [],
    id = 'personalised-content',
    link = '',
    isFirstCuration = false,
    topicId = '',
  } = personalisedContentData || {};

  const eventTrackingData: EventTrackingData = {
    componentName: 'personalised-topic-curation',
    sendOptimizelyEvents: true,
    experimentName: 'newswb_ws_personalised_topic_curation',
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

  if (!personalisedContentData) {
    return null;
  }

  return (
    <section aria-labelledby={id} role="region" {...viewTracker}>
      {title && (
        <Subheading id={id} link={link}>
          {title}
        </Subheading>
      )}
      <CurationGrid
        summaries={summaries}
        headingLevel={3}
        isFirstCuration={isFirstCuration}
        eventTrackingData={eventTrackingData}
      />
    </section>
  );
};

export default PersonalisedContent;
