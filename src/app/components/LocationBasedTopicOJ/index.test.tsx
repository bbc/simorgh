import { render, screen } from '../react-testing-library-with-providers';
import LocationBasedTopicOJ from '.';

const mockCountryCuration = {
  title: 'Najeriya',
  topicId: 'topic-1',
  curationId: 'curation-1',
  curationType: 'vivo-stream',
  link: '/hausa/topics/topic-1',
  summaries: [
    {
      firstPublished: '2025-05-21',
      lastPublished: '2025-05-21',
      title: 'Promo Title',
      link: '/promo-link',
      imageUrl: 'promo-image.jpg',
      type: 'article',
    },
  ],
};

const basePageData = {
  countryCuration: mockCountryCuration,
};

describe('LocationBasedTopicOJ', () => {
  it('renders nothing if there is no countryCuration data', () => {
    render(
      <LocationBasedTopicOJ
        // @ts-expect-error: Test fixture data does not need to match Article type exactly
        pageData={{ countryCuration: null }}
      />,
    );
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
  });

  it('renders location-based topic curation when countryCuration data exists ', () => {
    render(
      <LocationBasedTopicOJ
        // @ts-expect-error: Test fixture data does not need to match Article type exactly
        pageData={basePageData}
      />,
    );
    expect(screen.getByRole('region')).toHaveAttribute(
      'aria-labelledby',
      'location-based-topic-oj',
    );
    expect(screen.getByText('Najeriya')).toBeInTheDocument();
    expect(screen.getByText('Promo Title')).toBeInTheDocument();
  });

  it('renders the subheading as a link if link is provided', () => {
    render(
      <LocationBasedTopicOJ
        // @ts-expect-error: Test fixture data does not need to match Article type exactly
        pageData={basePageData}
      />,
    );
    const region = screen.getByRole('region', {
      name: 'Najeriya',
    });
    expect(region).toBeInTheDocument();
    expect(screen.getByText('Najeriya')).toBeInTheDocument();
    expect(screen.getByText('Promo Title')).toBeInTheDocument();
  });

  it('renders the subheading as a link if link is provided', () => {
    render(
      <LocationBasedTopicOJ
        // @ts-expect-error: Test fixture data does not need to match Article type exactly
        pageData={basePageData}
      />,
    );
    const subheadingLink = screen.getByRole('link', {
      name: /Najeriya/i,
    });
    expect(subheadingLink).toHaveAttribute('href', '/hausa/topics/topic-1');
  });
});
