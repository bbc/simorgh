import React from 'react';
import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';
import TopStoriesPromo from '../TopStoriesPromo';

const TopStoriesPromoList = items => (
  <StoryPromoUl>
    {items.map(item => (
      <StoryPromoLi key={item.id || item.uri}>
        {TopStoriesPromo(item)}
      </StoryPromoLi>
    ))}
  </StoryPromoUl>
);

export default TopStoriesPromoList;
