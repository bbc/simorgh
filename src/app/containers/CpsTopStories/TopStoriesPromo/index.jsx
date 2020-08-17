import React from 'react';
import { shape, string } from 'prop-types';
import StoryPromo from '../../StoryPromo';
import { storyItem } from '#models/propTypes/storyItem';

const TopStoriesPromo = ({ promo, dir }) => {
  return (
    <StoryPromo
      item={promo}
      dir={dir}
      displayImage={false}
      displaySummary={false}
    />
  );
};

TopStoriesPromo.propTypes = {
  dir: string.isRequired,
  promo: shape({ storyItem }).isRequired,
};

export default TopStoriesPromo;
