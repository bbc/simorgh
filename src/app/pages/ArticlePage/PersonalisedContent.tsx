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
    articles?: Summary[];
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
  console.log(
    'xxx',
    typeof pageData.secondaryColumn?.PersonalisedContent,
    pageData.secondaryColumn?.PersonalisedContent,
  );
  const personalisedContentData = pageData.secondaryColumn
    ?.PersonalisedContent as PersonalisedContentType | undefined;
  console.log(
    'personalised content data before null return',
    personalisedContentData,
  );
  const {
    title,
    articles = [],
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
      ...(articles?.length > 0 && { itemCount: articles.length }),
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
        summaries={articles}
        headingLevel={3}
        isFirstCuration={isFirstCuration}
        eventTrackingData={eventTrackingData}
      />
    </section>
  );
};

export default PersonalisedContent;
