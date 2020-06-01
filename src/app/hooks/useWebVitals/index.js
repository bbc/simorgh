import 'isomorphic-fetch';
import { useContext, useEffect } from 'react';
import nodeLogger from '#lib/logger.node';
import { WEB_VITALS_SEND_ERROR } from '#lib/logger.const';

// hooks
import useToggle from '#hooks/useToggle';
import useEvent from '#hooks/useEvent';

// contexts
import { UserContext } from '#contexts/UserContext';
import { RequestContext } from '#contexts/RequestContext';

// web-vitals
import { getCLS, getFID, getLCP, getTTFB } from 'web-vitals';

const logger = nodeLogger(__filename);

const webVitalsBase = {
  age: 0,
  type: 'web-vitals',
  url: 'https://www.example.com/some/path', // TODO: Get the current page url
};

const vitals = { cls: null, fid: null, lcp: null, ttfb: null };

const updateWebVitals = ({ name, value }) => {
  const vitalName = name.toLowerCase();
  vitals[vitalName] = value;
};

const sendBeacon = async event => {
  event.preventDefault();

  const beacon = [{ ...webVitalsBase, body: { ...vitals } }];

  try {
    await fetch(process.env.SIMORGH_WEB_VITALS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/reports+json' },
      body: JSON.stringify(beacon),
    });
  } catch (error) {
    logger.info(WEB_VITALS_SEND_ERROR, {
      ...error,
    });
  }
};

const useWebVitals = () => {
  const { enabled } = useToggle('webVitals');
  const { personalisationEnabled } = useContext(UserContext);

  // Setup event listener for `beforeunload` event and call sendBeacon when this event fires.
  useEvent('beforeunload', sendBeacon);

  if (enabled && personalisationEnabled) {
    useEffect(() => {
      getTTFB(updateWebVitals);
      getCLS(updateWebVitals);
      getFID(updateWebVitals);
      getLCP(updateWebVitals);
    }, []);
  }

  return null;
};

export default useWebVitals;
