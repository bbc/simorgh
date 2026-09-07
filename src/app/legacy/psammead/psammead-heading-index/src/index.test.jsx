import { screen } from '@testing-library/react';
import { render } from '../../../../components/react-testing-library-with-providers';
import HeadingIndex from './index';

describe('Index Heading', () => {
  it('should render correctly', () => {
    render(<HeadingIndex tabIndex={-1}>This is a page heading</HeadingIndex>);
    expect(
      screen.getByRole('heading', { level: 1, name: 'This is a page heading' }),
    ).toBeInTheDocument();
  });

  it('should render correctly with arabic script typography values', () => {
    render(<HeadingIndex tabIndex={-1}>هذا عنوان الصفحة</HeadingIndex>, {
      service: 'persian',
    });
    expect(
      screen.getByRole('heading', { level: 1, name: 'هذا عنوان الصفحة' }),
    ).toBeInTheDocument();
  });
});
