export const isFeatureEnabled = (flag, featureFlags) => {
  if (featureFlags[flag]) return featureFlags[flag];

  return false;
};
