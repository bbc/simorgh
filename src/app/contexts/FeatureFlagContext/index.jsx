import React from 'react';
import { node, string } from 'prop-types';
import featureFlags from '../../lib/config/featuresFlags/featuredFlags.js';

export const FeatureFlagContext = React.createContext(featureFlags);

export const FeatureFlagContextProvider = ({ children }) => (
  <FeatureFlagContext.Provider value={featureFlags}>
    {children}
  </FeatureFlagContext.Provider>
);

FeatureFlagContext.propTypes = {
  children: node.isRequired,
  service: string,
};

FeatureFlagContext.defaultProps = {
  service: 'default',
};
