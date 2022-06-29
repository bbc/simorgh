import React from 'react';

import { arrayOf, shape, string } from 'prop-types';
import { storyItem } from '#models/propTypes/storyItem';
import { StoryPromoList, FlexListItem } from '../index.styles';
import TopStoriesItem from './TopStoriesItem';

const TopStoriesList = ({ content, labelId }) => {
  return (
    <StoryPromoList>
      {content.map(item => {
        return (
          <FlexListItem>
            <TopStoriesItem item={item} labelId={labelId} />
          </FlexListItem>
        );
      })}
    </StoryPromoList>
  );
};

TopStoriesList.propTypes = {
  content: arrayOf(shape(storyItem)),
  labelId: string.isRequired,
};

TopStoriesList.defaultProps = { content: [] };

export default TopStoriesList;
