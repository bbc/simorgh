import { Resonance } from '@bbc/resonance';
import { ResonanceBeaconConfig } from '../../types';
import { markResonanceReady } from '../dispatchResonanceEvent';
import initialiseResonance from '.';

jest.mock('../dispatchResonanceEvent', () => ({
  __esModule: true,
  default: jest.fn(),
  markResonanceReady: jest.fn(),
}));

const resonanceConfig = {
  resonanceProperties: { mode: 'test' },
  baseProperties: {
    app: { name: 'news-pidgin' },
    destination: 'statsDestination',
    pageName: 'pidgin.page',
    producer: 'PIDGIN',
    siteId: 598343,
  },
  pageviewProperties: {
    contentId: 'urn:bbc:optimo:asset:c0000000001o',
    contentType: 'article',
    language: 'pcm',
    destination: 'statsDestination',
    producer: 'PIDGIN',
  },
} as unknown as ResonanceBeaconConfig;

describe('initialiseResonance', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call Resonance.initialise with the correct params', async () => {
    await initialiseResonance(resonanceConfig);

    expect(Resonance.initialise).toHaveBeenCalledTimes(1);
    expect(Resonance.initialise).toHaveBeenCalledWith(
      resonanceConfig.resonanceProperties,
      resonanceConfig.baseProperties,
      resonanceConfig.pageviewProperties,
    );
  });

  it('should mark Resonance as ready after Resonance.initialise', async () => {
    await initialiseResonance(resonanceConfig);

    expect(markResonanceReady).toHaveBeenCalledTimes(1);
    expect(
      (Resonance.initialise as jest.Mock).mock.invocationCallOrder[0],
    ).toBeLessThan(
      (markResonanceReady as jest.Mock).mock.invocationCallOrder[0],
    );
  });

  it('should throw and not mark Resonance as ready when Resonance.initialise throws', async () => {
    const error = new Error('Resonance failed');
    (Resonance.initialise as jest.Mock).mockImplementationOnce(() => {
      throw error;
    });

    await expect(initialiseResonance(resonanceConfig)).rejects.toThrow(
      `Error initialising Resonance: ${error}`,
    );
    expect(markResonanceReady).not.toHaveBeenCalled();
  });
});
