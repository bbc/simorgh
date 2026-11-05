type ResonanceGlobal = {
  initialise: (
    resonanceProperties: unknown,
    baseProperties: unknown,
    pageviewProperties: unknown,
  ) => void;
};

type ResonanceLiteParams = {
  resonanceProperties: unknown;
  baseProperties: unknown;
  pageviewProperties: unknown;
};

// Serialised into the page with toString(), so it must not reference imports.
/* istanbul ignore next */
export default (params: ResonanceLiteParams) => {
  window.addEventListener('load', () => {
    const resonance = (window as unknown as { __Resonance?: ResonanceGlobal })
      .__Resonance;

    if (!resonance) return;

    resonance.initialise(
      params.resonanceProperties,
      params.baseProperties,
      params.pageviewProperties,
    );
  });
};
