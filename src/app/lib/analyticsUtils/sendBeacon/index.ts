// import resonance - we can follow the pattern of the reverbURLHelper, e,g.
import { Resonance, ResonanceMode } from '@bbc/resonance';
import { ReverbClient } from '#app/models/types/eventTracking';
import {
  ReverbBeaconConfig,
  ResonanceBeaconConfig,
  ReverbEventDetails,
} from '#app/components/ATIAnalytics/types';
// import type {
//   ResonanceProperties,
//   PageviewProperties,
//   BaseProperties,
// } from '@bbc/resonance';
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
      if (!reverb.isReady()) await reverb.initialise(); // here we initialise reverb

      console.log('Reverb initialised with params:', eventDetails);

      await reverbHandlers[eventName]({
        reverbInstance: reverb,
        eventDetails,
      });
    },
    () => {
      logger.error(ATI_LOGGING_ERROR, {
        error: 'Failed to load reverb. No event sent',
      });
      console.log('Reverb errored with params:', eventDetails);
    },
  );
};

const callResonance = (resonanceParams: ResonanceBeaconConfig) => {
  try {
    // add checks in here so this only runs when resonanceParams is not undefined.
    console.log('Resonance initialised with params:', resonanceParams);
    Resonance.initialise(
      resonanceParams.resonanceProperties,
      resonanceParams.baseProperties,
      resonanceParams.pageviewProperties,
    );
  } catch (error) {
    console.log('throwing error with param:', resonanceParams);
    throw new Error(`Error initialising Resonance: ${error}`);
  }
};

// add setResonancePageValues function here

// add initialise Resonance function here inside callResonance function
// option to use resonanceProperties.suppressInitialPageview at initialisation.

const sendBeacon = async (
  reverbBeaconConfig: ReverbBeaconConfig,
  resonanceParams?: ResonanceBeaconConfig | null,
) => {
  // add resonanceBeaconConfig param to function if needed, e.g.
  // sendBeacon = async (reverbBeaconConfig: ReverbBeaconConfig, resonanceBeaconConfig?: ResonanceBeaconConfig) => {
  if (onClient()) {
    try {
      const { eventDetails } = reverbBeaconConfig;
      // add if else statement here to run resonance analytics if resonanceBeaconConfig is passed in
      // IF we are not wanting to send both reverb and resonance page view info
      // otherwise take a different approach
      // e.g.
      // if (resonanceBeaconConfig) {
      //   const {
      //     params: { page, user },
      //     eventDetails,
      //   } = resonanceBeaconConfig;

      //   await setResonancePageValues({ pageVars: page, userVars: user });

      //   await callResonance(eventDetails);
      // } else {

      if (resonanceParams) {
        callResonance(resonanceParams);
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
