import React, { useContext } from 'react';
import { arrayOf, shape } from 'prop-types';
import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';

import featuresAnalysis from '#pages/StoryPage/featuresAnalysis.json';
import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import StoryPromo from '../StoryPromo';
import CpsAsset from '../CpsAsset';

const FeaturesAnalysis = ({ content }) => {
  const { dir } = useContext(ServiceContext);
  const a11yAttributes = {
    as: 'section',
    role: 'region',
    'aria-labelledby': 'features-analysis-heading',
  };

  if (!content.length) return null;

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
    <CpsAsset
      title="Features &amp; Analysis"
      a11yAttributes={a11yAttributes}
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
  content: featuresAnalysis, // @TODO: rm this
};

export default FeaturesAnalysis;
