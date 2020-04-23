import React, { useContext } from 'react';
import { render, act } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import '@testing-library/jest-dom/extend-expect';
import { queryByText } from '@testing-library/dom';
import togglesConfig from '#lib/config/toggles';
import { ToggleContext, ToggleContextProvider } from '.';

// eslint-disable-next-line react/prop-types
const TestComponent = ({ toggle, children }) => {
  const toggleIsEnabled = useContext(ToggleContext).toggleState[toggle].enabled;

  return toggleIsEnabled && <div>{children}</div>;
};

const shouldCallTogglesEndpoint = togglesUrl =>
  expect(fetchMock.calls(togglesUrl).length).toBeTruthy();
const shouldNotCallTogglesEndpoint = togglesUrl =>
  expect(fetchMock.calls(togglesUrl).length).toBeFalsy();
const shouldRenderAd = container =>
  expect(queryByText(container, 'Dummy Ad Component')).toBeInTheDocument();
const shouldNotRenderAd = container =>
  expect(queryByText(container, 'Dummy Ad Component')).not.toBeInTheDocument();

describe('ToggleContext with feature toggles', () => {
  beforeAll(() => {
    process.env.SIMORGH_APP_ENV = 'local';
    process.env.SIMORGH_TOGGLES_URL = 'https://mock-toggles-endpoint.bbc.co.uk';
  });

  [
    {
      service: 'mundo',
      localAdToggleValue: false,
      enableFetchingTogglesValue: true,
      remoteToggleExpectation: shouldCallTogglesEndpoint,
      remoteAdToggleValue: true,
      remoteAdvertiseCombinedValue: true,
      renderExpectation: shouldRenderAd,
    },
    {
      service: 'mundo',
      localAdToggleValue: false,
      enableFetchingTogglesValue: true,
      remoteToggleExpectation: shouldCallTogglesEndpoint,
      remoteAdToggleValue: false,
      remoteAdvertiseCombinedValue: true,
      renderExpectation: shouldNotRenderAd,
    },
    {
      service: 'mundo',
      localAdToggleValue: true,
      enableFetchingTogglesValue: true,
      remoteToggleExpectation: shouldCallTogglesEndpoint,
      remoteAdToggleValue: false,
      remoteAdvertiseCombinedValue: true,
      renderExpectation: shouldNotRenderAd,
    },
    {
      service: 'mundo',
      localAdToggleValue: true,
      enableFetchingTogglesValue: true,
      remoteToggleExpectation: shouldCallTogglesEndpoint,
      remoteAdToggleValue: true,
      remoteAdvertiseCombinedValue: true,
      renderExpectation: shouldRenderAd,
    },
    {
      service: 'mundo',
      localAdToggleValue: true,
      enableFetchingTogglesValue: true,
      remoteToggleExpectation: shouldCallTogglesEndpoint,
      remoteAdToggleValue: true,
      remoteAdvertiseCombinedValue: false,
      renderExpectation: shouldNotRenderAd,
    },
    {
      service: 'mundo',
      localAdToggleValue: true,
      enableFetchingTogglesValue: true,
      remoteToggleExpectation: shouldCallTogglesEndpoint,
      remoteAdToggleValue: true,
      // Value is missing if there is a geoIp error on the endpoint
      remoteAdvertiseCombinedValue: undefined,
      renderExpectation: shouldNotRenderAd,
    },
    {
      service: 'mundo',
      localAdToggleValue: true,
      enableFetchingTogglesValue: false,
      remoteToggleExpectation: shouldNotCallTogglesEndpoint,
      remoteAdToggleValue: null,
      remoteAdvertiseCombinedValue: true,
      renderExpectation: shouldRenderAd,
    },
    {
      service: 'mundo',
      localAdToggleValue: false,
      enableFetchingTogglesValue: false,
      remoteToggleExpectation: shouldNotCallTogglesEndpoint,
      remoteAdToggleValue: 'anything here, since value should not be fetched',
      remoteAdvertiseCombinedValue:
        'anything here, since value should not be fetched',
      renderExpectation: shouldNotRenderAd,
    },
    {
      service: 'service-not-in-allowlist',
      localAdToggleValue: true,
      enableFetchingTogglesValue: false,
      remoteToggleExpectation: shouldNotCallTogglesEndpoint, // service not in allowlist so not fetched
      remoteAdToggleValue: null,
      remoteAdvertiseCombinedValue: null,
      renderExpectation: shouldRenderAd, // rendered since following local toggle
    },
    {
      service: 'service-not-in-allowlist',
      localAdToggleValue: false,
      enableFetchingTogglesValue: true,
      remoteToggleExpectation: shouldNotCallTogglesEndpoint, // service not in allowlist so not fetched
      remoteAdToggleValue: true,
      remoteAdvertiseCombinedValue: true,
      renderExpectation: shouldNotRenderAd, // not rendered since following local toggle
    },
    {
      service: 'service-not-in-allowlist',
      localAdToggleValue: true,
      enableFetchingTogglesValue: true,
      remoteToggleExpectation: shouldNotCallTogglesEndpoint, // service not in allowlist so not fetched
      remoteAdToggleValue: true,
      remoteAdvertiseCombinedValue: true,
      renderExpectation: shouldRenderAd, // rendered since following local toggle
    },
  ].forEach(
    ({
      localAdToggleValue,
      enableFetchingTogglesValue,
      remoteAdToggleValue,
      service,
      remoteToggleExpectation,
      remoteAdvertiseCombinedValue,
      renderExpectation,
    }) => {
      describe(`given service is ${service}`, () => {
        describe(`given the local ads toggle is ${localAdToggleValue} and the fetching of toggles is ${
          enableFetchingTogglesValue
            ? `true and the remote ads toggle value is ${remoteAdToggleValue}`
            : 'false'
        }`, () => {
          const togglesUrl = `https://mock-toggles-endpoint.bbc.co.uk/toggles?application=simorgh&service=${service}&__amp_source_origin=https://www.test.bbc.com&geoiplookup=true`;

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
              geoIp: {
                ukCombined: true,
                advertiseCombined: remoteAdvertiseCombinedValue,
                countryCode: 'gb',
              },
            });
          });

          afterEach(() => {
            fetchMock.restore();
          });

          it(`should ${
            enableFetchingTogglesValue ? 'call' : 'not call'
          } the toggles endpoint`, async () => {
            await act(async () => {
              await render(
                <ToggleContextProvider
                  service={service}
                  origin="https://www.test.bbc.com"
                >
                  <TestComponent toggle="ads">Dummy Ad Component</TestComponent>
                </ToggleContextProvider>,
              );
            });

            remoteToggleExpectation(togglesUrl);
          });

          it(`should ${
            localAdToggleValue || remoteAdToggleValue ? 'render' : 'not render'
          } the test component`, async () => {
            let container;

            await act(async () => {
              container = await render(
                <ToggleContextProvider
                  service={service}
                  origin="https://www.test.bbc.com"
                >
                  <TestComponent toggle="ads">Dummy Ad Component</TestComponent>
                </ToggleContextProvider>,
              ).container;
            });

            renderExpectation(container);
          });
        });
      });
    },
  );
});
