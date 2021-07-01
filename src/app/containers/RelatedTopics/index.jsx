import React, { useContext } from 'react';
import { TopicTag, TopicTags } from '@bbc/psammead-topic-tags';
import { pathOr } from 'ramda';
import SectionLabel from '@bbc/psammead-section-label';
import styled from '@emotion/styled';
import { arrayOf, shape, string, node } from 'prop-types';
import { GelPageGrid, GridItemLarge } from '#components/Grid';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { RequestContext } from '#app/contexts/RequestContext';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import useViewTracker from '#hooks/useViewTracker';
import useToggle from '#hooks/useToggle';

const eventTrackingData = {
  componentName: 'topics',
};

const StyledTopicsWrapper = styled.aside`
  padding-bottom: 2.5rem;
`;

const StyledSectionLabel = styled(SectionLabel)`
  margin-top: 0;
`;

export const RelatedTopicsWrapper = ({ children }) => (
  <GelPageGrid
    enableGelGutters
    columns={{
      group0: 6,
      group1: 6,
      group2: 6,
      group3: 6,
      group4: 8,
      group5: 20,
    }}
  >
    <GridItemLarge>{children}</GridItemLarge>
  </GelPageGrid>
);

RelatedTopicsWrapper.propTypes = {
  children: node.isRequired,
};

const RelatedTopics = ({ topics }) => {
  const { service, script, translations, dir } = useContext(ServiceContext);
  const { variant } = useContext(RequestContext);
  const { enabled: topicTagsAreEnabled } = useToggle('topicsTags');
  const clickTrackerHandler = useClickTrackerHandler(eventTrackingData);
  const viewRef = useViewTracker(eventTrackingData);
  const heading = pathOr('Related Topics', ['relatedTopics'], translations);

  const getTopicPageUrl = id => {
    return variant
      ? `${process.env.SIMORGH_BASE_URL}/${service}/${variant}/topics/${id}`
      : `${process.env.SIMORGH_BASE_URL}/${service}/topics/${id}`;
  };

  return (
    topics &&
    topicTagsAreEnabled && (
      <StyledTopicsWrapper aria-labelledby="related-topics">
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
