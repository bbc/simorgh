import React, { createContext, useReducer } from 'react';
import defaultFeatureFlags from '../../lib/config/featuresFlags/featuredFlags.js';

// reducer
import { featureFlagReducer } from '../../reducers/FeatureFlagReducer';

const FEATURE_FLAG_INITIAL_STATE = defaultFeatureFlags;

const FeatureFlagContext = createContext();

const FeatureFlagContextProvider = ({ children }) => {
  const [featureFlagState, featureFlagDispatch] = useReducer(
    featureFlagReducer,
    FEATURE_FLAG_INITIAL_STATE,
  );

  return (
    <FeatureFlagContext.Provider
      value={{ featureFlagState, featureFlagDispatch }}
    >
      {children}
    </FeatureFlagContext.Provider>
  );
};

const FeatureFlagContextConsumer = FeatureFlagContext.Consumer;

export {
  FeatureFlagContext,
  FeatureFlagContextProvider,
  FeatureFlagContextConsumer,
};
