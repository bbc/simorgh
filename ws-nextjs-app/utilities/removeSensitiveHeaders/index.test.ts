import removeSensitiveHeaders from '.';

describe('removeSensitiveHeaders', () => {
  beforeEach(() => {
    process.env.SENSITIVE_HTTP_HEADERS = '';
  });

  it('should return an empty object if headers is undefined', () => {
    const headers = undefined;
    const result = removeSensitiveHeaders(headers);
    expect(result).toEqual({});
  });

  it('should remove sensitive headers from headers object', () => {
    process.env.SENSITIVE_HTTP_HEADERS = 'Authorization, Cookie';

    const headers = {
      Authorization: 'Bearer token',
      Cookie: 'cookie',
      'X-Forwarded-For': '',
    };

    const result = removeSensitiveHeaders(headers);

    expect(result).toEqual({ 'X-Forwarded-For': '' });
  });
});
