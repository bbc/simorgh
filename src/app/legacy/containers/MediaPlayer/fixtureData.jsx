import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { singleTextBlock } from '#models/blocks';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ARTICLE_PAGE, LIVE_PAGE } from '#routes/utils/pageTypes';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import MediaPlayerContainer from '.';

const captionBlock = {
  model: {
    blocks: [singleTextBlock('Media Player With Caption', 'mock-id-1')],
  },
  type: 'caption',
};

const captionBlockLivePage = {
  id: '60db696a',
  type: 'caption',
  model: {
    blocks: [
      {
        id: 'ea8e7d84',
        type: 'text',
        model: {
          blocks: [
            {
              id: 'c7ca4de7',
              type: 'paragraph',
              model: {
                text: 'BBC launch trailer for We Know Our Place women\'s sport campaign"',
                blocks: [
                  {
                    id: 'b33e4302',
                    type: 'fragment',
                    model: {
                      text: 'BBC launch trailer for We Know Our Place women\'s sport campaign"',
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
          blocks: [singleTextBlock('Ants', 'mock-id-2')],
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

export const validAresWebcastVideoBlock = {
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
          webcastVersions: [
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

export const validAresWebcastVideoBlockVersionsPresent = {
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
              versionId: 'versionsID',
              warnings: {
                long: 'Contains strong language and adult humour.',
                short: 'Contains strong language and adult humour.',
              },
            },
          ],
          webcastVersions: [
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

export const validAresVideoBlockEmptyWebcast = {
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
          webcastVersions: [],
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

export const validTransformedCPSAudioBlock = {
  id: '0bba6b33',
  type: 'aresMedia',
  model: {
    blocks: [
      {
        id: 'f81137f6',
        type: 'aresMediaMetadata',
        blockId: 'urn:bbc:ares::clip:p01mr6r7',
        model: {
          advertising: true,
          caption: 'A caption for a test asset',
          embedding: true,
          format: 'audio',
          id: 'p01mr6r7',
          imageCopyright: 'Getty Images',
          imageUrl: 'ichef.test.bbci.co.uk/images/ic/$recipe/p01mr7dp.jpg',
          subType: 'clip',
          synopses: {
            short:
              'Сева Бойко рассказывает о том, как в Ливерпуле отметили победу в Лиге чемпионов.',
          },
          title:
            'Подкаст "Разговоры с арбитром": чемпионский парад "Ливерпуля"',
          versions: [
            {
              versionId: 'p01mr6r9',
              types: ['Original'],
              duration: 1961,
              durationISO8601: 'PT32M41S',
              warnings: {},
              availableTerritories: {
                uk: true,
                nonUk: true,
              },
              availableFrom: 1559819809000,
            },
          ],
          available: true,
        },
        position: [19, 1, 1],
      },
      {
        id: '7f90e6c5',
        type: 'image',
        model: {
          blocks: [
            {
              id: 'fa7c810d',
              type: 'rawImage',
              model: {
                copyrightHolder: 'Getty Images',
                locator:
                  'https://ichef.test.bbci.co.uk/images/ic/1024x576/p01mr7dp.jpg',
                originCode: 'pips',
              },
              position: [19, 1, 2, 1],
            },
          ],
        },
        position: [19, 1, 2],
      },
      {
        id: '68183aff',
        type: 'caption',
        model: {
          blocks: [
            {
              id: '1f41a3c0',
              type: 'text',
              model: {
                blocks: [
                  {
                    id: '764f4cd3',
                    type: 'paragraph',
                    model: {
                      text: 'A caption for a test asset',
                      blocks: [
                        {
                          id: 'cfa881a7',
                          type: 'fragment',
                          model: {
                            text: 'A caption for a test asset',
                            attributes: [],
                          },
                          position: [19, 1, 3, 1, 1, 1],
                        },
                      ],
                    },
                    position: [19, 1, 3, 1, 1],
                  },
                ],
              },
              position: [19, 1, 3, 1],
            },
          ],
        },
        position: [19, 1, 3],
      },
    ],
  },
  position: [19, 1],
};

export const validClipMediaVideoBlock = {
  id: '1ce4d114',
  type: 'clipMedia',
  model: {
    id: 'urn:bbc:pips:pid:p01thw20',
    urns: {
      pipsPid: 'urn:bbc:pips:pid:p01thw20',
    },
    images: [
      {
        url: 'https://ichef.test.bbci.co.uk/images/ic/1024xn/p01thw3g.jpg',
        urlTemplate:
          'https://ichef.test.bbci.co.uk/images/ic/{width}xn/p01thw3g.jpg',
        altText:
          'BBC launch trailer for We Know Our Place women\'s sport campaign"',
        type: 'socialImage',
        source: 'pipsImage',
      },
      {
        url: 'https://ichef.test.bbci.co.uk/images/ic/1024xn/p01thw3g.jpg',
        urlTemplate:
          'https://ichef.test.bbci.co.uk/images/ic/{width}xn/p01thw3g.jpg',
        altText:
          'BBC launch trailer for We Know Our Place women\'s sport campaign"',
        type: 'promoImage',
        source: 'pipsImage',
      },
    ],
    assetPath: 'p01thw20',
    type: 'video',
    headlines: {
      primaryHeadline:
        "BBC launch trailer for We Know Our Place women's sport campaign",
      seoHeadline:
        "BBC launch trailer for We Know Our Place women's sport campaign",
      promoHeadline:
        "BBC launch trailer for We Know Our Place women's sport campaign",
      socialHeadline:
        "BBC launch trailer for We Know Our Place women's sport campaign",
    },
    analytics: {
      page: {
        name: 'programmes.av.p01thw20.page',
        contentId: 'urn:bbc:pips:pid:p01thw20',
        producer: 'PROGRAMMES',
      },
    },
    description:
      'BBC launch trailer for We Know Our Place women\'s sport campaign"',
    summary: {
      type: 'text',
      model: {
        blocks: [
          {
            type: 'paragraph',
            model: {
              text: 'BBC launch trailer for We Know Our Place women\'s sport campaign"',
              blocks: [
                {
                  type: 'fragment',
                  model: {
                    text: 'BBC launch trailer for We Know Our Place women\'s sport campaign"',
                    attributes: [],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    lastPublished: '2022-07-01T08:56:56Z',
    firstPublished: null,
    video: {
      id: 'p01thw20',
      title: "BBC launch trailer for We Know Our Place women's sport campaign",
      holdingImage: {
        id: 'https://ichef.test.bbci.co.uk/images/ic/$recipe/p01thw3g.jpg',
        altText:
          'BBC launch trailer for We Know Our Place women\'s sport campaign"',
      },
      version: {
        id: 'p01thw22',
        duration: 'PT54S',
        kind: 'programme',
        guidance: null,
        territories: ['nonuk', 'uk'],
      },
      isAdvertisingAllowed: true,
      isEmbeddingAllowed: true,
      isUnavailable: false,
    },
    attributions: null,
    link: {
      path: '/programmes/p01thw20',
    },
    section: null,
    isSharingAllowed: true,
  },
};

export const missingAresMediaMetadataBlock = {
  model: {
    blocks: [imageBlock],
  },
  type: 'aresMedia',
};

export const multipleAresMetadataBlock = {
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

export const validVideoWithCaptionBlock = [
  captionBlock,
  validAresMediaVideoBlock,
];

export const validAudioWithCaptionBlock = [
  captionBlock,
  validAresMediaAudioBlock,
];

export const validTransformedCPSAudioWithCaptionBlock = [
  validTransformedCPSAudioBlock,
];

export const validLivePageVideoWithCaptionBlock = [
  captionBlockLivePage,
  validClipMediaVideoBlock,
];

const missingVpidBlocks = [
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

const missingBlockId = [
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
                blockId: '',
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

export const validAresMetadataBlock = {
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
};

export const validAresMediaVideoLiveStreamBlock = {
  blockId: 'urn:bbc:ares::primary:63501296',
  model: {
    embedding: false,
    id: '63501296',
    subType: 'primary',
    live: true,
    available: true,
    format: 'audio_video',
    title: 'พระบาทสมเด็จพระปรมินทรมหาภูมิพลอดุลยเดช มหิตลาธิเบ',
    imageCopyright: 'BBC',
    imageUrl: 'http://b.files.bbci.co.uk/15E0C/test/_63721698_p01kx435.jpg',
    synopses: {
      short: 'พระบาทสมเด็จพระปรมินทรมหาภูมิพลอดุลยเดช มหิตลาธิเบ',
      medium: 'พระบาทสมเด็จพระปรมินทรมหาภูมิพลอดุลยเดช มหิตลาธิเบ',
      long: 'พระบาทสมเด็จพระปรมินทรมหาภูมิพลอดุลยเดช มหิตลาธิเบ',
    },
    versions: [
      {
        kind: 'programme',
        live: true,
        versionId: 'journalism_uk_news_stream_01',
      },
    ],
  },
  id: 'b66165d9-f1b6-44e2-a903-b8f8cdecfb4f',
  position: [2, 1, 1],
  type: 'aresMediaMetadata',
};

export const validAresMediaLiveAudioBlock = {
  type: 'aresMediaMetadata',
  blockId: 'urn:bbc:ares::primary:63501300',
  model: {
    embedding: false,
    id: '63501300',
    subType: 'primary',
    live: true,
    available: true,
    format: 'audio',
    title: 'Ўзбек деҳқонининг косаси нега оқармайдиshort',
    imageCopyright: 'AFP',
    imageUrl: 'http://b.files.bbci.co.uk/9F08/test/_63721704_testimage.jpg',
    synopses: {
      short: 'Ўзбек деҳқонининг косаси нега оқармайдиshort',
      medium: 'Ўзбек деҳқонининг косаси нега оқармайдиshort',
      long: 'Ўзбек деҳқонининг косаси нега оқармайдиshort',
    },
    versions: [
      {
        kind: 'programme',
        live: true,
        versionId: 'bbc_world_service_west_africa',
      },
    ],
  },
  id: 'fca18d0a-6037-4e39-bde9-71fbb8a05f6a',
  position: [2, 1, 1],
};

export const validLegacyAresMetadataBlock = {
  type: 'aresMediaMetadata',
  blockId: `urn:bbc:ares::primary:43703851`,
  model: {
    available: true,
    blockId: '43703851',
    format: 'audio_video',
    imageUrl:
      'https://a.files.bbci.co.uk/worldservice/live/assets/images/2016/05/05/160505093650_freediving_640x360_bbc_nocredit.jpg',
    synopses: {
      short: 'Новый рекорд во фридайвинге: 124 метра под водой без акваланга',
    },
    title: 'Новый рекорд фридайвинга: 124 метра под водой без акваланга',
    firstPublished: 1462441945000,
  },
};

const GenerateFixtureData = ({
  platform,
  blocks,
  assetType,
  assetId,
  available = true,
  pageType = ARTICLE_PAGE,
  showPlaceholder,
  isLegacyMedia = false,
}) => (
  <RequestContextProvider
    isAmp={platform === 'amp'}
    service="news"
    statusCode={200}
    platform={platform}
    id="foo"
    pageType={pageType}
    pathname="/pathname"
  >
    <ServiceContextProvider service="news">
      <BrowserRouter>
        <MediaPlayerContainer
          blocks={blocks}
          assetId={assetId}
          assetType={assetType}
          available={available}
          showPlaceholder={showPlaceholder}
          isLegacyMedia={isLegacyMedia}
        />
      </BrowserRouter>
    </ServiceContextProvider>
  </RequestContextProvider>
);

export const VideoCanonicalWithPlaceholder = (
  <GenerateFixtureData
    platform="canonical"
    blocks={[validAresMediaVideoBlock]}
    assetType="articles"
    assetId="c123456789o"
    showPlaceholder
  />
);

export const VideoCanonicalNoPlaceholder = (
  <GenerateFixtureData
    platform="canonical"
    blocks={[validAresMediaVideoBlock]}
    assetType="articles"
    assetId="c123456789o"
    showPlaceholder={false}
  />
);

export const VideoLivePageCanonicalWithPlaceholder = (
  <GenerateFixtureData
    platform="canonical"
    blocks={validLivePageVideoWithCaptionBlock}
    assetType="live"
    assetId="c7p765ynk9qt"
    pageType={LIVE_PAGE}
    showPlaceholder
  />
);

export const VideoAmp = (
  <GenerateFixtureData
    platform="amp"
    blocks={[validAresMediaVideoBlock]}
    assetType="articles"
    assetId="c123456789o"
    showPlaceholder
  />
);

export const VideoAmpNoBlockId = (
  <GenerateFixtureData
    platform="amp"
    blocks={missingBlockId}
    assetType="legacy"
    assetId="persian/afghanistan/2013/04/130429_l42_vid_afgh_corruption"
    showPlaceholder
    isLegacyMedia
  />
);

export const VideoCanonicalNoVersionId = (
  <GenerateFixtureData
    platform="canonical"
    blocks={missingVpidBlocks}
    assetType="articles"
    assetId="c123456789o"
    showPlaceholder
  />
);

export const VideoCanonicalWithCaption = (
  <GenerateFixtureData
    platform="canonical"
    blocks={validVideoWithCaptionBlock}
    assetType="articles"
    assetId="c123456789o"
    showPlaceholder
  />
);

export const UnavailableVideoCanonical = (
  <GenerateFixtureData
    platform="canonical"
    blocks={validVideoWithCaptionBlock}
    assetType="articles"
    assetId="c123456789o"
    available={false}
    showPlaceholder
  />
);

export const UnavailableVideoAmp = (
  <GenerateFixtureData
    platform="amp"
    blocks={validVideoWithCaptionBlock}
    assetType="articles"
    assetId="c123456789o"
    available={false}
    showPlaceholder
  />
);

export const VideoAmpWithCaption = (
  <GenerateFixtureData
    platform="amp"
    blocks={validVideoWithCaptionBlock}
    assetType="articles"
    assetId="c123456789o"
    showPlaceholder
  />
);
