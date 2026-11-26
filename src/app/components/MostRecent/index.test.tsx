import { render, screen } from '../react-testing-library-with-providers';
import MostRecent from '.';

const data = {
  items: [
    {
      id: 'one',
      headline: 'The latest headline',
      href: '/articles/one',
      timeAgo: '5 minutes ago',
    },
    {
      id: 'two',
      headline: 'Another latest headline',
      href: '/articles/two',
      timeAgo: '10 minutes ago',
    },
  ],
};

describe('MostRecent', () => {
  it('renders each item with its headline, link and relative time', () => {
    render(<MostRecent data={data} />, { service: 'pidgin' });

    expect(screen.getByRole('heading', { name: 'Most recent' })).toBeVisible();
    expect(
      screen.getByRole('link', { name: data.items[0].headline }),
    ).toHaveAttribute('href', data.items[0].href);
    expect(screen.getByText(data.items[0].timeAgo)).toBeVisible();
  });

  it('can hide the section label while retaining the items', () => {
    render(<MostRecent data={data} showSectionLabel={false} />, {
      service: 'pidgin',
    });

    expect(
      screen.queryByRole('heading', { name: 'Most recent' }),
    ).not.toBeInTheDocument();
    expect(screen.getByText(data.items[0].headline)).toBeVisible();
  });

  it.each([undefined, null, { items: [] }])(
    'does not render when data is %s',
    missingData => {
      render(<MostRecent data={missingData} />, { service: 'pidgin' });

      expect(screen.queryByTestId('most-recent')).not.toBeInTheDocument();
    },
  );
});
