import React, { useContext } from 'react';
import { render, act } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import '@testing-library/jest-dom/extend-expect';
import togglesConfig from '#lib/config/toggles';

const mockTogglesResponseAdsOn = {
  toggles: { ads: { enabled: true, value: '' } },
};
const mockTogglesResponseAdsOff = {
  toggles: { ads: { enabled: false, value: '' } },
};

beforeEach(() => {
  process.env.SIMORGH_APP_ENV = 'local';
  process.env.SIMORGH_TOGGLES_URL = 'https://mock-toggles-endpoint.bbc.co.uk';
  global.fetch = fetch;
});

afterEach(() => {
  fetchMock.restore();
});

// Require after mock to allow mocking of JS object
const { ToggleContext, ToggleContextProvider } = require('./index');

describe('ToggleContext with remote feature toggles', () => {
  describe('given the feature toggle is enabled', () => {
    togglesConfig.local.chartbeatAnalytics.enabled = true;

    it('should render the feature component', () => {
      const TestComponent = () => {
        const chartbeatIsEnabled = useContext(ToggleContext).toggleState
          .chartbeatAnalytics.enabled;

        return (
          chartbeatIsEnabled && <div>Dummy Chartbeat Analytics Component</div>
        );
      };
      const { getByText } = render(
        <ToggleContextProvider service="mundo">
          <TestComponent />
        </ToggleContextProvider>,
      );

      expect(
        getByText('Dummy Chartbeat Analytics Component'),
      ).toBeInTheDocument();
    });
  });

  describe('given feature toggle is disabled locally and enabled remotely i.e. enabled in iSite', () => {
    togglesConfig.local.ads.enabled = false;
    fetchMock.mock(
      'https://mock-toggles-endpoint.bbc.co.uk/toggles?application=simorgh&service=mundo&__amp_source_origin=https://www.test.bbc.com&geoiplookup=true',
      JSON.stringify({
        toggles: {
          ads: {
            enabled: true,
            value: '',
          },
        },
      }),
    );

    it('should render the feature component', async () => {
      let getByText;

      const TestComponent = () => {
        const adsIsEnabled = useContext(ToggleContext).toggleState.ads.enabled;

        return adsIsEnabled && <div>Dummy Ad Component</div>;
      };

      act(() => {
        // todo not sure this is working
        const thing = render(
          <ToggleContextProvider service="mundo">
            <TestComponent />
          </ToggleContextProvider>,
        );
        getByText = thing.getByText;
      });

      expect(getByText('Dummy Ad Component')).toBeInTheDocument();
    });
  });
});
