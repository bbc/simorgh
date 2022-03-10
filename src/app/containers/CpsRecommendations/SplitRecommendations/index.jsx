import React from 'react';
import { arrayOf, shape, number, string, func } from 'prop-types';
import { storyItem } from '#models/propTypes/storyItem';
import CpsRecommendations from '..';

/*
 * OPTIMIZELY: 003_hindi_experiment_feature.
 * This component should be removed after the experiment.
 */
const SplitRecommendations = ({ items, ...props }) => {
  const { parentColumns, part, splitRecsViewEventTracker } = props;

  if (!Array.isArray(items)) {
    return null;
  }

  if (part === 1) {
    const firstPart = items && items.slice(0, 2);
    return (
      <CpsRecommendations
        {...props}
        parentColumns={parentColumns}
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
        parentColumns={parentColumns}
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
  parentColumns: shape({
    group0: number.isRequired,
    group1: number.isRequired,
    group2: number.isRequired,
    group3: number.isRequired,
    group4: number.isRequired,
    group5: number.isRequired,
  }).isRequired,
  splitRecsViewEventTracker: func.isRequired,
};

SplitRecommendations.defaultProps = {
  items: [],
};

export default SplitRecommendations;
