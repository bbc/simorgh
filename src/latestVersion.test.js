import { getLatestVersion } from './latestVersion';

describe('getLatestVersion', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should throw error without GITHUB_TOKEN env', async () => {
    process.env.GITHUB_TOKEN = null;
    let e;
    try {
      await getLatestVersion();
    } catch (err) {
      e = err;
    }
    expect(e).not.toBeNull();
  });

  it('should get latest version', async () => {
    process.env.GITHUB_TOKEN = 'validtoken';
    fetch.mockResponseOnce(JSON.stringify({ tag_name: '1.2.3' }));
    const version = await getLatestVersion();
    expect(version).toBe('1.2.3');
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(
      'https://api.github.com/repos/bbc/simorgh/releases/latest',
    );
  });
});
