import { use } from 'react';
import { EventTrackingContext } from '#app/contexts/EventTrackingContext';
import { ExperimentContext } from '#app/contexts/ExperimentContext';
import { EventTrackingProps, ExtractedTrackingProps } from '../types';

export default ({
  eventTrackingData,
  eventType,
  eventTrackingContextFromHook,
  experimentContextFromHook,
}: EventTrackingProps): ExtractedTrackingProps => {
  const eventTrackingContext =
    eventTrackingContextFromHook || use(EventTrackingContext);

  // Callers outside render (e.g. inside a callback) can't call use(), so they
  // pass the contexts in. Those callers must pass the experiment context too.
  let experimentContext = experimentContextFromHook ?? null;
  if (
    experimentContextFromHook === undefined &&
    !eventTrackingContextFromHook
  ) {
    experimentContext = use(ExperimentContext);
  }

  const {
    componentName = '',
    url,
    advertiserID,
    format,
    detailedPlacement,
    preventNavigation,
    optimizelyComponentName,
    itemTracker,
    groupTracker,
    viewThreshold,
    alwaysInView,
  } = eventTrackingData || {};

  // Experiment attribution only ever comes from the nearest <Experiment>.
  const { experimentName, experimentVariant } = experimentContext ?? {};

  const {
    pageIdentifier,
    platform,
    producerId,
    statsDestination,
    producerName,
    isSignedIn,
    hashedId,
    isPersonalisationOn,
  } = eventTrackingContext;

  const campaignID =
    eventTrackingData?.campaignID || eventTrackingContext?.campaignID;

  return {
    pageIdentifier,
    producerId,
    platform,
    statsDestination,
    componentName,
    campaignID,
    format,
    type: eventType,
    advertiserID,
    url,
    detailedPlacement,
    producerName,
    preventNavigation,
    optimizelyComponentName,
    experimentName,
    experimentVariant,
    itemTracker,
    groupTracker,
    viewThreshold,
    alwaysInView,
    isSignedIn,
    hashedId,
    isPersonalisationOn,
  };
};
