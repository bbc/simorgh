import React, { useContext } from 'react';
import { arrayOf, shape } from 'prop-types';
import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';

import featuresAnalysis from '#pages/StoryPage/featuresAnalysis.json';
import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import StoryPromo from '../StoryPromo';
import CpsOnwardJourney from '../CpsOnwardJourney';

const FeaturesAnalysis = ({ content }) => {
  const { dir } = useContext(ServiceContext);

  const singleTransform = (promo) => (
    <StoryPromo item={promo} dir={dir} displayImage />
  );

  const listTransform = (items) => (
    <StoryPromoUl>
      {items.map((item) => (
        <StoryPromoLi key={item.id || item.uri}>
          <StoryPromo item={item} dir={dir} displayImage />
        </StoryPromoLi>
      ))}
    </StoryPromoUl>
  );

  return (
    <CpsOnwardJourney
      labelId="features-analysis-heading"
      title="Features &amp; Analysis"
      content={content}
      enableGridWrapper={false}
      singleTransform={singleTransform}
      listTransform={listTransform}
    />
  );
};

FeaturesAnalysis.propTypes = {
  content: arrayOf(shape(storyItem)),
};

FeaturesAnalysis.defaultProps = {
  content: featuresAnalysis, // TODO: rm this https://github.com/bbc/simorgh/issues/5765
};

export default FeaturesAnalysis;
