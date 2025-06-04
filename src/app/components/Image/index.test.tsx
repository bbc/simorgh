import React from 'react';
import { JSDOM } from 'jsdom';

import {
  render,
  screen,
  waitFor,
} from '../react-testing-library-with-providers';
import Image from '.';
import BASE64_PLACEHOLDER_IMAGE from './base64Placeholder';

import { SHADOW } from '../ThemeProvider/palette';

const removeStyles = (el: HTMLElement) => {
  const dom = new JSDOM(el.innerHTML.replace(/class=".+?"/gm, ''));

  return dom.window.document.body.firstChild;
};

const Fixture = ({ ...props }) => (
  <Image
    alt="Test image alt text"
    src="/test-image-500.jpg.webp"
    srcSet="/test-image-200.webp 200w, /test-image-500.webp 500w"
    mediaType="image/webp"
    fallbackSrcSet="/test-image-200.jpg 200w, /test-image-500.jpg 500w"
    fallbackMediaType="image/jpeg"
    sizes="(max-width: 600px) 480px, 800px"
    width={500}
    height={281}
    {...props}
  />
);

describe('Image - Canonical', () => {
  it('should preload when preload is true', async () => {
    render(<Fixture preload />);

    await waitFor(() => {
      const linkEl = document.head.querySelector('link');

      expect(linkEl).toHaveAttribute('rel', 'preload');
      expect(linkEl).toHaveAttribute('as', 'image');
      expect(linkEl).toHaveAttribute('href', '/test-image-500.jpg.webp');
      expect(linkEl).toHaveAttribute(
        'imagesrcset',
        '/test-image-200.webp 200w, /test-image-500.webp 500w',
      );
      expect(linkEl).toHaveAttribute(
        'imagesizes',
        '(max-width: 600px) 480px, 800px',
      );
    });
  });

  it('should not preload when preload is false', async () => {
    render(<Fixture preload={false} />);

    await waitFor(() => {
      const linkEl = document.head.querySelector('link');

      expect(linkEl).not.toBeInTheDocument();
    });
  });

  it('should not preload by default', async () => {
    render(<Fixture />);

    await waitFor(() => {
      const linkEl = document.head.querySelector('link');

      expect(linkEl).not.toBeInTheDocument();
    });
  });

  it('should lazy load when lazy load is true', () => {
    render(<Fixture lazyLoad />);

    const imageEl = screen.getByAltText('Test image alt text');
    expect(imageEl).toHaveAttribute('loading', 'lazy');
  });

  it('should not lazy load when lazy load is false', () => {
    render(<Fixture lazyLoad={false} />);

    const imageEl = screen.getByAltText('Test image alt text');
    expect(imageEl).not.toHaveAttribute('loading', 'lazy');
  });

  it('should not lazy load by default', () => {
    render(<Fixture />);

    const imageEl = screen.getByAltText('Test image alt text');
    expect(imageEl).not.toHaveAttribute('loading', 'lazy');
  });

  it('should render the primary srcset and sizes', () => {
    render(<Fixture />);

    const sourceEl = screen.getByAltText('Test image alt text');
    expect(sourceEl).toHaveAttribute(
      'srcset',
      '/test-image-200.webp 200w, /test-image-500.webp 500w',
    );
    expect(sourceEl).toHaveAttribute(
      'sizes',
      '(max-width: 600px) 480px, 800px',
    );
  });

  it('should render image with correct width and height attributes', () => {
    render(<Fixture />);

    const imageEl = screen.getByAltText('Test image alt text');
    expect(imageEl).toHaveAttribute('width', '500');
    expect(imageEl).toHaveAttribute('height', '281');
  });

  it('should render an image with an alt tag', () => {
    render(<Fixture />);
    expect(screen.getByAltText('Test image alt text')).toBeInTheDocument();
  });

  it('should render a placeholder image by default', () => {
    render(<Fixture />);
    const imageEl = screen.getByAltText('Test image alt text');
    expect(imageEl.parentNode).toHaveStyle({
      backgroundImage: `url(${BASE64_PLACEHOLDER_IMAGE})`,
    });
  });

  it('should render a placeholder image when placeholder is true', () => {
    render(<Fixture />);
    const imageEl = screen.getByAltText('Test image alt text');
    expect(imageEl.parentNode).toHaveStyle({
      backgroundImage: `url(${BASE64_PLACEHOLDER_IMAGE})`,
    });
  });

  it('should render a placeholder image when placeholder is true', () => {
    render(<Fixture darkPlaceholder />);
    const imageEl = screen.getByAltText('Test image alt text');
    expect(imageEl.parentNode).toHaveStyle({
      backgroundImage: `url(${BASE64_PLACEHOLDER_IMAGE})`,
      backgroundColor: SHADOW,
    });
  });

  it('should not render a placeholder image when placeholder is false', () => {
    render(<Fixture placeholder={false} />);
    const imageEl = screen.getByAltText('Test image alt text');
    expect(imageEl.parentNode).not.toHaveStyle({
      backgroundImage: `url(${BASE64_PLACEHOLDER_IMAGE})`,
    });
  });

  it('should render the container with an aspect ratio based on width and height', () => {
    render(<Fixture />);

    const imageEl = screen.getByAltText('Test image alt text');
    expect(imageEl.parentNode).toHaveStyle({
      paddingBottom: '56.2%',
    });
  });

  it('should render the container with no fixed aspect ratio if no width, height or aspect ratio is provided', () => {
    render(<Fixture width={undefined} height={undefined} />);

    const imageEl = screen.getByAltText('Test image alt text');

    expect(imageEl.parentNode).toHaveStyle({
      paddingBottom: '0',
    });
  });

  it('should render the container with a custom aspect ratio when provided', () => {
    render(
      <Fixture aspectRatio={[4, 3]} width={undefined} height={undefined} />,
    );

    const imageEl = screen.getByAltText('Test image alt text');

    expect(imageEl.parentNode).toHaveStyle({
      paddingBottom: '75%',
    });
  });

  it('should render the container with a custom aspect ratio that overrides aspect ratio based on image width and height', () => {
    render(<Fixture aspectRatio={[4, 3]} />);

    const imageEl = screen.getByAltText('Test image alt text');

    expect(imageEl.parentNode).toHaveStyle({
      paddingBottom: '75%',
    });
  });

  it('should match markup for basic image', () => {
    const { container } = render(
      <Image
        alt="Test image alt text"
        src="/test-image-500.jpg"
        aspectRatio={[16, 9]}
      />,
    );

    expect(removeStyles(container)).toMatchInlineSnapshot(`
<div
  style="padding-bottom: 56.25%; overflow: hidden;"
>
  <img
    alt="Test image alt text"
    loading="eager"
    src="/test-image-500.jpg"
  />
</div>
`);
  });

  it('should match markup for a responsive image', () => {
    const { container } = render(
      <Image
        alt="Test image alt text"
        src="/test-image-500.jpg.webp"
        srcSet="/test-image-200.jpg.webp 200w, /test-image-500.jpg.webp 500w"
        aspectRatio={[16, 9]}
      />,
    );

    expect(removeStyles(container)).toMatchInlineSnapshot(`
      <div
        style="padding-bottom: 56.25%; overflow: hidden;"
      >
        <img
          alt="Test image alt text"
          loading="eager"
          src="/test-image-500.jpg.webp"
          srcset="/test-image-200.jpg.webp 200w, /test-image-500.jpg.webp 500w"
        />
      </div>
    `);
  });
});

describe('Image - AMP pages', () => {
  it('should preload when preload is true', async () => {
    render(<Fixture isAmp preload />);

    await waitFor(() => {
      const linkEl = document.head.querySelector('link');

      expect(linkEl).toHaveAttribute('rel', 'preload');
      expect(linkEl).toHaveAttribute('as', 'image');
      expect(linkEl).toHaveAttribute('href', '/test-image-500.jpg.webp');
      expect(linkEl).toHaveAttribute(
        'imagesrcset',
        '/test-image-200.webp 200w, /test-image-500.webp 500w',
      );
      expect(linkEl).toHaveAttribute(
        'imagesizes',
        '(max-width: 600px) 480px, 800px',
      );
    });
  });

  it('should not preload when preload is false', async () => {
    render(<Fixture isAmp preload={false} />);

    await waitFor(() => {
      const linkEl = document.head.querySelector('link');

      expect(linkEl).not.toBeInTheDocument();
    });
  });

  it('should not preload by default', async () => {
    render(<Fixture isAmp />);

    await waitFor(() => {
      const linkEl = document.head.querySelector('link');

      expect(linkEl).not.toBeInTheDocument();
    });
  });

  it('should render 2 nested amp-img tags both with alt text', () => {
    render(<Fixture isAmp />);

    const imageEls = screen.getAllByAltText('Test image alt text');
    expect(imageEls.length).toBe(1);
    expect(imageEls[0].nodeName).toBe('AMP-IMG');
  });

  it('should render jpg image', () => {
    render(<Fixture isAmp />);

    const imageEls = screen.getAllByAltText('Test image alt text');
    expect(imageEls[0]).toHaveAttribute(
      'srcset',
      '/test-image-200.webp 200w, /test-image-500.webp 500w',
    );
  });

  it('should render image with correct width and height attributes', () => {
    render(<Fixture isAmp />);

    const imageEl = screen.getAllByAltText('Test image alt text');
    expect(imageEl[0]).toHaveAttribute('width', '500');
    expect(imageEl[0]).toHaveAttribute('height', '281');
  });

  it('should render a placeholder image by default', () => {
    render(<Fixture isAmp />);
    const imageEl = screen.getAllByAltText('Test image alt text')[0];

    expect(imageEl.parentNode).toHaveStyle({
      backgroundImage: `url(${BASE64_PLACEHOLDER_IMAGE})`,
    });
  });

  it('should render a placeholder image when placeholder is true', () => {
    render(<Fixture isAmp />);
    const imageEl = screen.getAllByAltText('Test image alt text')[0];
    expect(imageEl.parentNode).toHaveStyle({
      backgroundImage: `url(${BASE64_PLACEHOLDER_IMAGE})`,
    });
  });

  it('should render a dark placeholder image when darkPlaceholder is true', () => {
    render(<Fixture isAmp darkPlaceholder />);
    const imageEl = screen.getAllByAltText('Test image alt text')[0];
    expect(imageEl.parentNode).toHaveStyle({
      backgroundImage: `url(${BASE64_PLACEHOLDER_IMAGE})`,
      backgroundColor: SHADOW,
    });
  });

  it('should not render a placeholder image when placeholder is false', () => {
    render(<Fixture placeholder={false} isAmp />);
    const imageEl = screen.getAllByAltText('Test image alt text')[0];
    expect(imageEl.parentNode).not.toHaveStyle({
      backgroundImage: `url(${BASE64_PLACEHOLDER_IMAGE})`,
    });
  });

  it('should render the container with an aspect ratio based on width and height', () => {
    render(<Fixture isAmp />);

    const imageEl = screen.getAllByAltText('Test image alt text')[0];

    expect(imageEl.parentNode).toHaveStyle({
      paddingBottom: '56.2%',
    });
  });

  it('should render the container with no fixed aspect ratio if no width, height or aspect ratio is provided', () => {
    render(<Fixture width={undefined} height={undefined} isAmp />);

    const imageEl = screen.getAllByAltText('Test image alt text')[0];

    expect(imageEl.parentNode).toHaveStyle({
      paddingBottom: 0,
    });
  });

  it('should render the container with a custom aspect ratio when provided', () => {
    render(
      <Fixture
        aspectRatio={[4, 3]}
        width={undefined}
        height={undefined}
        isAmp
      />,
    );

    const imageEl = screen.getAllByAltText('Test image alt text')[0];

    expect(imageEl.parentNode).toHaveStyle({
      paddingBottom: '75%',
    });
  });

  it('should render the container with a custom aspect ratio that overrides aspect ratio based on image width and height', () => {
    render(<Fixture aspectRatio={[4, 3]} isAmp />);

    const imageEl = screen.getAllByAltText('Test image alt text')[0];

    expect(imageEl.parentNode).toHaveStyle({
      paddingBottom: '75%',
    });
  });

  it('should match markup for basic image', () => {
    const { container } = render(
      <Image
        isAmp
        alt="Test image alt text"
        src="/test-image-500.jpg"
        aspectRatio={[16, 9]}
      />,
    );

    expect(removeStyles(container)).toMatchInlineSnapshot(`
<div
  style="padding-bottom: 56.25%; overflow: hidden;"
>
  <amp-img
    alt="Test image alt text"
    fallback=""
    layout="fill"
    src="/test-image-500.jpg"
  />
</div>
`);
  });

  it('should match markup for a responsive image', () => {
    const { container } = render(
      <Image
        isAmp
        alt="Test image alt text"
        src="/test-image-500.jpg"
        srcSet="/test-image-200.jpg 200w, /test-image-500.jpg 500w"
        aspectRatio={[16, 9]}
      />,
    );

    expect(removeStyles(container)).toMatchInlineSnapshot(`
<div
  style="padding-bottom: 56.25%; overflow: hidden;"
>
  <amp-img
    alt="Test image alt text"
    fallback=""
    layout="fill"
    src="/test-image-500.jpg"
    srcset="/test-image-200.jpg 200w, /test-image-500.jpg 500w"
  />
</div>
`);
  });

  it('should match markup for a responsive jpg image', () => {
    const { container } = render(
      <Image
        isAmp
        alt="Test image alt text"
        src="/test-image-500.webp"
        srcSet="/test-image-200.webp 200w, /test-image-500.webp 500w"
        sizes="(max-width: 600px) 480px, 800px"
        mediaType="image/webp"
        fallbackSrcSet="/test-image-200.jpg 200w, /test-image-500.jpg 500w"
        fallbackMediaType="image/jpeg"
        aspectRatio={[16, 9]}
      />,
    );

    expect(removeStyles(container)).toMatchInlineSnapshot(`
<div
  style="padding-bottom: 56.25%; overflow: hidden;"
>
  <amp-img
    alt="Test image alt text"
    fallback=""
    layout="fill"
    sizes="(max-width: 600px) 480px, 800px"
    src="/test-image-500.webp"
    srcset="/test-image-200.webp 200w, /test-image-500.webp 500w"
  />
</div>
`);
  });
});
