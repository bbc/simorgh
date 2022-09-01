import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import Image from '.';

describe('Image', () => {
  it('should preload when preload is true', async () => {
    render(
      <Image
        alt="orange 1"
        originCode="cpsdevpb"
        src="41BC/test/_63482861_orange1.jpg"
        originalImageWidth={500}
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
        preload
      />,
    );

    await waitFor(() => {
      const linkEl = document.head.querySelector('link');

      expect(linkEl).toHaveAttribute('rel', 'preload');
      expect(linkEl).toHaveAttribute('as', 'image');
      expect(linkEl).toHaveAttribute('href', '41BC/test/_63482861_orange1.jpg');
      expect(linkEl).toHaveAttribute(
        'imagesrcset',
        'https://ichef.bbci.co.uk/news/200/cpsdevpb/41BC/test/_63482861_orange1.jpg.webp 200w, https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg.webp 500w',
      );
      expect(linkEl).toHaveAttribute(
        'imagesizes',
        '(max-width: 600px) 480px, 800px',
      );
    });
  });

  it('should not preload when preload is false', async () => {
    render(
      <Image
        alt="orange 1"
        originCode="cpsdevpb"
        src="41BC/test/_63482861_orange1.jpg"
        originalImageWidth={500}
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
        preload={false}
      />,
    );

    await waitFor(() => {
      const linkEl = document.head.querySelector('link');

      expect(linkEl).not.toBeInTheDocument();
    });
  });

  it('should not preload by default', async () => {
    render(
      <Image
        alt="orange 1"
        originCode="cpsdevpb"
        src="41BC/test/_63482861_orange1.jpg"
        originalImageWidth={500}
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
      />,
    );

    await waitFor(() => {
      const linkEl = document.head.querySelector('link');

      expect(linkEl).not.toBeInTheDocument();
    });
  });

  it('should lazy load when lazy load is true', () => {
    render(
      <Image
        alt="orange 1"
        originCode="cpsdevpb"
        src="41BC/test/_63482861_orange1.jpg"
        originalImageWidth={500}
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
        lazyLoad
      />,
    );

    const imageEl = screen.getByAltText('orange 1');
    expect(imageEl).toHaveAttribute('loading', 'lazy');
  });

  it('should not lazy load when lazy load is false', () => {
    render(
      <Image
        alt="orange 1"
        originCode="cpsdevpb"
        src="41BC/test/_63482861_orange1.jpg"
        originalImageWidth={500}
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
        lazyLoad={false}
      />,
    );

    const imageEl = screen.getByAltText('orange 1');
    expect(imageEl).not.toHaveAttribute('loading', 'lazy');
  });

  it('should not lazy load by default', () => {
    render(
      <Image
        alt="orange 1"
        originCode="cpsdevpb"
        src="41BC/test/_63482861_orange1.jpg"
        originalImageWidth={500}
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
      />,
    );

    const imageEl = screen.getByAltText('orange 1');
    expect(imageEl).not.toHaveAttribute('loading', 'lazy');
  });

  it('should have a collection of webp image sources for responsiveness', () => {
    render(
      <Image
        alt="orange 1"
        originCode="cpsdevpb"
        src="41BC/test/_63482861_orange1.jpg"
        originalImageWidth={500}
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
      />,
    );

    const sourceEl = screen.getByAltText('orange 1')?.parentNode?.children[0];
    expect(sourceEl).toHaveAttribute(
      'srcset',
      'https://ichef.bbci.co.uk/news/200/cpsdevpb/41BC/test/_63482861_orange1.jpg.webp 200w, https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg.webp 500w',
    );
    expect(sourceEl).toHaveAttribute(
      'sizes',
      '(max-width: 600px) 480px, 800px',
    );
  });

  it('should have a collection of jpeg image sources for responsiveness', () => {
    render(
      <Image
        alt="orange 1"
        originCode="cpsdevpb"
        src="41BC/test/_63482861_orange1.jpg"
        originalImageWidth={500}
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
      />,
    );

    const sourceEl = screen.getByAltText('orange 1')?.parentNode?.children[1];
    expect(sourceEl).toHaveAttribute(
      'srcset',
      'https://ichef.bbci.co.uk/news/200/cpsdevpb/41BC/test/_63482861_orange1.jpg 200w, https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg 500w',
    );
    expect(sourceEl).toHaveAttribute(
      'sizes',
      '(max-width: 600px) 480px, 800px',
    );
  });

  it('should support jpeg images', () => {
    render(
      <Image
        alt="orange 1"
        originCode="cpsdevpb"
        src="41BC/test/_63482861_orange1.jpg"
        originalImageWidth={500}
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
      />,
    );

    const imageEl = screen.getByAltText('orange 1');
    expect(imageEl?.parentNode?.children[1]).toHaveAttribute(
      'srcset',
      'https://ichef.bbci.co.uk/news/200/cpsdevpb/41BC/test/_63482861_orange1.jpg 200w, https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg 500w',
    );
  });

  it('should support webp images', () => {
    render(
      <Image
        alt="orange 1"
        originCode="cpsdevpb"
        src="41BC/test/_63482861_orange1.jpg"
        originalImageWidth={500}
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
      />,
    );

    const imageEl = screen.getByAltText('orange 1');
    expect(imageEl?.parentNode?.firstChild).toHaveAttribute(
      'srcset',
      'https://ichef.bbci.co.uk/news/200/cpsdevpb/41BC/test/_63482861_orange1.jpg.webp 200w, https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg.webp 500w',
    );
  });

  it('should support AMP images', () => {
    render(
      <Image
        alt="orange 1"
        originCode="cpsdevpb"
        src="41BC/test/_63482861_orange1.jpg"
        originalImageWidth={500}
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
        isAmp
      />,
    );
    screen.debug();
    const imageEl = screen.getByAltText('orange 1');
    expect(imageEl?.parentNode?.children[2]).toHaveAttribute('isAmp', true);
  });

  it('should render image with correct width and height attributes', () => {
    render(
      <Image
        alt="orange 1"
        originCode="cpsdevpb"
        src="41BC/test/_63482861_orange1.jpg"
        originalImageWidth={500}
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
        width={500}
        height={281}
      />,
    );

    const imageEl = screen.getByAltText('orange 1');
    expect(imageEl).toHaveAttribute('width', '500');
    expect(imageEl).toHaveAttribute('height', '281');
  });

  it.skip('should render the image correctly - container has a padding of the aspect ratio', () => {
    render(
      <Image
        alt="orange 1"
        originCode="cpsdevpb"
        src="41BC/test/_63482861_orange1.jpg"
        originalImageWidth={500}
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
        width={500}
        height={281}
      />,
    );

    const imageEl = screen.getByAltText('orange 1');
    expect(imageEl).toHaveAttribute('width', '500');
    expect(imageEl).toHaveAttribute('height', '281');
  });

  it('should load a placeholder when the image has not yet loaded', async () => {});

  it('should render an image with an alt tag', () => {
    render(
      <Image
        alt="orange 1"
        originCode="cpsdevpb"
        src="41BC/test/_63482861_orange1.jpg"
        originalImageWidth={500}
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
      />,
    );
    expect(screen.getByAltText('orange 1')).toBeInTheDocument();
  });

  it('should be able to apply custom styles', () => {
    expect(true).toBe(false);
  });

  it('should render the fallback image in the src attribute', () => {
    render(
      <Image
        alt="orange 1"
        originCode="cpsdevpb"
        src="41BC/test/_63482861_orange1.jpg"
        originalImageWidth={500}
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
      />,
    );
    const imageEl = screen.getByAltText('orange 1');
    expect(imageEl).toHaveAttribute('src', '41BC/test/_63482861_orange1.jpg');
  });
});
