import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import {
  ImageWithPlaceholder,
  AmpImageWithPlaceholder,
  AmpImageWithPlaceholderFallback,
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

  it('should add a link tag to the head of the document when preload is set to true', async () => {
    render(<ImageWithPlaceholder preload />);

    await waitFor(() => {
      const preloadLink = document.querySelector('head link');
      expect(preloadLink).toBeInTheDocument();
      expect(preloadLink.rel).toEqual('preload');
      expect(preloadLink.href).toEqual(
        'https://ichef.bbci.co.uk/news/640/cpsprodpb/E7DB/production/_101655395_paulineclayton.jpg',
      );
    });
  });

  it('should not add a link tag to the head of the document when preload is set to false', async () => {
    render(<ImageWithPlaceholder preload={false} />);

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

  shouldMatchSnapshot(
    'should render a fallback when AMP image fails to load',
    <AmpImageWithPlaceholderFallback />,
  );
});
