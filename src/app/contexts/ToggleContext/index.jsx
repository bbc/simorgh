import React, { createContext, useEffect, useReducer } from 'react';
import { node } from 'prop-types';
import { toggleReducer, updateToggles } from './reducer';
import defaultToggles from '#lib/config/toggles';

const ToggleContext = createContext({});

const ToggleContextProvider = ({ children }) => {
  const simorghToggles = defaultToggles[process.env.SIMORGH_APP_ENV];
  const [toggleState, toggleDispatch] = useReducer(
    toggleReducer,
    simorghToggles,
  );

  useEffect(() => {
    const fetchAndUpdateToggles = async () => {
      // Following is commented out since we get CORS issues

      // const data = await fetch(
      //   `https://toggles.test.api.bbci.co.uk/toggles?application=amp&service=mundo&__amp_source_origin=https://www.bbc.com`,
      //   {
      //     credentials: 'include',
      //   },
      // );
      // const jsonData = await data.json();
      const fixtureData = {
        toggles: {
          ads: { enabled: true, value: '' },
          wsoj: { enabled: true, value: '' },
        },
      };

      // container code: const { ads } = toggleContext(); if(ads && ads.enabled)
      // When we make the server request, the geoiplookup won't need to be made.
      // Containers that require a geoip-specific setup
      //
      console.log('useeffect');
      toggleDispatch(updateToggles(fixtureData));
    };
    fetchAndUpdateToggles();
  }, []);

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
