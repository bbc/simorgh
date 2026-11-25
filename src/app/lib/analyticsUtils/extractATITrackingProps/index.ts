import { use } from 'react';
import { EventTrackingContext } from '#app/contexts/EventTrackingContext';
import { ExperimentContext } from '#app/contexts/ExperimentContext';
import { EventTrackingData, EventTrackingProps } from '../types';

export default ({
  eventTrackingData,
  eventType,
  eventTrackingContextFromHook,
  experimentContextFromHook,
}: EventTrackingProps): EventTrackingData => {
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

  // Experiment details passed explicitly win; otherwise inherit from the
  // nearest ExperimentProvider, which also opts in to Optimizely events.
  const hasExplicitExperiment = Boolean(eventTrackingData?.experimentVariant);
  const inheritedExperiment =
    !hasExplicitExperiment && experimentContext ? experimentContext : null;

  const experimentName =
    inheritedExperiment?.experimentName ?? eventTrackingData?.experimentName;
  const experimentVariant =
    inheritedExperiment?.experimentVariant ??
    eventTrackingData?.experimentVariant;
  const sendOptimizelyEvents = inheritedExperiment
    ? true
    : eventTrackingData?.sendOptimizelyEvents;

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
    sendOptimizelyEvents,
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
