import React, { useContext } from 'react';
import { arrayOf, shape, number } from 'prop-types';
import { pathOr } from 'ramda';

import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';
import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import CpsOnwardJourney from '../CpsOnwardJourney';
import StoryPromo from '../StoryPromo';

const FeaturesAnalysis = ({ content, parentColumns }) => {
  const { translations } = useContext(ServiceContext);
  const title = pathOr(
    'Features & Analysis',
    ['featuresAnalysisTitle'],
    translations,
  );

  return (
    <CpsOnwardJourney
      labelId="features-analysis-heading"
      title={title}
      content={content}
      parentColumns={parentColumns}
      promoComponent={({ promo, dir }) => (
        <StoryPromo item={promo} dir={dir} displayImage />
      )}
      promoListComponent={({ promoItems, dir }) => (
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
      )}
      columnType="secondary"
    />
  );
};

FeaturesAnalysis.propTypes = {
  content: arrayOf(shape(storyItem)),
  parentColumns: shape({
    group0: number,
    group1: number,
    group2: number,
    group3: number,
    group4: number,
    group5: number,
  }),
};

FeaturesAnalysis.defaultProps = {
  content: [],
  parentColumns: null,
};

export default FeaturesAnalysis;
