import { Platforms, Services } from '#app/models/types/global';
import { buildActivationEventModel } from '../beaconModels';
import sendBeacon from '../sendBeacon';

type Props = {
  experimentName: string;
  experimentVariant?: string | null;
  trackingIsEnabled: boolean;
  pageIdentifier?: string;
  platform?: Platforms;
  appName?: string;
  producerId?: string;
  producerName?: string;
  statsDestination?: string;
  service?: Services;
  isSignedIn?: boolean;
  hashedId?: string | null;
};

/**
 * Sends a standalone Piano/Reverb "activation" beacon at the point a user is
 * activated into an Optimizely experiment, decoupled from any view/click event.
 * Callers are responsible for only invoking this once per activation (see the
 * dedupe in `optimizelyDecisionStore`).
 */
const sendOptimizelyActivationEvent = async ({
  experimentName,
  experimentVariant,
  trackingIsEnabled,
  pageIdentifier,
  platform,
  appName,
  producerName,
  statsDestination,
  isSignedIn,
  hashedId,
}: Props) => {
  if (!trackingIsEnabled || !experimentVariant || experimentVariant === 'off') {
    return;
  }

  const shouldSendEvent = [
    experimentName,
    pageIdentifier,
    producerName,
    statsDestination,
  ].every(Boolean);

  if (!shouldSendEvent) {
    return;
  }

  const reverbParams = buildActivationEventModel({
    pageIdentifier,
    platform,
    appName,
    producerName,
    statsDestination,
    experimentName,
    experimentVariant,
    isSignedIn,
    hashedId,
  });

  await sendBeacon(reverbParams);
};

export default sendOptimizelyActivationEvent;
