import { jest } from '@jest/globals';
import { pages } from './pages.js';
import pageTypeBundleExtractor from './__mocks__/pageTypeBundleExtractor.js';

jest.unstable_mockModule(
  './pageTypeBundleExtractor',
  () => pageTypeBundleExtractor,
);

jest.unstable_mockModule('fs', () => ({
  default: {
    readdirSync: () => [
      'modern.ArticlePage-31ecd969.31473c35.js',
      'modern.HomePage-31ecd969.0d59dc5c.js',
      'modern.IdxPage-31ecd969.68b77555.js',
      'modern.LiveRadioPage-31ecd969.64772a90.js',
      'modern.MediaAssetPage-88a3c260.b7ec8c9c.js',
      'modern.MostReadPage-31ecd969.7484ff05.js',
      'modern.OnDemandAudioPage-31ecd969.ec6af2d0.js',
      'modern.OnDemandTvPage-31ecd969.de41ab7f.js',
      'modern.PhotoGalleryPage-e94df663.a733283a.js',
      'modern.StoryPage-31ecd969.ca0d676d.js',
      'modern.afaanoromoo-31ecd969.fe0503d1.js',
      'modern.afrique-31ecd969.61a113f0.js',
      'modern.amharic-31ecd969.660e4865.js',
      'modern.arabic-31ecd969.c022dfb0.js',
      'modern.archive-31ecd969.9a6a30fb.js',
      'modern.azeri-31ecd969.ee2579a9.js',
      'modern.bengali-31ecd969.7f2e9af6.js',
      'modern.burmese-31ecd969.6dba80fc.js',
      'modern.commons-1111.js',
      'modern.commons-2222.js',
      'modern.commons-3333.js',
      'modern.1111-lib-1111.js',
      'modern.framework-1111.js',
      'modern.shared-1111.js',
      'modern.shared-2222.js',
      'modern.shared-3333.js',
      'modern.cymrufyw-31ecd969.f1e65089.js',
      'modern.gahuza-31ecd969.ba8347e8.js',
      'modern.gujarati-31ecd969.f3443ddd.js',
      'modern.hausa-31ecd969.6a99ac36.js',
      'modern.hindi-31ecd969.b53e968b.js',
      'modern.igbo-31ecd969.be1f5cf9.js',
      'modern.indonesia-31ecd969.27dce298.js',
      'modern.japanese-31ecd969.044eb92d.js',
      'modern.korean-31ecd969.824770cd.js',
      'modern.kyrgyz-31ecd969.82a43555.js',
      'modern.main-d0ae3f07.8d44cc89.js',
      'modern.main-f71cff67.a1021a9a.js',
      'modern.marathi-31ecd969.dbc74afe.js',
      'modern.mundo-31ecd969.82160792.js',
      'modern.naidheachdan-31ecd969.be670b0b.js',
      'modern.nepali-31ecd969.c645b661.js',
      'modern.news-31ecd969.a17a1b73.js',
      'modern.pashto-31ecd969.ff214078.js',
      'modern.persian-31ecd969.16f5dbaa.js',
      'modern.pidgin-31ecd969.6653a4a5.js',
      'modern.portuguese-31ecd969.fbafad11.js',
      'modern.punjabi-31ecd969.246368c7.js',
      'modern.rich-text-transforms-748942c6.8bdcb545.js',
      'modern.russian-31ecd969.497cb64b.js',
      'modern.scotland-31ecd969.fd8e7871.js',
      'modern.serbian-31ecd969.e081af9a.js',
      'modern.sinhala-31ecd969.2ea43cb7.js',
      'modern.somali-31ecd969.4f58537b.js',
      'modern.swahili-31ecd969.80f5048c.js',
      'modern.tamil-31ecd969.313fd37e.js',
      'modern.telugu-31ecd969.93c2eda1.js',
      'modern.thai-31ecd969.9740de23.js',
      'modern.tigrinya-31ecd969.a4b0e358.js',
      'modern.turkce-31ecd969.2fb5f1c7.js',
      'modern.ukchina-31ecd969.448f78e1.js',
      'modern.ukrainian-31ecd969.0b427c1a.js',
      'modern.urdu-31ecd969.cc15ea70.js',
      'modern.uzbek-31ecd969.4dae23cc.js',
      'modern.vietnamese-31ecd969.96b409d0.js',
      'modern.yoruba-31ecd969.2072cb94.js',
      'modern.zhongwen-31ecd969.40328f02.js',
    ],

    statSync: () => ({ size: 10000 }),
  },
}));

describe('getPageBundleData', () => {
  it.each(pages)("should include data for '%s' page type", async page => {
    const { getPageBundleData } = await import('./getBundleData.js');
    const data = getPageBundleData();

    expect(data).toEqual(
      expect.arrayContaining([expect.objectContaining({ pageName: page })]),
    );
  });

  it('should output correctly for page type with two common bundles', async () => {
    const { getPageBundleData } = await import('./getBundleData.js');
    const data = getPageBundleData();
    const photoGalleryPageData = data.filter(({ pageName }) => {
      return pageName === 'PhotoGalleryPage';
    });
    expect(photoGalleryPageData).toMatchInlineSnapshot(`
      [
        {
          "commons": [
            {
              "name": "modern.commons-1111.js",
              "size": 10,
              "sizeInBytes": 10000,
            },
            {
              "name": "modern.commons-2222.js",
              "size": 10,
              "sizeInBytes": 10000,
            },
          ],
          "framework": [
            {
              "name": "modern.framework-1111.js",
              "size": 10,
              "sizeInBytes": 10000,
            },
          ],
          "lib": [
            {
              "name": "modern.1111-lib-1111.js",
              "size": 10,
              "sizeInBytes": 10000,
            },
          ],
          "main": [
            {
              "name": "modern.main-d0ae3f07.8d44cc89.js",
              "size": 10,
              "sizeInBytes": 10000,
            },
            {
              "name": "modern.main-f71cff67.a1021a9a.js",
              "size": 10,
              "sizeInBytes": 10000,
            },
          ],
          "page": [
            {
              "name": "modern.PhotoGalleryPage-e94df663.a733283a.js",
              "size": 10,
              "sizeInBytes": 10000,
            },
          ],
          "pageName": "PhotoGalleryPage",
          "shared": [
            {
              "name": "modern.shared-1111.js",
              "size": 10,
              "sizeInBytes": 10000,
            },
            {
              "name": "modern.shared-3333.js",
              "size": 10,
              "sizeInBytes": 10000,
            },
          ],
          "totalSize": 90,
          "totalSizeInBytes": 90000,
        },
      ]
    `);
  });

  it('should output correctly for page type with one common bundles', async () => {
    const { getPageBundleData } = await import('./getBundleData.js');
    const data = getPageBundleData();
    const onDemandTvPageData = data.filter(({ pageName }) => {
      return pageName === 'OnDemandTvPage';
    });
    expect(onDemandTvPageData).toMatchInlineSnapshot(`
      [
        {
          "commons": [
            {
              "name": "modern.commons-1111.js",
              "size": 10,
              "sizeInBytes": 10000,
            },
          ],
          "framework": [
            {
              "name": "modern.framework-1111.js",
              "size": 10,
              "sizeInBytes": 10000,
            },
          ],
          "lib": [
            {
              "name": "modern.1111-lib-1111.js",
              "size": 10,
              "sizeInBytes": 10000,
            },
            {
              "name": "modern.3333-lib-2222.js",
              "size": 10,
              "sizeInBytes": 10000,
            },
          ],
          "main": [
            {
              "name": "modern.main-d0ae3f07.8d44cc89.js",
              "size": 10,
              "sizeInBytes": 10000,
            },
            {
              "name": "modern.main-f71cff67.a1021a9a.js",
              "size": 10,
              "sizeInBytes": 10000,
            },
          ],
          "page": [
            {
              "name": "modern.OnDemandTvPage-31ecd969.de41ab7f.js",
              "size": 10,
              "sizeInBytes": 10000,
            },
          ],
          "pageName": "OnDemandTvPage",
          "shared": [
            {
              "name": "modern.shared-1111.js",
              "size": 10,
              "sizeInBytes": 10000,
            },
          ],
          "totalSize": 80,
          "totalSizeInBytes": 80000,
        },
      ]
    `);
  });
});
