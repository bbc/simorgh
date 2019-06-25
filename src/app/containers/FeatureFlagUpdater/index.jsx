import { useContext, useEffect } from 'react';
import { FeatureFlagContext } from '../../contexts/FeatureFlagContext';

const fetchFeatureFlags = async url => {
  const response = await fetch(url);
  const json = await response.json();

  return json;
};

const FeatureFlagUpdater = () => {
  const { featureFlagState, featureFlagDispatch } = useContext(
    FeatureFlagContext,
  );

  useEffect(() => {
    console.log('featureflag updater effect has run');
    console.log(`Feature Flag Updater: ${JSON.stringify(featureFlagState)}`);
    const remoteFeatureFlags = fetchFeatureFlags(
      'https://toggles.api.bbci.co.uk/toggles?application=amp&service=news',
      {
        mode: 'no-cors',
      },
    );
    console.log(`remote feature flags: ${remoteFeatureFlags}`);
  }, []);

  return null;
};

export default FeatureFlagUpdater;
