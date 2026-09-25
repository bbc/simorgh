import { Theme } from '@emotion/react';
import { GROUP_2_MAX_WIDTH } from '#app/components/ThemeProvider/mediaQueries';
import {
  createIchefSrcSet,
  createResponsiveSrcSet,
  getPlaceholderSrcSet,
} from '.';

describe('createResponsiveSrcSet', () => {
  const mq = { GROUP_2_MAX_WIDTH } as Theme['mq'];

  it('preserves the default four-width responsive output', () => {
    expect(
      createResponsiveSrcSet({
        imageUrlTemplate: 'https://ichef.test/{width}.jpg',
        mq,
      }),
    ).toEqual({
      sizes: '(max-width: 37.4375rem) 128px, 512px',
      srcSet:
        'https://ichef.test/128.jpg 128w, https://ichef.test/256.jpg 256w, https://ichef.test/512.jpg 512w, https://ichef.test/1024.jpg 1024w',
    });
  });

  it('supports a custom resolution ladder and sizes builder', () => {
    expect(
      createResponsiveSrcSet({
        imageUrlTemplate: 'https://ichef.test/{width}.jpg',
        mq,
        widths: [85, 120, 170],
        sizesBuilder: ({ widths }) => `${widths.join('|')}px`,
      }),
    ).toEqual({
      sizes: '85|120|170px',
      srcSet:
        'https://ichef.test/85.jpg 85w, https://ichef.test/120.jpg 120w, https://ichef.test/170.jpg 170w',
    });
  });

  it('requires at least three widths with the default sizes builder', () => {
    expect(() =>
      createResponsiveSrcSet({
        imageUrlTemplate: 'https://ichef.test/{width}.jpg',
        mq,
        widths: [85, 120],
      }),
    ).toThrow(
      'createResponsiveSrcSet requires at least three widths when using the default sizes builder.',
    );
  });
});

describe('createIchefSrcSet', () => {
  it('returns a srcset with the requested origin and locator', () => {
    expect(
      createIchefSrcSet({
        originCode: 'cpsdevpb',
        locator: 'testland.jpg',
        originalImageWidth: 1024,
      }),
    ).toEqual({
      src: undefined,
      primarySrcset:
        'https://ichef.bbci.co.uk/ace/ws/240/cpsdevpb/testland.jpg.webp 240w, https://ichef.bbci.co.uk/ace/ws/320/cpsdevpb/testland.jpg.webp 320w, https://ichef.bbci.co.uk/ace/ws/480/cpsdevpb/testland.jpg.webp 480w, https://ichef.bbci.co.uk/ace/ws/624/cpsdevpb/testland.jpg.webp 624w, https://ichef.bbci.co.uk/ace/ws/800/cpsdevpb/testland.jpg.webp 800w',
      primaryMimeType: 'image/webp',
      fallbackSrcset:
        'https://ichef.bbci.co.uk/ace/ws/240/cpsdevpb/testland.jpg 240w, https://ichef.bbci.co.uk/ace/ws/320/cpsdevpb/testland.jpg 320w, https://ichef.bbci.co.uk/ace/ws/480/cpsdevpb/testland.jpg 480w, https://ichef.bbci.co.uk/ace/ws/624/cpsdevpb/testland.jpg 624w, https://ichef.bbci.co.uk/ace/ws/800/cpsdevpb/testland.jpg 800w',
      fallbackMimeType: 'image/jpeg',
    });
  });

  it('includes the original width when it falls between resolutions', () => {
    expect(
      createIchefSrcSet({
        originCode: 'test',
        locator: 'testland.jpg',
        originalImageWidth: 640,
      }),
    ).toMatchObject({
      primarySrcset:
        'https://ichef.bbci.co.uk/ace/ws/240/test/testland.jpg.webp 240w, https://ichef.bbci.co.uk/ace/ws/320/test/testland.jpg.webp 320w, https://ichef.bbci.co.uk/ace/ws/480/test/testland.jpg.webp 480w, https://ichef.bbci.co.uk/ace/ws/624/test/testland.jpg.webp 624w, https://ichef.bbci.co.uk/ace/ws/640/test/testland.jpg.webp 640w',
      primaryMimeType: 'image/webp',
      fallbackSrcset:
        'https://ichef.bbci.co.uk/ace/ws/240/test/testland.jpg 240w, https://ichef.bbci.co.uk/ace/ws/320/test/testland.jpg 320w, https://ichef.bbci.co.uk/ace/ws/480/test/testland.jpg 480w, https://ichef.bbci.co.uk/ace/ws/624/test/testland.jpg 624w, https://ichef.bbci.co.uk/ace/ws/640/test/testland.jpg 640w',
      fallbackMimeType: 'image/jpeg',
    });
  });

  it('returns all default resolutions for a large image', () => {
    expect(
      createIchefSrcSet({
        originCode: 'cpsdevpb',
        locator: 'testland.jpg',
        originalImageWidth: 2048,
      }),
    ).toMatchObject({
      primarySrcset: expect.stringContaining(
        '800/cpsdevpb/testland.jpg.webp 800w',
      ),
      fallbackSrcset: expect.stringContaining('800/cpsdevpb/testland.jpg 800w'),
      primaryMimeType: 'image/webp',
      fallbackMimeType: 'image/jpeg',
    });
  });

  it('returns empty srcsets and null MIME types for a malformed width', () => {
    expect(
      createIchefSrcSet({
        originCode: 'cpsdevpb',
        locator: 'testland.jpg',
        originalImageWidth: 'width=2048' as unknown as number,
      }),
    ).toEqual({
      src: undefined,
      primarySrcset: '',
      primaryMimeType: null,
      fallbackSrcset: '',
      fallbackMimeType: null,
    });
  });

  it('returns srcsets without MIME types when the locator has no extension', () => {
    expect(
      createIchefSrcSet({
        originCode: 'cpsdevpb',
        locator: 'testland',
        originalImageWidth: 2048,
      }),
    ).toMatchObject({
      primaryMimeType: null,
      fallbackMimeType: null,
      primarySrcset: expect.stringContaining('800/cpsdevpb/testland 800w'),
      fallbackSrcset: expect.stringContaining('800/cpsdevpb/testland 800w'),
    });
  });

  it('returns no srcsets for PIPS images without a source resolution', () => {
    expect(
      createIchefSrcSet({
        originCode: 'pips',
        locator: 'https://ichef.bbci.co.uk/images/ic/1024x576/p01mt2kt.jpg',
        originalImageWidth: 1024,
      }),
    ).toEqual({
      src: undefined,
      primarySrcset: undefined,
      primaryMimeType: undefined,
      fallbackSrcset: undefined,
      fallbackMimeType: undefined,
    });
  });

  it('returns only the source URL for PIPS images', () => {
    expect(
      createIchefSrcSet({
        originCode: 'pips',
        locator: 'https://ichef.bbci.co.uk/images/ic/1024x576/p01mt2kt.jpg',
        originalImageWidth: 640,
        srcResolution: 480,
      }),
    ).toEqual({
      src: 'https://ichef.bbci.co.uk/images/ic/480xn/p01mt2kt.jpg.webp',
      primarySrcset: undefined,
      primaryMimeType: undefined,
      fallbackSrcset: undefined,
      fallbackMimeType: undefined,
    });
  });
});

describe('getPlaceholderSrcSet', () => {
  it('returns placeholder resolutions for an image', () => {
    expect(
      getPlaceholderSrcSet({
        locator: 'ichef.test.bbci.co.uk/images/ic/$widthxn/p01kdbpk.jpg',
        originCode: 'mpv',
      }),
    ).toBe(
      'https://ichef.test.bbci.co.uk/images/ic/240xn/p01kdbpk.jpg.webp 240w, https://ichef.test.bbci.co.uk/images/ic/320xn/p01kdbpk.jpg.webp 320w, https://ichef.test.bbci.co.uk/images/ic/480xn/p01kdbpk.jpg.webp 480w, https://ichef.test.bbci.co.uk/images/ic/624xn/p01kdbpk.jpg.webp 624w, https://ichef.test.bbci.co.uk/images/ic/800xn/p01kdbpk.jpg.webp 800w',
    );
  });

  it('returns placeholder resolutions for a PIPS image', () => {
    expect(
      getPlaceholderSrcSet({
        locator:
          'https://ichef.test.bbci.co.uk/images/ic/1024x576/p01mt2kt.jpg',
        originCode: 'pips',
      }),
    ).toBe(
      'https://ichef.test.bbci.co.uk/images/ic/240xn/p01mt2kt.jpg.webp 240w, https://ichef.test.bbci.co.uk/images/ic/320xn/p01mt2kt.jpg.webp 320w, https://ichef.test.bbci.co.uk/images/ic/480xn/p01mt2kt.jpg.webp 480w, https://ichef.test.bbci.co.uk/images/ic/624xn/p01mt2kt.jpg.webp 624w, https://ichef.test.bbci.co.uk/images/ic/800xn/p01mt2kt.jpg.webp 800w',
    );
  });
});
