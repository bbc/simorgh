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
      embedId: 'p04s97g7',
    },
  },
  {
    route: '/news/av-embeds/58228280/pid/p09s9t1j',
    expectedOutput: {
      service: 'news',
      platform: 'cps',
      assetId: '58228280',
      embedId: 'p09s9t1j',
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
});
