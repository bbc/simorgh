import { use, useEffect, useRef } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';
import isSignedIn from '../isSignedIn';

const SIGNED_IN_PAGE_VIEW_EVENT_NAME = 'signed-in-page-views';

// Tracks a signed-in page view once per mount, waiting for the Optimizely
// client to be ready before sending the event.
const SignedInPageViewTracking = () => {
  const { optimizely } = use(OptimizelyContext);
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    if (hasTrackedRef.current || !optimizely || !isSignedIn()) return;

    optimizely.onReady().then(() => {
      optimizely.track(SIGNED_IN_PAGE_VIEW_EVENT_NAME);
      hasTrackedRef.current = true;
    });
  }, [optimizely]);

  return null;
};

export default SignedInPageViewTracking;
