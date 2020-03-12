import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContext } from '#contexts/ToggleContext';

import AdContainer from './index';

const defaultToggleState = {
  local: {
    ads: {
      enabled: true,
    },
  },
  test: {
    ads: {
      enabled: true,
    },
  },
  stage: {
    ads: {
      enabled: false,
    },
  },
  live: {
    ads: {
      enabled: false,
    },
  },
};

const mockToggleDispatch = jest.fn();

const toggleContextMock = {
  toggleState: defaultToggleState,
  toggleDispatch: mockToggleDispatch,
};

describe('Ad Container', () => {
  shouldMatchSnapshot(
    'should correctly render an amp ad',
    <ServiceContextProvider service="pidgin">
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        id="c0000000000o"
        isAmp
        pageType="frontPage"
        service="pidgin"
        statusCode={200}
        pathname="/pidgin"
      >
        <ToggleContext.Provider value={toggleContextMock}>
          <AdContainer />
        </ToggleContext.Provider>
      </RequestContextProvider>
    </ServiceContextProvider>,
  );
});
