import DecoratedInline from '.';
import { render, screen } from '../react-testing-library-with-providers';
import { persianLink } from './fixture';

describe('InlineContainer', () => {
  it('should render correctly', () => {
    render(<DecoratedInline blocks={[persianLink]} language="fa" />);

    const link = screen.getByRole('link', { name: 'چیسربرگر, external' });

    expect(link).toHaveAttribute('href', 'https://google.com');
    expect(link).toHaveTextContent('چیسربرگر');
    expect(link.closest('span')).toHaveAttribute('lang', 'fa');
  });
});
