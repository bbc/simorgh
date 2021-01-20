import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import {
  ImageWithPlaceholder,
  AmpImageWithPlaceholder,
  LazyLoadImageWithPlaceholder,
} from './fixtureData';

describe('ImageWithPlaceholder', () => {
  it('should not load lazyload component when lazyLoad prop is set to false', async () => {
    const { getByAltText } = render(
      <LazyLoadImageWithPlaceholder lazyLoad={false} />,
    );

    expect(getByAltText('Pauline Clayton')).toBeInTheDocument();
  });

  it('should lazyload component when lazyLoad prop is set to true', async () => {
    const { container, queryByAltText } = render(
      <LazyLoadImageWithPlaceholder lazyLoad />,
    );

    expect(queryByAltText('Pauline Clayton')).not.toBeInTheDocument();
    expect(container.querySelector('noscript')).toBeInTheDocument();
  });

  it('should add a link tag to the head of the document when shouldPreload is set to true', async () => {
    render(<ImageWithPlaceholder shouldPreload />);

    await waitFor(() => {
      expect(document.querySelector('head link')).toBeInTheDocument();
    });
  });

  it('should not add a link tag to the head of the document when shouldPreload is set to false', async () => {
    render(<ImageWithPlaceholder />);

    await waitFor(() => {
      expect(document.querySelector('head link')).not.toBeInTheDocument();
    });
  });

  it('should not add a link tag to the head of the document when rendering an AMP image', async () => {
    render(<AmpImageWithPlaceholder />);

    await waitFor(() => {
      expect(document.querySelector('head link')).not.toBeInTheDocument();
    });
  });

  shouldMatchSnapshot(
    'should not provide non-js fallback',
    <LazyLoadImageWithPlaceholder fallback={false} />,
  );

  shouldMatchSnapshot('should render an image', <ImageWithPlaceholder />);

  shouldMatchSnapshot(
    'should render an AMP image',
    <AmpImageWithPlaceholder />,
  );
});
