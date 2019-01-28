import manifest from './index';

describe('Manifest', () => {
  test('should render correctly for `news` service', () => {
    process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH = 'http://foobar.com';
    expect(manifest('news')).toMatchSnapshot();
  });

  test('should render correctly for `persian` service', () => {
    process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH = 'http://foobar.com';
    expect(manifest('persian')).toMatchSnapshot();
  });
});
