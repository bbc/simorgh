import useOptimizelyScrollDepth from '#hooks/useOptimizelyScrollDepth';
import { experimentsForScrollDepthTracking as experiments } from '../experimentsForPageMetrics';

const ScrollDepthTracking = () => {
  useOptimizelyScrollDepth(experiments);
  return null;
};

export default ScrollDepthTracking;
