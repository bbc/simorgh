import React from 'react';
import {
  render,
  screen,
  waitFor,
} from '../react-testing-library-with-providers';
import Image from '.';

describe('Image - Canonical', () => {
  it('should preload when preload is true', async () => {
    render(
      <Image
        alt="orange 1"
        originCode="cpsdevpb"
        src="41BC/test/_63482861_orange1.jpg"
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
        width={500}
        height={281}
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
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
        width={500}
        height={281}
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
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
        width={500}
        height={281}
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
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
        width={500}
        height={281}
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
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
        width={500}
        height={281}
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
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
        width={500}
        height={281}
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
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
        width={500}
        height={281}
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
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
        width={500}
        height={281}
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
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
        width={500}
        height={281}
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
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
        width={500}
        height={281}
      />,
    );

    const imageEl = screen.getByAltText('orange 1');
    expect(imageEl?.parentNode?.firstChild).toHaveAttribute(
      'srcset',
      'https://ichef.bbci.co.uk/news/200/cpsdevpb/41BC/test/_63482861_orange1.jpg.webp 200w, https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg.webp 500w',
    );
  });

  it('should render image with correct width and height attributes', () => {
    render(
      <Image
        alt="orange 1"
        originCode="cpsdevpb"
        src="41BC/test/_63482861_orange1.jpg"
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

  it('should render the image correctly with placeholder - container has a padding of the aspect ratio', () => {
    render(
      <Image
        alt="orange 1"
        originCode="cpsdevpb"
        src="41BC/test/_63482861_orange1.jpg"
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

  it('should render an image with an alt tag', () => {
    render(
      <Image
        alt="orange 1"
        originCode="cpsdevpb"
        src="41BC/test/_63482861_orange1.jpg"
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
        width={500}
        height={281}
      />,
    );
    expect(screen.getByAltText('orange 1')).toBeInTheDocument();
  });

  it('should match snapshot, specifically custom styles and placeholder image', () => {
    const { container } = render(
      <Image
        alt="orange 1"
        originCode="cpsdevpb"
        src="41BC/test/_63482861_orange1.jpg"
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
        width={500}
        height={281}
        css={{ position: 'relative' }}
      />,
    );
    expect(container).toMatchInlineSnapshot(`
      .emotion-0 {
        padding-bottom: 56.199999999999996%;
        position: relative;
        height: 0;
        overflow: hidden;
        position: relative;
      }

      .emotion-1 {
        background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSI0NzkiIGhlaWdodD0iMTM2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGcgZmlsbD0iI0Q1RDBDRCI+PGc+PHBhdGggZD0iTTQ0OS41NTYgOTEuNTUzbC0yLjMxIDEuNDFjLTExLjE2NyA2LjgxOC0yMy4zMTMgMTAuNDc0LTM0LjM0NiAxMC40Ny0yMy42MS0uMDktMzkuMTYzLTE0LjA4My0zOS4yMjctMzQuNDUzLjAzLTE5LjkxOCAxNi4yNy0zNC42NjMgMzguNjMzLTM0LjcxOCAxMS4zODcuMDEgMjEuNzAzIDIuOTU0IDMzLjk2MiA5LjY3MmwyLjI1MSAxLjI0di0xOC4xOWwtLjk2Mi0uMzc3Yy0xMy44MjQtNS40NTgtMjQuNTMtNy44OS0zNS4xMDMtNy44ODQtMTYuMzQ2LS4wMDYtMzAuNTMzIDUuMzk0LTQwLjYzNyAxNC41NTctMTAuMTA1IDkuMTYzLTE2LjEwNiAyMi4xMDItMTYuMDk5IDM2Ljk1My4wMDggMTAuMzQ4IDQuMjc5IDIyLjQ4IDEzLjQyIDMyLjEwNSA5LjEyMSA5LjYyOCAyMy4xNjUgMTYuNjQ4IDQyLjQzIDE2LjYzOWguMDYzYzE1Ljk4IDAgMjcuMDYyLTMuNTYzIDM3LjA3NC04LjQ5MmwuODUxLS40MTRWOTEuNTUzek0zMzQgMTM1LjY5N2gxNDQuMTk1VjBIMzM0djEzNS42OTd6Ii8+PHBhdGggZD0iTTI3Ni45MzcgODkuOTY4Yy4wNDEtMTIuMzMtOC4xNzEtMjEuNjk2LTIxLjMwOC0yNS4zIDMuNTQ0LTEuODA5IDYuMzUtNC4wMjMgOC40MDQtNi43MjcgMi43NS0zLjYyMiA0LjA2MS04LjA2NCA0LjA0Ni0xMy4yMzUuMDE1LTYuMzU5LTIuNDg2LTEyLjgzOS03Ljg1OC0xNy42ODctNS4zNzItNC44NDctMTMuNTI2LTcuOTk3LTI0LjY1NC03Ljk5MUgyMDQuODN2OTcuNzI4aDM2LjA3M2MxMi44NyAwIDIxLjkwNi0zLjQ4MiAyNy43MjItOC42NSA1LjgxOC01LjE1NSA4LjMyLTExLjkxIDguMzEyLTE4LjEzOHpNMTY3IDEzNS42OThoMTQ0LjE5N1YwSDE2N3YxMzUuNjk3eiIvPjxwYXRoIGQ9Ik0xMDkuOTM3IDg5Ljk2OGMuMDQxLTEyLjMzLTguMTcxLTIxLjY5Ni0yMS4zMDgtMjUuMyAzLjU0NC0xLjgwOSA2LjM1LTQuMDIzIDguNDA0LTYuNzI3IDIuNzUtMy42MjIgNC4wNjEtOC4wNjQgNC4wNDYtMTMuMjM1LjAxNS02LjM1OS0yLjQ4Ni0xMi44MzktNy44NTgtMTcuNjg3LTUuMzcyLTQuODQ3LTEzLjUyNi03Ljk5Ny0yNC42NTQtNy45OTFIMzcuODN2OTcuNzI4aDM2LjA3M2MxMi44NyAwIDIxLjkwNi0zLjQ4MiAyNy43MjItOC42NSA1LjgxOC01LjE1NSA4LjMyLTExLjkxIDguMzEyLTE4LjEzOHpNMCAxMzUuNjk4aDE0NC4xOTdWMEgwdjEzNS42OTd6Ii8+PHBhdGggZD0iTTI1OC42NjIgODguMTk4Yy0uMDEzIDMuMjI5LTEuMDA3IDYuNDc1LTMuODk2IDkuMDExLTIuODg0IDIuNTM3LTcuODczIDQuNDYzLTE2LjEzMyA0LjQ2M0gyMjJWNzVoMTUuODkzYzcuNDExIDAgMTIuNjcgMS41MDIgMTUuOTY1IDMuODUgMy4yODkgMi4zNjIgNC43NzYgNS40NjMgNC44MDQgOS4zNDgiLz48cGF0aCBkPSJNOTEuNjYyIDg4LjE5OGMtLjAxMyAzLjIyOS0xLjAwNyA2LjQ3NS0zLjg5NiA5LjAxMS0yLjg4NCAyLjUzNy03Ljg3NCA0LjQ2My0xNi4xMzMgNC40NjNINTVWNzVoMTUuODkyYzcuNDEyIDAgMTIuNjcyIDEuNTAyIDE1Ljk2NiAzLjg1IDMuMjg5IDIuMzYyIDQuNzc2IDUuNDYzIDQuODA0IDkuMzQ4Ii8+PHBhdGggZD0iTTI0NS4xODYgNTUuNzljMy4wOTYtMi4yMzcgNC41OS01LjM4NiA0LjYxMy0xMC4xMjQtLjAxNS0zLjI1LS45NDMtNi4wMzMtMy4yODEtOC4xMTEtMi4zNDYtMi4wNzgtNi4zMy0zLjU1NS0xMi43NTQtMy41NTVIMjIydjI1LjI3NWg4LjA3NmM2Ljk4OC4wMDQgMTEuOTk4LTEuMjQzIDE1LjExLTMuNDg2Ii8+PHBhdGggZD0iTTc4LjE4NiA1NS43OWMzLjA5Ni0yLjIzNyA0LjU5LTUuMzg2IDQuNjEzLTEwLjEyNC0uMDE1LTMuMjUtLjk0My02LjAzMy0zLjI4Mi04LjExMUM3Ny4xNzIgMzUuNDc3IDczLjE4OCAzNCA2Ni43NjQgMzRINTV2MjUuMjc1aDguMDc2YzYuOTg4LjAwNCAxMS45OTgtMS4yNDMgMTUuMTEtMy40ODYiLz48L2c+PC9nPjwvZz48L3N2Zz4K);
        background-color: #F2F2F2;
        -webkit-background-position: center center;
        background-position: center center;
        background-repeat: no-repeat;
        -webkit-background-size: 60px 17px;
        background-size: 60px 17px;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
      }

      @media (min-width: 25rem) {
        .emotion-1 {
          -webkit-background-size: 77px 22px;
          background-size: 77px 22px;
        }
      }

      @media (min-width: 63rem) {
        .emotion-1 {
          -webkit-background-size: 93px 27px;
          background-size: 93px 27px;
        }
      }

      .emotion-2 {
        width: 100%;
        height: 100%;
      }

      <div>
        <div
          class="emotion-0"
        >
          <div
            class="emotion-1"
          >
            <picture>
              <source
                sizes="(max-width: 600px) 480px, 800px"
                srcset="https://ichef.bbci.co.uk/news/200/cpsdevpb/41BC/test/_63482861_orange1.jpg.webp 200w, https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg.webp 500w"
                type="image/webp"
              />
              <source
                sizes="(max-width: 600px) 480px, 800px"
                srcset="https://ichef.bbci.co.uk/news/200/cpsdevpb/41BC/test/_63482861_orange1.jpg 200w, https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg 500w"
                type="image/jpeg"
              />
              <img
                alt="orange 1"
                class="emotion-2"
                height="281"
                src="41BC/test/_63482861_orange1.jpg"
                width="500"
              />
            </picture>
          </div>
        </div>
      </div>
    `);
  });

  it('should render the fallback image in the src attribute', () => {
    render(
      <Image
        alt="orange 1"
        originCode="cpsdevpb"
        src="41BC/test/_63482861_orange1.jpg"
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
        width={500}
        height={281}
      />,
    );
    const imageEl = screen.getByAltText('orange 1');
    expect(imageEl).toHaveAttribute('src', '41BC/test/_63482861_orange1.jpg');
  });
});

describe('Image - AMP pages', () => {
  it('should render an amp-img tag', () => {
    render(
      <Image
        alt="orange 1"
        originCode="cpsdevpb"
        src="41BC/test/_63482861_orange1.jpg"
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
        width={500}
        height={281}
        isAmp
      />,
    );

    const imageEls = screen.getAllByAltText('orange 1');
    expect(imageEls[0].nodeName).toBe('AMP-IMG');
    expect(imageEls[1].nodeName).toBe('AMP-IMG');
  });

  it('should render an amp-img tag with fallback image', () => {
    render(
      <Image
        alt="orange 1"
        originCode="cpsdevpb"
        src="41BC/test/_63482861_orange1.jpg"
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
        width={500}
        height={281}
        isAmp
      />,
    );

    const imageEls = screen.getAllByAltText('orange 1');
    expect(imageEls[1]).toHaveAttribute('fallback', '');
    expect(imageEls.length).toBe(2);
  });

  it('should support jpeg images', () => {
    render(
      <Image
        alt="orange 1"
        originCode="cpsdevpb"
        src="41BC/test/_63482861_orange1.jpg"
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
        width={500}
        height={281}
        isAmp
      />,
    );

    const imageEls = screen.getAllByAltText('orange 1');
    expect(imageEls[1]).toHaveAttribute('fallback', '');
    expect(imageEls[1]).toHaveAttribute(
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
        imageResolutions={[200, 500, 1000]}
        sizes="(max-width: 600px) 480px, 800px"
        width={500}
        height={281}
        isAmp
      />,
    );

    const imageEls = screen.getAllByAltText('orange 1');
    expect(imageEls[0]).not.toHaveAttribute('fallback', '');
    expect(imageEls[0]).toHaveAttribute(
      'srcset',
      'https://ichef.bbci.co.uk/news/200/cpsdevpb/41BC/test/_63482861_orange1.jpg.webp 200w, https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg.webp 500w',
    );
  });
});
