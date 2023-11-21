import { createSrcsets, getPlaceholderSrcSet } from '.';

describe('create srcset', () => {
  const srcsetScenarios = [
    {
      originCode: 'cpsdevpb',
      locator: 'testland',
      width: 1024,
      expected: {
        primarySrcset:
          'https://ichef.bbci.co.uk/news/240/cpsdevpb/testland.webp 240w, https://ichef.bbci.co.uk/news/320/cpsdevpb/testland.webp 320w, https://ichef.bbci.co.uk/news/480/cpsdevpb/testland.webp 480w, https://ichef.bbci.co.uk/news/624/cpsdevpb/testland.webp 624w, https://ichef.bbci.co.uk/news/800/cpsdevpb/testland.webp 800w',
        primaryMimeType: 'image/webp',
        fallbackSrcset:
          'https://ichef.bbci.co.uk/news/240/cpsdevpb/testland 240w, https://ichef.bbci.co.uk/news/320/cpsdevpb/testland 320w, https://ichef.bbci.co.uk/news/480/cpsdevpb/testland 480w, https://ichef.bbci.co.uk/news/624/cpsdevpb/testland 624w, https://ichef.bbci.co.uk/news/800/cpsdevpb/testland 800w',
        fallbackMimeType: null,
      },
      summary:
        'should return a srcset with test in originCode and testland in location',
    },
    {
      originCode: 'pips',
      locator: 'testland',
      width: 1024,
      expected: { primarySrcset: null, fallbackSrcset: null },
      summary: 'should return null with pips originCode',
    },
    {
      originCode: 'test',
      locator: 'testland',
      width: 640,
      expected: {
        primarySrcset:
          'https://ichef.bbci.co.uk/news/240/test/testland 240w, https://ichef.bbci.co.uk/news/320/test/testland 320w, https://ichef.bbci.co.uk/news/480/test/testland 480w, https://ichef.bbci.co.uk/news/624/test/testland 624w, https://ichef.bbci.co.uk/news/640/test/testland 640w',
        primaryMimeType: null,
        fallbackSrcset:
          'https://ichef.bbci.co.uk/news/240/test/testland 240w, https://ichef.bbci.co.uk/news/320/test/testland 320w, https://ichef.bbci.co.uk/news/480/test/testland 480w, https://ichef.bbci.co.uk/news/624/test/testland 624w, https://ichef.bbci.co.uk/news/640/test/testland 640w',
        fallbackMimeType: null,
      },
      summary:
        'width of 640 should return srcset with maximum allowed size of 640',
    },
    {
      originCode: 'cpsdevpb',
      locator: 'testland',
      width: 2048,
      expected: {
        primarySrcset:
          'https://ichef.bbci.co.uk/news/240/cpsdevpb/testland.webp 240w, https://ichef.bbci.co.uk/news/320/cpsdevpb/testland.webp 320w, https://ichef.bbci.co.uk/news/480/cpsdevpb/testland.webp 480w, https://ichef.bbci.co.uk/news/624/cpsdevpb/testland.webp 624w, https://ichef.bbci.co.uk/news/800/cpsdevpb/testland.webp 800w',
        primaryMimeType: 'image/webp',
        fallbackSrcset:
          'https://ichef.bbci.co.uk/news/240/cpsdevpb/testland 240w, https://ichef.bbci.co.uk/news/320/cpsdevpb/testland 320w, https://ichef.bbci.co.uk/news/480/cpsdevpb/testland 480w, https://ichef.bbci.co.uk/news/624/cpsdevpb/testland 624w, https://ichef.bbci.co.uk/news/800/cpsdevpb/testland 800w',
        fallbackMimeType: null,
      },
      summary: 'width of 2048 should return all default srcset values',
    },
    {
      originCode: 'cpsdevpb',
      locator: 'testland.jpg',
      width: 2048,
      expected: {
        primarySrcset:
          'https://ichef.bbci.co.uk/news/240/cpsdevpb/testland.jpg.webp 240w, https://ichef.bbci.co.uk/news/320/cpsdevpb/testland.jpg.webp 320w, https://ichef.bbci.co.uk/news/480/cpsdevpb/testland.jpg.webp 480w, https://ichef.bbci.co.uk/news/624/cpsdevpb/testland.jpg.webp 624w, https://ichef.bbci.co.uk/news/800/cpsdevpb/testland.jpg.webp 800w',
        primaryMimeType: 'image/webp',
        fallbackSrcset:
          'https://ichef.bbci.co.uk/news/240/cpsdevpb/testland.jpg 240w, https://ichef.bbci.co.uk/news/320/cpsdevpb/testland.jpg 320w, https://ichef.bbci.co.uk/news/480/cpsdevpb/testland.jpg 480w, https://ichef.bbci.co.uk/news/624/cpsdevpb/testland.jpg 624w, https://ichef.bbci.co.uk/news/800/cpsdevpb/testland.jpg 800w',
        fallbackMimeType: 'image/jpeg',
      },
      summary: 'should set mime types of both srcsets',
    },
    {
      originCode: 'cpsdevpb',
      locator: 'testland.jpg',
      width: 'width=2048',
      expected: {
        primarySrcset: '',
        primaryMimeType: null,
        fallbackSrcset: '',
        fallbackMimeType: null,
      },
      summary:
        'should return empty srcsets and null for mime types if the srcsets are malformed',
    },
  ];

  srcsetScenarios.forEach(
    ({ originCode, locator, width, expected, summary }) => {
      it(summary, () => {
        const {
          primarySrcset,
          primaryMimeType,
          fallbackSrcset,
          fallbackMimeType,
        } = createSrcsets({
          originCode,
          locator,
          originalImageWidth: width,
        });
        expect(primarySrcset).toEqual(expected.primarySrcset);
        expect(primaryMimeType).toEqual(expected.primaryMimeType);
        expect(fallbackSrcset).toEqual(expected.fallbackSrcset);
        expect(fallbackMimeType).toEqual(expected.fallbackMimeType);
      });
    },
  );
});

describe('Placeholder srcset', () => {
  const placeholderSrcsetScenario = [
    {
      locator: 'ichef.test.bbci.co.uk/images/ic/$widthxn/p01kdbpk.jpg',
      originCode: 'mpv',
      expected:
        'https://ichef.test.bbci.co.uk/images/ic/240xn/p01kdbpk.jpg 240w, https://ichef.test.bbci.co.uk/images/ic/320xn/p01kdbpk.jpg 320w, https://ichef.test.bbci.co.uk/images/ic/480xn/p01kdbpk.jpg 480w, https://ichef.test.bbci.co.uk/images/ic/624xn/p01kdbpk.jpg 624w, https://ichef.test.bbci.co.uk/images/ic/800xn/p01kdbpk.jpg 800w',
      summary: 'should placeholder image with srcset',
    },
    {
      locator: 'https://ichef.test.bbci.co.uk/images/ic/1024x576/p01mt2kt.jpg',
      originCode: 'pips',
      expected:
        'https://ichef.test.bbci.co.uk/images/ic/240xn/p01mt2kt.jpg 240w, https://ichef.test.bbci.co.uk/images/ic/320xn/p01mt2kt.jpg 320w, https://ichef.test.bbci.co.uk/images/ic/480xn/p01mt2kt.jpg 480w, https://ichef.test.bbci.co.uk/images/ic/624xn/p01mt2kt.jpg 624w, https://ichef.test.bbci.co.uk/images/ic/800xn/p01mt2kt.jpg 800w',
      summary:
        'should placeholder image with srcset if size already set and originCode pips',
    },
  ];
  placeholderSrcsetScenario.forEach(
    ({ locator, originCode, expected, summary }) => {
      it(summary, () => {
        expect(getPlaceholderSrcSet({ locator, originCode })).toEqual(expected);
      });
    },
  );
});
