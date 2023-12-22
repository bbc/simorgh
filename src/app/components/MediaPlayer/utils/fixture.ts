const sampleBlocks = [
  {
    id: '80e150c0',
    type: 'aresMedia',
    model: {
      blocks: [
        {
          id: 'c77c0598',
          blockId: 'urn:bbc:ares::clip:p01k6msm',
          type: 'aresMediaMetadata',
          model: {
            id: 'p01k6msm',
            subType: 'clip',
            format: 'video',
            title: 'Five things ants can teach us about management',
            synopses: {
              short:
                'They may be tiny, but us humans could learn a thing or two from ants.',
            },
            imageUrl: 'ichef.test.bbci.co.uk/images/ic/$recipe/p01k6mtv.jpg',
            imageCopyright: 'BBC',
            embedding: true,
            advertising: true,
            versions: [
              {
                versionId: 'p01k6msp',
                types: ['Original'],
                duration: 191,
                durationISO8601: 'PT3M11S',
                warnings: {
                  short: 'Contains strong language and adult humour.',
                  long: 'Contains strong language and adult humour.',
                },
                availableTerritories: {
                  uk: true,
                  nonUk: true,
                },
                availableFrom: 1540218932000,
              },
            ],
            syndication: {
              destinations: [],
            },
            smpKind: 'programme',
          },
          position: [5, 2, 1],
        },
        {
          id: 'd8f26383',
          type: 'image',
          model: {
            blocks: [
              {
                id: 'fcdba133',
                type: 'rawImage',
                model: {
                  width: 1920,
                  height: 1080,
                  locator:
                    'ichef.test.bbci.co.uk/images/ic/$widthxn/p01k6mtv.jpg',
                  originCode: 'mpv',
                  copyrightHolder: 'BBC',
                },
              },
              {
                id: '63679c9e',
                type: 'altText',
                model: {
                  blocks: [
                    {
                      id: '33876888',
                      type: 'text',
                      model: {
                        blocks: [
                          {
                            id: '26dbfca2',
                            type: 'paragraph',
                            model: {
                              text: 'Ants',
                              blocks: [
                                {
                                  id: 'ed9f30c9',
                                  type: 'fragment',
                                  model: {
                                    text: 'Ants',
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
            ],
          },
        },
      ],
    },
  },
];

export default sampleBlocks;
