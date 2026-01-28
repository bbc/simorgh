import { useEffect, useContext } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';

const VISIT_TIMEOUT_MS = 60 * 60 * 1000; // 1 hour timeout

const VisitTracking = () => {
  // get the useContext hook to get the optimizely client to send tracking events
  const { optimizely } = useContext(OptimizelyContext);

  useEffect(() => {
    const now = Date.now(); // current time in milliseconds since Jan 1st 1970

    // tries to get the last visit timestamp from the browser's local storage
    const lastVisit = Number(localStorage.getItem('last_visit_ts'));

    // checks that there is no last visit recorded, or if the last visit was more than the timeout ago
    if (!lastVisit || now - lastVisit > VISIT_TIMEOUT_MS) {
      // if the above condition is true, send a 'visit' event to optimizely.
      optimizely?.track('visit');
      // updates the last visit timestamp in local storage to the current time
      localStorage.setItem('last_visit_ts', String(now));
    } // this dependency array closes the effect and only re-runs when optimizely object changes
  }, [optimizely]);

  return null;
};
// the logic here is based on persistent storage in local storage, and the local time
// not on any values that would change during the componeent's lifecycle
export default VisitTracking;
