import { scriptTag } from './index';

describe('Construct CSP Header', () => {
  it('should return the asset origins as an array', async () => {
    const expected = { test: 'test' };
    const result = scriptTag(true, true);

    expect(result).toEqual(expected);
  });
});
