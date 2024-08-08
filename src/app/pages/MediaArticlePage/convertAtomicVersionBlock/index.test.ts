import convertAtomicVersionBlock from '.';

const FIXTURE = {
  id: '108540166',
  subType: 'primary',
  format: 'video',
  externalId: 'bbc_arabic_tv',
  duration: 'PT0S',
  embedding: false,
  available: true,
  live: true,
  blocks: [
    {
      type: 'caption',
      model: {
        blocks: [
          {
            type: 'text',
            model: {
              blocks: [
                {
                  type: 'paragraph',
                  model: {
                    text: '',
                    blocks: [
                      {
                        type: 'fragment',
                        model: {
                          text: '',
                          attributes: [],
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
    },
    {
      type: 'image',
      model: {
        blocks: [
          {
            type: 'altText',
            model: {
              blocks: [
                {
                  type: 'text',
                  model: {
                    blocks: [
                      {
                        type: 'paragraph',
                        model: {
                          text: 'BBC Arabic logo',
                          blocks: [
                            {
                              type: 'fragment',
                              model: {
                                text: 'BBC Arabic logo',
                                attributes: [],
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
          },
          {
            type: 'rawImage',
            model: {
              height: 576,
              width: 1024,
              locator: 'CF4E/production/_111607035_arabic_16_9_updated.png',
              href: 'http://c.files.bbci.co.uk/CF4E/production/_111607035_arabic_16_9_updated.png',
              originCode: 'cpsprodpb',
              copyrightHolder: 'BBC',
              suitableForSyndication: true,
            },
          },
        ],
      },
    },
  ],
};

describe('convertAtomicVersionBlock', () => {
  it('should convert an atomic version block', () => {
    const result = convertAtomicVersionBlock(FIXTURE, 'BBC Arabic');

    expect(result).toEqual([
      {
        type: 'aresMedia',
        model: {
          blocks: [
            {
              type: 'aresMediaMetadata',
              blockId: 'urn:bbc:ares::primary:108540166',
              model: {
                embedding: false,
                id: '108540166',
                subType: 'primary',
                live: true,
                available: true,
                format: 'audio_video',
                title: 'BBC Arabic',
                imageUrl:
                  'http://c.files.bbci.co.uk/CF4E/production/_111607035_arabic_16_9_updated.png',
                imageCopyright: 'BBC',
                synopses: {
                  short: 'BBC Arabic',
                  medium: 'BBC Arabic',
                  long: 'BBC Arabic',
                },
                versions: [
                  {
                    kind: 'programme',
                    live: true,
                    versionId: 'bbc_arabic_tv',
                  },
                ],
              },
            },
          ],
        },
      },
    ]);
  });
});
