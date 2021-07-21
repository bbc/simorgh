import { extractBundlesForPageType } from './pageTypeBundleExtractor';

jest.mock(
  '../../reports/webpackBundleReport.json',
  () => ({
    namedChunkGroups: {
      main: {
        chunks: [65, 68, 66, 69, 67],
        assets: [
          { name: 'static/js/framework-4f9840c1.f9a60e6c.js' },
          { name: 'static/js/framework-4f9840c1.f9a60e6c.js.map' },
          { name: 'static/js/main-d0ae3f07.f40d46f9.js' },
          { name: 'static/js/main-d0ae3f07.f40d46f9.js.map' },
          { name: 'static/js/main-7d359b94.a807aeb0.js' },
          { name: 'static/js/main-7d359b94.a807aeb0.js.map' },
          { name: 'static/js/main-f71cff67.a32d8cd2.js' },
          { name: 'static/js/main-f71cff67.a32d8cd2.js.map' },
          { name: 'static/js/main-88a3c260.517db56f.js' },
          { name: 'static/js/main-88a3c260.517db56f.js.map' },
        ],
        children: {},
        childAssets: {},
        isOverSizeLimit: true,
      },
      ArticlePage: {
        chunks: [4, 0, 1, 2, 3, 5, 6, 53],
        assets: [
          { name: 'static/js/../moment-lib-87d47d0c.d5f3ec50.js' },
          { name: 'static/js/../moment-lib-87d47d0c.d5f3ec50.js.map' },
          { name: 'static/js/commons-0f485567.d710e458.js' },
          { name: 'static/js/commons-0f485567.d710e458.js.map' },
          { name: 'static/js/commons-7d359b94.ced895c9.js' },
          { name: 'static/js/commons-7d359b94.ced895c9.js.map' },
          { name: 'static/js/commons-8493eda2.7bb97fc0.js' },
          { name: 'static/js/commons-8493eda2.7bb97fc0.js.map' },
          { name: 'static/js/commons-92a4fe01.6f43e2d7.js' },
          { name: 'static/js/commons-92a4fe01.6f43e2d7.js.map' },
          {
            name:
              'static/js/shared-UddsGWzeoXsaLwaRPMwTQELcfA=-31ecd969.898fb3aa.js',
          },
          {
            name:
              'static/js/shared-UddsGWzeoXsaLwaRPMwTQELcfA=-31ecd969.898fb3aa.js.map',
          },
          {
            name:
              'static/js/shared-nj6qIml+EtJxDVgSunxJydSAIpY=-253ae210.3f8a9c3a.js',
          },
          {
            name:
              'static/js/shared-nj6qIml+EtJxDVgSunxJydSAIpY=-253ae210.3f8a9c3a.js.map',
          },
          { name: 'static/js/ArticlePage-31ecd969.ee810b86.js' },
          { name: 'static/js/ArticlePage-31ecd969.ee810b86.js.map' },
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
