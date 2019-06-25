import { useContext, useEffect } from 'react';
import { FeatureFlagContext } from '../../contexts/FeatureFlagContext';
import { updateFeatureFlags } from '../../reducers/FeatureFlagReducer';

const FeatureFlagUpdater = () => {
  const { featureFlagState, featureFlagDispatch } = useContext(
    FeatureFlagContext,
  );

  // this function shouldnt live here, I'd like to see a custom hook that can be used for fetching data client side.
  const fetchData = async () => {
    // fetch from temp endpoint as toggles api is restricted based on the origin of the request
    const res = await fetch('http://www.mocky.io/v2/5d1273b53100001ec508d371');
    res
      .json()
      .then(res => {
        compareRemoteFeatureFlags(res);
      })
      .catch(err => console.error(err));
  };

  const compareRemoteFeatureFlags = remoteFlags => {
    // this is gross, and will evaluate to false if the key values are the same but the order is different
    const isEqual =
      JSON.stringify(featureFlagState) === JSON.stringify(remoteFlags.toggles);

    if (!isEqual) {
      // if remote flags differ to flags in context, dispatch an action to update the context with the remote flags, in turning re-rendering
      featureFlagDispatch(updateFeatureFlags(remoteFlags.toggles));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return null;
};

export default FeatureFlagUpdater;
