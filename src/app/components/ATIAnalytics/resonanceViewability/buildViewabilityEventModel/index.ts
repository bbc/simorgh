import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import { Services } from '#app/models/types/global';
import { ResonanceViewabilityEventDetail } from '../types';

type BuildViewabilityEventModelProps = EventTrackingData & {
  service?: Services;
};

// DRAFT mapping - field names are a best guess from the existing Reverb view event props
// and have not yet been confirmed against the Viewability Events properties reference.
const buildViewabilityEventModel = ({
  componentName,
  producerName,
  statsDestination,
  service,
  isSignedIn,
  hashedId,
  itemTracker,
}: BuildViewabilityEventModelProps): ResonanceViewabilityEventDetail => ({
  event: {
    action: 'view',
    category: componentName,
  },
  ...(itemTracker && {
    item: {
      type: itemTracker.type,
      text: itemTracker.text,
      position: itemTracker.position,
    },
  }),
  destination: statsDestination,
  producer: producerName,
  service,
  isSignedIn,
  hashedId,
});

export default buildViewabilityEventModel;
