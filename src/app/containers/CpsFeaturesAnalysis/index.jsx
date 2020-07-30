import React, { useContext } from 'react';
import { arrayOf, shape, number } from 'prop-types';
import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';
import { pathOr } from 'ramda';

import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import StoryPromo from '../StoryPromo';
import CpsOnwardJourney from '../CpsOnwardJourney';

const FeaturesAnalysis = ({ content, parentColumns }) => {
  const { dir, translations } = useContext(ServiceContext);

  const title = pathOr(
    'Features & Analysis',
    ['featuresAnalysisTitle'],
    translations,
  );

  const singleTransform = promo => (
    <StoryPromo item={promo} dir={dir} displayImage />
  );

  const listTransform = items => (
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

  return (
    <CpsOnwardJourney
      labelId="features-analysis-heading"
      title={title}
      content={content}
      parentColumns={parentColumns}
      singleTransform={singleTransform}
      listTransform={listTransform}
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
