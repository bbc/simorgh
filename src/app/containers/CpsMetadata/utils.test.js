import { getBrandedImage } from './utils';

describe('CpsMetadata utils', () => {
  it('should return branded image', () => {
    const actual = getBrandedImage('expected to fail');
    const expected =
      'http://b.files.bbci.co.uk/6FC4/test/_63721682_p01kx435.jpg';

    expect(actual).toEqual(expected);
  });
});
