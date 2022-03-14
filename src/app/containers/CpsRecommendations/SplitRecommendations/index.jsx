import React from 'react';
import { arrayOf, shape, number, string, func } from 'prop-types';
import { storyItem } from '#models/propTypes/storyItem';
import CpsRecommendations from '..';

/*
 * OPTIMIZELY: 003_hindi_experiment_feature.
 * This component should be removed after the experiment.
 */
const SplitRecommendations = ({ items, ...props }) => {
  const { part, splitRecsViewEventTracker } = props;

  if (!Array.isArray(items)) {
    return null;
  }

  if (part === 1) {
    const firstPart = items && items.slice(0, 2);
    return (
      <CpsRecommendations
        {...props}
        items={firstPart}
        splitRecsViewEventTracker={splitRecsViewEventTracker}
      />
    );
  }

  if (part === 2) {
    const secondPart = items && items.slice(2, 4);
    return (
      <CpsRecommendations
        {...props}
        items={secondPart}
        splitRecsViewEventTracker={splitRecsViewEventTracker}
      />
    );
  }

  return null;
};

SplitRecommendations.propTypes = {
  items: arrayOf(shape(storyItem)),
  showVariation: string.isRequired,
  part: number.isRequired,
  splitRecsViewEventTracker: func.isRequired,
};

SplitRecommendations.defaultProps = {
  items: [],
};

export default SplitRecommendations;
