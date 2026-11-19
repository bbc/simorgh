import { render, screen } from '../../../react-testing-library-with-providers';
import LastUpdated from '.';

describe('MostReadCanonical - LastUpdated', () => {
  it('should render LastUpdated correctly', () => {
    render(
      <LastUpdated
        timestamp={864691200}
        prefix="Last Updated:"
        locale="en-gb"
        timezone="Europe/London"
      />,
    );

    const time = screen.getByText('Last Updated: 11 January 1970');

    expect(time.tagName).toBe('TIME');
    expect(time).toHaveAttribute('datetime', '1970-01-11');
  });
});
