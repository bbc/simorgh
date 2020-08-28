import getBrandedImage from '.';

describe('CpsMetadata get branded image', () => {
  afterEach(() => {
    delete process.env.SIMORGH_ICHEF_BASE_URL;
  });

  it('should return branded image for test', () => {
    process.env.SIMORGH_ICHEF_BASE_URL = 'https://ichef.test.bbci.co.uk';

    const locator = '729E/test/_63724392_gettyimages-1098075358.jpg';
    const service = 'pidgin';
    const actual = getBrandedImage(locator, service);
    const expected =
      'https://ichef.test.bbci.co.uk/news/1024/branded_pidgin/729E/test/_63724392_gettyimages-1098075358.jpg';

    expect(actual).toEqual(expected);
  });

  it('should return branded image for local', () => {
    process.env.SIMORGH_ICHEF_BASE_URL = 'https://ichef.test.bbci.co.uk';

    const locator = '729E/test/_63724392_gettyimages-1098075358.jpg';
    const service = 'igbo';
    const actual = getBrandedImage(locator, service);
    const expected =
      'https://ichef.test.bbci.co.uk/news/1024/branded_igbo/729E/test/_63724392_gettyimages-1098075358.jpg';

    expect(actual).toEqual(expected);
  });

  it('should return branded image for production', () => {
    process.env.SIMORGH_ICHEF_BASE_URL = 'https://ichef.bbci.co.uk';

    const locator = '729E/test/_63724392_gettyimages-1098075358.jpg';
    const service = 'korean';
    const actual = getBrandedImage(locator, service);
    const expected =
      'https://ichef.bbci.co.uk/news/1024/branded_korean/729E/test/_63724392_gettyimages-1098075358.jpg';

    expect(actual).toEqual(expected);
  });
});
