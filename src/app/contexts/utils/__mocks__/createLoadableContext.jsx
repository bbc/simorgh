import React from 'react';

/*
 * This file is mocked by default to avoid having to handle
 * async behavior in tests across the application when
 * using service contexts.
 */
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
