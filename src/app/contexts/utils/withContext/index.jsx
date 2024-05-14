import React from 'react';

const withContext = data => {
  const LoadedContextProvider = ({ Context, dataKey = null, children }) => (
    <Context.Provider value={dataKey ? data[dataKey] : data}>
      {children}
    </Context.Provider>
  );

  return LoadedContextProvider;
};

export default withContext;
