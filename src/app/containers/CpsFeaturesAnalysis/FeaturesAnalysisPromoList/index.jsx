import React from 'react';
import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';
import { arrayOf, shape, string } from 'prop-types';
import StoryPromo from '../../StoryPromo';
import { storyItem } from '#models/propTypes/storyItem';

const FeaturesAnalysisPromoList = ({ promoItems, dir }) => {
  return (
    <StoryPromoUl>
      {promoItems.map(item => (
        <StoryPromoLi key={item.id || item.uri}>
          <StoryPromo
            item={item}
            dir={dir}
            displayImage
            displaySummary={false}
          />
        </StoryPromoLi>
      ))}
    </StoryPromoUl>
  );
};

FeaturesAnalysisPromoList.propTypes = {
  dir: string.isRequired,
  promoItems: arrayOf(shape(storyItem)).isRequired,
};

export default FeaturesAnalysisPromoList;
