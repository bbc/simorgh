import {
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import RelatedContentData from './fixture';
import RelatedContentCarousel from './index';

describe('RelatedContent Component', () => {
  it('renders as a standard grid when the carousel toggle is disabled', () => {
    const { container } = render(
      <RelatedContentCarousel content={RelatedContentData} />,
      {
        toggles: {
          relatedContentCarousel: { enabled: false },
        },
      },
    );

    const gridContainer = container.querySelector(`.${styles.grid}`);
    expect(gridContainer).toBeInTheDocument();
    expect(
      screen.queryByTestId('portrait-video-carousel'),
    ).not.toBeInTheDocument();
  });

  it('renders as a dark-themed portrait video carousel when the toggle is enabled', () => {
    render(<RelatedContentCarousel content={RelatedContentData} />, {
      toggles: {
        relatedContentCarousel: { enabled: true },
      },
    });

    const carouselList = screen.getByTestId('portrait-video-carousel');
    expect(carouselList).toBeInTheDocument();
    expect(carouselList).toHaveAttribute('role', 'region');
    expect(carouselList).toHaveAttribute('aria-label', 'Contenido relacionado');

    // Verify list items are rendered
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
  });
});
