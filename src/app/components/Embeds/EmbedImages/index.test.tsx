import React from 'react';
import { render, screen } from '../../react-testing-library-with-providers';
import { chartEmbedImages, createEmbedImagesFixture } from './fixtures';
import EmbedImages from '.';

describe('EmbedImages', () => {
  beforeEach(() => {
    process.env.SIMORGH_ATI_BASE_URL = 'https://www.test.bbc.com/ws/includes';
  });

  it('should render image', async () => {
    render(<EmbedImages blocks={chartEmbedImages.blocks} />);

    const chartEmbedImage = screen.queryByRole('img');
    expect(chartEmbedImage).toBeInTheDocument();
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
});
