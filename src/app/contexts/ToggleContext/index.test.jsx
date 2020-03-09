import React, { useContext } from 'react';
import { render, act } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import '@testing-library/jest-dom/extend-expect';

const mockRemoteFeatureToggleOn = {
  local: {
    foobarFeature: {
      enabled: false,
    },
    remoteFeatureToggles: {
      enabled: true,
    },
  },
};

const mockRemoteFeatureToggleOff = {
  local: {
    remoteFeatureToggles: {
      enabled: false,
    },
    foobarFeature: {
      enabled: true,
    },
  },
};

jest.mock('./utils/constructTogglesEndpoint', () =>
  jest.fn().mockReturnValue('test.com'),
);

jest.mock('#lib/config/toggles', () => mockRemoteFeatureToggleOff);

beforeEach(() => {
  process.env.SIMORGH_APP_ENV = 'local';
  global.fetch = fetch;
});

afterEach(() => {
  fetchMock.restore();
});

// Require after mock to allow mocking of JS object
const { ToggleContext, ToggleContextProvider } = require('./index');

describe('ToggleContext with remote feature toggles', () => {
  it('integration test', () => {
    const LogComponenent = () => {
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
  xit('given the remote feature toggle and the feature toggle is enabled', async () => {
    jest.mock('#lib/config/toggles', () => mockRemoteFeatureToggleOff); // TODO: This mock is not working

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
