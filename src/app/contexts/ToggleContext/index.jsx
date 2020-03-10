import React, { createContext, useEffect, useReducer } from 'react';
import webLogger from '#lib/logger.web';
import { node, string } from 'prop-types';
import { toggleReducer, updateToggles } from './reducer';
import defaultToggles from '#lib/config/toggles';
import constructTogglesEndpoint from './utils/constructTogglesEndpoint';

const logger = webLogger();
const ToggleContext = createContext({});
const REMOTE_TOGGLES = ['ads'];

const ToggleContextProvider = ({ children, service, origin }) => {
  const simorghToggles = defaultToggles[process.env.SIMORGH_APP_ENV || 'local'];
  const [toggleState, toggleDispatch] = useReducer(
    toggleReducer,
    simorghToggles,
  );

  const environment = process.env.SIMORGH_APP_ENV || 'local';

  // temp method to only enable remote freature toggling for test and for a list of services
  const { remoteFeatureToggles } = defaultToggles[environment];

  useEffect(() => {
    if (
      remoteFeatureToggles.enabled &&
      service.match(remoteFeatureToggles.value)
    ) {
      const isRemoteToggle = Object.keys(simorghToggles).some(toggle =>
        REMOTE_TOGGLES.includes(toggle),
      );
      if (isRemoteToggle) {
        const fetchAndUpdateToggles = async () => {
          try {
            console.log('fetching', constructTogglesEndpoint(service, origin));
            const response = await fetch(
              constructTogglesEndpoint(service, origin),
            );

            const jsonData = await response.json();
            console.log(jsonData);

            // container code: const { ads } = toggleContext(); if(ads && ads.enabled)
            // When we make the server request, the geoiplookup won't need to be made.
            // Containers that require a geoip-specific setup
            //
            toggleDispatch(updateToggles(jsonData));
          } catch (error) {
            logger.error(`Error: ${error}`);
          }
        };
        fetchAndUpdateToggles();
      }
    }
  }, [
    service,
    origin,
    remoteFeatureToggles.enabled,
    remoteFeatureToggles.value,
    simorghToggles,
  ]);

  return (
    <ToggleContext.Provider value={{ toggleState, toggleDispatch }}>
      {children}
    </ToggleContext.Provider>
  );
};

const ToggleContextConsumer = ToggleContext.Consumer;

ToggleContextProvider.propTypes = {
  // children: node.isRequired, todo add this back in
  service: string.isRequired,
};

export { ToggleContext, ToggleContextProvider, ToggleContextConsumer };
