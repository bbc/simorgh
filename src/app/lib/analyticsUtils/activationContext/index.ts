export type ActivationContext = {
  trackingIsEnabled: boolean;
  pageIdentifier?: string;
  producerName?: string;
  statsDestination?: string;
  isSignedIn?: boolean;
  hashedId?: string | null;
};

const NO_ACTIVATION_CONTEXT: ActivationContext = { trackingIsEnabled: false };

let activationContext: ActivationContext = NO_ACTIVATION_CONTEXT;

// Bridges the current page's ATI/tracking context (React state) into the
// Optimizely DECISION notification listener, which runs outside the React tree.
export const setActivationContext = (context: ActivationContext) => {
  activationContext = context;
};

export const getActivationContext = (): ActivationContext => activationContext;

export const resetActivationContext = () => {
  activationContext = NO_ACTIVATION_CONTEXT;
};
