import { data as serbianFrontPageData } from '#data/serbian/frontpage/lat.json';
import { data as urduFrontPageData } from '#data/urdu/frontpage/index.json';
import {
  PHOTO_GALLERY_PAGE,
  MEDIA_ASSET_PAGE,
  STORY_PAGE,
} from '#app/routes/utils/pageTypes';
import filterUnknownContentTypes from '.';

const { article: urduFixtureData } = urduFrontPageData;
const { article: serbianFixtureData } = serbianFrontPageData;

/*
 * CPS types
 */

const cpsItems = [
  {
    headlines: {
      headline: 'A very important story',
    },
    cpsType: STORY_PAGE,
  },
  {
    headlines: {
      headline: 'A very important map',
    },
    cpsType: MEDIA_ASSET_PAGE,
  },
  {
    headlines: {
      headline: 'A very important live',
    },
    cpsType: 'LIV',
  },
];

/*
 * Asset types
 */

const TextAssetType = {
  name: 'Test standard link promo',
  contentType: 'Text',
  assetTypeCode: 'PRO',
};

const AudioAssetType = {
  name: 'Test audio link promo',
  contentType: 'Audio',
  assetTypeCode: 'PRO',
};

const VideoAssetType = {
  name: 'Test video link promo',
  summary: 'This is a video link promo',
  indexImage: {},
  indexThumbnail: {},
  uri: 'http://this.is.a.test.com/',
  contentType: 'Video',
  assetTypeCode: 'PRO',
  timestamp: 1527598380040,
  type: 'link',
};

const GalleryAssetType = {
  name: 'Test gallery link promo',
  summary: 'This is a gallery link promo',
  indexImage: {
    id: '63692548',
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
  contentType: 'Gallery',
  assetTypeCode: 'PRO',
  timestamp: 1565192199000,
  type: 'link',
};

const TVBulletinAssetType = {
  name: 'Test TV Bulletin promo',
  summary: 'Test TV summary',
  indexImage: {
    id: '63711781',
    subType: 'index',
    href: 'http://b.files.bbci.co.uk/4917/test/_63711781_clinton.jpg',
    path: '/cpsdevpb/4917/test/_63711781_clinton.jpg',
    height: 371,
    width: 660,
    altText: 'Clinton',
    caption: 'Clinton',
    copyrightHolder: 'BBC',
  },
  uri: 'https://www.bbc.co.uk/news',
  contentType: 'TVBulletin',
  assetTypeCode: 'PRO',
  timestamp: 1565085977000,
  type: 'link',
};

const RadioBulletinAssetType = {
  name: 'Test Radio Bulletin promo',
  summary: 'Test Radio summary',
  indexImage: {
    id: '63711781',
    subType: 'index',
    href: 'http://b.files.bbci.co.uk/4917/test/_63711781_clinton.jpg',
    path: '/cpsdevpb/4917/test/_63711781_clinton.jpg',
    height: 371,
    width: 660,
    altText: 'Clinton',
    caption: 'Clinton',
    copyrightHolder: 'BBC',
  },
  uri: 'https://www.bbc.co.uk/news',
  contentType: 'RadioBulletin',
  assetTypeCode: 'PRO',
  timestamp: 1571655919000,
  type: 'link',
};

const FeatureAssetType = {
  name: 'Test feature link promo',
  contentType: 'Feature',
  assetTypeCode: 'PRO',
};

const PodcastAssetType = {
  name: 'Test indonesian podcast',
  summary: 'BBC Indonesia',
  uri: 'https://www.bbc.com/indonesia/media-45640737',
  contentType: 'Podcast',
  assetTypeCode: 'PRO',
  timestamp: 1537952309000,
  type: 'link',
};

const usefulLinksItems = [
  {
    name: 'Ethiopia: Ndị uweojii agba gbuola ndị mmadụ',
    contentType: 'Link',
    assetTypeCode: 'PRO',
  },
  {
    name: 'Onye isi ala ndị New Zealand dị ime',
    contentType: 'Guide',
    assetTypeCode: 'PRO',
  },
  {
    name: 'Yabasị a na-achụ TB ọsọ',
    contentType: 'Text',
    assetTypeCode: 'PRO',
  },
];

describe('filterUnknownContentTypes', () => {
  it('should no-op when no groups', () => {
    const data = {
      content: {},
    };

    expect(filterUnknownContentTypes(data)).toEqual(data);
  });

  it('should no-op when no items', () => {
    const data = {
      content: {
        groups: [
          {
            items: [],
          },
        ],
      },
    };

    expect(filterUnknownContentTypes(data)).toEqual(data);
  });

  it('should no-op when items are not an array', () => {
    const data = {
      content: {
        groups: [
          {
            items: 42,
          },
        ],
      },
    };

    expect(filterUnknownContentTypes(data)).toEqual(data);
  });

  it('should handle both CPS and AssetTypeCode types', () => {
    const data = {
      content: {
        groups: [
          {
            items: cpsItems.concat(TextAssetType),
          },
        ],
      },
    };
    const expected = {
      content: {
        groups: [
          {
            items: cpsItems.concat(TextAssetType),
          },
        ],
      },
    };
    expect(filterUnknownContentTypes(data)).toEqual(expected);
  });

  describe('cpsTypes rules', () => {
    it('should filter items with unknown CPS types', () => {
      const data = {
        content: {
          groups: [
            {
              items: [
                {
                  headlines: {
                    headline: 'An item of unknown type',
                  },
                  cpsType: '😎',
                },
                {
                  headlines: {
                    headline: 'Who wants to see a OOO anyway',
                  },
                  cpsType: 'OOO',
                },
              ],
            },
          ],
        },
      };
      const expected = {
        content: {
          groups: [
            {
              items: [],
            },
          ],
        },
      };

      expect(filterUnknownContentTypes(data)).toEqual(expected);
    });

    it('should leave items with known CPS types alone', () => {
      const data = {
        content: {
          groups: [
            {
              items: cpsItems,
            },
          ],
        },
      };
      const expected = {
        content: {
          groups: [
            {
              items: cpsItems,
            },
          ],
        },
      };

      expect(filterUnknownContentTypes(data)).toEqual(expected);
    });

    it('should work on all groups in the data', () => {
      const data = {
        content: {
          groups: [
            {
              items: [
                {
                  headlines: {
                    headline: 'Group 1 - STY',
                  },
                  cpsType: STORY_PAGE,
                },
                {
                  headlines: {
                    headline: 'Group 1 - OOO',
                  },
                  cpsType: 'OOO',
                },
              ],
            },
            {
              items: [
                {
                  headlines: {
                    headline: 'Group 2 - PGL',
                  },
                  cpsType: PHOTO_GALLERY_PAGE,
                },
                {
                  headlines: {
                    headline: 'Group 2 - MAP',
                  },
                  cpsType: MEDIA_ASSET_PAGE,
                },
              ],
            },
          ],
        },
      };
      const expected = {
        content: {
          groups: [
            {
              items: [
                {
                  headlines: {
                    headline: 'Group 1 - STY',
                  },
                  cpsType: STORY_PAGE,
                },
              ],
            },
            {
              items: [
                {
                  headlines: {
                    headline: 'Group 2 - PGL',
                  },
                  cpsType: PHOTO_GALLERY_PAGE,
                },
                {
                  headlines: {
                    headline: 'Group 2 - MAP',
                  },
                  cpsType: MEDIA_ASSET_PAGE,
                },
              ],
            },
          ],
        },
      };

      expect(filterUnknownContentTypes(data)).toEqual(expected);
    });

    it('should remove items without any CPS type', () => {
      const data = {
        content: {
          groups: [
            {
              items: [
                {
                  headlines: {
                    headline: "What's a cpsType?",
                  },
                },
              ],
            },
          ],
        },
      };

      const expected = {
        content: {
          groups: [
            {
              items: [],
            },
          ],
        },
      };

      expect(filterUnknownContentTypes(data)).toEqual(expected);
    });

    it('should handle "real" data', () => {
      expect(filterUnknownContentTypes(urduFixtureData)).toMatchSnapshot();
    });
  });

  describe('assetTypeCode rules', () => {
    it('should filter items with unknown assetTypeCode', () => {
      const data = {
        content: {
          groups: [
            {
              items: [
                {
                  name: 'Test assetTypeCode',
                  contentType: 'Text',
                  assetTypeCode: 'OOO',
                },
              ],
            },
          ],
        },
      };
      const expected = {
        content: {
          groups: [
            {
              items: [],
            },
          ],
        },
      };

      expect(filterUnknownContentTypes(data)).toEqual(expected);
    });

    it('should leave items with known assetTypeCode alone', () => {
      const data = {
        content: {
          groups: [
            {
              items: AudioAssetType,
            },
          ],
        },
      };
      const expected = {
        content: {
          groups: [
            {
              items: AudioAssetType,
            },
          ],
        },
      };

      expect(filterUnknownContentTypes(data)).toEqual(expected);
    });

    it('should work on all groups in the data', () => {
      const data = {
        content: {
          groups: [
            TextAssetType,
            FeatureAssetType,
            AudioAssetType,
            VideoAssetType,
            GalleryAssetType,
            TVBulletinAssetType,
            RadioBulletinAssetType,
            PodcastAssetType,
          ],
        },
      };
      const expected = {
        content: {
          groups: [
            TextAssetType,
            FeatureAssetType,
            AudioAssetType,
            VideoAssetType,
            GalleryAssetType,
            TVBulletinAssetType,
            RadioBulletinAssetType,
            PodcastAssetType,
          ],
        },
      };

      expect(filterUnknownContentTypes(data)).toEqual(expected);
    });

    it('should remove items without any assetTypeCode', () => {
      const data = {
        content: {
          groups: [
            {
              items: [
                {
                  name: 'Test assetTypeCode 1',
                  contentType: 'Audio',
                },
              ],
            },
          ],
        },
      };

      const expected = {
        content: {
          groups: [
            {
              items: [],
            },
          ],
        },
      };

      expect(filterUnknownContentTypes(data)).toEqual(expected);
    });

    it('should leave items with known assetTypeCode and contentType', () => {
      const data = {
        content: {
          groups: [
            {
              items: [VideoAssetType],
            },
          ],
        },
      };

      expect(filterUnknownContentTypes(data)).toEqual(data);
    });

    it('should keep items with known contentTypes', () => {
      const data = {
        content: {
          groups: [
            {
              items: [
                {
                  name: 'Test assetTypeCode',
                  contentType: 'SomeContent',
                  assetTypeCode: 'PRO',
                },
                TextAssetType,
                AudioAssetType,
                FeatureAssetType,
                PodcastAssetType,
                TVBulletinAssetType,
                RadioBulletinAssetType,
              ],
            },
          ],
        },
      };
      const expected = {
        content: {
          groups: [
            {
              items: [
                TextAssetType,
                AudioAssetType,
                FeatureAssetType,
                PodcastAssetType,
                TVBulletinAssetType,
                RadioBulletinAssetType,
              ],
            },
          ],
        },
      };

      expect(filterUnknownContentTypes(data)).toEqual(expected);
    });

    it('should handle "real" data', () => {
      expect(filterUnknownContentTypes(serbianFixtureData)).toMatchSnapshot();
    });
  });

  describe('filters usefulLinks', () => {
    it('should remove usefulLink items with contentType !== Guide', () => {
      const data = {
        content: {
          groups: [
            {
              type: 'useful-links',
              items: usefulLinksItems,
            },
          ],
        },
      };
      const expected = {
        content: {
          groups: [
            {
              type: 'useful-links',
              items: [
                {
                  name: 'Onye isi ala ndị New Zealand dị ime',
                  contentType: 'Guide',
                  assetTypeCode: 'PRO',
                },
              ],
            },
          ],
        },
      };

      expect(filterUnknownContentTypes(data)).toEqual(expected);
    });
  });
});
