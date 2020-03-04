import React from 'react';
import fetchMock from 'fetch-mock';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { ComponentUsingContext } from '#testHelpers/mockComponents';
import constructTogglesEndpoint from './utils/constructTogglesEndpoint';

const mockToggleValues = {
  local: {
    foobarFeature: {
      enabled: true,
    },
    remoteFeatureToggles: {
      enabled: false,
    },
  },
  test: {
    foobarFeature: {
      enabled: true,
    },
  },
  live: {
    foobarFeature: {
      enabled: false,
    },
  },
};

const mockToggleValuesRemoteFeatureToglles = {
  local: {
    remoteFeatureToggles: {
      enabled: true,
    },
  },
};

const mockTogglesResponse = {
  toggles: {
    toggleName: {
      enabled: true,
      value: '',
    },
  },
};

jest.mock('#lib/config/toggles', () => mockToggleValues);
jest.mock('./utils/constructTogglesEndpoint', () =>
  jest.fn().mockReturnValue('test.com'),
);

beforeEach(() => {
  process.env.SIMORGH_APP_ENV = 'local';
  global.fetch = fetch;
});

afterEach(() => {
  fetchMock.restore();
});

// Require after mock to allow mocking of JS object
const { ToggleContext, ToggleContextProvider } = require('./index');

describe('ToggleContext without remote feature toggles', () => {
  // fetchMock.mock('test.com', mockTogglesResponse);

  shouldMatchSnapshot(
    `should provide a toggles object`,
    <ToggleContextProvider service="mundo">
      <ComponentUsingContext context={ToggleContext} />
    </ToggleContextProvider>,
  );
});

describe('ToggleContext with remote feature toggles', () => {
  jest.mock('#lib/config/toggles', () => mockToggleValuesRemoteFeatureToglles);
  fetchMock.mock('test.com', mockTogglesResponse);

  shouldMatchSnapshot(
    `should provide a toggles object`,
    <ToggleContextProvider service="mundo">
      <ComponentUsingContext context={ToggleContext} />
    </ToggleContextProvider>,
  );

  it('should trigger useEffect', () => {
    // TODO
  });

  it('should dispatch the updateToggles method', () => {
    // TODO
  });
});
