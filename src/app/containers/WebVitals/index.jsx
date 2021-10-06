// Hooks
import React, { useContext, useEffect } from 'react';
import useWebVitals from '@bbc/web-vitals';
import useToggle from '#hooks/useToggle';

// Contexts
import { UserContext } from '#contexts/UserContext';
import { RequestContext } from '#contexts/RequestContext';

const WebVitals = () => {
  const { personalisationEnabled } = useContext(UserContext);
  const { pageType } = useContext(RequestContext);
  const { enabled, value: toggleSampleRate } = useToggle('webVitalsMonitoring');

  // Checks if readers have opted into performance tracking and if the feature toggle is enabled
  const isWebVitalsEnabled = personalisationEnabled && enabled;

  const sampleRate = Number(
    toggleSampleRate || process.env.SIMORGH_WEBVITALS_DEFAULT_SAMPLING_RATE,
  );

  const webVitalsConfig = {
    enabled: isWebVitalsEnabled,
    reportingEndpoint: process.env.SIMORGH_WEBVITALS_REPORTING_ENDPOINT,
    sampleRate,
    reportParams: { pageType },
  };

  const { error, message } = useWebVitals(webVitalsConfig);

  useEffect(() => {
    if (error) {
      // eslint-disable-next-line no-alert
      window.alert(error);
    }
  }, [error]);

  if (error) {
    return (
      <>
        <p>{message}</p>
        <p>{JSON.stringify(message)}</p>
      </>
    );
  }

  return null;
};

export default WebVitals;
