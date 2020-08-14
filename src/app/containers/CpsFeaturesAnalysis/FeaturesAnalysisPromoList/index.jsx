import React, { useContext } from 'react';
import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';
import StoryPromo from '../../StoryPromo';
import { ServiceContext } from '#contexts/ServiceContext';

const FeaturesAnalysisPromoList = items => {
  const { dir } = useContext(ServiceContext); // TODO could this be passed in?
  return (
    <StoryPromoUl>
      {items.map(item => (
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

export default FeaturesAnalysisPromoList;
