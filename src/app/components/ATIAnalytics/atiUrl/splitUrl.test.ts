import splitUrl from './splitUrl';

describe('splitUrl', () => {
  it('returns an array of the host and query string parameters for a given URL', () => {
    const url = 'https://foobar.com?key1=value1&key2=value2';

    expect(splitUrl(url)).toEqual([
      'https://foobar.com',
      'key1=value1',
      'key2=value2',
    ]);
  });
});
