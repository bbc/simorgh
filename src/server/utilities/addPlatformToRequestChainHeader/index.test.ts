import addPlatformToRequestChainHeader from '.';

describe('addPlatformToRequestChainHeader', () => {
  it('appends SIMORGH to the req-svc-chain header if it exists', () => {
    const headers = { 'req-svc-chain': 'SERVICE_1,SERVICE_2' };
    const result = addPlatformToRequestChainHeader({
      headers,
    });

    expect(result).toStrictEqual('SERVICE_1,SERVICE_2,SIMORGH');
  });

  it('does not append SIMORGH to the req-svc-chain header if it is the final service', () => {
    const headers = { 'req-svc-chain': 'SERVICE_1,SERVICE_2,SIMORGH' };
    const result = addPlatformToRequestChainHeader({
      headers,
    });

    expect(result).toStrictEqual('SERVICE_1,SERVICE_2,SIMORGH');
  });

  it('returns SIMORGH if the req-svc-chain header does not exist', () => {
    const headers = { 'header-name': 'header-value' };
    const result = addPlatformToRequestChainHeader({
      headers,
    });

    expect(result).toStrictEqual('SIMORGH');
  });
});
