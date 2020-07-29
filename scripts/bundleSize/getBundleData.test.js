import { getPageBundleData } from './getBundleData';

const pages = [
  'ArticlePage',
  'MediaAssetPage',
  'PhotoGalleryPage',
  'StoryPage',
  'FrontPage',
  'MostReadPage',
  'LiveRadioPage',
  'OnDemandRadioPage',
  'OnDemandTvPage',
];

const jsFiles = [
  'ArticlePage-31ecd969.31473c35.js',
  'FrontPage-31ecd969.bbf7a07e.js',
  'IdxPage-31ecd969.68b77555.js',
  'LiveRadioPage-31ecd969.64772a90.js',
  'MediaAssetPage-88a3c260.b7ec8c9c.js',
  'MostReadPage-31ecd969.7484ff05.js',
  'OnDemandRadioPage-31ecd969.ec6af2d0.js',
  'OnDemandTvPage-31ecd969.de41ab7f.js',
  'PhotoGalleryPage-e94df663.a733283a.js',
  'StoryPage-31ecd969.ca0d676d.js',
  'afaanoromoo-31ecd969.fe0503d1.js',
  'afrique-31ecd969.61a113f0.js',
  'amharic-31ecd969.660e4865.js',
  'arabic-31ecd969.c022dfb0.js',
  'archive-31ecd969.9a6a30fb.js',
  'azeri-31ecd969.ee2579a9.js',
  'bengali-31ecd969.7f2e9af6.js',
  'burmese-31ecd969.6dba80fc.js',
  'common-ArticlePage-FrontPage-IdxPage-MediaAssetPage-MostReadPage-OnDemandRadioPage-OnDemandTvPage-Ph-667a1289.f4b0fece.js',
  'common-FrontPage-IdxPage-31ecd969.39680be8.js',
  'common-MediaAssetPage-PhotoGalleryPage-StoryPage-31ecd969.3341ac12.js',
  'cymrufyw-31ecd969.f1e65089.js',
  'gahuza-31ecd969.ba8347e8.js',
  'gujarati-31ecd969.f3443ddd.js',
  'hausa-31ecd969.6a99ac36.js',
  'hindi-31ecd969.b53e968b.js',
  'igbo-31ecd969.be1f5cf9.js',
  'indonesia-31ecd969.27dce298.js',
  'japanese-31ecd969.044eb92d.js',
  'korean-31ecd969.824770cd.js',
  'kyrgyz-31ecd969.82a43555.js',
  'main-d0ae3f07.8d44cc89.js',
  'main-f71cff67.a1021a9a.js',
  'marathi-31ecd969.dbc74afe.js',
  'mundo-31ecd969.82160792.js',
  'naidheachdan-31ecd969.be670b0b.js',
  'nepali-31ecd969.c645b661.js',
  'news-31ecd969.a17a1b73.js',
  'pashto-31ecd969.ff214078.js',
  'persian-31ecd969.16f5dbaa.js',
  'pidgin-31ecd969.6653a4a5.js',
  'portuguese-31ecd969.fbafad11.js',
  'punjabi-31ecd969.246368c7.js',
  'rich-text-transforms-748942c6.8bdcb545.js',
  'russian-31ecd969.497cb64b.js',
  'scotland-31ecd969.fd8e7871.js',
  'serbian-31ecd969.e081af9a.js',
  'sinhala-31ecd969.2ea43cb7.js',
  'somali-31ecd969.4f58537b.js',
  'swahili-31ecd969.80f5048c.js',
  'tamil-31ecd969.313fd37e.js',
  'telugu-31ecd969.93c2eda1.js',
  'thai-31ecd969.9740de23.js',
  'tigrinya-31ecd969.a4b0e358.js',
  'turkce-31ecd969.2fb5f1c7.js',
  'ukchina-31ecd969.448f78e1.js',
  'ukrainian-31ecd969.0b427c1a.js',
  'urdu-31ecd969.cc15ea70.js',
  'uzbek-31ecd969.4dae23cc.js',
  'vendor-253ae210.ffbaa173.js',
  'vendor-678f84af.32480a24.js',
  'vendor-7d359b94.0a179d9a.js',
  'vietnamese-31ecd969.96b409d0.js',
  'yoruba-31ecd969.2072cb94.js',
  'zhongwen-31ecd969.40328f02.js',
];

jest.mock('./pageTypeBundleExtractor', () => {
  return {
    extractBundlesForPageType: pageType => {
      if (pageType === 'ArticlePage') {
        return [
          'ArticlePage-31ecd969.31473c35.js',
          'common-ArticlePage-FrontPage-IdxPage-MediaAssetPage-MostReadPage-OnDemandRadioPage-OnDemandTvPage-Ph-667a1289.f4b0fece.js',
        ];
      }
      if (pageType === 'StoryPage') {
        return [
          'StoryPage-31ecd969.ca0d676d.js',
          'common-ArticlePage-FrontPage-IdxPage-MediaAssetPage-MostReadPage-OnDemandRadioPage-OnDemandTvPage-Ph-667a1289.f4b0fece.js',
          'common-MediaAssetPage-PhotoGalleryPage-StoryPage-31ecd969.3341ac12.js',
        ];
      }
      if (pageType === 'FrontPage') {
        return [
          'FrontPage-31ecd969.bbf7a07e.js',
          'common-ArticlePage-FrontPage-IdxPage-MediaAssetPage-MostReadPage-OnDemandRadioPage-OnDemandTvPage-Ph-667a1289.f4b0fece.js',
          'common-FrontPage-IdxPage-31ecd969.39680be8.js',
        ];
      }
      if (pageType === 'IdxPage') {
        return [
          'IdxPage-31ecd969.68b77555.js',
          'common-ArticlePage-FrontPage-IdxPage-MediaAssetPage-MostReadPage-OnDemandRadioPage-OnDemandTvPage-Ph-667a1289.f4b0fece.js',
          'common-FrontPage-IdxPage-31ecd969.39680be8.js',
        ];
      }
      if (pageType === 'LiveRadioPage') {
        return [
          'LiveRadioPage-31ecd969.64772a90.js',
          'common-ArticlePage-FrontPage-IdxPage-MediaAssetPage-MostReadPage-OnDemandRadioPage-OnDemandTvPage-Ph-667a1289.f4b0fece.js',
        ];
      }
      if (pageType === 'MediaAssetPage') {
        return [
          'MediaAssetPage-88a3c260.b7ec8c9c.js',
          'common-ArticlePage-FrontPage-IdxPage-MediaAssetPage-MostReadPage-OnDemandRadioPage-OnDemandTvPage-Ph-667a1289.f4b0fece.js',
          'common-MediaAssetPage-PhotoGalleryPage-StoryPage-31ecd969.3341ac12.js',
        ];
      }
      if (pageType === 'MostReadPage') {
        return [
          'MostReadPage-31ecd969.7484ff05.js',
          'common-ArticlePage-FrontPage-IdxPage-MediaAssetPage-MostReadPage-OnDemandRadioPage-OnDemandTvPage-Ph-667a1289.f4b0fece.js',
        ];
      }
      if (pageType === 'OnDemandRadioPage') {
        return [
          'OnDemandRadioPage-31ecd969.ec6af2d0.js',
          'common-ArticlePage-FrontPage-IdxPage-MediaAssetPage-MostReadPage-OnDemandRadioPage-OnDemandTvPage-Ph-667a1289.f4b0fece.js',
        ];
      }
      if (pageType === 'OnDemandTvPage') {
        return [
          'OnDemandTvPage-31ecd969.de41ab7f.js',
          'common-ArticlePage-FrontPage-IdxPage-MediaAssetPage-MostReadPage-OnDemandRadioPage-OnDemandTvPage-Ph-667a1289.f4b0fece.js',
        ];
      }
      if (pageType === 'PhotoGalleryPage') {
        return [
          'PhotoGalleryPage-e94df663.a733283a.js',
          'common-ArticlePage-FrontPage-IdxPage-MediaAssetPage-MostReadPage-OnDemandRadioPage-OnDemandTvPage-Ph-667a1289.f4b0fece.js',
          'common-MediaAssetPage-PhotoGalleryPage-StoryPage-31ecd969.3341ac12.js',
        ];
      }
      throw Error('page type not mocked');
    },
  };
});

jest.mock('fs', () => {
  return {
    statSync: () => {
      return { size: 10000 };
    },
  };
});

describe('getPageBundleData', () => {
  it.each(pages)("should include data for '%s' page type", page => {
    const data = getPageBundleData({ jsFiles });
    expect(data).toEqual(
      expect.arrayContaining([expect.arrayContaining([page])]),
    );
  });

  it('should output correctly for page type with two common bundles', () => {
    const data = getPageBundleData({ jsFiles });
    const photoGalleryPageData = data.filter(([pageName]) => {
      return pageName === 'PhotoGalleryPage';
    });
    expect(photoGalleryPageData).toMatchInlineSnapshot(`
      Array [
        Array [
          "PhotoGalleryPage",
          "10, 10, 10, 10, 10, 10, 10, 10",
          80,
        ],
      ]
    `);
  });

  it('should output correctly for page type with one common bundles', () => {
    const data = getPageBundleData({ jsFiles });
    const photoGalleryPageData = data.filter(([pageName]) => {
      return pageName === 'OnDemandTvPage';
    });
    expect(photoGalleryPageData).toMatchInlineSnapshot(`
      Array [
        Array [
          "OnDemandTvPage",
          "10, 10, 10, 10, 10, 10, 10",
          70,
        ],
      ]
    `);
  });
});
