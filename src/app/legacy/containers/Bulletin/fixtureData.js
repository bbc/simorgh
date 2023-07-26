export const tvBulletinItem = {
  name: 'Test TV Bulletin promo',
  summary: 'Test TV summary',
  indexImage: {
    path: '/cpsdevpb/4917/test/_63711781_clinton.jpg',
    height: 371,
    width: 660,
    altText: 'Clinton',
    copyrightHolder: 'BBC',
  },
  uri: 'https://www.bbc.co.uk/news',
  contentType: 'TVBulletin',
  assetTypeCode: 'PRO',
  timestamp: 1565085977000,
  type: 'link',
};

export const liveTvBulletinItem = {
  ...tvBulletinItem,
  isLive: true,
};

export const radioBulletinItem = {
  name: 'Test Radio Bulletin promo',
  summary: 'Test Radio summary',
  indexImage: {
    path: '/cpsdevpb/4917/test/_63711781_clinton.jpg',
    height: 371,
    width: 660,
    altText: 'Clinton',
    copyrightHolder: 'BBC',
  },
  uri: 'https://www.bbc.co.uk/news',
  contentType: 'RadioBulletin',
  assetTypeCode: 'PRO',
  timestamp: 1571655919000,
  type: 'link',
};

export const liveRadioBulletinItem = {
  ...radioBulletinItem,
  isLive: true,
};
