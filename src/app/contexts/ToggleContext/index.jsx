import React, { createContext, useReducer } from 'react';
import { node } from 'prop-types';
import defaultToggles from '@lib/config/toggles';
import toggleReducer from '../../reducers/ToggleReducer';

const ToggleContext = createContext();

const ToggleContextProvider = ({ children }) => {
  const [toggleState, toggleDispatch] = useReducer(
    toggleReducer,
    defaultToggles,
  );

  return (
    <ToggleContext.Provider value={{ toggleState, toggleDispatch }}>
      {children}
    </ToggleContext.Provider>
  );
};

const ToggleContextConsumer = ToggleContext.Consumer;

ToggleContextProvider.propTypes = {
  children: node.isRequired,
};

export { ToggleContext, ToggleContextProvider, ToggleContextConsumer };
