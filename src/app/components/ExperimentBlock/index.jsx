import useOptimizelyVariation from '#hooks/useOptimizelyVariation';

const ExperimentBlock = ({ showForVariant, experimentId, children }) => {
  const promoVariation = useOptimizelyVariation(experimentId);

  if (promoVariation === showForVariant) {
    return children;
  }
  return null;
};

export default ExperimentBlock;
