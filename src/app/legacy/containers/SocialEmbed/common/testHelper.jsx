import React from 'react';

import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';

/**
 * withContexts is a higher-order component that returns a React component
 * wrapped in the necessary page contexts for testing and Stories.
 * @param {Function} Component A React component.
 * @param {Object} Configuration A configuration object.
 */
const withContexts =
  (Component, { isAmp, service = 'news', pageType = STORY_PAGE }) =>
  props =>
    (
      <RequestContextProvider
        isAmp={isAmp}
        pageType={pageType}
        service={service}
        pathname="/pathname"
      >
        <ServiceContextProvider service={service}>
          <Component {...props} />
        </ServiceContextProvider>
      </RequestContextProvider>
    );

export default withContexts;
