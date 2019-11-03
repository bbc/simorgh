/* eslint-disable react/prop-types */
import React from 'react';

export const SecondaryDataContext = React.createContext({});

// would think harder about the format of this rather than just passing an object
// of any shape around

export const SecondaryDataContextProvider = ({ secondaryData, children }) => {
  return (
    <SecondaryDataContext.Provider value={secondaryData}>
      {children}
    </SecondaryDataContext.Provider>
  );
};
