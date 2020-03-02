import React, { createContext, useEffect, useReducer } from 'react';
import { node } from 'prop-types';
import { toggleReducer, updateToggles } from './reducer';
import defaultToggles from '#lib/config/toggles';

const ToggleContext = createContext({});

const ToggleContextProvider = ({ children }) => {
  const [toggleState, toggleDispatch] = useReducer(
    toggleReducer,
    defaultToggles,
  );

  useEffect(() => {
    const fetchTogglesData = async () => {
      const data = await fetch(
        `https://toggles.test.api.bbci.co.uk/toggles?application=amp&service=mundo`,
        {
          credentials: 'include',
          headers: { Origin: 'https://www.bbc.com' },
          mode: 'no-cors',
        },
      );
      const jsonData = await data.json();
      toggleDispatch(updateToggles(jsonData));
    };
    console.log(fetchTogglesData());
  });

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
