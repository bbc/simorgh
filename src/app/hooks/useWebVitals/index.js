import { useContext, useEffect } from 'react';

// hooks
import useToggle from '#hooks/useToggle';
import useEvent from '#hooks/useEvent';

// contexts
import { UserContext } from '#contexts/UserContext';
import { RequestContext } from '#contexts/RequestContext';

// web-vitals
import { getCLS, getFID, getLCP, getTTFB } from 'web-vitals';

const webVitalsBase = {
  age: 0,
  type: 'web-vitals',
  url: 'https://www.example.com/some/path',
};

const vitals = { cls: null, fid: null, lcp: null, ttfb: null };

const updateWebVitals = ({ name, value }) => {
  const vitalName = name.toLowerCase();
  vitals[vitalName] = value;
};

const sendBeacon = event => {
  console.log('hello');
  event.preventDefault();

  const beacon = { ...webVitalsBase, body: { ...vitals } };
  let result = navigator.sendBeacon(
    process.env.SIMORGH_WEB_VITALS_ENDPOINT,
    beacon,
  );

  if (result) {
    console.log('beacon queued');
  } else {
    console.log('oops');
  }
};

const useWebVitals = () => {
  const { enabled } = useToggle('webVitals');
  const { personalisationEnabled } = useContext(UserContext);
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
