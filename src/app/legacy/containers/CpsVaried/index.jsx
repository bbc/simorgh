import pathOr from 'ramda/src/pathOr';
import useOptimizelyMvtVariation from '../../../hooks/useOptimizelyMvtVariation';

// 004_brasil_recommendations_experiment
const optimizelyMappings = {
  content_recs: 'datalabContentRecommendations',
  hybrid_recs: 'datalabHybridRecommendations',
};

const CpsVariedRecommendation = ({
  pageData,
  renderFunction,
  experimentID,
}) => {
  let unirecsHybridRecommendationData = null;
  const variation = useOptimizelyMvtVariation(experimentID);

  if (variation && variation !== 'control') {
    unirecsHybridRecommendationData = pathOr(
      null,
      [optimizelyMappings[variation]],
      pageData,
    );
  }
  return renderFunction(unirecsHybridRecommendationData);
};

export default CpsVariedRecommendation;
