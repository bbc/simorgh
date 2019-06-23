import React from 'react';

const createLoadableContextMock = (Context, dynamicConfig) => {
  const syncServices = require('../../../lib/config/services'); // eslint-disable-line global-require

  return (
    { children }, // eslint-disable-line react/prop-types
  ) => (
    <Context.Provider value={syncServices.default[dynamicConfig.name]}>
      {children}
    </Context.Provider>
  );
};

export default createLoadableContextMock;
