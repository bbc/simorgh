export const CPSMediaBlock = {
  id: 'p07jl3lv',
  subType: 'clip',
  format: 'video',
  title: 'Why dis pikin get fish skin',
  synopses: {
    short: 'Short Synopsis',
    long: 'Long Synopsis',
    medium: 'Medium Synopsis',
  },
  imageUrl: 'ichef.bbci.co.uk/images/ic/$recipe/p07jl8g4.jpg',
  embedding: true,
  advertising: true,
  caption: 'Warning: Dis video fit make you feel one kain!',
  versions: [
    {
      versionId: 'p07jl3lx',
      types: ['Original'],
      duration: 101,
      durationISO8601: 'PT1M41S',
      warnings: {
        long: 'This is a long warning',
        short: 'This is a short warning',
      },
      availableTerritories: {
        uk: true,
        nonUk: true,
      },
      availableFrom: 1564740166,
    },
  ],
  imageCopyright: 'BBC',
  type: 'media',
};

export const optimoVideoBlock = {
  type: 'video',
  model: {
    locator: 'urn:bbc:pips:pid:p07jl3lv',
    blocks: [
      {
        type: 'aresMedia',
        model: {
          blocks: [
            {
              type: 'aresMediaMetadata',
              blockId: 'urn:bbc:ares::clip:p07jl3lv',
              model: {
                advertising: true,
                available: true,
                embedding: true,
                format: 'audio_video',
                id: 'p07jl3lv',
                imageCopyright: 'BBC',
                imageUrl: 'ichef.bbci.co.uk/images/ic/$recipe/p07jl8g4.jpg',
                subType: 'clip',
                synopses: {
                  short: 'Short Synopsis',
                  long: 'Long Synopsis',
                  medium: 'Medium Synopsis',
                },
                title: 'Why dis pikin get fish skin',
                versions: [
                  {
                    availableFrom: 1564740166,
                    availableTerritories: {
                      nonUk: true,
                      uk: true,
                    },
                    duration: 101,
                    durationISO8601: 'PT1M41S',
                    types: ['Original'],
                    versionId: 'p07jl3lx',
                    warnings: {
                      long: 'This is a long warning',
                      short: 'This is a short warning',
                    },
                  },
                ],
              },
            },
            {
              type: 'image',
              model: {
                blocks: [
                  {
                    type: 'rawImage',
                    model: {
                      copyrightHolder: 'BBC',
                      locator:
                        'https://ichef.bbci.co.uk/images/ic/1024x576/p07jl8g4.jpg',
                      originCode: 'pips',
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  },
};
