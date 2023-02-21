import React from 'react';
import { string, shape, arrayOf, object, bool, oneOfType } from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import { singleTextBlock } from '#models/blocks';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import MediaPlayerContainer from '.';

const captionBlock = {
  model: {
    blocks: [singleTextBlock('Media Player With Caption', 'mock-id-1')],
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
  available,
  showPlaceholder,
  isLegacyMedia,
}) => (
  <RequestContextProvider
    isAmp={platform === 'amp'}
    service="news"
    statusCode={200}
    platform={platform}
    id="foo"
    pageType={ARTICLE_PAGE}
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

GenerateFixtureData.propTypes = {
  platform: string.isRequired,
  blocks: arrayOf(
    shape({
      type: string.isRequired,
      model: shape({
        blocks: arrayOf(oneOfType([string, object])),
      }),
    }),
  ).isRequired,
  assetType: string.isRequired,
  assetId: string.isRequired,
  available: bool,
  isLegacyMedia: bool,
  showPlaceholder: bool.isRequired,
};

GenerateFixtureData.defaultProps = {
  available: true,
  isLegacyMedia: false,
};

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
