import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import Navigation from './index';

describe('Consent Banner Container', () => {
  window.matchMedia = jest.fn().mockImplementation(query => {
    return {
      matches: false,
      media: query,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  });

  shouldMatchSnapshot(
    'should correctly render amp navigation',
    <ServiceContextProvider service="news">
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        id="c0000000000o"
        isAmp
        pageType="article"
        service="news"
        statusCode={200}
        pathname="/pathname"
      >
        <Navigation />
      </RequestContextProvider>
    </ServiceContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render canonical navigation',
    <ServiceContextProvider service="news">
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        id="c0000000000o"
        isAmp={false}
        pageType="article"
        service="news"
        statusCode={200}
        pathname="/pathname"
      >
        <Navigation />
      </RequestContextProvider>
    </ServiceContextProvider>,
  );
});
