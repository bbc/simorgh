export const isFeatureEnabled = (flag, featureFlags) => {
  if (featureFlags[flag]) return featureFlags[flag];

  return false;
};

export const isEqual = (currentFlags, remoteFlags) =>
  JSON.stringify(currentFlags) === JSON.stringify(remoteFlags);
