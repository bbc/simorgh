import React from 'react';
import { string, shape } from 'prop-types';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import HeaderContainer from './index';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import { ToggleContext } from '#contexts/ToggleContext';
import { service as pidginServiceConfig } from '#lib/config/services/pidgin';

const defaultToggleState = {
  test: {
    navOnArticles: {
      enabled: true,
    },
  },
  live: {
    navOnArticles: {
      enabled: false,
    },
  },
};

const mockToggleDispatch = jest.fn();

const HeaderContainerWithContext = ({ pageType, service, serviceContext }) => (
  <ToggleContext.Provider
    value={{
      toggleState: defaultToggleState,
      toggleDispatch: mockToggleDispatch,
    }}
  >
    <ServiceContext.Provider value={serviceContext}>
      <RequestContextProvider
        isAmp={false}
        pageType={pageType}
        service={service}
        statusCode={200}
        bbcOrigin="https://www.test.bbc.com"
        pathname="/pathname"
      >
        <HeaderContainer />
      </RequestContextProvider>
    </ServiceContext.Provider>
  </ToggleContext.Provider>
);
HeaderContainerWithContext.propTypes = {
  pageType: string.isRequired,
  service: string.isRequired,
  serviceContext: shape({}).isRequired,
};

describe(`Header`, () => {
  window.matchMedia = jest.fn().mockImplementation(() => {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  });
  shouldMatchSnapshot(
    'should render correctly for news article',
    HeaderContainerWithContext({
      pageType: 'article',
      service: 'news',
      serviceContext: pidginServiceConfig.default,
    }),
  );
  shouldMatchSnapshot(
    'should render correctly for WS frontPage',
    HeaderContainerWithContext({
      pageType: 'frontPage',
      service: 'pidgin',
      serviceContext: pidginServiceConfig.default,
    }),
  );
  shouldMatchSnapshot(
    'should render correctly for WS radio page',
    HeaderContainerWithContext({
      pageType: 'media',
      service: 'pidgin',
      serviceContext: pidginServiceConfig.default,
    }),
  );
});
