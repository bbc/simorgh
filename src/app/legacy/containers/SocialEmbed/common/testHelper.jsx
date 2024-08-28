import React from 'react';

import { RequestContextProvider } from '#contexts/RequestContext';
import { STORY_PAGE } from '#routes/utils/pageTypes';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import ThemeProvider from '../../../../components/ThemeProvider';

/**
 * withContexts is a higher-order component that returns a React component
 * wrapped in the necessary page contexts for testing and Stories.
 * @param {Function} Component A React component.
 * @param {Object} Configuration A configuration object.
 */
const withContexts =
  (Component, { isAmp, service = 'news', pageType = STORY_PAGE }) =>
  props => (
    <RequestContextProvider
      isAmp={isAmp}
      pageType={pageType}
      service={service}
      pathname="/pathname"
    >
      <ThemeProvider service={service}>
        <ServiceContextProvider service={service}>
          <ToggleContextProvider
            toggles={{
              eventTracking: { enabled: false },
            }}
          >
            <Component {...props} />
          </ToggleContextProvider>
        </ServiceContextProvider>
      </ThemeProvider>
    </RequestContextProvider>
  );

export default withContexts;
