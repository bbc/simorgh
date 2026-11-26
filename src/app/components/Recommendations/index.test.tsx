import {
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import Recommendations from '.';
import { recommendationsFixtures } from './fixtures';

describe('Recommendations', () => {
  it('uses the portrait carousel for Mundo articles with the existing heading and skip link', () => {
    render(<Recommendations data={recommendationsFixtures} />, {
      service: 'mundo',
      toggles: { midArticleOnwardJourney: { enabled: true } },
    });

    expect(screen.getByTestId('recommendations-carousel')).toBeInTheDocument();
    expect(
      screen.getByRole('region', { name: 'M\u00e1s le\u00eddas' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Saltar .* y continuar leyendo/ }),
    ).toHaveAttribute('href', '#end-of-recommendations');
  });

  it.each([
    { service: 'mundo', isAmp: true },
    { service: 'mundo', isLite: true },
    { service: 'pidgin' },
    { service: 'mundo', pageType: 'mediaArticle' },
  ] as const)('retains the original layout for %o', options => {
    render(<Recommendations data={recommendationsFixtures} />, {
      ...options,
      toggles: { midArticleOnwardJourney: { enabled: true } },
    });

    expect(
      screen.queryByTestId('recommendations-carousel'),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(recommendationsFixtures[0].title),
    ).toBeInTheDocument();
  });

  it('does not render a Mundo carousel without recommendations', () => {
    const { container } = render(<Recommendations data={[]} />, {
      service: 'mundo',
      toggles: { midArticleOnwardJourney: { enabled: true } },
    });

    expect(container).toBeEmptyDOMElement();
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

  it.each(['pidgin', 'mundo'] as const)(
    'should not render recommendations when toggle is disabled for %s',
    service => {
      render(<Recommendations data={recommendationsFixtures} />, {
        service,
        toggles: { midArticleOnwardJourney: { enabled: false } },
      });

      const listEl = document.querySelector('ul');
      expect(listEl).not.toBeInTheDocument();
    },
  );

  it('should not render recommendations for a service that has Most Read disabled', () => {
    render(<Recommendations data={recommendationsFixtures} />, {
      service: 'cymrufyw',
    });

    const listEl = document.querySelector('ul');
    expect(listEl).not.toBeInTheDocument();
  });
});
