import { extractBundlesForPageType } from './pageTypeBundleExtractor';

jest.mock(
  '../../reports/webpackBundleReport.json',
  () => ({
    namedChunkGroups: {
      main: {
        chunks: [65, 68, 66, 69, 67],
        assets: [
          'static/js/framework-4f9840c1.f9a60e6c.js',
          'static/js/framework-4f9840c1.f9a60e6c.js.map',
          'static/js/main-d0ae3f07.f40d46f9.js',
          'static/js/main-d0ae3f07.f40d46f9.js.map',
          'static/js/main-7d359b94.a807aeb0.js',
          'static/js/main-7d359b94.a807aeb0.js.map',
          'static/js/main-f71cff67.a32d8cd2.js',
          'static/js/main-f71cff67.a32d8cd2.js.map',
          'static/js/main-88a3c260.517db56f.js',
          'static/js/main-88a3c260.517db56f.js.map',
        ],
        children: {},
        childAssets: {},
        isOverSizeLimit: true,
      },
      ArticlePage: {
        chunks: [4, 0, 1, 2, 3, 5, 6, 53],
        assets: [
          'static/js/../moment-lib-87d47d0c.d5f3ec50.js',
          'static/js/../moment-lib-87d47d0c.d5f3ec50.js.map',
          'static/js/commons-0f485567.d710e458.js',
          'static/js/commons-0f485567.d710e458.js.map',
          'static/js/commons-7d359b94.ced895c9.js',
          'static/js/commons-7d359b94.ced895c9.js.map',
          'static/js/commons-8493eda2.7bb97fc0.js',
          'static/js/commons-8493eda2.7bb97fc0.js.map',
          'static/js/commons-92a4fe01.6f43e2d7.js',
          'static/js/commons-92a4fe01.6f43e2d7.js.map',
          'static/js/shared-UddsGWzeoXsaLwaRPMwTQELcfA=-31ecd969.898fb3aa.js',
          'static/js/shared-UddsGWzeoXsaLwaRPMwTQELcfA=-31ecd969.898fb3aa.js.map',
          'static/js/shared-nj6qIml+EtJxDVgSunxJydSAIpY=-253ae210.3f8a9c3a.js',
          'static/js/shared-nj6qIml+EtJxDVgSunxJydSAIpY=-253ae210.3f8a9c3a.js.map',
          'static/js/ArticlePage-31ecd969.ee810b86.js',
          'static/js/ArticlePage-31ecd969.ee810b86.js.map',
        ],
        children: {},
        childAssets: {},
      },
    },
  }),
  { virtual: true },
);

describe('pageTypeBundleExtractor', () => {
  it('should extract bundles used for an ArticlePage', () => {
    const result = extractBundlesForPageType('ArticlePage');
    expect(result).toEqual([
      '../moment-lib-87d47d0c.d5f3ec50.js',
      'commons-0f485567.d710e458.js',
      'commons-7d359b94.ced895c9.js',
      'commons-8493eda2.7bb97fc0.js',
      'commons-92a4fe01.6f43e2d7.js',
      'shared-UddsGWzeoXsaLwaRPMwTQELcfA=-31ecd969.898fb3aa.js',
      'shared-nj6qIml+EtJxDVgSunxJydSAIpY=-253ae210.3f8a9c3a.js',
      'ArticlePage-31ecd969.ee810b86.js',
    ]);
  });

  it('should throw error for non-existent page type', () => {
    expect(() => {
      extractBundlesForPageType('blah');
    }).toThrow("page type 'blah' not found");
  });
});
