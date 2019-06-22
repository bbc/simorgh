import React, { useContext } from 'react';
import { isFeatureEnabled } from './featureFlagUtils.js';

// context
import { FeatureFlagContext } from '../../contexts/FeatureFlagContext';

const FeatureFlagContainer = ({ flag, FallbackUi, children }) => {
  const { featureFlagState } = useContext(FeatureFlagContext);
  const { enabled } = isFeatureEnabled(flag, featureFlagState);

  if (enabled) {
    return children;
  } else if (FallbackUi) {
    return <FallbackUi />;
  } else {
    return null;
  }
};

export default FeatureFlagContainer;
