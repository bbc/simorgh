import { useContext } from 'react';
import styled from '@emotion/styled';
import SectionLabel from '#psammead/psammead-section-label/src';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_QUIN,
} from '#psammead/gel-foundations/src/spacings';
import { RequestContext } from '#app/contexts/RequestContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import useViewTracker from '#hooks/useViewTracker';
import TopicTags, { TopicTag } from '#app/components/TopicTags';

const eventTrackingData = {
  componentName: 'topics',
};

const StyledTopicsWrapper = styled.aside<{ backgroundColour?: string }>`
  padding: ${GEL_SPACING_DBL} 0 ${GEL_SPACING_QUIN};
  background-color: ${({ backgroundColour }) => backgroundColour || 'transparent'};
`;

const StyledSectionLabel = styled(SectionLabel)`
  margin-top: 0;

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    margin-bottom: 1rem;
  }
`;

type Topic = {
  topicName: string;
  topicId: string;
};

type RelatedTopicsProps = {
  topics?: Topic[];
  mobileDivider?: boolean;
  bar?: boolean;
  className?: string;
  backgroundColour?: string;
  tagBackgroundColour?: string;
};

const RelatedTopics = ({
  topics = [],
  mobileDivider = true,
  bar = true,
  className = '',
  backgroundColour = '',
  tagBackgroundColour = '',
}: RelatedTopicsProps) => {
  const { service, script, translations, dir } = useContext(ServiceContext);
  const { variant } = useContext(RequestContext);
  const clickTrackerHandler = useClickTrackerHandler(eventTrackingData);
  const viewTracker = useViewTracker(eventTrackingData);

  const heading = translations?.relatedTopics ?? 'Related Topics';
  const topicsPath = translations?.topicsPath ?? 'topics';

  const getTopicPageUrl = (id: string) => {
    const isPublicService = ['news', 'cymrufyw', 'naidheachdan'];
    const hostname = `https://www.bbc.${isPublicService.includes(service) ? 'co.uk' : 'com'}`;

    return variant
      ? `${hostname}/${service}/${topicsPath}/${id}/${variant}`
      : `${hostname}/${service}/${topicsPath}/${id}`;
  };

  const shouldDisplayTopics =
    topics.length > 0 && !(service === 'zhongwen' && variant === 'simp');

  if (!shouldDisplayTopics) {
    return null;
  }

  return (
    <StyledTopicsWrapper
      data-testid="related-topics"
      aria-labelledby="related-topics"
      role="complementary"
      backgroundColour={backgroundColour}
      {...(className ? { className } : undefined)}
    >
      <StyledSectionLabel
        bar={bar}
        script={script}
        service={service}
        dir={dir}
        labelId="related-topics"
        mobileDivider={mobileDivider}
        {...(backgroundColour && { backgroundColor: backgroundColour })}
      >
        {heading}
      </StyledSectionLabel>
      <TopicTags
        service={service}
        script={script}
        {...(tagBackgroundColour && { tagBackgroundColour })}
      >
        {topics.length === 1
          ? topics.map(topic => (
              <TopicTag
                name={topic.topicName}
                link={getTopicPageUrl(topic.topicId)}
                {...clickTrackerHandler}
                {...viewTracker}
                key={topic.topicId}
              />
            ))
          : topics.map(({ topicName, topicId }) => (
              <TopicTag
                name={topicName}
                link={getTopicPageUrl(topicId)}
                {...clickTrackerHandler}
                {...viewTracker}
                key={topicId}
              />
            ))}
      </TopicTags>
    </StyledTopicsWrapper>
  );
};

export default RelatedTopics;
