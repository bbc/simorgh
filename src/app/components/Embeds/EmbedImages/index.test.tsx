import React from 'react';
import { render, screen } from '../../react-testing-library-with-providers';
import { chartEmbedImages, createEmbedImagesFixture } from './fixtures';
import EmbedImages from '.';

describe('EmbedImages', () => {
  beforeEach(() => {
    process.env.SIMORGH_INCLUDES_BASE_URL =
      'https://www.test.bbc.com/ws/includes';
  });
  it('should not render when empty embedImages array is passed in', async () => {
    const { container } = render(<EmbedImages blocks={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it.each`
    imageAttribute | fixture
    ${'locator'}   | ${createEmbedImagesFixture({ locator: null })}
    ${'alt'}       | ${createEmbedImagesFixture({ alt: null })}
    ${'width'}     | ${createEmbedImagesFixture({ width: null })}
    ${'height'}    | ${createEmbedImagesFixture({ height: null })}
  `(
    'should not render when $imageAttribute is missing from data',
    ({ fixture }) => {
      const { container } = render(<EmbedImages blocks={fixture.blocks} />);

      expect(container).toBeEmptyDOMElement();
    },
  );
  describe('Canonical', () => {
    it('should render a 1632px width image', async () => {
      render(<EmbedImages blocks={chartEmbedImages.blocks} />);

      const chartEmbedImage = screen.queryByRole('img');
      expect(chartEmbedImage).toHaveAttribute('width', '1632');
    });
  });
  describe('AMP', () => {
    it('should render a 1280px width amp-image', async () => {
      const { container } = render(
        <EmbedImages blocks={chartEmbedImages.blocks} />,
        {
          isAmp: true,
        },
      );

      const chartEmbedImage = container.getElementsByTagName('amp-img')[0];
      expect(chartEmbedImage).toHaveAttribute('width', '1280');
    });
  });
});
