import { use, useEffect, useRef } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';
import isSignedIn from '../isSignedIn';

const SIGNED_IN_PAGE_VIEW_EVENT_NAME = 'signed-in-page-views';

// Tracked directly against the Optimizely client rather than from the DECISION
// listener, so it still fires for signed-in users on page views where no
// experiment happens to activate (e.g. after they've signed in and no longer
// qualify for the experiments that would otherwise expose them).
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
