import React from 'react';
import {
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import RelatedContentCarousel from './index';

const mockItems = [
  { id: '1', title: 'Card 1', url: '/1', image: 'img1.jpg' },
  { id: '2', title: 'Card 2', url: '/2', image: 'img2.jpg' },
];

const mockTranslations = {
  title: 'Contenido relacionado',
};

describe('RelatedContent Component', () => {
  it('renders as a standard grid when the carousel toggle is disabled', () => {
    const { container } = render(
      <RelatedContentCarousel
        translations={mockTranslations}
        items={mockItems}
      />,
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
    render(
      <RelatedContentCarousel
        translations={mockTranslations}
        items={mockItems}
      />,
      {
        toggles: {
          relatedContentCarousel: { enabled: true },
        },
      }
    );

    const carouselList = screen.getByTestId('portrait-video-carousel');
    expect(carouselList).toBeInTheDocument();
    expect(carouselList).toHaveAttribute('role', 'region');
    expect(carouselList).toHaveAttribute('aria-label', 'Contenido relacionado');

    // Verify list items are rendered
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
  });
});
