import { screen } from '@testing-library/react';
import { render } from '../../../../components/react-testing-library-with-providers';
import InlineLink from './index';

describe(`InlineLink`, () => {
  it('should render correctly', () => {
    render(<InlineLink href="https://www.bbc.com/news">BBC News</InlineLink>);
    expect(screen.getByRole('link', { name: 'BBC News' })).toBeInTheDocument();
  });
});
