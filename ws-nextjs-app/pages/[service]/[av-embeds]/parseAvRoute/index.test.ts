import parseAvRoute from '.';

const EXAMPLE_ROUTES = [
  '/news/av-embeds/67303123',
  '/serbian/cyr/av-embeds/srbija-68707945',
  '/russian/av-embeds/38886884/vpid/p04s97g7',
  '/news/av-embeds/58228280/pid/p09s9t1j',
];

describe('parseAvRoute', () => {
  it('should return valid route for /news/ route', () => {
    const result = parseAvRoute(EXAMPLE_ROUTES[0]);

    expect(result.service).toEqual('news');
    expect(result.platform).toEqual('cps');
    expect(result.assetId).toEqual('67303123');
  });

  it('should return valid route for /serbian/ route with /cyr/ variant', () => {
    const result = parseAvRoute(EXAMPLE_ROUTES[1]);

    expect(result.service).toEqual('serbian');
    expect(result.variant).toEqual('cyr');
    expect(result.platform).toEqual('cps');
    expect(result.assetId).toEqual('srbija-68707945');
  });

  it('should return valid route for /russian/ route with /vpid/', () => {
    const result = parseAvRoute(EXAMPLE_ROUTES[2]);

    expect(result.service).toEqual('russian');
    expect(result.platform).toEqual('cps');
    expect(result.assetId).toEqual('38886884');
    expect(result.embedId).toEqual('p04s97g7');
  });

  it('should return valid route for /news/ route with /pid/', () => {
    const result = parseAvRoute(EXAMPLE_ROUTES[3]);

    expect(result.service).toEqual('news');
    expect(result.platform).toEqual('cps');
    expect(result.assetId).toEqual('58228280');
    expect(result.embedId).toEqual('p09s9t1j');
  });
});
