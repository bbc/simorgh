import {
  fireEvent,
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';
import { recommendationsFixtures } from '../Recommendations/fixtures';
import RecommendationsCarousel from '.';

jest.mock('#app/hooks/useClickTrackerHandler', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('#app/hooks/useViewTracker', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const eventTrackingData = {
  componentName: 'midarticle-mostread',
  groupTracker: { name: 'Recomendamos', type: 'midarticle-mostread' },
};

const renderCarousel = (data = recommendationsFixtures) =>
  render(
    <RecommendationsCarousel
      data={data}
      title="Recomendamos"
      eventTrackingData={eventTrackingData}
    />,
    { service: 'mundo' },
  );

describe('RecommendationsCarousel', () => {
  it('links the supplied articles in order with lazy-loaded portrait crops', () => {
    renderCarousel();

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(recommendationsFixtures.length);
    recommendationsFixtures.forEach((recommendation, index) => {
      expect(links[index]).toHaveAttribute('href', recommendation.href);
      expect(links[index]).toHaveTextContent(recommendation.title);
      const image = screen.getByAltText(recommendation.image.altText);
      expect(image).toHaveAttribute('loading', 'lazy');
      expect(image).toHaveStyle({ aspectRatio: '9 / 16' });
    });
  });

  it('keeps a single recommendation as an article link', () => {
    renderCarousel(recommendationsFixtures.slice(0, 1));

    expect(screen.getAllByRole('link')).toHaveLength(1);
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      recommendationsFixtures[0].href,
    );
  });

  it('scrolls a focused article into view for keyboard navigation', () => {
    renderCarousel();
    const link = screen.getAllByRole('link')[1];
    link.scrollIntoView = jest.fn();

    fireEvent.focus(link);

    expect(link.scrollIntoView).toHaveBeenCalledWith({
      block: 'nearest',
      inline: 'center',
    });
  });

  it('preserves recommendation tracking and reports the actual item count', () => {
    const onClick = jest.fn();
    jest.mocked(useClickTrackerHandler).mockReturnValue({ onClick });
    renderCarousel();

    fireEvent.click(screen.getAllByRole('link')[1]);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(useViewTracker).toHaveBeenCalledWith({
      ...eventTrackingData,
      groupTracker: {
        ...eventTrackingData.groupTracker,
        itemCount: recommendationsFixtures.length,
      },
    });
    expect(useClickTrackerHandler).toHaveBeenCalledWith({
      ...eventTrackingData,
      groupTracker: {
        ...eventTrackingData.groupTracker,
        itemCount: recommendationsFixtures.length,
      },
      itemTracker: {
        type: 'midarticle-mostread-promo',
        text: recommendationsFixtures[1].title,
        position: 2,
      },
    });
  });
});
