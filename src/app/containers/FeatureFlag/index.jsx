import React from 'react';
import useFeatureFlag from './useFeatureFlag';

const FeatureFlagContainer = ({ flag, FallbackUi, children }) => {
  const [enabled] = useFeatureFlag(flag);

  if (enabled) {
    return children;
  } else if (FallbackUi) {
    return <FallbackUi />;
  } else {
    return null;
  }
};

export default FeatureFlagContainer;
