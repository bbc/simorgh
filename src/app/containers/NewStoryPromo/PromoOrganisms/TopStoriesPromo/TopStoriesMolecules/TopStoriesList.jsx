import React from 'react';

import { arrayOf, shape } from 'prop-types';
import { storyItem } from '#models/propTypes/storyItem';
import pathOr from 'ramda/src/pathOr';
import { StoryPromoList, FlexListItem } from '../index.styles';
import TopStoriesItem from './TopStoriesItem';

const TopStoriesList = ({ content }) => {
  return (
    <StoryPromoList>
      {content.map(promo => {
        const heading = pathOr(null, ['headlines', 'headline'], promo);
        const timestamp = pathOr(null, ['timestamp'], promo);
        const mediaType = pathOr(null, ['media', 'format'], promo);
        const url = pathOr(null, ['locators', 'assetUri'], promo);
        return (
          <FlexListItem>
            <TopStoriesItem
              url={url}
              heading={heading}
              mediaType={mediaType}
              timestamp={timestamp}
            />
          </FlexListItem>
        );
      })}
    </StoryPromoList>
  );
};

TopStoriesList.propTypes = { content: arrayOf(shape(storyItem)) };

TopStoriesList.defaultProps = { content: [] };

export default TopStoriesList;
