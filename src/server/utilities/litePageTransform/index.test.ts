import litePageTransform from '.';

let helmetMetaTags: React.ReactElement[] = [];
let helmetScriptTags: React.ReactElement[] = [];
let helmetLinkTags: React.ReactElement[] = [];

describe('litePageTransform', () => {
  beforeEach(() => {
    helmetMetaTags = [];
    helmetScriptTags = [];
    helmetLinkTags = [];
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
    ];

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
    ];

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

  it('should remove all style tags and inline style attributes', () => {
    const html =
      '<html><head><style></style></head><body><div style="padding-top:10px;"></div></body></html>';

    const result = litePageTransform({
      html,
      helmetMetaTags,
      helmetScriptTags,
      helmetLinkTags,
    });

    expect(result.liteHtml).toEqual(
      '<html><head></head><body><div></div></body></html>',
    );
  });

  it('should remove all class names except those in defined in "classNamesToKeep" array', () => {
    const html =
      '<html><head></head><body><div class="visuallyHiddenText"></div><div class="skipLink"></div><div class="lite-switcher"></div><div class="analytics-pixel"></div><div class="extra-class"></div></body></html>';

    const result = litePageTransform({
      html,
      helmetMetaTags,
      helmetScriptTags,
      helmetLinkTags,
    });

    expect(result.liteHtml).toEqual(
      '<html><head></head><body><div class="visuallyHiddenText"></div><div class="skipLink"></div><div class="lite-switcher"></div><div class="analytics-pixel"></div><div></div></body></html>',
    );
  });
});
