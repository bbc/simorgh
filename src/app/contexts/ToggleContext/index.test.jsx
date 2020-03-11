import React, { useContext } from 'react';
import { render, act } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import '@testing-library/jest-dom/extend-expect';
import { queryByText } from '@testing-library/dom';
import togglesConfig from '#lib/config/toggles';

// const mockTogglesResponseAdsOn = {
//   toggles: { ads: { enabled: true, value: '' } },
// };
// const mockTogglesResponseAdsOff = {
//   toggles: { ads: { enabled: false, value: '' } },
// };

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

describe('ToggleContext with feature toggles', () => {
  describe('given the feature toggle is enabled', () => {
    beforeEach(() => {
      togglesConfig.local.chartbeatAnalytics.enabled = true;
      togglesConfig.local.remoteFeatureToggles.enabled = false;
    });

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

  describe('given the feature toggle is disabled', () => {
    beforeEach(() => {
      togglesConfig.local.chartbeatAnalytics.enabled = false;
      togglesConfig.local.remoteFeatureToggles.enabled = false;
    });

    it('should render the feature component', () => {
      const TestComponent = () => {
        const chartbeatIsEnabled = useContext(ToggleContext).toggleState
          .chartbeatAnalytics.enabled;

        return (
          chartbeatIsEnabled && <div>Dummy Chartbeat Analytics Component</div>
        );
      };
      const { container } = render(
        <ToggleContextProvider service="mundo">
          <TestComponent />
        </ToggleContextProvider>,
      );

      expect(
        queryByText(container, 'Dummy Chartbeat Analytics Component'),
      ).not.toBeInTheDocument();
    });
  });

  describe('given feature toggle is disabled locally and enabled remotely i.e. enabled in iSite', () => {
    let container;

    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
      togglesConfig.local.ads.enabled = false; // local ads toggle is false
      togglesConfig.local.remoteFeatureToggles.enabled = true;
      fetchMock.mock(
        'https://mock-toggles-endpoint.bbc.co.uk/toggles?application=simorgh&service=mundo&__amp_source_origin=https://www.test.bbc.com&geoiplookup=true',
        JSON.stringify({
          toggles: {
            ads: {
              enabled: true, // remote ads toggle is true
              value: '',
            },
          },
        }),
      );
    });

    afterEach(() => {
      document.body.removeChild(container);
      container = null;
    });

    it('should render the feature component', async () => {
      act(() => {
        const TestComponent = () => {
          const adsIsEnabled = useContext(ToggleContext).toggleState.ads
            .enabled;
          console.log('adsIsEnabled', adsIsEnabled);
          return adsIsEnabled && <div>Dummy Ad Component</div>;
        };
        // todo not sure this is working
        const renderResult = render(
          <ToggleContextProvider service="mundo">
            <TestComponent />
          </ToggleContextProvider>,
        );
        container = renderResult.container;
      });
      console.log('just before expect');
      // console.log('querybytext', queryByText(container, 'Dummy Ad Component'));
      expect(queryByText(container, 'Dummy Ad Component')).toBeInTheDocument();
    });
  });
});
