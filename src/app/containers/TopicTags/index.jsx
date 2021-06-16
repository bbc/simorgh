import React, { useContext } from 'react';
import { TopicTag, TopicTags } from '@bbc/psammead-topic-tags';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { getBrevier } from '@bbc/gel-foundations/typography';
import { pathOr } from 'ramda';
import styled from '@emotion/styled';
import { ServiceContext } from '#app/contexts/ServiceContext';

const StyledHeading = styled.h2`
  ${({ service }) =>
    getSansRegular(service)} // Need to check 'getSansRegular' with UX
${({ script }) =>
    script && getBrevier(script)} // Need to check 'getBrevier' with UX
`;

const Topics = ({ topics }) => {
  // what does topics object look like?
  // how do we take json and produce topics object?
  const { service, script, translations } = useContext(ServiceContext);

  const heading = pathOr('Related Topics', ['relatedTopics'], translations);

  return (
    <aside>
      <StyledHeading service={service} script={script}>
        {heading}
      </StyledHeading>
      <TopicTags service={service} script={script}>
        {topics.map(({ topicName }) => (
          <TopicTag name={topicName} link="https://google.com" />
        ))}
      </TopicTags>
    </aside>
  );
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
