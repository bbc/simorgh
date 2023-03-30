import React from 'react';
import { InferProps } from 'prop-types';
import { articleDataPropTypes } from '#models/propTypes/article';
import CpsRecommendations from '#containers/CpsRecommendations';
import { OptimizelyExperiment } from '@optimizely/react-sdk';
import OPTIMIZELY_CONFIG from '#lib/config/optimizely';
import pathOr from 'ramda/src/pathOr';

// 005_brasil_recommendations_experiment
const OptimizelyRecommendation = ({
  pageData,
  ...props
}: {
  pageData: ArticlePageType;
}) => {
  const recommendationsData = pathOr(
    [] as null[],
    ['recommendations'],
    pageData,
  );

  return (
    <OptimizelyExperiment experiment={OPTIMIZELY_CONFIG.experimentId}>
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

OptimizelyRecommendation.propTypes = {
  pageData: articleDataPropTypes.isRequired,
};

export type ArticlePageType = InferProps<typeof articleDataPropTypes>;

export default OptimizelyRecommendation;
