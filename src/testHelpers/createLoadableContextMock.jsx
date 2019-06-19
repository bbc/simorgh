/* eslint-disable global-require */
import React from 'react';

/*
 *
 * Mock createLoadableContext globally.
 *
 * This is done to avoid complexity of having dynamic imports throughout the
 * application which are async. This simply provides the context provider as
 * a normal sync component.
 *
 */
jest.mock(
  '../app/contexts/utils/createLoadableContext',
  () => (Context, dynamicConfig) => {
    const syncServices = require('../app/lib/config/services');

    return (
      { children }, // eslint-disable-line react/prop-types
    ) => (
      <Context.Provider value={syncServices.default[dynamicConfig.name]}>
        {children}
      </Context.Provider>
    );
  },
);
