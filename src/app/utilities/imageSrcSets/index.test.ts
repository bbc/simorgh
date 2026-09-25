import { Theme } from '@emotion/react';
import { GROUP_2_MAX_WIDTH } from '#app/components/ThemeProvider/mediaQueries';
import { createIchefSrcSet, createResponsiveSrcSet } from '.';

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
});

describe('createIchefSrcSet', () => {
  it('returns the prepared source URL and MIME data', () => {
    expect(
      createIchefSrcSet({
        originCode: 'cpsdevpb',
        locator: 'image.jpg',
        originalImageWidth: 640,
        srcResolution: 480,
      }),
    ).toMatchObject({
      src: 'https://ichef.bbci.co.uk/ace/ws/480/cpsdevpb/image.jpg.webp',
      primaryMimeType: 'image/webp',
      fallbackMimeType: 'image/jpeg',
    });
  });
});
