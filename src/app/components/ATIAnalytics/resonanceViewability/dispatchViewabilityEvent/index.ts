import onClient from '#app/lib/utilities/onClient';
import nodeLogger from '../../../../lib/logger.node';
import { ATI_LOGGING_ERROR } from '../../../../lib/logger.const';
import { ResonanceViewabilityEventDetail } from '../types';

const logger = nodeLogger(__filename);

// Must match the event name Resonance's ViewabilityEventListener subscribes to via
// `document.addEventListener('viewability', ...)` once `Resonance.initialise()` has run.
const RESONANCE_VIEWABILITY_EVENT_NAME = 'viewability';

const dispatchViewabilityEvent = (detail: ResonanceViewabilityEventDetail) => {
  if (!onClient()) return;

  try {
    document.dispatchEvent(
      new CustomEvent(RESONANCE_VIEWABILITY_EVENT_NAME, { detail }),
    );
  } catch (error) {
    logger.error(ATI_LOGGING_ERROR, { error });
  }
};

export default dispatchViewabilityEvent;
