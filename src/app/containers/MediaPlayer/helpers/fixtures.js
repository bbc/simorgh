import { singleTextBlock } from '../../../models/blocks';

const captionBlock = {
  model: {
    blocks: [
      {
        model: {
          blocks: [singleTextBlock('Caption')],
        },
      },
    ],
  },
  type: 'caption',
};

const imageBlock = {
  model: {
    blocks: [
      {
        model: {
          copyrightHolder: 'BBC',
          height: 1080,
          locator: 'ichef.test.bbci.co.uk/images/ic/$widthxn/p01k6mtv.jpg',
          originCode: 'mpv',
          width: 1920,
        },
        type: 'rawImage',
        id: '48e075e3-2f46-4dd5-badf-432a08f66482',
        position: [4, 2, 2, 1],
      },
      {
        model: {
          blocks: [singleTextBlock('Ants')],
        },
        type: 'altText',
      },
    ],
  },
  type: 'image',
  id: '4c000b11-a141-4983-acec-71fd5473e215',
  position: [4, 2, 2],
};

export const validAresMediaVideoBlock = {
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
              availableFrom: 1540218932000,
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
      imageBlock,
    ],
  },
  type: 'aresMedia',
};

export const validAresMediaAudioBlock = {
  model: {
    blocks: [
      {
        blockId: 'urn:bbc:ares::clip:p01m7d07',
        model: {
          advertising: false,
          embedding: false,
          format: 'audio',
          id: 'p01m7d07',
          imageCopyright: 'Getty Images',
          imageUrl: 'ichef.test.bbci.co.uk/images/ic/$recipe/p01mt2kt.jpg',
          subType: 'clip',
          syndication: {
            destinations: [],
          },
          synopses: {
            short: 'Some audio from a supermarket checkout in Birmingham',
          },
          title: 'Birmingham checkout',
          versions: [
            {
              availableFrom: 1555067395000,
              availableTerritories: {
                nonUk: true,
                uk: true,
              },
              duration: 127,
              durationISO8601: 'PT2M7S',
              types: ['Original'],
              versionId: 'p01m7d09',
              warnings: {
                long: 'Contains some strong language.',
                short: 'Contains some strong language.',
              },
            },
          ],
        },
        type: 'aresMediaMetadata',
      },
      imageBlock,
    ],
  },
  type: 'aresMedia',
};

export const missingAresMediaMetadata = {
  model: {
    blocks: [imageBlock],
  },
  type: 'aresMedia',
};

export const multipleAresMetadata = {
  model: {
    blocks: [
      {
        blockId: 'urn:bbc:ares::clip:p01k6msm',
        model: {
          advertising: true,
          caption: null,
          embedding: true,
          format: 'audio_video',
          id: 'p01k6msm',
          image: null,
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
              availableTerritories: {
                nonUk: true,
                uk: true,
              },
              availableUntil: null,
              duration: 191,
              types: ['Original'],
              versionId: 'p01k6msp',
              availableFrom: 1540218932,
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
        blockId: 'urn:bbc:ares::clip:p01k6mss',
        model: {
          advertising: true,
          caption: null,
          embedding: true,
          format: 'audio_video',
          id: 'p01k6mss',
          image: null,
          imageCopyright: 'BBC',
          imageUrl: 'ichef.test.bbci.co.uk/images/ic/$recipe/p01k6mtv.jpg',
          subType: 'clip',
          syndication: {
            destinations: [],
          },
          synopses: {
            short:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
          },
          title: 'Lorem ipsum is commonly used placeholder text.',
          versions: [
            {
              availableTerritories: {
                nonUk: true,
                uk: true,
              },
              availableUntil: null,
              duration: 191,
              types: ['Original'],
              versionId: 'p01k6msp',
              availableFrom: 1540218932,
              warnings: {
                long: 'Contains common text.',
                short: 'Contains common text.',
              },
            },
          ],
        },
        type: 'aresMediaMetadata',
      },
      imageBlock,
    ],
  },
  type: 'aresMedia',
};

export const validVideoFixture = [captionBlock, validAresMediaVideoBlock];

export const missingVpidFixture = [
  captionBlock,
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
        imageBlock,
      ],
    },
    type: 'aresMedia',
    id: 'e91c1a38-641d-4787-bec3-4f3783bb4b45',
    position: [4, 2],
  },
];
