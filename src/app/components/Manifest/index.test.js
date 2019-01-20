import manifest from './index';

describe('Manifest', () => {
  test('should render correctly for `news` service', () => {
    expect(manifest('news')).toMatchSnapshot();
  });

  test('should render correctly for `persian` service', () => {
    expect(manifest('persian')).toMatchSnapshot();
  });
});
