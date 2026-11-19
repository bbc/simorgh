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
  });
});
