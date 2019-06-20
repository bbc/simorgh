import React, { useContext } from 'react';
import { FeatureFlagContext } from '../../contexts/FeatureFlagContext';

const featureEnabled = (flag, featureFlags) => {
  if (featureFlags[flag]) return featureFlags[flag].enabled;

  return false;
};

const FeatureFlagContainer = ({ flag, children }) => {
  const featureFlags = useContext(FeatureFlagContext);
  const isEnabled = featureEnabled(flag, featureFlags.defaults);

  return isEnabled ? children : <h4>{flag} Not Enabled</h4>;
};

export default FeatureFlagContainer;
