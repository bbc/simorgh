import { use, useEffect, useRef } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';
import Cookie from 'js-cookie';
import onClient from '#lib/utilities/onClient';
import isOperaProxy from '#app/lib/utilities/isOperaProxy';
import { TOKEN_COOKIE_NAME } from '#app/lib/uasApi/tokenRefresh/tokenManager';
import { RequestContext } from '#contexts/RequestContext';
import isCypress from '#app/legacy/containers/PageHandlers/withOptimizelyProvider/isCypress';

const SIGNED_IN_PAGE_VIEW_EVENT_NAME = 'signed-in-page-views';
const disableOptimizely = process.env.STORYBOOK || isCypress();

const isSignedIn = () => {
  if (disableOptimizely || !onClient() || isOperaProxy()) return false;
  return Boolean(Cookie.get(TOKEN_COOKIE_NAME));
};

// Tracks a signed-in page view once per mount, waiting for the Optimizely
// client to be ready before sending the event. Only fires when the visitor is
// bucketed into an experiment applicable to this page.
const SignedInPageViewTracking = () => {
  const { optimizely } = use(OptimizelyContext);
  const { serverSideExperiments } = use(RequestContext);
  const hasTrackedRef = useRef(false);

  const isInExperiment = Boolean(
    serverSideExperiments?.some(
      ({ enabled, variation }) => enabled && variation && variation !== 'false',
    ),
  );

  useEffect(() => {
    if (
      hasTrackedRef.current ||
      !optimizely ||
      !isInExperiment ||
      !isSignedIn()
    ) {
      return;
    }

    hasTrackedRef.current = true;

    optimizely.onReady().then(() => {
      optimizely.track(SIGNED_IN_PAGE_VIEW_EVENT_NAME);
    });
  }, [optimizely, isInExperiment]);

  return null;
};

export default SignedInPageViewTracking;
