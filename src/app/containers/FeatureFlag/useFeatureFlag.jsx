import { useContext } from 'react';
import { isFeatureEnabled } from './featureFlagUtils.js';

// context
import { FeatureFlagContext } from '../../contexts/FeatureFlagContext';

const useFeatureFlag = flag => {
  const { featureFlagState } = useContext(FeatureFlagContext);
  const { enabled, value } = isFeatureEnabled(flag, featureFlagState);

  return [enabled, value];
};

export default useFeatureFlag;
