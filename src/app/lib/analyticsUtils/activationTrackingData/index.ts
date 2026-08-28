import { Platforms } from '#app/models/types/global';

export type ActivationTrackingData = {
  trackingIsEnabled: boolean;
  pageIdentifier?: string;
  platform?: Platforms;
  appName?: string;
  producerName?: string;
  statsDestination?: string;
  isSignedIn?: boolean;
  hashedId?: string | null;
};

const NO_ACTIVATION_TRACKING_DATA: ActivationTrackingData = {
  trackingIsEnabled: false,
};

let activationTrackingData: ActivationTrackingData =
  NO_ACTIVATION_TRACKING_DATA;

// Bridges the current page's ATI/tracking data (React state) into the
// Optimizely DECISION notification listener, which runs outside the React tree.
export const setActivationTrackingData = (data: ActivationTrackingData) => {
  activationTrackingData = data;
};

export const getActivationTrackingData = (): ActivationTrackingData =>
  activationTrackingData;

export const resetActivationTrackingData = () => {
  activationTrackingData = NO_ACTIVATION_TRACKING_DATA;
};
