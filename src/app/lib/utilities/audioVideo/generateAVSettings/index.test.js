import generateAVSettings from '.';
import {
  video,
  expectedVideoSettingsObject,
  audio,
  expectedAudioSettingsObject,
} from '../helpers/fixtures';

describe('generateAVSettings', () => {
  it('should return nothing if empty array', () => {
    expect(
      generateAVSettings({
        audioVideoBlocks: [],
        env: 'test',
        statsDestination: 'NEWS_PS_TEST',
        statsPageIdentifier: 'news.articles.c0000000000o.page',
      }),
    ).toStrictEqual([]);
  });

  it('should generate id and mediaPlayerSettings for single av block', () => {
    expect(
      generateAVSettings({
        audioVideoBlocks: [video],
        env: 'test',
        statsDestination: 'NEWS_PS_TEST',
        statsPageIdentifier: 'news.articles.c0000000000o.page',
      }),
    ).toStrictEqual([
      {
        id: 'p01k6msm',
        mediaPlayerSettings: JSON.stringify(expectedVideoSettingsObject),
      },
    ]);
  });

  it('should generate id and mediaPlayerSettings for multiple av blocks', () => {
    expect(
      generateAVSettings({
        audioVideoBlocks: [audio, video],
        env: 'test',
        statsDestination: 'NEWS_PS_TEST',
        statsPageIdentifier: 'news.articles.c0000000000o.page',
      }),
    ).toStrictEqual([
      {
        id: 'p01m7d07',
        mediaPlayerSettings: JSON.stringify(expectedAudioSettingsObject),
      },
      {
        id: 'p01k6msm',
        mediaPlayerSettings: JSON.stringify(expectedVideoSettingsObject),
      },
    ]);
  });
});
