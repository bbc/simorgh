import mediaPlayerSettings from '.';
import {
  videoAresMediaBlocks,
  expectedVideoSettingsObject,
  audioAresMediaBlocks,
  expectedAudioSettingsObject,
  fakeAudioEpisodeAresMediaBlocks,
  expectedFakeAudioEpisodeSettingsObject,
} from '../helpers/fixtures';

describe('mediaPlayerSettings', () => {
  describe('insufficient data', () => {
    it('should return null if aresMediaBlocks is missing', () => {
      expect(
        mediaPlayerSettings({
          aresMediaBlocks: undefined,
          env: 'test',
          statsDestination: 'NEWS_PS_TEST',
          statsPageIdentifier: 'news.articles.c0000000000o.page',
        }),
      ).toEqual(null);
    });
  });

  describe('returns SMP settings object in strigified JSON format', () => {
    it('should return expected JSON given video aresMediaBlocks input', () => {
      expect(
        mediaPlayerSettings({
          aresMediaBlocks: videoAresMediaBlocks,
          env: 'test',
          statsDestination: 'NEWS_PS_TEST',
          statsPageIdentifier: 'news.articles.c0000000000o.page',
        }),
      ).toEqual(JSON.stringify(expectedVideoSettingsObject));
    });

    it('should return expected JSON given audio aresMediaBlocks input', () => {
      expect(
        mediaPlayerSettings({
          aresMediaBlocks: audioAresMediaBlocks,
          env: 'test',
          statsDestination: 'NEWS_PS_TEST',
          statsPageIdentifier: 'news.articles.c0000000000o.page',
        }),
      ).toEqual(JSON.stringify(expectedAudioSettingsObject));
    });

    it('should return in case type of media is an episode', () => {
      expect(
        mediaPlayerSettings({
          aresMediaBlocks: fakeAudioEpisodeAresMediaBlocks,
          env: 'test',
          statsDestination: 'NEWS_PS_TEST',
          statsPageIdentifier: 'news.articles.c0000000000o.page',
        }),
      ).toEqual(JSON.stringify(expectedFakeAudioEpisodeSettingsObject));
    });
  });
});
