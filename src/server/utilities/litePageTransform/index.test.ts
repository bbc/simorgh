import { ReactElement } from 'react';
import litePageTransform from '.';

let helmetMetaTags = [] as unknown as ReactElement;
let helmetScriptTags = [] as unknown as ReactElement;
let helmetLinkTags = [] as unknown as ReactElement;

describe('litePageTransform', () => {
  beforeEach(() => {
    helmetMetaTags = [] as unknown as ReactElement;
    helmetScriptTags = [] as unknown as ReactElement;
    helmetLinkTags = [] as unknown as ReactElement;
  });

  it('should remove images with rel="preload" from the Helmet Link tags', () => {
    const html = '<html><head></head><body></body></html>';

    helmetLinkTags = [
      {
        key: '0',
        type: 'link',
        props: { rel: 'preload', as: 'image', href: '/image.jpg' },
      },
      {
        key: '1',
        type: 'link',
        props: { rel: 'manifest', href: '/manifest.json' },
      },
    ] as unknown as React.ReactElement;

    const result = litePageTransform({
      html,
      helmetMetaTags,
      helmetScriptTags,
      helmetLinkTags,
    });

    expect(result.liteHelmetLinkTags).toEqual([
      {
        key: '1',
        type: 'link',
        props: { rel: 'manifest', href: '/manifest.json' },
      },
    ]);
  });

  it('should remove script tags with src="vendor/require" from the Helmet Script tags', () => {
    const html = '<html><head></head><body></body></html>';

    helmetScriptTags = [
      {
        key: '0',
        type: 'script',
        props: { src: '/vendor/require.js' },
      },
      {
        key: '1',
        type: 'script',
        props: { src: '/analytics.js' },
      },
    ] as unknown as React.ReactElement;

    const result = litePageTransform({
      html,
      helmetMetaTags,
      helmetScriptTags,
      helmetLinkTags,
    });

    expect(result.liteHelmetScriptTags).toEqual([
      {
        key: '1',
        type: 'script',
        props: { src: '/analytics.js' },
      },
    ]);
  });

  it('should return Helmet Meta tags unchanged', () => {
    const html = '<html><head></head><body></body></html>';

    helmetMetaTags = [
      {
        key: '0',
        type: 'meta',
        props: { name: 'og:description', content: 'Some description' },
      },
      {
        key: '1',
        type: 'meta',
        props: { name: 'og:title', content: 'some, keywords' },
      },
    ] as unknown as React.ReactElement;

    const result = litePageTransform({
      html,
      helmetMetaTags,
      helmetScriptTags,
      helmetLinkTags,
    });

    expect(result.liteHelmetMetaTags).toEqual(helmetMetaTags);
  });

  it('should remove button elements', () => {
    const html =
      '<html><head></head><body><button>Click me</button></body></html>';

    const result = litePageTransform({
      html,
      helmetMetaTags,
      helmetScriptTags,
      helmetLinkTags,
    });

    expect(result.liteHtml).toEqual('<html><head></head><body></body></html>');
  });

  it('should remove figure and picture elements', () => {
    const html =
      '<html><head></head><body><figure><img src="image.jpg" alt="Image" /></figure><picture><img src="image.jpg" alt="Image" /></picture></body></html>';

    const result = litePageTransform({
      html,
      helmetMetaTags,
      helmetScriptTags,
      helmetLinkTags,
    });

    expect(result.liteHtml).toEqual('<html><head></head><body></body></html>');
  });

  it('should remove all images except for "analytics-pixel"', () => {
    const html =
      '<html><head></head><body><img src="image.jpg" alt="Image" /><img src="image.jpg" alt="Image" data-lite="analytics-pixel"></body></html>';

    const result = litePageTransform({
      html,
      helmetMetaTags,
      helmetScriptTags,
      helmetLinkTags,
    });

    expect(result.liteHtml).toEqual(
      '<html><head></head><body><img src="image.jpg" alt="Image" data-lite="analytics-pixel"></body></html>',
    );
  });

  it('should remove "include" elements', () => {
    const html =
      '<html><head></head><body><div><div id="include-1"></div></div></body></html>';

    const result = litePageTransform({
      html,
      helmetMetaTags,
      helmetScriptTags,
      helmetLinkTags,
    });

    expect(result.liteHtml).toEqual('<html><head></head><body></body></html>');
  });

  it('should remove "embed" elements', () => {
    const html =
      '<html><head></head><body><div><div data-e2e="embed"></div></div></body></html>';

    const result = litePageTransform({
      html,
      helmetMetaTags,
      helmetScriptTags,
      helmetLinkTags,
    });

    expect(result.liteHtml).toEqual('<html><head></head><body></body></html>');
  });

  it('should remove "VJ embed" elements', () => {
    const html =
      '<html><head></head><body><div><div id="responsive-embed"></div></div></body></html>';

    const result = litePageTransform({
      html,
      helmetMetaTags,
      helmetScriptTags,
      helmetLinkTags,
    });

    expect(result.liteHtml).toEqual('<html><head></head><body></body></html>');
  });

  it('should remove podcast promo elements', () => {
    const html =
      '<html><head></head><body><div><div aria-labelledby="podcast-promo"></div></div></body></html>';

    const result = litePageTransform({
      html,
      helmetMetaTags,
      helmetScriptTags,
      helmetLinkTags,
    });

    expect(result.liteHtml).toEqual('<html><head></head><body></body></html>');
  });
});
