/* eslint-disable react/prop-types */

import React from 'react';
import { render } from '@testing-library/react';
import useWebVitals from '@bbc/web-vitals';

// Container to test
import WebVitals from '.';

// Contexts
import { ToggleContext } from '#contexts/ToggleContext';
import { UserContext } from '#contexts/UserContext';
import { RequestContext } from '#contexts/RequestContext';

// Mock the useWebVitals Hook
jest.mock('@bbc/web-vitals');

// Compose WebVitals container with required context providers
const WebVitalsWithContext = ({
  featureToggle,
  personalisationEnabled,
  pageType,
  sampleRate,
}) => (
  <ToggleContext.Provider
    value={{
      toggleState: {
        webVitalsMonitoring: { enabled: featureToggle, value: sampleRate },
      },
    }}
  >
    <RequestContext.Provider value={{ pageType }}>
      <UserContext.Provider
        value={{
          personalisationEnabled,
        }}
      >
        <WebVitals />
      </UserContext.Provider>
    </RequestContext.Provider>
  </ToggleContext.Provider>
);

describe('WebVitals', () => {
  describe('calls the useWebVitals hook', () => {
    beforeEach(() => {
      process.env.SIMORGH_WEBVITALS_REPORTING_ENDPOINT = 'endpoint';
      process.env.SIMORGH_WEBVITALS_DEFAULT_SAMPLING_RATE = 20;
    });

    afterEach(() => {
      jest.clearAllMocks();
      delete process.env.SIMORGH_WEBVITALS_REPORTING_ENDPOINT;
      delete process.env.SIMORGH_WEBVITALS_DEFAULT_SAMPLING_RATE;
    });

    it.each`
      testDescription                                | testConfig                                                                                | webVitalsParams
      ${'feature toggle and personalisation off'}    | ${{ featureToggle: false, personalisationEnabled: false, pageType: 'STY' }}               | ${{ enabled: false, reportParams: { pageType: 'STY' }, reportingEndpoint: 'endpoint', sampleRate: 20 }}
      ${'feature toggle on and personalisation off'} | ${{ featureToggle: true, personalisationEnabled: false, pageType: 'STY' }}                | ${{ enabled: false, reportParams: { pageType: 'STY' }, reportingEndpoint: 'endpoint', sampleRate: 20 }}
      ${'feature toggle off and personalisation on'} | ${{ featureToggle: false, personalisationEnabled: true, pageType: 'STY' }}                | ${{ enabled: false, reportParams: { pageType: 'STY' }, reportingEndpoint: 'endpoint', sampleRate: 20 }}
      ${'feature toggle and personalisation on'}     | ${{ featureToggle: true, personalisationEnabled: true, pageType: 'STY' }}                 | ${{ enabled: true, reportParams: { pageType: 'STY' }, reportingEndpoint: 'endpoint', sampleRate: 20 }}
      ${'sample rate override'}                      | ${{ featureToggle: true, personalisationEnabled: true, pageType: 'STY', sampleRate: 65 }} | ${{ enabled: true, reportParams: { pageType: 'STY' }, reportingEndpoint: 'endpoint', sampleRate: 65 }}
    `(`$testDescription`, ({ testConfig, webVitalsParams }) => {
      render(<WebVitalsWithContext {...testConfig} />);

      expect(useWebVitals).toBeCalledWith(webVitalsParams);
    });
  });
});
