import React from 'react';
import { GHOST } from '#components/ThemeProvider/palette';
import {
  render,
  waitFor,
} from '#components/react-testing-library-with-providers';
import {
  ImageWithPlaceholder,
  AmpImageWithPlaceholder,
  AmpImageWithPlaceholderPng,
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
        'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/E7DB/production/_101655395_paulineclayton.jpg',
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

  it('should add a background color if image is not a jpg/jpeg AMP image', async () => {
    render(<AmpImageWithPlaceholderPng />);

    await waitFor(() => {
      expect(document.querySelector('amp-img')).toHaveStyle({
        backgroundColor: `${GHOST}`,
      });
    });
  });

  it('should not add a backgroundColor if image is a jpg/jpeg AMP image', async () => {
    render(<AmpImageWithPlaceholder />);

    await waitFor(() => {
      expect(document.querySelector('amp-img')).not.toHaveStyle({
        backgroundColor: `${GHOST}`,
      });
    });
  });

  it('should not provide non-js fallback', () => {
    const { container } = render(
      <LazyLoadImageWithPlaceholder fallback={false} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render an image', () => {
    const { container } = render(<ImageWithPlaceholder />);
    expect(container).toMatchSnapshot();
  });

  it('should render an AMP image', () => {
    const { container } = render(<AmpImageWithPlaceholder />);
    expect(container).toMatchSnapshot();
  });
});
