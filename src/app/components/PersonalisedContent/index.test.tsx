import { render, screen } from '../react-testing-library-with-providers';
import PersonalisedContent from '.';

const mockPersonalisedContent = [
  {
    title: 'Personalised Title',
    summaries: [
      {
        type: 'promo',
        title: 'Promo Title',
        description: 'Promo Description',
        link: '/promo-link',
        imageUrl: 'promo-image.jpg',
        imageAlt: 'Promo Image',
        isLive: false,
      },
    ],
    id: 'personalised-content',
    link: '/personalised-link',
    topicId: 'topic-1',
  },
];

const basePageData = {
  secondaryColumn: {
    personalisedContent: mockPersonalisedContent,
    topStories: [],
    features: [],
  },
};

describe('PersonalisedContent', () => {
  it('renders nothing if there is no personalised content data', () => {
    render(
      <PersonalisedContent
        // @ts-expect-error: Test fixture data does not need to match Article type exactly
        pageData={{ secondaryColumn: { topStories: [], features: [] } }}
        personalisedTopicCurationExperimentVariant="personalised"
      />,
    );
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
  });

  it('renders personalised content when variant is "personalised"', () => {
    render(
      <PersonalisedContent
        // @ts-expect-error: Test fixture data does not need to match Article type exactly
        pageData={basePageData}
        personalisedTopicCurationExperimentVariant="personalised"
      />,
    );
    expect(screen.getByRole('region')).toHaveAttribute(
      'aria-labelledby',
      'personalised-content',
    );
    expect(
      screen.getByText('Más información sobre Personalised Title'),
    ).toBeInTheDocument();
    expect(screen.getByText('Promo Title')).toBeInTheDocument();
  });

  it('renders the subheading as a link if link is provided', () => {
    render(
      <PersonalisedContent
        // @ts-expect-error: Test fixture data does not need to match Article type exactly
        pageData={basePageData}
        personalisedTopicCurationExperimentVariant="personalised"
      />,
    );
    const subheadingLink = screen.getByRole('link', {
      name: 'Más información sobre Personalised Title',
    });
    expect(subheadingLink).toHaveAttribute('href', '/personalised-link');
  });
});
