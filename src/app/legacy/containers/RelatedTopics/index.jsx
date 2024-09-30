import React, { useContext } from 'react';
import { TopicTag, TopicTags } from '#psammead/psammead-topic-tags/src';
import pathOr from 'ramda/src/pathOr';
import SectionLabel from '#psammead/psammead-section-label/src';
import styled from '@emotion/styled';
import { GEL_SPACING_QUIN } from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
} from '#psammead/gel-foundations/src/breakpoints';
import { RequestContext } from '#app/contexts/RequestContext';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import useViewTracker from '#hooks/useViewTracker';
import { ServiceContext } from '../../../contexts/ServiceContext';

const eventTrackingData = {
  componentName: 'topics',
};

const StyledTopicsWrapper = styled.aside`
  padding-bottom: ${GEL_SPACING_QUIN};
`;

const StyledSectionLabel = styled(SectionLabel)`
  margin-top: 0;

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    margin-bottom: 1rem;
  }
`;

const RelatedTopics = ({
  topics = [],
  mobileDivider = true,
  bar = true,
  className = '',
  backgroundColour = '',
  tagBackgroundColour = '',
}) => {
  const { service, script, translations, dir } = useContext(ServiceContext);
  const { variant } = useContext(RequestContext);
  const clickTrackerHandler = useClickTrackerHandler(eventTrackingData);
  const viewRef = useViewTracker(eventTrackingData);
  const heading = pathOr('Related Topics', ['relatedTopics'], translations);
  const topicsPath = pathOr('topics', ['topicsPath'], translations);

  const getTopicPageUrl = id => {
    return variant
      ? `/${service}/${variant}/${topicsPath}/${id}`
      : `/${service}/${topicsPath}/${id}`;
  };

  return (
    topics &&
    topics.length !== 0 && (
      <StyledTopicsWrapper
        data-testid="related-topics"
        aria-labelledby="related-topics"
        role="complementary"
        {...(className && { className })}
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
          {topics.length === 1 ? (
            <TopicTag
              name={topics[0].topicName}
              link={getTopicPageUrl(topics[0].topicId)}
              onClick={clickTrackerHandler}
              ref={viewRef}
              key={topics[0].topicId}
            />
          ) : (
            topics.map(({ topicName, topicId }) => (
              <TopicTag
                name={topicName}
                link={getTopicPageUrl(topicId)}
                onClick={clickTrackerHandler}
                ref={viewRef}
                key={topicId}
              />
            ))
          )}
        </TopicTags>
      </StyledTopicsWrapper>
    )
  );
};

export default RelatedTopics;
