import * as clickTracking from '#app/hooks/useClickTrackerHandler';
import { render, screen } from '../react-testing-library-with-providers';
import LocationBasedTopicOJ from '.';

jest.mock('#app/hooks/useClickTrackerHandler', () => ({
  __esModule: true,
  ...jest.requireActual('#app/hooks/useClickTrackerHandler'),
}));

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
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('passes active experiment data to the heading and promo click trackers', () => {
    const clickTracker = jest.spyOn(clickTracking, 'default');
    const experimentProps = {
      experimentName: 'test_page_views_aa_3',
      experimentVariant: 'control',
      sendOptimizelyEvents: true,
    };

    render(
      <LocationBasedTopicOJ
        // @ts-expect-error: Test fixture data does not need to match Article type exactly
        pageData={basePageData}
        experimentProps={experimentProps}
      />,
    );

    expect(clickTracker).toHaveBeenCalledWith(
      expect.objectContaining({
        componentName: 'location-based-topic-oj',
        ...experimentProps,
      }),
    );
    expect(clickTracker).toHaveBeenCalledWith(
      expect.objectContaining({
        componentName: 'location-based-topic-oj',
        ...experimentProps,
        itemTracker: expect.objectContaining({ text: 'Promo Title' }),
      }),
    );
  });

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
    const subheadingLink = screen.getByRole('link', {
      name: /Najeriya/i,
    });
    expect(subheadingLink).toHaveAttribute('href', '/hausa/topics/topic-1');
  });

  it('renders the promos for the articles provided in the curation', () => {
    render(
      <LocationBasedTopicOJ
        // @ts-expect-error: Test fixture data does not need to match Article type exactly
        pageData={basePageData}
      />,
    );
    const promoLink = screen.getByRole('link', {
      name: /Promo Title/i,
    });
    expect(promoLink).toBeInTheDocument();
    expect(promoLink).toHaveAttribute('href', '/promo-link');
  });
});
