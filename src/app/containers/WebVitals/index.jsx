import { useEffect, useContext } from 'react';
import useToggle from '#hooks/useToggle';

// contexts
import { UserContext } from '#contexts/UserContext';
import { RequestContext } from '#contexts/RequestContext';

// web-vitals
import { getCLS, getFID, getLCP, getTTFB } from 'web-vitals';

const WebVitals = () => {
  const { enabled } = useToggle('webVitals');
  const { personalisationEnabled } = useContext(UserContext);

  useEffect(() => {
    if (enabled && personalisationEnabled) {
      getTTFB(console.log);
      getCLS(console.log);
      getFID(console.log);
      getLCP(console.log);
    }
  }, []);

  return null;
};

export default WebVitals;
