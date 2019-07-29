import { singleTextBlock } from '../../../models/blocks';

export const noAresMediaMetadata = {
  model: {
    blocks: [
      {
        model: {
          blocks: [
            {
              model: {
                copyrightHolder: 'BBC',
                height: 1080,
                locator: 'ichef.test.bbci.co.uk/images/ic/$recipe/p01k6mtv.jpg',
                originCode: null,
                width: 1920,
              },
              type: 'rawImage',
            },
            {
              model: {
                blocks: [
                  {
                    model: {
                      copyrightHolder: 'BBC',
                      height: 1080,
                      locator:
                        'ichef.test.bbci.co.uk/images/ic/$recipe/p01k6mtv.jpg',
                      originCode: null,
                      width: 1920,
                    },
                    type: 'rawImage',
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
            },
          ],
        },
        type: 'image',
      },
    ],
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
      {
        model: {
          blocks: [
            {
              model: {
                copyrightHolder: 'BBC',
                height: 1080,
                locator: 'ichef.test.bbci.co.uk/images/ic/$recipe/p01k6mtv.jpg',
                originCode: null,
                width: 1920,
              },
              type: 'rawImage',
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
      },
    ],
  },
  type: 'aresMedia',
};

export const captionBlock = text => ({
  model: {
    blocks: [singleTextBlock(text)],
  },
  type: 'caption',
});

export const videoClipGlobalGuidanceBlock = {
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
              availableFrom: null,
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
                originCode: null,
                width: 1920,
              },
              type: 'rawImage',
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
      },
    ],
  },
  type: 'aresMedia',
};

export const videoClipGlobalPortraitBlock = {
  model: {
    blocks: [
      {
        blockId: 'urn:bbc:ares::clip:p01m7hmc',
        type: 'aresMediaMetadata',
        model: {
          id: 'p01m7hmc',
          subType: 'clip',
          format: 'audio_video',
          title: 'Test vertical video',
          synopses: {
            short: 'This is a really plain green test vertical video',
          },
          imageUrl: 'ichef.test.bbci.co.uk/images/ic/$recipe/p01mxrbn.jpg',
          imageCopyright: null,
          embedding: true,
          advertising: true,
          caption: null,
          versions: [
            {
              versionId: 'p01m7hmf',
              types: ['Portrait'],
              duration: 11,
              warnings: {},
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
                locator: 'ichef.test.bbci.co.uk/images/ic/$recipe/p01mxrbn.jpg',
                originCode: null,
                copyrightHolder: null,
              },
            },
          ],
        },
      },
    ],
  },
  type: 'aresMedia',
};

export const videoClipUkGuidanceBlock = {
  model: {
    blocks: [
      {
        blockId: 'urn:bbc:ares::clip:p01kdbns',
        type: 'aresMediaMetadata',
        model: {
          id: 'p01kdbns',
          subType: 'clip',
          format: 'audio_video',
          title: 'How Germans remember the World Wars',
          synopses: {
            short: 'Remembrance Day: How Germans remember the World Wars',
            long:
              "Can people in today's Germany mourn their dead without whitewashing their country's past? We ask three Germans, ahead of the 100th anniversary of the end of World War One.",
            medium:
              "Can people in today's Germany mourn their dead without whitewashing their country's past?",
          },
          imageUrl: 'ichef.test.bbci.co.uk/images/ic/$recipe/p01kdbpk.jpg',
          imageCopyright: 'BBC',
          embedding: true,
          advertising: true,
          caption: 'How do Germans remember the World Wars?',
          versions: [
            {
              versionId: 'p01kdbnv',
              types: ['Original'],
              duration: 162,
              warnings: {
                short: 'Contains some strong language.',
                long: 'Contains some strong language.',
              },
              availableTerritories: {
                uk: true,
                nonUk: false,
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
                width: 1920,
                height: 1080,
                locator: 'ichef.test.bbci.co.uk/images/ic/$recipe/p01kdbpk.jpg',
                originCode: null,
                copyrightHolder: 'BBC',
              },
            },
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
                            text: 'Description of picture (ALT TEXT)',
                            blocks: [
                              {
                                type: 'fragment',
                                model: {
                                  text: 'Description of picture (ALT TEXT)',
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
  type: 'aresMedia',
};

export const videoClipNonUkBlock = {
  type: 'aresMedia',
  model: {
    blocks: [
      {
        blockId: 'urn:bbc:ares::clip:p01kdbpz',
        type: 'aresMediaMetadata',
        model: {
          id: 'p01kdbpz',
          subType: 'clip',
          format: 'audio_video',
          title: "'I lost my leg to type 2 diabetes' (NON UK)",
          synopses: {
            short: "Diabetes type 2: 'I blame myself for the loss of my leg'",
            long:
              'Every week 170 people in the UK lose a limb because of diabetes. \nAround four million people in the UK are living with diabetes - and around 90% of them have type 2 diabetes, which is often linked to being overweight or inactive. \nDiabetes prescriptions are costing the NHS in England more than £1 billion a year, according to figures from NHS Digital.\nAnd a further 12 million people could be at risk of getting type 2 diabetes in the future.\nStephen Richardson has told the BBC he blames himself for the loss of his limb.',
            medium:
              'Stephen Richardson admits he ignored advice about diet and exercise.',
          },
          imageUrl: 'ichef.test.bbci.co.uk/images/ic/$recipe/p01kdbs1.jpg',
          imageCopyright: 'BBC',
          embedding: true,
          advertising: true,
          caption:
            'Stephen Richardson had to have his leg amputated because of type 2 diabetes',
          versions: [
            {
              versionId: 'p01kdbq2',
              types: ['Original'],
              duration: 122,
              warnings: {},
              availableTerritories: {
                uk: false,
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
                locator: 'ichef.test.bbci.co.uk/images/ic/$recipe/p01kdbs1.jpg',
                originCode: null,
                copyrightHolder: 'BBC',
              },
            },
          ],
        },
      },
    ],
  },
};

export const audioClipGlobalGuidanceBlock = {
  type: 'aresMedia',
  model: {
    blocks: [
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
    ],
  },
};

export const audioClipUkOnlyBlock = {
  type: 'aresMedia',
  model: {
    blocks: [
      {
        blockId: 'urn:bbc:ares::clip:p01m7d3c',
        type: 'aresMediaMetadata',
        model: {
          id: 'p01m7d3c',
          subType: 'clip',
          format: 'audio',
          title: 'Birmingham Checkout 2',
          synopses: {
            short:
              'This is some sound from a supermarket checkout in Birmingham',
          },
          imageUrl: 'ichef.test.bbci.co.uk/images/ic/$recipe/p01mxt94.jpg',
          imageCopyright: null,
          embedding: true,
          advertising: false,
          caption: null,
          versions: [
            {
              versionId: 'p01m7d3h',
              types: ['Original'],
              duration: 127,
              warnings: {},
              availableTerritories: {
                uk: true,
                nonUk: false,
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
                locator: 'ichef.test.bbci.co.uk/images/ic/$recipe/p01mxt94.jpg',
                originCode: null,
                copyrightHolder: null,
              },
            },
          ],
        },
      },
    ],
  },
};

export const audioClipNonUkBlock = {
  type: 'aresMedia',
  model: {
    blocks: [
      {
        blockId: 'urn:bbc:ares::clip:p01m7d4m',
        type: 'aresMediaMetadata',
        model: {
          id: 'p01m7d4m',
          subType: 'clip',
          format: 'audio',
          title: 'Birmingham Checkout 3',
          synopses: {
            short:
              'This is some audio from a supermarket checkout in Birmingham',
          },
          imageUrl: 'ichef.test.bbci.co.uk/images/ic/$recipe/p01mxt92.jpg',
          imageCopyright: null,
          embedding: true,
          advertising: true,
          caption: null,
          versions: [
            {
              versionId: 'p01m7d4p',
              types: ['Original'],
              duration: 127,
              warnings: {},
              availableTerritories: {
                uk: false,
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
                locator: 'ichef.test.bbci.co.uk/images/ic/$recipe/p01mxt92.jpg',
                originCode: null,
                copyrightHolder: null,
              },
            },
          ],
        },
      },
    ],
  },
};
