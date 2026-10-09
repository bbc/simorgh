import isLive from '#app/lib/utilities/isLive';
import getIdctaUserOrigin from '.';

jest.mock('#app/lib/utilities/isLive');
const mockIsLive = isLive as jest.Mock;

describe('getIdctaUserOrigin', () => {
  it('should return null when producerName is not provided', () => {
    const result = getIdctaUserOrigin(null);
    expect(result).toBeNull();
  });

  it('should return WS_NEWS_HINDI when env is live', () => {
    mockIsLive.mockReturnValue(true);
    const result = getIdctaUserOrigin('HINDI');
    expect(result).toBe('WS_NEWS_HINDI');
  });

  it('should return WS_NEWS_HINDI_TEST when env is test', () => {
    mockIsLive.mockReturnValue(false);
    const result = getIdctaUserOrigin('HINDI');
    expect(result).toBe('WS_NEWS_HINDI_TEST');
  });

  it('should return WS_NEWS_HINDI_TEST for local/dev/sandbox env', () => {
    mockIsLive.mockReturnValue(false);
    const result = getIdctaUserOrigin('HINDI');
    expect(result).toBe('WS_NEWS_HINDI_TEST');
  });

  it('should work with any producer name', () => {
    mockIsLive.mockReturnValue(true);
    const result = getIdctaUserOrigin('MUNDO');
    expect(result).toBe('WS_NEWS_MUNDO');
  });
});
