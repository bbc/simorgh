import { Summary } from '#app/models/types/curationData';
import {
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import UsefulLinks from '.';

const mockSummaries: Summary[] = [
  {
    type: 'link',
    title: 'BBC News Russian',
    firstPublished: '',
    link: 'http://www.bbc.com/russian',
    imageUrl:
      'https://ichef.test.bbci.co.uk/ace/standard/{width}/cpsdevpb/160c/test/96297a80-a308-11ed-9015-6935ab4fa6ca.png',
    description: '',
    imageAlt: 'BBC Russian',
    id: 'http%3A%2F%2Fwww.bbc.com%2Frussian',
  },
  {
    type: 'link',
    title: 'BBC Azeri',
    firstPublished: '',
    link: 'http://www.bbc.com/azeri',
    imageUrl: '',
    description: '',
    imageAlt: 'BBC Azeri',
    id: 'http%3A%2F%2Fwww.bbc.com%2Fazeri',
  },
];

const singleSummary: Summary[] = [mockSummaries[0]];
const usefulLinksId = 'useful-links-1';

describe('UsefulLinks', () => {
  it('should render section correctly', () => {
    const { getByRole } = render(
      <UsefulLinks title="Related sites" summaries={mockSummaries} />,
    );

    const section = getByRole('region');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('aria-labelledby', usefulLinksId);
  });

  it('should return null if no summaries are passed', () => {
    const { container } = render(
      <UsefulLinks title="Related sites" summaries={[]} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders a single h2 heading with correct content', () => {
    render(<UsefulLinks title="Related sites" summaries={mockSummaries} />);
    const headers = screen.getAllByRole('heading', { level: 2 });
    expect(headers.length).toBe(1);
    expect(headers[0]).toHaveAttribute('id', usefulLinksId);
    expect(headers[0]).toHaveTextContent('Related sites');
  });

  it('renders ul/li for multiple items with correct roles and count', () => {
    render(<UsefulLinks title="Related sites" summaries={mockSummaries} />);
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    expect(list.getAttribute('role')).toBe('list');

    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(mockSummaries.length);
  });

  it('renders correct content for single item', () => {
    render(<UsefulLinks title="Related sites" summaries={singleSummary} />);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links.length).toBe(1);
    expect(links[0]).toBeInTheDocument();
  });

  it('renders correct links', () => {
    render(<UsefulLinks title="Related sites" summaries={mockSummaries} />);

    mockSummaries.forEach(summary => {
      const link = screen.getByText(summary.title).closest('a');
      expect(link).toHaveAttribute('href', summary.link);
      expect(link).toHaveTextContent(summary.title);
    });
  });
});
