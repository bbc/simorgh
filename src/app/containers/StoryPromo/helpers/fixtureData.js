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
