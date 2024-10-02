import React from 'react';
import CpsRecommendations from '#containers/CpsRecommendations';
import { OptimizelyExperiment } from '@optimizely/react-sdk';
import OPTIMIZELY_CONFIG from '#lib/config/optimizely';
import pathOr from 'ramda/src/pathOr';
import { Article } from '#app/models/types/optimo';

// 005_brasil_recommendations_experiment
const OptimizelyRecommendation = ({
  pageData,
  ...props
}: {
  pageData: Article;
}) => {
  const recommendationsData = pathOr(
    [] as null[],
    ['recommendations'],
    pageData,
  );

  return (
    <OptimizelyExperiment experiment={OPTIMIZELY_CONFIG.flagId}>
      {variation => {
        let unirecsHybridRecommendationData = null;
        if (variation && variation !== 'control') {
          unirecsHybridRecommendationData = pathOr(
            null,
            [
              OPTIMIZELY_CONFIG.variationMappings[
                variation as keyof typeof OPTIMIZELY_CONFIG.variationMappings
              ],
            ],
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

export default OptimizelyRecommendation;
