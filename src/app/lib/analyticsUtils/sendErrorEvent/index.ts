import { buildErrorEventModel } from '#app/components/ATIAnalytics/atiUrl';
import sendBeacon from '../sendBeacon';

type Props = {
  feature: string;
  errorName: string;
  errorKey?: string;
  errorMessage?: string;
  statusCode?: number;
  trackingIsEnabled: boolean;
  pageIdentifier?: string;
  producerName?: string;
  statsDestination?: string;
  isSignedIn?: boolean;
  hashedId?: string | null;
};

/**
 * Sends a standalone Piano/Reverb "error" beacon when a client-side feature
 * fails, decoupled from any view/click event. Callers are responsible for
 * filtering out non-actionable errors (e.g. offline) before invoking this.
 */
const sendErrorEvent = async ({
  feature,
  errorName,
  errorKey,
  errorMessage,
  statusCode,
  trackingIsEnabled,
  pageIdentifier,
  producerName,
  statsDestination,
  isSignedIn,
  hashedId,
}: Props) => {
  if (!trackingIsEnabled) {
    return;
  }

  const shouldSendEvent = [
    feature,
    errorName,
    pageIdentifier,
    producerName,
    statsDestination,
  ].every(Boolean);

  if (!shouldSendEvent) {
    return;
  }

  const reverbParams = buildErrorEventModel({
    pageIdentifier,
    producerName,
    statsDestination,
    feature,
    errorName,
    errorKey,
    errorMessage,
    statusCode,
    isSignedIn,
    hashedId,
  });

  await sendBeacon(reverbParams);
};

export default sendErrorEvent;
