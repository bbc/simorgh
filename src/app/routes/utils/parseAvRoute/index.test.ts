import parseAvRoute from '.';

const EXAMPLE_ROUTES = [
  {
    route: '/news/av-embeds/67303123',
    expectedOutput: {
      service: 'news',
      platform: 'cps',
      assetId: '67303123',
    },
  },
  {
    route: '/serbian/cyr/av-embeds/srbija-68707945',
    expectedOutput: {
      service: 'serbian',
      variant: 'cyr',
      platform: 'cps',
      assetId: 'srbija-68707945',
    },
  },
  {
    route: '/russian/av-embeds/38886884/vpid/p04s97g7',
    expectedOutput: {
      service: 'russian',
      platform: 'cps',
      assetId: '38886884',
      mediaId: 'p04s97g7',
    },
  },
  {
    route: '/news/av-embeds/58228280/pid/p09s9t1j',
    expectedOutput: {
      service: 'news',
      platform: 'cps',
      assetId: '58228280',
      mediaId: 'p09s9t1j',
    },
  },
  {
    route: '/portuguese/av-embeds/brasil-54911845/vpid/p09s9t1j',
    expectedOutput: {
      service: 'portuguese',
      platform: 'cps',
      assetId: 'brasil-54911845',
      mediaId: 'p09s9t1j',
    },
  },
  {
    route: '/ws/av-embeds/articles/cd1rmn075d1o/p0jd37n8/ig',
    expectedOutput: {
      service: null,
      platform: 'articles',
      assetId: 'cd1rmn075d1o',
      mediaId: 'p0jd37n8',
      lang: 'ig',
    },
  },
  {
    route: '/ws/av-embeds/cps/serbian/cyr/srbija-68707945/p0cfmdwn/sr-cyrl',
    expectedOutput: {
      service: 'serbian',
      variant: 'cyr',
      platform: 'cps',
      assetId: 'srbija-68707945',
      mediaId: 'p0cfmdwn',
      lang: 'sr-cyrl',
    },
  },
  {
    route: '/ws/av-embeds/cps/thai/international-55160422/p0908t9z/th',
    expectedOutput: {
      service: 'thai',
      platform: 'cps',
      assetId: 'international-55160422',
      mediaId: 'p0908t9z',
      lang: 'th',
    },
  },
  {
    route: '/ws/av-embeds/live/c7p765ynk9qt/p01thw20/pcm',
    expectedOutput: {
      service: null,
      platform: 'tipo',
      assetId: 'c7p765ynk9qt',
      mediaId: 'p01thw20',
      lang: 'pcm',
    },
  },
];

describe('parseAvRoute', () => {
  it.each(EXAMPLE_ROUTES)(
    'should return valid route config for %s route',
    ({ route, expectedOutput }) => {
      const result = parseAvRoute(route);

      expect(result).toMatchObject(expectedOutput);
    },
  );

  it('should strip query params from the route URL', () => {
    const route = '/news/av-embeds/67303123?renderer_env=test';

    const expectedOutput = {
      service: 'news',
      platform: 'cps',
      assetId: '67303123',
    };

    const result = parseAvRoute(route);

    expect(result).toMatchObject(expectedOutput);
  });
});
