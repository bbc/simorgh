import { useState, useContext, useEffect } from 'react';
import {
  OptimizelyContext,
  OptimizelyDecideOption,
} from '@optimizely/react-sdk';
import { enums } from '@optimizely/optimizely-sdk';
import { RequestContext } from '#contexts/RequestContext';
import PageCompleteTracking from './PageCompleteTracking';
import ScrollDepthTracking from './ScrollDepthTracking';
import PageViewTracking from './PageViewTracking';
import experimentsForPageMetrics from './experimentsForPageMetrics';

type Props = {
  trackPageView?: boolean;
  trackPageDepth?: boolean;
  trackPageComplete?: boolean;
  trackVisit?: boolean;
};

// Shape expected by the Optimizely decision notification listener for decision events
type DecisionListener = {
  userId?: string;
  type?: string;
  decisionInfo?: {
    flagKey?: string;
    variationKey?: string;
  };
};

const OptimizelyPageMetrics = ({
  trackPageView = false,
  trackPageDepth = false,
  trackPageComplete = false,
  trackVisit = false,
}: Props) => {
  const { optimizely } = useContext(OptimizelyContext);
  const { isAmp, pageType } = useContext(RequestContext);
  const [isInExperiment, setIsInExperiment] = useState(false);

  const experimentsForPageType = experimentsForPageMetrics.find(
    entry => entry.pageType === pageType,
  )?.activeExperiments;

  const optimizelyExperimentsEnabled = Boolean(
    experimentsForPageType?.length && !isAmp,
  );

  // on initial load, check if the user is in any relevant experiment and set state accordingly
  useEffect(() => {
    if (
      !optimizelyExperimentsEnabled ||
      !optimizely ||
      !experimentsForPageType
    ) {
      setIsInExperiment(false);
      return undefined;
    }

    let mounted = true;

    optimizely.onReady().then(() => {
      if (!mounted) return;

      // disable decision event tracking to avoid sending duplicate events for any experiments that the user is bucketed into on page load, since the notification listener will also trigger for those experiments
      const decisions = optimizely.decideAll([
        OptimizelyDecideOption.DISABLE_DECISION_EVENT,
      ]);

      const userInAnyExperiment = experimentsForPageType.some(
        experimentName => {
          const decision = decisions[experimentName];
          return Boolean(decision && decision.variationKey !== 'off');
        },
      );

      setIsInExperiment(userInAnyExperiment);
    });

    return () => {
      mounted = false;
    };
  }, [optimizelyExperimentsEnabled, optimizely, experimentsForPageType]);

  // Listen for Optimizely decisions after initial load in case the user is bucketed later
  useEffect(() => {
    if (
      !optimizelyExperimentsEnabled ||
      !optimizely ||
      !experimentsForPageType
    ) {
      setIsInExperiment(false);
      return undefined;
    }

    let mounted = true;
    let notificationId: number | null = null;

    const attachListener = async () => {
      await optimizely.onReady();
      if (!mounted) return;

      if (
        optimizely.notificationCenter &&
        typeof optimizely.notificationCenter.addNotificationListener ===
          'function'
      ) {
        notificationId = optimizely.notificationCenter.addNotificationListener(
          enums.NOTIFICATION_TYPES.DECISION,
          (listener: DecisionListener) => {
            if (!mounted) return;

            const { type, decisionInfo } = listener || {};
            if (type !== 'flag' || !decisionInfo) return;

            const { flagKey, variationKey } = decisionInfo;

            const isRelevantExperiment =
              typeof flagKey === 'string' &&
              experimentsForPageType.includes(flagKey);

            const isUserBucketedIntoExperiment =
              typeof variationKey === 'string' && variationKey !== 'off';

            if (isRelevantExperiment && isUserBucketedIntoExperiment) {
              setIsInExperiment(true);
            }
          },
        );
      }
    };

    attachListener();

    return () => {
      mounted = false;
      // clean up the notification listener on unmount
      if (
        notificationId !== null &&
        optimizely.notificationCenter &&
        typeof optimizely.notificationCenter.removeNotificationListener ===
          'function'
      ) {
        optimizely.notificationCenter.removeNotificationListener(
          notificationId,
        );
      }
    };
  }, [optimizelyExperimentsEnabled, optimizely, experimentsForPageType]);

  // if the user is not in any relevant experiment, do not render the tracking components to avoid sending unintended events
  if (!isInExperiment) {
    return null;
  }

  // for page views per visit, always enable both trackPageView and trackVisit
  // visit tracking runs inside the page view tracker to keep ordering and avoid duplicates

  return (
    <>
      {trackPageComplete && <PageCompleteTracking />}
      {trackPageDepth && <ScrollDepthTracking />}
      {trackPageView && <PageViewTracking trackVisit={trackVisit} />}
    </>
  );
};

export default OptimizelyPageMetrics;
