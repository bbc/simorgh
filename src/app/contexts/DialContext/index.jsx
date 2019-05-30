import React from 'react';
import { any, objectOf, node } from 'prop-types';

export const DialContext = React.createContext({});

export const DialContextProvider = ({ dials, children }) => (
  <DialContext.Provider value={dials}>{children}</DialContext.Provider>
);

DialContextProvider.propTypes = {
  dials: objectOf(any).isRequired,
  children: node.isRequired,
};
