import relItems from '../IndexAlsos/relatedItems';

export const completeItem = {
  headlines: {
    headline: 'A headline',
  },
  locators: {
    assetUri: 'https://www.bbc.co.uk',
  },
  summary: 'Summary text',
  timestamp: 1556795033000,
  indexImage: {
    path: '/cpsprodpb/0A06/production/image.jpg',
    height: 1152,
    width: 2048,
    altText: 'Image Alt text',
    copyrightHolder: 'Image provider',
  },
};

export const itemWithOvertypedSummary = {
  ...completeItem,
  overtypedSummary: 'Overtyped summary text',
};

export const audioItem = {
  headlines: {
    headline: 'An audio item',
  },
  locators: {
    assetUri: 'https://www.bbc.co.uk',
  },
  summary: 'Summary text',
  timestamp: 1556795033000,
  indexImage: {
    path: '/cpsprodpb/0A06/production/image.jpg',
    height: 1152,
    width: 2048,
    altText: 'Image Alt text',
    copyrightHolder: 'Image provider',
  },
  cpsType: 'MAP',
  media: {
    format: 'audio',
    versions: [
      {
        duration: 192,
      },
    ],
  },
};

export const videoItem = {
  headlines: {
    headline: 'A video item',
  },
  locators: {
    assetUri: 'https://www.bbc.co.uk',
  },
  summary: 'Summary text',
  timestamp: 1556795033000,
  indexImage: {
    path: '/cpsprodpb/0A06/production/image.jpg',
    height: 1152,
    width: 2048,
    altText: 'Image Alt text',
    copyrightHolder: 'Image provider',
  },
  cpsType: 'MAP',
  media: {
    format: 'video',
    versions: [
      {
        duration: 5600,
      },
    ],
  },
};

export const liveItem = {
  headlines: {
    headline: 'A live item',
  },
  locators: {
    assetUri: 'https://www.bbc.co.uk',
  },
  summary: 'Summary text',
  timestamp: 1556795033000,
  indexImage: {
    path: '/cpsprodpb/0A06/production/image.jpg',
    height: 1152,
    width: 2048,
    altText: 'Image Alt text',
    copyrightHolder: 'Image provider',
  },
  cpsType: 'LIV',
};

export const audioItemNoDuration = {
  headlines: {
    headline: 'An audio item',
  },
  locators: {
    assetUri: 'https://www.bbc.co.uk',
  },
  summary: 'Summary text',
  timestamp: 1556795033000,
  indexImage: {
    path: '/cpsprodpb/0A06/production/image.jpg',
    height: 1152,
    width: 2048,
    altText: 'Image Alt text',
    copyrightHolder: 'Image provider',
  },
  cpsType: 'MAP',
  media: {
    format: 'audio',
    versions: [{}],
  },
};

export const standardLinkItem = {
  name: 'Standard promo with summary',
  summary: 'Summary text',
  indexImage: {
    id: 63692548,
    subType: 'index',
    href: 'http://b.files.bbci.co.uk/14A31/test/_63692548_000327537-1.jpg',
    path: '/cpsdevpb/14A31/test/_63692548_000327537-1.jpg',
    height: 549,
    width: 976,
    altText: 'A lone Koala perches in a eucalyptus tree',
    caption: 'Koalas are from Australia',
    copyrightHolder: 'BBC',
  },
  uri: 'http://www.bbc.com/azeri',
  contentType: 'Text',
  assetTypeCode: 'PRO',
  timestamp: 1565186015000,
  type: 'link',
};

export const featureLinkItem = {
  name: 'Feature promo with summary',
  summary: 'Summary text for feature Promo',
  indexImage: {
    id: 63692548,
    subType: 'index',
    href: 'http://b.files.bbci.co.uk/14A31/test/_63692548_000327537-1.jpg',
    path: '/cpsdevpb/14A31/test/_63692548_000327537-1.jpg',
    height: 549,
    width: 976,
    altText: 'A lone Koala perches in a eucalyptus tree',
    caption: 'Koalas are from Australia',
    copyrightHolder: 'BBC',
  },
  uri: 'http://www.bbc.com/azeri',
  contentType: 'Feature',
  assetTypeCode: 'PRO',
  timestamp: 1565186015000,
  type: 'link',
};

export const podcastLinkItem = {
  name: 'Test indonesian podcast',
  summary: 'BBC Indonesia',
  uri: 'https://www.bbc.com/indonesia/media-45640737',
  contentType: 'Podcast',
  assetTypeCode: 'PRO',
  timestamp: 1537952309000,
  type: 'link',
};

export const guideLinkItem = {
  name: 'Story Promo of type Guide',
  summary: 'Guide promo',
  indexImage: {
    id: 63692548,
    subType: 'index',
    href: 'http://b.files.bbci.co.uk/14A31/test/_63692548_000327537-1.jpg',
    path: '/cpsdevpb/14A31/test/_63692548_000327537-1.jpg',
    height: 549,
    width: 976,
    altText: 'A lone Koala perches in a eucalyptus tree',
    caption: 'Koalas are from Australia',
    copyrightHolder: 'BBC',
  },
  uri: 'http://www.bbc.com/azeri',
  contentType: 'Guide',
  assetTypeCode: 'PRO',
  timestamp: 1565186015000,
  type: 'link',
};

export const itemWithoutImage = {
  headlines: {
    headline: 'A headline',
  },
  locators: {
    assetUri: 'https://www.bbc.co.uk',
  },
  summary: 'Summary text',
  timestamp: 1556795033000,
};

export const indexAlsosItem = {
  headlines: {
    headline: 'A headline',
  },
  locators: {
    assetUri: 'https://www.bbc.co.uk',
  },
  summary: 'Summary text',
  timestamp: 1556795033000,
  indexImage: {
    path: '/cpsprodpb/0A06/production/image.jpg',
    height: 1152,
    width: 2048,
    altText: 'Image Alt text',
    copyrightHolder: 'Image provider',
  },
  cpsType: 'STY',
  relatedItems: relItems,
};

export const mapWithMediaError = {
  cpsType: 'MAP',
  headlines: {
    headline: 'کورونا وېروس او هوایي شرکتونه',
  },
  id: 'urn:bbc:ares::asset:pashto/52433999',
  indexImage: {
    altText: 'Keyframe #2',
    caption: 'شرکتونه',
    copyrightHolder: 'BBC',
    height: 576,
    href: 'http://c.files.bbci.co.uk/0FBB/production/_111972040_p08bkb0s.jpg',
    id: '111972040',
    path: '/cpsprodpb/0FBB/production/_111972040_p08bkb0s.jpg',
    subType: 'index',
    type: 'image',
    width: 1024,
  },
  language: 'ps',
  locators: {
    assetId: '52433999',
    assetUri: '/pashto/52433999',
    cpsUrn: 'urn:bbc:content:assetUri:pashto/52433999',
  },
  media: {
    caption: 'کورونا وېروس او هوایي شرکتونه',
    entityType: 'Clip',
    externalId: 'p08bk9qn',
    format: 'video',
    id: '52434000',
    statusCode: 404,
    statusMessage: 'Asset could not be found. Perhaps it was withdrawn.',
    subType: 'index',
    type: 'external_vpid',
  },
  options: {
    isBreakingNews: false,
    isFactCheck: false,
  },
  section: {
    name: 'کور پاڼه',
    subType: 'IDX',
    type: 'simple',
    uri: '/pashto/front_page',
  },
  summary: 'کورونا وېروس او هوایي شرکتونه',
  timestamp: 1587917277000,
  type: 'cps',
};

export const mapWithoutMediaError = {
  cpsType: 'MAP',
  headlines: {
    headline: 'افغانستان کې د کورونا وېروس وروستی حال',
  },
  id: 'urn:bbc:ares::asset:pashto/52521615',
  indexImage: {
    altText: 'Keyframe #1',
    caption: 'نجما ځلا',
    copyrightHolder: 'BBC',
    height: 576,
    href: 'http://c.files.bbci.co.uk/35D3/production/_112097731_p08c569d.jpg',
    id: '112097731',
    path: '/cpsprodpb/35D3/production/_112097731_p08c569d.jpg',
    subType: 'index',
    width: 1024,
  },
  language: 'ps',
  locators: {
    assetId: '52521615',
    assetUri: '/pashto/52521615',
    cpsUrn: 'urn:bbc:content:assetUri:pashto/52521615',
  },
  media: {
    advertising: true,
    caption: 'افغانستان کې د کورونا وېروس وروستی حال',
    embedding: true,
    format: 'video',
    id: 'p08c567v',
    imageUrl: 'ichef.bbci.co.uk/images/ic/$recipe/p08c569d.jpg',
    subType: 'clip',
    synopses: {
      short: 'افغانستان کې د کورونا وېروس وروستی حال',
    },
    title: 'افغانستان کې د کورونا وېروس وروستی حال',
    versions: [
      {
        availableFrom: 1588517677000,
        availableTerritories: {
          nonUk: true,
          uk: true,
          world: false,
        },
        duration: 135,
        durationISO8601: 'PT2M15S',
        types: ['Original'],
        versionId: 'p08c567x',
        warnings: {},
      },
    ],
  },
  options: {
    isBreakingNews: false,
    isFactCheck: false,
  },
  section: {
    name: 'کور پاڼه',
    subType: 'IDX',
    type: 'simple',
    uri: '/pashto/front_page',
  },
  summary: 'افغانستان کې د کورونا وېروس وروستی حال',
  timestamp: 1588517817000,
  type: 'cps',
};
