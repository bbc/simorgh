import React, { useContext } from 'react';

// context
import { FeatureFlagContext } from '../../contexts/FeatureFlagContext';

const featureEnabled = (flag, featureFlags) => {
  if (featureFlags[flag]) return featureFlags[flag].enabled;

  return false;
};

const FeatureFlagContainer = ({ flag, children }) => {
  const { featureFlagState } = useContext(FeatureFlagContext);
  const isEnabled = featureEnabled(flag, featureFlagState);

  console.log(`feature flags: ${JSON.stringify(featureFlagState)}`);

  return isEnabled ? children : <h4>{flag} Not Enabled</h4>;
};

export default FeatureFlagContainer;
