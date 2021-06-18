import React, { useContext } from 'react';
import { TopicTag, TopicTags } from '@bbc/psammead-topic-tags';
import { pathOr } from 'ramda';
import SectionLabel from '@bbc/psammead-section-label';
import styled from '@emotion/styled';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/dist/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '@bbc/gel-foundations/dist/spacings';
import { arrayOf, shape, string } from 'prop-types';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { RequestContext } from '#app/contexts/RequestContext';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import useViewTracker from '#hooks/useViewTracker';

const eventTrackingData = {
  componentName: 'topic-tags', // Need to check with Jon B
};

const StyledTopicsWrapper = styled.aside`
  padding: 0 ${GEL_SPACING};
  padding-bottom: 2.5rem;

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding: 0 ${GEL_SPACING_DBL};
    padding-bottom: 2.5rem;
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding: 0;
    padding-bottom: 2.5rem;
  }
`;

const StyledSectionLabel = styled(SectionLabel)`
  margin-top: 0;
`;

const Topics = ({ topics }) => {
  const { service, script, translations, dir } = useContext(ServiceContext);
  const { variant } = useContext(RequestContext);
  const clickTrackerHandler = useClickTrackerHandler(eventTrackingData);
  const viewRef = useViewTracker(eventTrackingData);

  const heading = pathOr('Related Topics', ['relatedTopics'], translations);

  const getTopicPageUrl = id => {
    return variant
      ? `${process.env.SIMORGH_BASE_URL}/${service}/${variant}/topics/${id}`
      : `${process.env.SIMORGH_BASE_URL}/${service}/topics/${id}`;
  };

  return (
    <StyledTopicsWrapper aria-labelledby="related-topics">
      <StyledSectionLabel bar script={script} service={service} dir={dir}>
        {heading}
      </StyledSectionLabel>
      <TopicTags service={service} script={script}>
        {topics.map(({ topicName, topicId }) => (
          <TopicTag
            name={topicName}
            link={getTopicPageUrl(topicId)}
            onClick={clickTrackerHandler}
            ref={viewRef}
            key={topicId}
          />
        ))}
      </TopicTags>
    </StyledTopicsWrapper>
  );
};

Topics.propTypes = {
  topics: arrayOf(
    shape({
      topicName: string,
      topicId: string,
    }),
  ),
};

Topics.defaultProps = {
  topics: null,
};

export default Topics;

// "topics": [
//   {
//   "topicName": "Elecciones presidenciales en Estados Unidos 2020",
//   "topicId": "c404v5z20w4t",
//   "subjectList": [
//   {
//   "subjectId": "http://www.bbc.co.uk/things/10f9cc6b-0a52-46d3-bce6-9cd78b34600f#id",
//   "subjectType": "tag"
//   }
//   ],
//   "curationList": [
//   {
//   "curationId": "6e0332da-fd3e-4c64-8b17-aa6d50ebdb26",
//   "curationType": "vivo-stream",
//   "visualProminence": "NORMAL"
//   }
//   ],
//   "types": [
//   "core:Thing",
//   "core:Event",
//   "tagging:TagConcept"
//   ]
//   },
