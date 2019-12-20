import React from 'react';
import { node, string, elementType } from 'prop-types';

const withContext = data => {
  const value = data;

  const LoadedContextProvider = ({
    Context,
    dataKey,
    children,
    preferredServiceVariant,
    otherVariant,
  }) => {
    if (preferredServiceVariant) {
      const { scriptLink } = value[otherVariant];
      value[dataKey].scriptLink = scriptLink;
    }

    return (
      <Context.Provider value={dataKey ? value[dataKey] : value}>
        {children}
      </Context.Provider>
    );
  };

  LoadedContextProvider.propTypes = {
    Context: elementType.isRequired,
    children: node.isRequired,
    preferredServiceVariant: string,
    otherVariant: string,
    dataKey: string,
  };

  LoadedContextProvider.defaultProps = {
    preferredServiceVariant: null,
    otherVariant: null,
    dataKey: null,
  };

  return LoadedContextProvider;
};

export default withContext;
