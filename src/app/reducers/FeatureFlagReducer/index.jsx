// FeatureFlag Actions
const updateFeatureFlags = data => ({
  type: 'UPDATE_FEATURE_FLAGS',
  data,
});

const featureFlagReducer = (featureFlagState, action) => {
  const { data, type } = action;

  switch (type) {
    case 'UPDATE_FEATURE_FLAGS':
      console.log(`existing flags ${JSON.stringify(featureFlagState)}`);
      console.log(`feature flags updating ${JSON.stringify(data)}`);
      return { ...featureFlagState, ...data };
    default:
      return featureFlagState;
  }
};

export { featureFlagReducer, updateFeatureFlags };
