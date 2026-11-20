import { render } from '#app/components/react-testing-library-with-providers';
import * as clickTracking from '#app/hooks/useClickTrackerHandler';
import Recommendations from '.';
import { recommendationsFixtures } from './fixtures';

jest.mock('#app/hooks/useClickTrackerHandler', () => ({
  __esModule: true,
  ...jest.requireActual('#app/hooks/useClickTrackerHandler'),
}));

describe('Recommendations', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('passes experiment tracking to a single recommendation', () => {
    const clickTracker = jest.spyOn(clickTracking, 'default');
    const experimentProps = {
      experimentName: 'test_page_views_aa_3',
      experimentVariant: 'control',
      sendOptimizelyEvents: true,
    };

    render(
      <Recommendations
        data={[recommendationsFixtures[0]]}
        experimentProps={experimentProps}
      />,
      {
        service: 'pidgin',
        toggles: { midArticleOnwardJourney: { enabled: true } },
      },
    );

    expect(clickTracker).toHaveBeenCalledWith(
      expect.objectContaining({
        componentName: 'midarticle-mostread',
        ...experimentProps,
        itemTracker: {
          type: 'midarticle-mostread-promo',
          text: recommendationsFixtures[0].title,
          position: 1,
        },
      }),
    );
  });

  it('should render a single recommendation', () => {
    const { getByText } = render(
      <Recommendations data={recommendationsFixtures} />,
      {
        service: 'pidgin',
        toggles: { midArticleOnwardJourney: { enabled: true } },
      },
    );
    const title = getByText(recommendationsFixtures[0].title);
    expect(title).toBeInTheDocument();
  });

  it('should render multiple recommendations', () => {
    const { getByText } = render(
      <Recommendations data={recommendationsFixtures} />,
      {
        service: 'pidgin',
        toggles: { midArticleOnwardJourney: { enabled: true } },
      },
    );

    const listEl = document.querySelector('ul');
    expect(listEl).toBeInTheDocument();

    recommendationsFixtures.forEach(({ title }) => {
      const recommendationTitle = getByText(title);
      expect(recommendationTitle).toBeInTheDocument();
    });
  });

  it('should not render recommendations when toggle is disabled', () => {
    render(<Recommendations data={recommendationsFixtures} />, {
      service: 'pidgin',
      toggles: { midArticleOnwardJourney: { enabled: false } },
    });

    const listEl = document.querySelector('ul');
    expect(listEl).not.toBeInTheDocument();
  });

  it('should not render recommendations for a service that has Most Read disabled', () => {
    render(<Recommendations data={recommendationsFixtures} />, {
      service: 'cymrufyw',
    });

    const listEl = document.querySelector('ul');
    expect(listEl).not.toBeInTheDocument();
  });
});
