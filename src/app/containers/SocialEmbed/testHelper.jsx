import React from 'react';

import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContext } from '#contexts/ToggleContext';

/**
 * withContexts is a higher-order component that returns a React component
 * wrapped in the necessary page contexts for testing and Stories.
 * @param {Function} Component A React component.
 * @param {Object} Configuration A configuration object.
 */
const withContexts = (Component, { isAmp, isEnabled, service = 'news' }) => (
  props,
) => (
  <RequestContextProvider
    isAmp={isAmp}
    pageType="STY"
    service={service}
    pathname="/pathname"
  >
    <ServiceContextProvider service={service}>
      <ToggleContext.Provider
        value={{
          toggleState: {
            socialEmbed: {
              enabled: isEnabled,
            },
          },
          toggleDispatch: () => {},
        }}
      >
        <Component {...props} />
      </ToggleContext.Provider>
    </ServiceContextProvider>
  </RequestContextProvider>
);

export default withContexts;
