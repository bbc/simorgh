import React from 'react';

import { arrayOf, shape } from 'prop-types';
import { storyItem } from '#models/propTypes/storyItem';
import { StoryPromoList, FlexListItem } from '../index.styles';
import TopStoriesItem from './TopStoriesItem';

const TopStoriesList = ({ content }) => {
  return (
    <StoryPromoList>
      {content.map(item => {
        return (
          <FlexListItem>
            <TopStoriesItem item={item} />
          </FlexListItem>
        );
      })}
    </StoryPromoList>
  );
};

TopStoriesList.propTypes = { content: arrayOf(shape(storyItem)) };

TopStoriesList.defaultProps = { content: [] };

export default TopStoriesList;
