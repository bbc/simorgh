import React, { useContext } from 'react';
import { TopicTag, TopicTags } from '@bbc/psammead-topic-tags';
import { pathOr } from 'ramda';
import SectionLabel from '@bbc/psammead-section-label';
import styled from '@emotion/styled';
import { arrayOf, shape, string } from 'prop-types';
import { GEL_SPACING_QUIN } from '@bbc/gel-foundations/spacings';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { RequestContext } from '#app/contexts/RequestContext';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import useViewTracker from '#hooks/useViewTracker';

const eventTrackingData = {
  componentName: 'topics',
};

const StyledTopicsWrapper = styled.aside`
  padding-bottom: ${GEL_SPACING_QUIN};
`;

const StyledSectionLabel = styled(SectionLabel)`
  margin-top: 0;
`;

const RelatedTopics = ({ topics }) => {
  const { service, script, translations, dir } = useContext(ServiceContext);
  const { variant } = useContext(RequestContext);
  const isEnabled =
    process?.env?.SIMORGH_APP_ENV === 'test' ||
    process?.env?.SIMORGH_APP_ENV === 'local';
  const clickTrackerHandler = useClickTrackerHandler(eventTrackingData);
  const viewRef = useViewTracker(eventTrackingData);
  const heading = pathOr('Related Topics', ['relatedTopics'], translations);

  const getTopicPageUrl = id => {
    return variant
      ? `${process?.env?.SIMORGH_BASE_URL}/${service}/${variant}/topics/${id}`
      : `${process?.env?.SIMORGH_BASE_URL}/${service}/topics/${id}`;
  };

  return (
    topics &&
    isEnabled && (
      <StyledTopicsWrapper
        aria-labelledby="related-topics"
        role="complementary"
      >
        <StyledSectionLabel
          bar
          script={script}
          service={service}
          dir={dir}
          labelId="related-topics"
        >
          {heading}
        </StyledSectionLabel>
        <TopicTags service={service} script={script}>
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

RelatedTopics.propTypes = {
  topics: arrayOf(
    shape({
      topicName: string,
      topicId: string,
    }),
  ),
};

RelatedTopics.defaultProps = {
  topics: null,
};

export default RelatedTopics;
