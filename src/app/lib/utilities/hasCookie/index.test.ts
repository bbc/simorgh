import hasCookie from '.';

describe('hasCookie', () => {
  it('should return true when cookie exists in headers', () => {
    const headers = 'ckns_id=abc123; other_cookie=xyz';
    const result = hasCookie(headers, 'ckns_id');
    expect(result).toBe(true);
  });

  it('should return false when cookie does not exist in headers', () => {
    const headers = 'other_cookie=xyz';
    const result = hasCookie(headers, 'ckns_id');
    expect(result).toBe(false);
  });

  it('should return false when headers is empty string', () => {
    const headers = '';
    const result = hasCookie(headers, 'ckns_id');
    expect(result).toBe(false);
  });

  it('should return true when cookie exists among multiple cookies', () => {
    const headers = 'cookie1=abc; ckns_id=123; cookie2=xyz';
    const result = hasCookie(headers, 'ckns_id');
    expect(result).toBe(true);
  });

  it('should return false when cookie name partially matches', () => {
    const headers = 'ckns_id_other=abc123';
    const result = hasCookie(headers, 'ckns_id');
    expect(result).toBe(false);
  });

  it('should handle cookies with whitespace correctly', () => {
    const headers = ' ckns_id=abc123 ';
    const result = hasCookie(headers, 'ckns_id');
    expect(result).toBe(true);
  });
});
