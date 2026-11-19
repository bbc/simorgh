import { PHOTO_GALLERY_PAGE } from '#app/routes/utils/pageTypes';
import {
  fireEvent,
  render,
  screen,
  within,
} from '../react-testing-library-with-providers';
import { recommendationsFixtures } from '../Recommendations/fixtures';
import RecommendationsCarousel from '.';
import StackedRecommendationsCarousel from './StackedRecommendationsCarousel';
import recommendationsCarouselFixture from './fixtures';

describe('RecommendationsCarousel', () => {
  const originalShowModal = HTMLDialogElement.prototype.showModal;
  const originalClose = HTMLDialogElement.prototype.close;

  beforeAll(() => {
    HTMLDialogElement.prototype.showModal = function showModal() {
      this.setAttribute('open', '');
    };
    HTMLDialogElement.prototype.close = function close() {
      this.removeAttribute('open');
    };
  });

  afterAll(() => {
    HTMLDialogElement.prototype.showModal = originalShowModal;
    HTMLDialogElement.prototype.close = originalClose;
  });

  it.each(['http://localhost:7081', 'https://www.test.bbc.com'])(
    'renders recommendation cards with localized heading and skip link on %s',
    bbcOrigin => {
      render(<RecommendationsCarousel data={recommendationsFixtures} />, {
        service: 'mundo',
        bbcOrigin,
      });

      const carousel = screen.getByRole('region', { name: 'Más leídas' });
      recommendationsFixtures.forEach(({ title }) => {
        expect(
          within(carousel).getByRole('button', { name: title }),
        ).toHaveAttribute('aria-haspopup', 'dialog');
      });
      expect(
        within(carousel).getByRole('link', {
          name: 'Saltar Más leídas y continuar leyendo',
        }),
      ).toHaveAttribute('href', '#end-of-recommendations-carousel');
    },
  );

  it.each([
    { service: 'pidgin' as const },
    { bbcOrigin: 'https://www.bbc.com' },
    { isAmp: true },
    { isLite: true },
    { isApp: true },
    { pageType: PHOTO_GALLERY_PAGE },
  ])(
    'does not render outside canonical Mundo test/local articles: %j',
    options => {
      render(<RecommendationsCarousel data={recommendationsFixtures} />, {
        service: 'mundo',
        ...options,
      });

      expect(
        screen.queryByTestId('recommendations-carousel'),
      ).not.toBeInTheDocument();
    },
  );

  it('does not render an empty carousel', () => {
    render(<RecommendationsCarousel data={[]} />, { service: 'mundo' });
    expect(
      screen.queryByTestId('recommendations-carousel'),
    ).not.toBeInTheDocument();
  });

  it.each([false, true])(
    'renders all 12 Storybook promos and opens the last promo with stacked=%s',
    stacked => {
      render(
        <RecommendationsCarousel
          data={recommendationsCarouselFixture}
          stacked={stacked}
        />,
        { service: 'mundo' },
      );

      const carousel = screen.getByTestId('recommendations-carousel');
      const cards = within(carousel).getAllByRole('button');
      const promos = cards.filter(
        card => card.getAttribute('aria-haspopup') === 'dialog',
      );

      expect(promos).toHaveLength(12);
      expect(promos.map(promo => promo.textContent)).toEqual(
        recommendationsCarouselFixture.map(({ title }) => title),
      );

      fireEvent.click(promos[11]);

      const recommendation = recommendationsCarouselFixture[11];
      const modal = screen.getByRole('dialog', { name: recommendation.title });
      expect(
        within(modal).getByRole('link', { name: 'Continuar leyendo' }),
      ).toHaveAttribute('href', recommendation.href);
    },
  );

  it('uses the service image when a recommendation has no image', () => {
    const [recommendation] = recommendationsFixtures;
    render(
      <RecommendationsCarousel
        data={[{ ...recommendation, image: undefined }]}
      />,
      { service: 'mundo' },
    );

    const card = screen.getByRole('button', { name: recommendation.title });
    expect(card.querySelector('img')).toHaveAttribute(
      'src',
      expect.stringContaining('mundo'),
    );
    expect(card.querySelector('img')).toHaveAttribute('loading', 'lazy');
  });

  it('scrolls a keyboard-focused recommendation into view', () => {
    const scrollIntoView = jest.fn();
    render(<RecommendationsCarousel data={recommendationsFixtures} />, {
      service: 'mundo',
    });
    const card = screen.getByRole('button', {
      name: recommendationsFixtures[1].title,
    });
    card.scrollIntoView = scrollIntoView;

    fireEvent.focus(card);

    expect(scrollIntoView).toHaveBeenCalledWith({
      block: 'nearest',
      inline: 'nearest',
    });
  });

  it('opens the selected recommendation in a modal with an article link and closes it', () => {
    render(<RecommendationsCarousel data={recommendationsFixtures} />, {
      service: 'mundo',
    });
    const recommendation = recommendationsFixtures[1];
    const card = screen.getByRole('button', { name: recommendation.title });
    card.scrollIntoView = jest.fn();
    card.focus();

    fireEvent.click(card);

    const modal = screen.getByRole('dialog', { name: recommendation.title });
    expect(within(modal).getByRole('img')).toHaveAttribute(
      'alt',
      recommendation.image.altText,
    );
    expect(
      within(modal).getByRole('link', { name: 'Continuar leyendo' }),
    ).toHaveAttribute('href', recommendation.href);

    fireEvent.click(within(modal).getByRole('button', { name: 'Salir' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(card).toHaveFocus();
  });

  it('closes the modal on the native Escape cancel event', () => {
    render(<RecommendationsCarousel data={recommendationsFixtures} />, {
      service: 'mundo',
    });
    fireEvent.click(
      screen.getByRole('button', { name: recommendationsFixtures[0].title }),
    );

    fireEvent(
      screen.getByRole('dialog'),
      new Event('cancel', { bubbles: false }),
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  describe('stacked square variant', () => {
    const data = [
      ...recommendationsFixtures,
      {
        ...recommendationsFixtures[0],
        id: 'third-recommendation',
        title: 'Recommendation Three',
      },
    ];

    it('groups promos in pairs and keeps an odd final promo', () => {
      render(<StackedRecommendationsCarousel data={data} />, {
        service: 'mundo',
      });

      const carousel = screen.getByTestId('recommendations-carousel');
      const [list] = within(carousel).getAllByRole('list');
      const stacks = within(list).getAllByRole('list');

      expect(
        stacks.map(stack => within(stack).getAllByRole('button').length),
      ).toEqual([2, 1]);
      expect(
        within(list)
          .getAllByRole('button')
          .map(button => button.textContent),
      ).toEqual(data.map(recommendation => recommendation.title));
    });

    it.each([1, 2])(
      'opens the correct recommendation modal for promo index %s',
      index => {
        render(<StackedRecommendationsCarousel data={data} />, {
          service: 'mundo',
        });
        const recommendation = data[index];

        fireEvent.click(
          screen.getByRole('button', { name: recommendation.title }),
        );

        const modal = screen.getByRole('dialog', {
          name: recommendation.title,
        });
        expect(
          within(modal).getByRole('link', { name: 'Continuar leyendo' }),
        ).toHaveAttribute('href', recommendation.href);
      },
    );
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
