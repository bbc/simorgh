// import resonance - we can follow the pattern of the reverbURLHelper, e,g.
import { Resonance } from '@bbc/resonance';
import { ReverbClient } from '#app/models/types/eventTracking';
import {
  ReverbBeaconConfig,
  ResonanceBeaconConfig,
  ReverbEventDetails,
} from '#app/components/ATIAnalytics/types';
import onClient from '../../utilities/onClient';
import nodeLogger from '../../logger.node';
import { ATI_LOGGING_ERROR } from '../../logger.const';

const logger = nodeLogger(__filename);

const reverbPageViews = async ({
  reverbInstance,
}: {
  reverbInstance: ReverbClient;
}) => {
  return reverbInstance.viewEvent();
};

type ReverbComponentTrackingProps = {
  reverbInstance: ReverbClient;
  eventDetails: ReverbEventDetails;
};

const reverbComponentTracking = async ({
  reverbInstance,
  eventDetails,
}: ReverbComponentTrackingProps) => {
  const {
    anchorElement,
    experience,
    event,
    eventPublisher,
    group,
    isClick,
    item,
    originalEvent,
  } = eventDetails;

  const actionName = '';
  const actionAdditionalLabels = { event, group, item, experience };

  return reverbInstance.userActionEvent(
    eventPublisher,
    actionName,
    actionAdditionalLabels,
    anchorElement,
    originalEvent,
    isClick,
  );
};

const reverbHandlers = {
  pageView: reverbPageViews,
  sectionView: reverbComponentTracking,
  sectionClick: reverbComponentTracking,
};

const callReverb = async (eventDetails: ReverbEventDetails) => {
  const { eventName } = eventDetails;

  // eslint-disable-next-line no-underscore-dangle
  return window.__reverb.__reverbLoadedPromise.then(
    async reverb => {
      if (!reverb.isReady()) await reverb.initialise();

      await reverbHandlers[eventName]({
        reverbInstance: reverb,
        eventDetails,
      });
    },
    () => {
      logger.error(ATI_LOGGING_ERROR, {
        error: 'Failed to load reverb. No event sent',
      });
    },
  );
};

const callResonance = (resonanceParams: ResonanceBeaconConfig) => {
  try {
    Resonance.initialise(
      resonanceParams.resonanceProperties,
      resonanceParams.baseProperties,
      resonanceParams.pageviewProperties,
    );
  } catch (error) {
    throw new Error(`Error initialising Resonance: ${error}`);
  }
};

const sendBeacon = async (
  reverbBeaconConfig: ReverbBeaconConfig,
  resonanceBeaconConfig?: ResonanceBeaconConfig | null,
) => {
  if (onClient()) {
    try {
      const { eventDetails } = reverbBeaconConfig;

      if (resonanceBeaconConfig) {
        callResonance(resonanceBeaconConfig);
      }

      await callReverb(eventDetails);
    } catch (error) {
      logger.error(ATI_LOGGING_ERROR, {
        error,
      });
    }
  }
};

export default sendBeacon;
