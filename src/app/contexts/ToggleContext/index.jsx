import React, { createContext, useEffect, useReducer } from 'react';
import { node, string } from 'prop-types';
import { toggleReducer, updateToggles } from './reducer';
import defaultToggles from '#lib/config/toggles';
import onClient from '../../lib/utilities/onClient';

const ToggleContext = createContext({});

const getTogglesEndpoint = (service, origin) => {
  const requestOrigin = origin ? origin : 'https://www.test.bbc.com';
  const baseTogglesUrl = `${process.env.SIMORGH_TOGGLES_URL}/toggles?application=simorgh&service=${service}&__amp_source_origin=${requestOrigin}`;

  // client side renders should trigger a geoIPLookup
  if (onClient()) {
    return `${baseTogglesUrl}&geoiplookup=true`;
  }

  return baseTogglesUrl;
};

const ToggleContextProvider = ({ children, service, origin }) => {
  const simorghToggles = defaultToggles[process.env.SIMORGH_APP_ENV];
  const [toggleState, toggleDispatch] = useReducer(
    toggleReducer,
    simorghToggles,
  );

  // temp method to only enable remote freature toggling for test and for a list of services
  const { remoteFeatureToggles } = defaultToggles[process.env.SIMORGH_APP_ENV];

  if (
    remoteFeatureToggles.enabled &&
    service.match(remoteFeatureToggles.value)
  ) {
    useEffect(() => {
      const fetchAndUpdateToggles = async () => {
        const response = await fetch(getTogglesEndpoint(service, origin));
        const jsonData = await response.json();

        // container code: const { ads } = toggleContext(); if(ads && ads.enabled)
        // When we make the server request, the geoiplookup won't need to be made.
        // Containers that require a geoip-specific setup
        //
        toggleDispatch(updateToggles(jsonData));
      };
      fetchAndUpdateToggles();
    }, [service]);
  }

  return (
    <ToggleContext.Provider value={{ toggleState, toggleDispatch }}>
      {children}
    </ToggleContext.Provider>
  );
};

const ToggleContextConsumer = ToggleContext.Consumer;

ToggleContextProvider.propTypes = {
  children: node.isRequired,
  service: string.isRequired,
};

export { ToggleContext, ToggleContextProvider, ToggleContextConsumer };
