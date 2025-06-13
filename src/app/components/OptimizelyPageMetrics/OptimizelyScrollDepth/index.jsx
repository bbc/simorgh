import useOptimizelyScrollDepth from '#hooks/useOptimizelyScrollDepth';

// bit long winded - but avoids breaking react hooks rule
const OptimizelyScrollDepth = () => {
  useOptimizelyScrollDepth();
  return null;
};

export default OptimizelyScrollDepth;
