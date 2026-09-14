import { useCallback, useRef } from 'react';
import { onlineManager } from '@tanstack/react-query';
import { VIEW_EVENT } from '#app/lib/analyticsUtils/analytics.const';
import extractATITrackingProps from '#app/lib/analyticsUtils/extractATITrackingProps';
import sendErrorEvent from '#app/lib/analyticsUtils/sendErrorEvent';
import useTrackingToggle from '../useTrackingToggle';

export interface TrackErrorParams {
  error: unknown;
  feature: string;
  action: string;
}

const isTrackableError = (error: unknown): error is Error =>
  error instanceof Error && onlineManager.isOnline();

// Reads diagnostic detail from known error shapes (e.g. UasError) without
// assuming any one feature's error type. Falls back to the standard Error
// message when a service-specific message is unavailable.
const extractErrorDetails = (error: Error) => {
  const { status, code, serviceMessage } = error as Error & {
    status?: number;
    code?: string;
    serviceMessage?: string;
  };

  return {
    statusCode: status,
    errorKey: code,
    errorMessage: serviceMessage ?? error.message,
  };
};

/**
 * Reports client-side errors to Reverb as a first-class "error" event, carrying
 * the feature and action that failed plus the service status/code/message for
 * diagnostics. Filtering keeps only actionable failures: missing errors and
 * offline connectivity failures are dropped.
 */
const useErrorTracking = () => {
  const { trackingIsEnabled } = useTrackingToggle();
  const {
    pageIdentifier,
    producerName,
    statsDestination,
    isSignedIn,
    hashedId,
  } = extractATITrackingProps({
    eventType: VIEW_EVENT,
  });
  const lastTrackedErrorRef = useRef<unknown>(null);

  return useCallback(
    ({ error, feature, action }: TrackErrorParams) => {
      if (!isTrackableError(error)) return;
      if (error === lastTrackedErrorRef.current) return;
      lastTrackedErrorRef.current = error;

      const { statusCode, errorKey, errorMessage } = extractErrorDetails(error);

      sendErrorEvent({
        feature,
        errorName: action,
        errorKey,
        errorMessage,
        statusCode,
        trackingIsEnabled,
        pageIdentifier,
        producerName,
        statsDestination,
        isSignedIn,
        hashedId,
      });
    },
    [
      trackingIsEnabled,
      pageIdentifier,
      producerName,
      statsDestination,
      isSignedIn,
      hashedId,
    ],
  );
};

export default useErrorTracking;
