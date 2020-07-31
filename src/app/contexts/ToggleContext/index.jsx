import React, { createContext, useReducer } from 'react';
import { node, object } from 'prop-types';
import { toggleReducer } from './reducer';

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
  toggles: object.isRequired,
};

export { ToggleContext, ToggleContextProvider, ToggleContextConsumer };
