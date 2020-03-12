import React, { useContext } from 'react';
import { render, act } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import '@testing-library/jest-dom/extend-expect';
import { queryByText } from '@testing-library/dom';
import togglesConfig from '#lib/config/toggles';
import { ToggleContext, ToggleContextProvider } from '.';

process.env.SIMORGH_APP_ENV = 'local';
process.env.SIMORGH_TOGGLES_URL = 'https://mock-toggles-endpoint.bbc.co.uk';

// eslint-disable-next-line react/prop-types
const TestComponent = ({ toggle, children }) => {
  const toggleIsEnabled = useContext(ToggleContext).toggleState[toggle].enabled;

  return toggleIsEnabled && <div>{children}</div>;
};

afterEach(() => {
  fetchMock.restore();
});

describe('ToggleContext with feature toggles', () => {
  describe('given the feature toggle is enabled', () => {
    beforeEach(() => {
      togglesConfig.local.chartbeatAnalytics.enabled = true;
      togglesConfig.local.enableFetchingToggles.enabled = false;
    });

    it('should render the test component', () => {
      const { getByText } = render(
        <ToggleContextProvider service="mundo">
          <TestComponent toggle="chartbeatAnalytics">
            Dummy Chartbeat Analytics Component
          </TestComponent>
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
      togglesConfig.local.enableFetchingToggles.enabled = false;
    });

    it('should render the test component', () => {
      const { container } = render(
        <ToggleContextProvider service="mundo">
          <TestComponent toggle="chartbeatAnalytics">
            Dummy Chartbeat Analytics Component
          </TestComponent>
        </ToggleContextProvider>,
      );

      expect(
        queryByText(container, 'Dummy Chartbeat Analytics Component'),
      ).not.toBeInTheDocument();
    });
  });

  [
    {
      localAdToggleValue: false,
      enableFetchingTogglesValue: true,
      remoteAdToggleValue: true,
      expectation: container =>
        expect(
          queryByText(container, 'Dummy Ad Component'),
        ).toBeInTheDocument(),
    },
    {
      localAdToggleValue: false,
      enableFetchingTogglesValue: true,
      remoteAdToggleValue: false,
      expectation: container =>
        expect(
          queryByText(container, 'Dummy Ad Component'),
        ).not.toBeInTheDocument(),
    },
    {
      localAdToggleValue: true,
      enableFetchingTogglesValue: true,
      remoteAdToggleValue: false,
      expectation: container =>
        expect(
          queryByText(container, 'Dummy Ad Component'),
        ).not.toBeInTheDocument(),
    },
    {
      localAdToggleValue: true,
      enableFetchingTogglesValue: false,
      remoteAdToggleValue: null,
      expectation: container =>
        expect(
          queryByText(container, 'Dummy Ad Component'),
        ).toBeInTheDocument(),
    },
    {
      localAdToggleValue: true,
      enableFetchingTogglesValue: true,
      remoteAdToggleValue: true,
      expectation: container =>
        expect(
          queryByText(container, 'Dummy Ad Component'),
        ).toBeInTheDocument(),
    },
    {
      localAdToggleValue: false,
      enableFetchingTogglesValue: false,
      remoteAdToggleValue: false,
      expectation: container =>
        expect(
          queryByText(container, 'Dummy Ad Component'),
        ).not.toBeInTheDocument(),
    },
    {
      localAdToggleValue: false,
      enableFetchingTogglesValue: false,
      remoteAdToggleValue: false,
      expectation: container =>
        expect(
          queryByText(container, 'Dummy Ad Component'),
        ).not.toBeInTheDocument(),
    },
  ].forEach(
    ({
      localAdToggleValue,
      enableFetchingTogglesValue,
      remoteAdToggleValue,
      expectation,
    }) => {
      describe(`given the local ads toggle is ${localAdToggleValue} and the fetching of toggles is ${
        enableFetchingTogglesValue
          ? `true and the remote ads toggle value is ${remoteAdToggleValue}`
          : 'false'
      }`, () => {
        const togglesUrl =
          'https://mock-toggles-endpoint.bbc.co.uk/toggles?application=simorgh&service=mundo&__amp_source_origin=https://www.test.bbc.com&geoiplookup=true';

        beforeEach(() => {
          togglesConfig.local.ads.enabled = localAdToggleValue;
          togglesConfig.local.enableFetchingToggles.enabled = enableFetchingTogglesValue;
          fetchMock.mock(togglesUrl, {
            toggles: {
              ads: {
                enabled: remoteAdToggleValue,
                value: '',
              },
            },
          });
        });

        it(`should ${
          enableFetchingTogglesValue ? 'call' : 'not call'
        } the toggles endpoint`, async () => {
          await act(async () => {
            await render(
              <ToggleContextProvider service="mundo">
                <TestComponent toggle="ads">Dummy Ad Component</TestComponent>
              </ToggleContextProvider>,
            );
          });

          if (enableFetchingTogglesValue) {
            expect(fetchMock.calls(togglesUrl).length).toBeTruthy();
          } else {
            expect(fetchMock.calls(togglesUrl).length).toBeFalsy();
          }
        });

        it(`should ${
          localAdToggleValue || remoteAdToggleValue ? 'render' : 'not render'
        } the test component`, async () => {
          let container;

          await act(async () => {
            container = await render(
              <ToggleContextProvider service="mundo">
                <TestComponent toggle="ads">Dummy Ad Component</TestComponent>
              </ToggleContextProvider>,
            ).container;
          });

          expectation(container);
        });
      });
    },
  );
});
