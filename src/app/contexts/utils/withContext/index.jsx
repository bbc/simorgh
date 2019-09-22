import React from 'react';
import { node, string } from 'prop-types';

const withContext = data => {
  const LoadedContextProvider = ({ Context, dataKey, children }) => (
    <Context.Provider value={data[dataKey]}>{children}</Context.Provider>
  );

  LoadedContextProvider.propTypes = {
    Context: node.isRequired,
    children: node.isRequired,
    dataKey: string,
  };

  LoadedContextProvider.defaultProps = {
    dataKey: null,
  };

  return LoadedContextProvider;
};

export default withContext;
