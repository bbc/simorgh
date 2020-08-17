import React from 'react';
import { shape, oneOf } from 'prop-types';
import StoryPromo from '../../StoryPromo';
import { storyItem } from '#models/propTypes/storyItem';

const FeaturesAnalysisPromo = ({ promo, dir }) => {
  return <StoryPromo item={promo} dir={dir} displayImage />;
};

FeaturesAnalysisPromo.propTypes = {
  dir: oneOf(['ltr', 'rtl']),
  promo: shape({ storyItem }).isRequired,
};

FeaturesAnalysisPromo.defaultProps = {
  dir: 'ltr',
};

export default FeaturesAnalysisPromo;
