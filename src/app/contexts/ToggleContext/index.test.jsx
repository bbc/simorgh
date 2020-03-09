import React, { useContext } from 'react';
import { render, act } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import '@testing-library/jest-dom/extend-expect';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { ComponentUsingContext } from '#testHelpers/mockComponents';
import constructTogglesEndpoint from './utils/constructTogglesEndpoint';
// import { ToggleContext } from '#contexts/ToggleContext';

const mockToggleValues = {
  local: {
    foobarFeature: {
      enabled: false,
    },
    remoteFeatureToggles: {
      enabled: true,
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
  // fetchMock.mock('test.com', mockTogglesResponse); todo uncomment

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

  it('integration test', () => {
    const LogComponenent = props => {
      const { toggleState } = useContext(ToggleContext);

      return toggleState.foobarFeature.enabled && <div>foobarFeature</div>;
    };
    const { getByText } = render(
      <ToggleContextProvider service="mundo">
        <LogComponenent />
      </ToggleContextProvider>,
    );

    expect(getByText('foobarFeature')).toBeInTheDocument();
  });

  // given the remote feature toggle and the feature toggle is enabled
  it('given the remote feature toggle and the feature toggle is enabled', async () => {
    fetchMock.mock('test.com', {
      toggles: {
        foobarFeature: {
          enabled: false,
          value: '',
        },
      },
    });

    const LogComponenent = () => {
      const { toggleState } = useContext(ToggleContext);

      return (
        toggleState.foobarFeature.enabled && (
          <div id="test-feature">foobarFeature</div>
        )
      );
    };
    await act(async () =>
      render(
        <ToggleContextProvider service="mundo">
          <LogComponenent />
        </ToggleContextProvider>,
      ),
    );

    expect(document.getElementById('test-feature')).not.toBeInTheDocument();
  });
});
