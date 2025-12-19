import { render } from '../../../../components/react-testing-library-with-providers';
import latin from '../../../../components/ThemeProvider/fontScripts/latin';
import arabic from '../../../../components/ThemeProvider/fontScripts/arabic';
import HeadingIndex from './index';

describe('Index Heading', () => {
  it('should render correctly', () => {
    const { container } = render(
      <HeadingIndex script={latin} service="news" tabIndex={-1}>
        This is a page heading
      </HeadingIndex>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with arabic script typography values', () => {
    const { container } = render(
      <HeadingIndex script={arabic} service="persian" tabIndex={-1}>
        هذا عنوان الصفحة
      </HeadingIndex>,
      { service: 'persian' },
    );
    expect(container).toMatchSnapshot();
  });
});
