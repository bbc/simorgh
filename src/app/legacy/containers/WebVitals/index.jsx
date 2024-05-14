// Hooks
import { useContext } from 'react';
import useWebVitals from '@bbc/web-vitals';
import useToggle from '#hooks/useToggle';

// Contexts
import { UserContext } from '#contexts/UserContext';

import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

const WebVitals = ({ pageType }) => {
  const { personalisationEnabled } = useContext(UserContext);

  const { enabled, value: toggleSampleRate } = useToggle('webVitalsMonitoring');
  // Checks if readers have opted into performance tracking and if the feature toggle is enabled
  const isWebVitalsEnabled = personalisationEnabled && enabled;

  const sampleRate = Number(
    toggleSampleRate || getEnvConfig().SIMORGH_WEBVITALS_DEFAULT_SAMPLING_RATE,
  );

  const wsPageType = pageType
    ? `WS-${pageType.replace(/\s+/g, '-').toUpperCase()}`
    : null;

  if (!wsPageType) {
    // eslint-disable-next-line no-console
    console.error('Web Vitals: No page type to report');
  }

  const webVitalsConfig = {
    enabled: isWebVitalsEnabled,
    reportingEndpoint: getEnvConfig().SIMORGH_WEBVITALS_REPORTING_ENDPOINT,
    sampleRate,
    ...(wsPageType && {
      reportParams: {
        pageType: wsPageType,
      },
    }),
  };

  useWebVitals(webVitalsConfig);
  return null;
};

export default WebVitals;
