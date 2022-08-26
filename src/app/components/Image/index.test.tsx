import React from 'react';
import { render, act, screen } from '@testing-library/react';
import { css, Theme } from '@emotion/react';
import Image from '.';

describe('Image', () => {
  it('should preload when preload is true', () => {
    expect(true).toBe(false);
  });

  it('should not preload when preload is false', () => {
    expect(true).toBe(false);
  });

  it('should lazy load when lazy load is true', () => {
    expect(true).toBe(false);
  });

  it('should not lazy load when lazy load is false', () => {
    expect(true).toBe(false);
  });

  it('should be a responsive image', () => {
    render(
      <Image
        src="someSrc.jpeg"
        alt="imageAlt"
        originCode="cpsdevpb"
        locator="41BC/test/_63482861_orange1.jpg"
        originalImageWidth={500}
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
      />,
    );
    screen.debug();
    const imageEl = screen.getByAltText('imageAlt');
    expect(imageEl).toHaveAttribute(
      'srcset',
      'https://ichef.bbci.co.uk/news/200/cpsdevpb/41BC/test/_63482861_orange1.jpg.webp 200w, https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg.webp 500w',
    );
    expect(imageEl).toHaveAttribute('sizes', '(max-width: 600px) 480px, 800px');
  });

  it.only('should support jpeg images', () => {
    render(
      <Image
        src="someSrc.jpeg"
        alt="imageAlt"
        originCode="cpsdevpb"
        locator="41BC/test/_63482861_orange1.jpg"
        originalImageWidth={500}
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
      />,
    );
    screen.debug();

    const imageEl = screen.getByAltText('imageAlt');
    expect(imageEl?.parentNode?.children[1]).toHaveAttribute(
      'srcset',
      'https://ichef.bbci.co.uk/news/200/cpsdevpb/41BC/test/_63482861_orange1.jpg 200w, https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg 500w',
    );
  });

  it('should support webp images', () => {
    render(
      <Image
        src="someSrc.jpeg"
        alt="imageAlt"
        originCode="cpsdevpb"
        locator="41BC/test/_63482861_orange1.jpg"
        originalImageWidth={500}
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
      />,
    );
    screen.debug();

    const imageEl = screen.getByAltText('imageAlt');
    expect(imageEl?.parentNode?.firstChild).toHaveAttribute(
      'srcset',
      'https://ichef.bbci.co.uk/news/200/cpsdevpb/41BC/test/_63482861_orange1.jpg.webp 200w, https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg.webp 500w',
    );
  });

  it('should support AMP images', () => {
    render(
      <Image
        src="https://bbc.co.uk/iframe/amp"
        alt="imageAlt"
        originCode="cpsdevpb"
        locator="41BC/test/_63482861_orange1.jpg"
        originalImageWidth={500}
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
      />,
    );
    screen.debug();

    const imageEl = document.querySelector('img') as HTMLImageElement;
    expect(imageEl.src).toContain('https://bbc.co.uk/iframe/amp');
  });

  it('should support aspect ratio to prevent content layout shift', () => {
    expect(true).toBe(false);
  });

  it('should load a placeholder when the image has not yet loaded', () => {
    expect(true).toBe(false);
  });

  it('should render an alt tag', () => {
    render(<Image src="someSrc.jpeg" alt="imageAlt" />);
    expect(screen.getByAltText('imageAlt')).toBeInTheDocument();
  });

  it('should be able to apply custom styles', () => {
    expect(true).toBe(false);
  });

  it('should render the image', () => {
    expect(true).toBe(false);
  });
});
