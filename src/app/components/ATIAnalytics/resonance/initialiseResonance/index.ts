import { ResonanceBeaconConfig } from '../../types';
import { markResonanceReady } from '../dispatchResonanceEvent';

export default async (resonanceParams: ResonanceBeaconConfig) => {
  const { Resonance } = await import('@bbc/resonance');

  try {
    Resonance.initialise(
      resonanceParams.resonanceProperties,
      resonanceParams.baseProperties,
      resonanceParams.pageviewProperties,
    );
  } catch (error) {
    throw new Error(`Error initialising Resonance: ${error}`);
  }

  markResonanceReady();
};
