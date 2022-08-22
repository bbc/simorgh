import React, { createContext, useReducer } from 'react';
import { node, object } from 'prop-types';
import defaultToggles from '#lib/config/toggles';
import { toggleReducer } from './reducer';

const environment = process.env.SIMORGH_APP_ENV || 'local';

const ToggleContext = createContext({});

const ToggleContextProvider = ({ children, toggles }) => {
  const [toggleState, toggleDispatch] = useReducer(toggleReducer, toggles);

  return (
    <ToggleContext.Provider value={{ toggleState, toggleDispatch }}>
      {children}
    </ToggleContext.Provider>
  );
};

const ToggleContextConsumer = ToggleContext.Consumer;

ToggleContextProvider.propTypes = {
  children: node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  toggles: object,
};

ToggleContextProvider.defaultProps = {
  toggles: defaultToggles[environment],
};

export { ToggleContext, ToggleContextProvider, ToggleContextConsumer };
