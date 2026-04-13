import getIdctaUserOrigin from '.';

describe('getIdctaUserOrigin', () => {
  it('should return null when producerName is not provided', () => {
    const result = getIdctaUserOrigin(null, 'live');
    expect(result).toBeNull();
  });

  it('should return WS_NEWS_HINDI when env is live', () => {
    const result = getIdctaUserOrigin('HINDI', 'live');
    expect(result).toBe('WS_NEWS_HINDI');
  });

  it('should return WS_NEWS_HINDI_TEST when env is test', () => {
    const result = getIdctaUserOrigin('HINDI', 'test');
    expect(result).toBe('WS_NEWS_HINDI_TEST');
  });

  it('should return WS_NEWS_HINDI_TEST for local/dev/sandbox env', () => {
    const result = getIdctaUserOrigin('HINDI', 'local');
    expect(result).toBe('WS_NEWS_HINDI_TEST');
  });

  it('should work with any producer name', () => {
    const result = getIdctaUserOrigin('MUNDO', 'live');
    expect(result).toBe('WS_NEWS_MUNDO');
  });
});
