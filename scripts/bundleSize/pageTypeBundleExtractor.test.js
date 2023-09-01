import { jest } from '@jest/globals';

const modernBundleReport = {
  namedChunkGroups: {
    main: {
      chunks: [65, 68, 66, 69, 67],
      assets: [
        { name: 'static/js/modern.framework-4f9840c1.f9a60e6c.js' },
        { name: 'static/js/modern.framework-4f9840c1.f9a60e6c.js.map' },
        { name: 'static/js/modern.main-d0ae3f07.f40d46f9.js' },
        { name: 'static/js/modern.main-d0ae3f07.f40d46f9.js.map' },
        { name: 'static/js/modern.main-7d359b94.a807aeb0.js' },
        { name: 'static/js/modern.main-7d359b94.a807aeb0.js.map' },
        { name: 'static/js/modern.main-f71cff67.a32d8cd2.js' },
        { name: 'static/js/modern.main-f71cff67.a32d8cd2.js.map' },
        { name: 'static/js/modern.main-88a3c260.517db56f.js' },
        { name: 'static/js/modern.main-88a3c260.517db56f.js.map' },
      ],
      children: {},
      childAssets: {},
      isOverSizeLimit: true,
    },
    ArticlePage: {
      chunks: [4, 0, 1, 2, 3, 5, 6, 53],
      assets: [
        { name: 'static/js/modern.../moment-lib-87d47d0c.d5f3ec50.js' },
        { name: 'static/js/modern.../moment-lib-87d47d0c.d5f3ec50.js.map' },
        { name: 'static/js/modern.commons-0f485567.d710e458.js' },
        { name: 'static/js/modern.commons-0f485567.d710e458.js.map' },
        { name: 'static/js/modern.commons-7d359b94.ced895c9.js' },
        { name: 'static/js/modern.commons-7d359b94.ced895c9.js.map' },
        { name: 'static/js/modern.commons-8493eda2.7bb97fc0.js' },
        { name: 'static/js/modern.commons-8493eda2.7bb97fc0.js.map' },
        { name: 'static/js/modern.commons-92a4fe01.6f43e2d7.js' },
        { name: 'static/js/modern.commons-92a4fe01.6f43e2d7.js.map' },
        {
          name: 'static/js/modern.shared-UddsGWzeoXsaLwaRPMwTQELcfA-31ecd969.898fb3aa.js',
        },
        {
          name: 'static/js/modern.shared-UddsGWzeoXsaLwaRPMwTQELcfA-31ecd969.898fb3aa.js.map',
        },
        {
          name: 'static/js/modern.shared-nj6qImlEtJxDVgSunxJydSAIpY-253ae210.3f8a9c3a.js',
        },
        {
          name: 'static/js/modern.shared-nj6qImlEtJxDVgSunxJydSAIpY-253ae210.3f8a9c3a.js.map',
        },
        { name: 'static/js/modern.ArticlePage-31ecd969.ee810b86.js' },
        { name: 'static/js/modern.ArticlePage-31ecd969.ee810b86.js.map' },
      ],
      children: {},
      childAssets: {},
    },
  },
};

jest.unstable_mockModule(
  'fs/promises',
  () => ({
    readFile: jest.fn(() => JSON.stringify(modernBundleReport))
  })
);



describe('pageTypeBundleExtractor', () => {
  it('should extract bundles used for an ArticlePage', async () => {
    const { extractBundlesForPageType } = await import('./pageTypeBundleExtractor.js');
    const result = extractBundlesForPageType('ArticlePage');
    expect(result).toEqual([
      'modern.../moment-lib-87d47d0c.d5f3ec50.js',
      'modern.commons-0f485567.d710e458.js',
      'modern.commons-7d359b94.ced895c9.js',
      'modern.commons-8493eda2.7bb97fc0.js',
      'modern.commons-92a4fe01.6f43e2d7.js',
      'modern.shared-UddsGWzeoXsaLwaRPMwTQELcfA-31ecd969.898fb3aa.js',
      'modern.shared-nj6qImlEtJxDVgSunxJydSAIpY-253ae210.3f8a9c3a.js',
      'modern.ArticlePage-31ecd969.ee810b86.js',
    ]);
  });

  it('should throw error for non-existent page type', async () => {
    const { extractBundlesForPageType } = await import('./pageTypeBundleExtractor.js');
    expect(() => {
      extractBundlesForPageType('blah');
    }).toThrow("page type 'blah' not found");
  });
});
