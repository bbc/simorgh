import 'isomorphic-fetch';
import { useEffect } from 'react';
import { getCLS, getFID, getLCP, getTTFB } from 'web-vitals';
import nodeLogger from '#lib/logger.node';
import { WEB_VITALS_SEND_ERROR } from '#lib/logger.const';

// hooks
import useEvent from '#hooks/useEvent';

// web-vitals
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
  // Setup event listener for `beforeunload` event and call sendBeacon when this event fires.
  useEvent('beforeunload', sendBeacon);

  useEffect(() => {
    getTTFB(updateWebVitals);
    getCLS(updateWebVitals);
    getFID(updateWebVitals);
    getLCP(updateWebVitals);
  }, []);
  return null;
};

export default useWebVitals;
