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

describe('ToggleContext with remote feature toggles', () => {
  describe('given feature toggle is enabled', () => {
    it('should render the feature component', () => {
      togglesConfig.local.chartbeatAnalytics.enabled = true;
      const LogComponenent = () => {
        const { toggleState } = useContext(ToggleContext);
        return (
          toggleState.chartbeatAnalytics.enabled && (
            <div>chartbeatAnalytics</div>
          )
        );
      };
      const { getByText } = render(
        <ToggleContextProvider service="mundo">
          <LogComponenent />
        </ToggleContextProvider>,
      );

      expect(getByText('chartbeatAnalytics')).toBeInTheDocument();
    });
  });

  xdescribe('given feature toggle is enabled and remote feature toggle is enabled (in iSite)', () => {
    xit('should render the feature component', async () => {
      let getByText;
      togglesConfig.local.ads.enabled = false;

      const LogComponenent = () => {
        const { toggleState } = useContext(ToggleContext);

        return toggleState.ads.enabled && <div>ads</div>;
      };

      act(() => {
        // todo not sure this is working
        const thing = render(
          <ToggleContextProvider service="mundo">
            <LogComponenent />
          </ToggleContextProvider>,
        );
        getByText = thing.getByText;
      });

      expect(getByText('ads')).toBeInTheDocument();
    });
  });
});
