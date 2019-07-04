import mediaPlayerSettings from './mediaPlayerSettings';

const videoAresMediaBlocks = [
  {
    blockId: 'urn:bbc:ares::clip:p01k6msm',
    model: {
      advertising: true,
      embedding: true,
      format: 'audio_video',
      id: 'p01k6msm',
      imageCopyright: 'BBC',
      imageUrl: 'ichef.test.bbci.co.uk/images/ic/$recipe/p01k6mtv.jpg',
      subType: 'clip',
      syndication: {
        destinations: [],
      },
      synopses: {
        short:
          'They may be tiny, but us humans could learn a thing or two from ants.',
      },
      title: 'Five things ants can teach us about management',
      versions: [
        {
          availableFrom: 1540218932,
          availableTerritories: {
            nonUk: true,
            uk: true,
          },
          duration: 191,
          durationISO8601: 'PT3M11S',
          types: ['Original'],
          versionId: 'p01k6msp',
          warnings: {
            long: 'Contains strong language and adult humour.',
            short: 'Contains strong language and adult humour.',
          },
        },
      ],
    },
    type: 'aresMediaMetadata',
  },
  {
    model: {
      blocks: [
        {
          model: {
            copyrightHolder: 'BBC',
            height: 1080,
            locator: 'ichef.test.bbci.co.uk/images/ic/$recipe/p01k6mtv.jpg',
            originCode: 'mpv',
            width: 1920,
          },
          type: 'rawImage',
        },
        {
          model: {
            blocks: [
              {
                model: {
                  blocks: [
                    {
                      model: {
                        blocks: [
                          {
                            model: {
                              attributes: [],
                              text: 'Ants',
                            },
                            type: 'fragment',
                          },
                        ],
                        text: 'Ants',
                      },
                      type: 'paragraph',
                    },
                  ],
                },
                type: 'text',
              },
            ],
          },
          type: 'altText',
        },
      ],
    },
    type: 'image',
  },
];

const audioAresMediaBlocks = [
  {
    blockId: 'urn:bbc:ares::clip:p01m7d07',
    type: 'aresMediaMetadata',
    model: {
      id: 'p01m7d07',
      subType: 'clip',
      format: 'audio',
      title: 'Birmingham checkout',
      synopses: {
        short: 'Some audio from a supermarket checkout in Birmingham',
      },
      imageUrl: 'ichef.test.bbci.co.uk/images/ic/$recipe/p01mt2kt.jpg',
      imageCopyright: null,
      embedding: false,
      advertising: false,
      caption: null,
      versions: [
        {
          versionId: 'p01m7d09',
          types: ['Original'],
          duration: 127,
          warnings: {
            short: 'Contains some strong language.',
            long: 'Contains some strong language.',
          },
          availableTerritories: {
            uk: true,
            nonUk: true,
          },
          availableUntil: null,
          availableFrom: null,
        },
      ],
      image: null,
      syndication: {
        destinations: [],
      },
    },
  },
  {
    type: 'image',
    model: {
      blocks: [
        {
          type: 'rawImage',
          model: {
            width: null,
            height: null,
            locator: 'ichef.test.bbci.co.uk/images/ic/$recipe/p01mt2kt.jpg',
            originCode: null,
            copyrightHolder: null,
          },
        },
      ],
    },
  },
];

const expectedVideoSettingsObject = {
  appName: 'news',
  appType: 'responsive',
  counterName: 'news.articles.c0000000000o.page',
  mediator: { host: 'open.test.bbc.co.uk' },
  playlistObject: {
    title: 'Five things ants can teach us about management',
    holdingImageURL:
      'https://ichef.test.bbci.co.uk/images/ic/$recipe/p01k6mtv.jpg',
    guidance: 'Contains strong language and adult humour.',
    items: [{ versionID: 'p01k6msp', duration: 191, kind: 'programme' }],
  },
  product: 'news',
  statsObject: { destination: 'NEWS_PS_TEST', clipPID: 'p01k6msm' },
  superResponsive: true,
  ui: {
    cta: { mode: 'duration' },
    locale: { lang: 'en-GB' },
    subtitles: { defaultOn: true, enabled: true },
  },
};

const expectedAudioSettingsObject = {
  appName: 'news',
  appType: 'responsive',
  counterName: 'news.articles.c0000000000o.page',
  mediator: { host: 'open.test.bbc.co.uk' },
  playlistObject: {
    title: 'Birmingham checkout',
    holdingImageURL:
      'https://ichef.test.bbci.co.uk/images/ic/$recipe/p01mt2kt.jpg',
    guidance: 'Contains some strong language.',
    items: [{ versionID: 'p01m7d09', duration: 127, kind: 'audio' }],
  },
  product: 'news',
  statsObject: { destination: 'NEWS_PS_TEST', clipPID: 'p01m7d07' },
  superResponsive: true,
  ui: {
    cta: { mode: 'duration' },
    locale: { lang: 'en-GB' },
    subtitles: { defaultOn: true, enabled: true },
  },
};

describe('mediaPlayerSettings', () => {
  it('should return JSON given video aresMediaBlocks input', () => {
    expect(
      mediaPlayerSettings({
        aresMediaBlocks: videoAresMediaBlocks,
        env: 'test',
        statsDestination: 'NEWS_PS_TEST',
        statsPageIdentifier: 'news.articles.c0000000000o.page',
      }),
    ).toEqual(JSON.stringify(expectedVideoSettingsObject));
  });

  it('should return JSON given audio aresMediaBlocks input', () => {
    expect(
      mediaPlayerSettings({
        aresMediaBlocks: audioAresMediaBlocks,
        env: 'test',
        statsDestination: 'NEWS_PS_TEST',
        statsPageIdentifier: 'news.articles.c0000000000o.page',
      }),
    ).toEqual(JSON.stringify(expectedAudioSettingsObject));
  });
});
