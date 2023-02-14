import React from 'react';
import { arrayOf, shape, oneOfType } from 'prop-types';
import path from 'ramda/src/path';
import useOptimizelyMvtVariation from '../../../hooks/useOptimizelyMvtVariation';
import CpsRecommendations from '../CpsRecommendations';
import cpsAssetPagePropTypes from '../../../models/propTypes/cpsAssetPage';
import {
  storyItem,
  optimoStoryItem,
} from '../../../models/propTypes/storyItem';

// 004_brasil_recommendations_experiment
const optimizelyMappings = {
  content_recs: 'datalabContentRecommendations',
  hybrid_recs: 'datalabHybridRecommendations',
};

const gridColsMain = {
  group0: 8,
  group1: 8,
  group2: 8,
  group3: 8,
  group4: 8,
  group5: 8,
};

const CpsRecommendationsVaried = ({
  pageData,
  recommendationsData,
  ...props
}) => {
  let unirecsHybridRecommendationData = null;
  const variation = useOptimizelyMvtVariation('test_2');
  console.log('HELLO', variation);
  if (variation && variation !== 'control') {
    unirecsHybridRecommendationData = path(
      [optimizelyMappings[variation]],
      pageData,
    );
  }
  console.log('CHECK', variation);
  return (
    <CpsRecommendations
      {...props}
      parentColumns={gridColsMain}
      items={unirecsHybridRecommendationData ?? recommendationsData}
    />
  );
};

CpsRecommendationsVaried.propTypes = {
  pageData: cpsAssetPagePropTypes.isRequired,
  recommendationsData: arrayOf(
    oneOfType([shape(storyItem), shape(optimoStoryItem)]),
  ).isRequired,
};

export default CpsRecommendationsVaried;
