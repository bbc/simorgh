// FeatureFlag Actions
const updateFeatureFlags = data => ({
  type: 'UPDATE_FEATURE_FLAGS',
  data,
});

const featureFlagReducer = (featureFlagState, action) => {
  const { data, type } = action;

  switch (type) {
    case 'UPDATE_FEATURE_FLAGS':
      return { ...featureFlagState, ...data };
    default:
      return featureFlagState;
  }
};

export { featureFlagReducer, updateFeatureFlags };
