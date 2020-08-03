import { extractBundlesForPageType } from './pageTypeBundleExtractor';

jest.mock('../../reports/webpackBundleReport.json', () => ({
  namedChunkGroups: {
    main: {
      chunks: [
        'vendor-253ae210',
        'vendor-7d359b94',
        'vendor-678f84af',
        'main-d0ae3f07',
        'main-f71cff67',
      ],
      assets: [
        'static/js/vendor-253ae210.ffbaa173.js',
        'static/js/vendor-253ae210.ffbaa173.js.map',
        'static/js/vendor-7d359b94.0a179d9a.js',
        'static/js/vendor-7d359b94.0a179d9a.js.map',
        'static/js/vendor-678f84af.32480a24.js',
        'static/js/vendor-678f84af.32480a24.js.map',
        'static/js/main-d0ae3f07.8d44cc89.js',
        'static/js/main-d0ae3f07.8d44cc89.js.map',
        'static/js/main-f71cff67.a1021a9a.js',
        'static/js/main-f71cff67.a1021a9a.js.map',
      ],
      children: {},
      childAssets: {},
      isOverSizeLimit: true,
    },
    ArticlePage: {
      chunks: [
        'common-ArticlePage-FrontPage-IdxPage-MediaAssetPage-MostReadPage-OnDemandRadioPage-OnDemandTvPage-Ph-667a1289',
        'ArticlePage-31ecd969',
      ],
      assets: [
        'static/js/common-ArticlePage-FrontPage-IdxPage-MediaAssetPage-MostReadPage-OnDemandRadioPage-OnDemandTvPage-Ph-667a1289.f4b0fece.js',
        'static/js/common-ArticlePage-FrontPage-IdxPage-MediaAssetPage-MostReadPage-OnDemandRadioPage-OnDemandTvPage-Ph-667a1289.f4b0fece.js.map',
        'static/js/ArticlePage-31ecd969.31473c35.js',
        'static/js/ArticlePage-31ecd969.31473c35.js.map',
      ],
      children: {},
      childAssets: {},
    },
  },
}));

describe('pageTypeBundleExtractor', () => {
  it('should extract bundles used for an ArticlePage', () => {
    const result = extractBundlesForPageType('ArticlePage');
    expect(result).toEqual([
      'common-ArticlePage-FrontPage-IdxPage-MediaAssetPage-MostReadPage-OnDemandRadioPage-OnDemandTvPage-Ph-667a1289.f4b0fece.js',
      'ArticlePage-31ecd969.31473c35.js',
    ]);
  });

  it('should throw error for non-existent page type', () => {
    expect(() => {
      extractBundlesForPageType('blah');
    }).toThrow("page type 'blah' not found");
  });
});
