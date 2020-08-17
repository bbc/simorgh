import React from 'react';
import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';
import { arrayOf, shape, string } from 'prop-types';
import TopStoriesPromo from '../TopStoriesPromo';
import { storyItem } from '#models/propTypes/storyItem';

const TopStoriesPromoList = ({ promoItems, dir }) => {
  return (
    <StoryPromoUl>
      {promoItems.map(item => (
        <StoryPromoLi key={item.id || item.uri}>
          {TopStoriesPromo({ promo: item, dir })}
        </StoryPromoLi>
      ))}
    </StoryPromoUl>
  );
};

TopStoriesPromoList.propTypes = {
  dir: string.isRequired,
  promoItems: arrayOf(shape(storyItem)).isRequired,
};

export default TopStoriesPromoList;
