const validVideoBlocksArray = [
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
                        text:
                          'Video, Clip, International and UK, Guidance, Subtitles',
                      },
                      type: 'fragment',
                      id: 'a528a176-bab3-4138-bc72-ea6c2faffdb1',
                      position: [4, 1, 1, 1, 1],
                    },
                  ],
                  text:
                    'Video, Clip, International and UK, Guidance, Subtitles',
                },
                type: 'paragraph',
                id: 'd77104b4-4824-4bdb-985d-9c1e1b56ceb5',
                position: [4, 1, 1, 1],
              },
            ],
          },
          type: 'text',
          id: 'e090f453-0e13-48cb-974a-6071b1df97b9',
          position: [4, 1, 1],
        },
      ],
    },
    type: 'caption',
    id: 'c612d1fc-f30c-4ec3-aa88-6ad4354587e8',
    position: [4, 1],
  },
  {
    model: {
      blocks: [
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
            syndication: { destinations: [] },
            synopses: {
              short:
                'They may be tiny, but us humans could learn a thing or two from ants.',
            },
            title: 'Five things ants can teach us about management',
            versions: [
              {
                availableFrom: 1540218932000,
                availableTerritories: { nonUk: true, uk: true },
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
          id: 'bede042c-ec9c-4462-8338-4b6fd9cde35d',
          position: [4, 2, 1],
        },
        {
          model: {
            blocks: [
              {
                model: {
                  copyrightHolder: 'BBC',
                  height: 1080,
                  locator:
                    'ichef.test.bbci.co.uk/images/ic/$widthxn/p01k6mtv.jpg',
                  originCode: 'mpv',
                  width: 1920,
                },
                type: 'rawImage',
                id: '48e075e3-2f46-4dd5-badf-432a08f66482',
                position: [4, 2, 2, 1],
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
                                  model: { attributes: [], text: 'Ants' },
                                  type: 'fragment',
                                  id: 'f41d5c98-0fb0-4b5a-8441-c22b5ee8166a',
                                  position: [4, 2, 2, 2, 1, 1, 1],
                                },
                              ],
                              text: 'Ants',
                            },
                            type: 'paragraph',
                            id: '7c222de4-cb37-4c1c-afb3-b5e3f1d9c19d',
                            position: [4, 2, 2, 2, 1, 1],
                          },
                        ],
                      },
                      type: 'text',
                      id: '9bb81a8e-c1cb-4665-b414-8b20a968915e',
                      position: [4, 2, 2, 2, 1],
                    },
                  ],
                },
                type: 'altText',
                id: 'cd78c451-ef68-4e2d-b50b-936fbdcb6582',
                position: [4, 2, 2, 2],
              },
            ],
          },
          type: 'image',
          id: '4c000b11-a141-4983-acec-71fd5473e215',
          position: [4, 2, 2],
        },
      ],
    },
    type: 'aresMedia',
    id: 'e91c1a38-641d-4787-bec3-4f3783bb4b45',
    position: [4, 2],
  },
];

export default validVideoBlocksArray;
