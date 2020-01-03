import React from 'react';
import { node, string, elementType } from 'prop-types';

const withContext = data => {
  const value = data;

  const LoadedContextProvider = ({ Context, dataKey, children }) => (
    <Context.Provider value={dataKey ? value[dataKey] : value}>
      {children}
    </Context.Provider>
  );

  LoadedContextProvider.propTypes = {
    Context: elementType.isRequired,
    children: node.isRequired,
    dataKey: string,
  };

  LoadedContextProvider.defaultProps = {
    dataKey: null,
  };

  return LoadedContextProvider;
};

export default withContext;
