import { render } from '../../../../components/react-testing-library-with-providers';
import HeadingIndex from './index';

describe('Index Heading', () => {
  it('should render correctly', () => {
    const { container } = render(
      <HeadingIndex tabIndex={-1}>This is a page heading</HeadingIndex>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with arabic script typography values', () => {
    const { container } = render(
      <HeadingIndex tabIndex={-1}>هذا عنوان الصفحة</HeadingIndex>,
      { service: 'persian' },
    );
    expect(container).toMatchSnapshot();
  });
});
