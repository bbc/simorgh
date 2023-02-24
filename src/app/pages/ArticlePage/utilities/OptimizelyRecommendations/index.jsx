import React from 'react';
import { articleDataPropTypes } from '#models/propTypes/article';
import CpsRecommendations from '#containers/CpsRecommendations';
import { OptimizelyExperiment } from '@optimizely/react-sdk';
import OPTIMIZELY_CONFIG from '#lib/config/optimizely';
import path from 'ramda/src/path';

const OptimizelyRecommendation = ({ pageData, ...props }) => {
  const recommendationsData = path(['recommendations'], pageData);

  return (
    <OptimizelyExperiment experiment={OPTIMIZELY_CONFIG.experimentId}>
      {variation => {
        let unirecsHybridRecommendationData = null;
        if (variation && variation !== 'control') {
          unirecsHybridRecommendationData = path(
            [OPTIMIZELY_CONFIG.variationMappings[variation]],
            pageData,
          );
        }

        return (
          <CpsRecommendations
            {...props}
            items={unirecsHybridRecommendationData ?? recommendationsData}
          />
        );
      }}
    </OptimizelyExperiment>
  );
};

OptimizelyRecommendation.propTypes = {
  pageData: articleDataPropTypes.isRequired,
};

export default OptimizelyRecommendation;
