import { Summary } from '#app/models/types/curationData';
import {
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import SocialLinks from '.';

const eventTrackingData = {
  componentName: 'social-links',
};

const mockSummaries: Summary[] = [
  {
    type: 'link',
    title: 'Instagram',
    firstPublished: '',
    link: 'https://www.instagram.com/',
    imageUrl: 'https://example.com/{width}/instagram.png',
    description: 'BBC News',
    imageAlt: 'Instagram',
    id: 'mock-instagram-id',
  },
  {
    type: 'link',
    title: 'Facebook',
    firstPublished: '',
    link: 'https://www.facebook.com/',
    imageUrl: 'https://example.com/{width}/facebook.png',
    description: 'BBC News',
    imageAlt: 'Facebook',
    id: 'mock-facebook-id',
  },
];

const singleSummary: Summary[] = [mockSummaries[0]];
const socialLinksId = 'social-links-1';

describe('SocialLinks', () => {
  it('should render section correctly', () => {
    const { getByRole } = render(
      <SocialLinks
        title="Social Links"
        summaries={mockSummaries}
        eventTrackingData={eventTrackingData}
      />,
    );

    const section = getByRole('region');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('aria-labelledby', socialLinksId);
  });

  it('should return null if no summaries are passed', () => {
    const { container } = render(
      <SocialLinks
        title="Social Links"
        summaries={[]}
        eventTrackingData={eventTrackingData}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders a single h2 heading with correct content', () => {
    render(
      <SocialLinks
        title="Social Links"
        summaries={mockSummaries}
        eventTrackingData={eventTrackingData}
      />,
    );
    const headers = screen.getAllByRole('heading', { level: 2 });
    expect(headers.length).toBe(1);
    expect(headers[0]).toHaveAttribute('id', socialLinksId);
    expect(headers[0]).toHaveTextContent('Social Links');
  });

  it('renders ul/li for multiple items with correct roles and count', () => {
    render(<SocialLinks title="Social Links" summaries={mockSummaries} />);
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    expect(list.getAttribute('role')).toBe('list');

    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(mockSummaries.length);
  });

  it('renders correct content for single item', () => {
    render(<SocialLinks title="Social Links" summaries={singleSummary} />);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links.length).toBe(1);
    expect(links[0]).toBeInTheDocument();
  });

  it('renders correct links', () => {
    render(<SocialLinks title="Social Links" summaries={mockSummaries} />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(mockSummaries.length);

    mockSummaries.forEach((summary, index) => {
      expect(links[index]).toHaveAttribute('href', summary.link);

      expect(links[index]).toHaveTextContent(summary.title);

      if (summary.description) {
        const visuallyHiddenText = links[index].querySelector(
          '[class*="visuallyHiddenText"]',
        );
        expect(visuallyHiddenText).toHaveTextContent(summary.description);
      }
    });
  });

  it('renders correct images', () => {
    const { container } = render(
      <SocialLinks title="Social Links" summaries={mockSummaries} />,
    );

    const images = container.querySelectorAll('img');
    expect(images.length).toBe(mockSummaries.length);

    mockSummaries.forEach((summary, index) => {
      const expectedSrc = summary.imageUrl.replace('{width}', '80');
      expect(images[index]).toHaveAttribute('src', expectedSrc);
    });
  });

  it('renders a placeholder if image is not provided', () => {
    const summaryWithoutImage: Summary = {
      ...mockSummaries[0],
      imageUrl: '',
    };

    render(
      <SocialLinks title="Social Links" summaries={[summaryWithoutImage]} />,
    );

    const imgPlaceholder = screen.getByTestId('social-link-image-placeholder');
    expect(imgPlaceholder).toBeInTheDocument();
    expect(imgPlaceholder).toHaveAttribute('aria-hidden', 'true');

    const images = document.querySelectorAll('img');
    expect(images.length).toBe(0);
  });
});
