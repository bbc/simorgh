import React, { createContext, useEffect, useReducer } from 'react';
import { node, string } from 'prop-types';
import webLogger from '#lib/logger.web';
import { toggleReducer, updateToggles } from './reducer';
import defaultToggles from '#lib/config/toggles';
import constructTogglesEndpoint from './utils/constructTogglesEndpoint';

const logger = webLogger();
const ToggleContext = createContext({});

const ToggleContextProvider = ({ children, service, origin }) => {
  const environment = process.env.SIMORGH_APP_ENV || 'local';
  const simorghToggles = defaultToggles[environment];
  const [toggleState, toggleDispatch] = useReducer(
    toggleReducer,
    simorghToggles,
  );

  // temp method to only enable remote feature toggling for test and for a list of services
  const { enableFetchingToggles } = simorghToggles;

  useEffect(() => {
    const shouldFetchAndUpdateToggles =
      enableFetchingToggles.enabled &&
      RegExp(enableFetchingToggles.value).test(service);

    if (shouldFetchAndUpdateToggles) {
      const fetchAndUpdateToggles = async () => {
        try {
          const response = await fetch(
            constructTogglesEndpoint(service, origin),
          );

          const jsonData = await response.json();

          toggleDispatch(updateToggles(jsonData));
        } catch (error) {
          logger.error(
            JSON.stringify(
              {
                event: 'toggle_fetch_error',
                message: error,
              },
              null,
              2,
            ),
          );
        }
      };
      fetchAndUpdateToggles();
    }
  }, [
    service,
    origin,
    enableFetchingToggles.enabled,
    enableFetchingToggles.value,
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
  children: node.isRequired,
  origin: string.isRequired,
  service: string.isRequired,
};

export { ToggleContext, ToggleContextProvider, ToggleContextConsumer };
