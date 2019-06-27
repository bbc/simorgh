import { useContext, useEffect } from 'react';
import { FeatureFlagContext } from '../../contexts/FeatureFlagContext';
import { updateFeatureFlags } from '../../reducers/FeatureFlagReducer';
import { isEqual } from '../FeatureFlag/featureFlagUtils';

const FeatureFlagUpdater = () => {
  const { featureFlagState, featureFlagDispatch } = useContext(
    FeatureFlagContext,
  );

  // this function shouldnt live here, I'd like to see a custom hook that can be used for fetching data client side.
  const fetchData = async () => {
    // fetch from temp endpoint as toggles api is restricted based on the origin of the request
    const res = await fetch('http://www.mocky.io/v2/5d133cc00e0000b256b4a37d');
    res
      .json()
      .then(res => {
        compareRemoteFeatureFlags(res.toggles);
      })
      .catch(err => console.error(err));
  };

  const compareRemoteFeatureFlags = remoteFlags => {
    if (!isEqual(featureFlagState, remoteFlags)) {
      // if remote flags differ to flags in context, dispatch an action to update the context with the remote flags.
      featureFlagDispatch(updateFeatureFlags(remoteFlags));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return null;
};

export default FeatureFlagUpdater;
