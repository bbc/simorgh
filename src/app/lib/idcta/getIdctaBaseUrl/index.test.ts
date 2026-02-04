import isLive from '#app/lib/utilities/isLive';
import { getIdctaConfigUrl } from '.';

jest.mock('#app/lib/utilities/isLive');

const mockIsLive = isLive as jest.Mock;

describe('getIdctaConfigUrl', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return live config URL when isLive returns true', () => {
    mockIsLive.mockReturnValue(true);
    const result = getIdctaConfigUrl();
    expect(result).toBe('https://idcta.api.bbc.com/idcta/config');
  });

  it('should return test config URL when isLive returns false', () => {
    mockIsLive.mockReturnValue(false);
    const result = getIdctaConfigUrl();
    expect(result).toBe('https://idcta.test.api.bbc.com/idcta/config');
  });
});
