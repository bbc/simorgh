import getPlaceholderImageUrl from '.';

describe('generatePlaceholderImageUrl', () => {
  test('should generate correct image url when url provided', () => {
    const url = getPlaceholderImageUrl(
      'ichef.bbci.co.uk/images/ic/$recipe/p063j1dv.jpg',
    );
    expect(url).toEqual(
      'https://ichef.bbci.co.uk/images/ic/1024x576/p063j1dv.jpg',
    );
  });

  test('should use placeholder when image not provided', () => {
    const url = getPlaceholderImageUrl(null);
    expect(url).toEqual('http://localhost:7080/images/media_placeholder.png');
  });
});
