import { useContext, PropsWithChildren } from 'react';
import { Recommendation } from '#app/models/types/optimo';
import nodeLogger from '../../../lib/logger.node';
import { RECOMMENDATIONS_MISSING_DATA } from '../../../lib/logger.const';
import { RequestContext } from '../../../contexts/RequestContext';

const logger = nodeLogger(__filename);

const checkRecommendations = (recommendations: Recommendation[]) => {
  const isValidRecommendations = recommendations?.every(
    recommendation => recommendation.headlines && recommendation.locators,
  );
  return isValidRecommendations;
};

function ErrorBoundary({
  recommendations,
  children,
}: PropsWithChildren<{ recommendations: Recommendation[] }>) {
  const { pathname } = useContext(RequestContext);

  const isValidRecommendations = checkRecommendations(recommendations);

  if (!isValidRecommendations) {
    logger.error(RECOMMENDATIONS_MISSING_DATA, {
      url: pathname,
    });

    return null;
  }

  return children;
}

export default ErrorBoundary;
