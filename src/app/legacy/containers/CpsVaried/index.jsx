import path from 'ramda/src/path';
import useOptimizelyMvtVariation from '../../../hooks/useOptimizelyMvtVariation';

// 004_brasil_recommendations_experiment
const optimizelyMappings = {
  content_recs: 'datalabContentRecommendations',
  hybrid_recs: 'datalabHybridRecommendations',
};

const CpsVaried = ({ pageData, recommendationsData, renderFunction }) => {
  let unirecsHybridRecommendationData = null;
  const variation = useOptimizelyMvtVariation('test_2');
  if (variation && variation !== 'control') {
    unirecsHybridRecommendationData = path(
      [optimizelyMappings[variation]],
      pageData,
    );
  }
  const data = unirecsHybridRecommendationData ?? recommendationsData;
  return renderFunction(data);
};

export default CpsVaried;
