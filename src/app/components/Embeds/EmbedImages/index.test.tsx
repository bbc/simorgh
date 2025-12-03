import React from 'react';
import { render, screen } from '../../react-testing-library-with-providers';
import { chartEmbedImages, createEmbedImagesFixture } from './fixtures';
import EmbedImages from '.';

describe('EmbedImages', () => {
  beforeEach(() => {
    process.env.SIMORGH_INCLUDES_BASE_URL =
      'https://www.test.bbc.com/ws/includes';
    process.env.SIMORGH_ICHEF_BASE_URL = 'https://ichef.bbci.co.uk';
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

    it('should construct the correct URL', async () => {
      render(<EmbedImages blocks={chartEmbedImages.blocks} />);

      const chartEmbedImage = screen.queryByRole('img');
      expect(chartEmbedImage).toHaveAttribute(
        'src',
        'https://ichef.bbci.co.uk/news/1632/idt2-test/idt2/793f648b-b17f-489a-a473-9e5a71f12684/image/816',
      );
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

    it('should construct the correct URL', async () => {
      const { container } = render(
        <EmbedImages blocks={chartEmbedImages.blocks} />,
        {
          isAmp: true,
        },
      );

      const chartEmbedImage = container.getElementsByTagName('amp-img')[0];
      expect(chartEmbedImage).toHaveAttribute(
        'src',
        'https://ichef.bbci.co.uk/news/1280/idt2-test/idt2/793f648b-b17f-489a-a473-9e5a71f12684/image/640',
      );
    });
  });

  describe('Lite', () => {
    it('Should return null if isLite is true', () => {
      const { container } = render(
        <EmbedImages blocks={chartEmbedImages.blocks} />,
        {
          isLite: true,
        },
      );
      expect(container).toBeEmptyDOMElement();
    });
  });
});
