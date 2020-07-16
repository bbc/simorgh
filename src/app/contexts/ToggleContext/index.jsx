import React, { createContext, useReducer } from 'react';
import { node, string, shape, bool } from 'prop-types';
import { toggleReducer } from './reducer';
import defaultToggles from '#lib/config/toggles';

const ToggleContext = createContext({});

const ToggleContextProvider = ({ children, remoteToggles }) => {
  const environment = process.env.SIMORGH_APP_ENV || 'local';

  const simorghToggles = {
    ...defaultToggles[environment],
    ...remoteToggles,
  };

  const [toggleState, toggleDispatch] = useReducer(
    toggleReducer,
    simorghToggles,
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
  remoteToggles: shape({
    service: string.isRequired,
    ads: shape({
      enabled: bool.isRequired,
    }),
  }),
};

ToggleContextProvider.defaultProps = {
  remoteToggles: {},
};

export { ToggleContext, ToggleContextProvider, ToggleContextConsumer };
