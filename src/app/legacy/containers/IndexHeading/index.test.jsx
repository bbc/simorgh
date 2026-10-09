import { screen } from '@testing-library/react';
import { render } from '../../../components/react-testing-library-with-providers';
import IndexHeading from '.';

const IndexHeadingWithContext = () => (
  <IndexHeading>Index Heading</IndexHeading>
);

describe('Index Heading', () => {
  it('should render correctly for IDX', () => {
    render(<IndexHeadingWithContext />, { service: 'ukrainian' });
    expect(
      screen.getByRole('heading', { name: 'Index Heading' }),
    ).toBeInTheDocument();
  });

  it('should render rtl correctly for IDX', () => {
    render(<IndexHeadingWithContext />, { service: 'arabic' });
    expect(
      screen.getByRole('heading', { name: 'Index Heading' }),
    ).toHaveAttribute('dir', 'rtl');
  });
});
