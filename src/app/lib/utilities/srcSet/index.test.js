import { createSrcsets, getPlaceholderSrcSet } from '.';

describe('create srcset', () => {
  const srcsetScenarios = [
    {
      originCode: 'cpsdevpb',
      locator: 'testland.jpg',
      width: 1024,
      expected: {
        primarySrcset:
          'https://ichef.bbci.co.uk/ace/ws/240/cpsdevpb/testland.jpg.webp 240w, https://ichef.bbci.co.uk/ace/ws/320/cpsdevpb/testland.jpg.webp 320w, https://ichef.bbci.co.uk/ace/ws/480/cpsdevpb/testland.jpg.webp 480w, https://ichef.bbci.co.uk/ace/ws/624/cpsdevpb/testland.jpg.webp 624w, https://ichef.bbci.co.uk/ace/ws/800/cpsdevpb/testland.jpg.webp 800w',
        primaryMimeType: 'image/webp',
        fallbackSrcset:
          'https://ichef.bbci.co.uk/ace/ws/240/cpsdevpb/testland.jpg 240w, https://ichef.bbci.co.uk/ace/ws/320/cpsdevpb/testland.jpg 320w, https://ichef.bbci.co.uk/ace/ws/480/cpsdevpb/testland.jpg 480w, https://ichef.bbci.co.uk/ace/ws/624/cpsdevpb/testland.jpg 624w, https://ichef.bbci.co.uk/ace/ws/800/cpsdevpb/testland.jpg 800w',
        fallbackMimeType: 'image/jpeg',
      },
      summary:
        'should return a srcset with test in originCode and testland in location',
    },
    {
      originCode: 'pips',
      locator: 'testland.jpg',
      width: 1024,
      expected: { primarySrcset: undefined, fallbackSrcset: undefined },
      summary: 'should return null with pips originCode',
    },
    {
      originCode: 'test',
      locator: 'testland.jpg',
      width: 640,
      expected: {
        primarySrcset:
          'https://ichef.bbci.co.uk/ace/ws/240/test/testland.jpg.webp 240w, https://ichef.bbci.co.uk/ace/ws/320/test/testland.jpg.webp 320w, https://ichef.bbci.co.uk/ace/ws/480/test/testland.jpg.webp 480w, https://ichef.bbci.co.uk/ace/ws/624/test/testland.jpg.webp 624w, https://ichef.bbci.co.uk/ace/ws/640/test/testland.jpg.webp 640w',
        primaryMimeType: 'image/webp',
        fallbackSrcset:
          'https://ichef.bbci.co.uk/ace/ws/240/test/testland.jpg 240w, https://ichef.bbci.co.uk/ace/ws/320/test/testland.jpg 320w, https://ichef.bbci.co.uk/ace/ws/480/test/testland.jpg 480w, https://ichef.bbci.co.uk/ace/ws/624/test/testland.jpg 624w, https://ichef.bbci.co.uk/ace/ws/640/test/testland.jpg 640w',
        fallbackMimeType: 'image/jpeg',
      },
      summary:
        'width of 640 should return srcset with maximum allowed size of 640',
    },
    {
      originCode: 'cpsdevpb',
      locator: 'testland.jpg',
      width: 2048,
      expected: {
        primarySrcset:
          'https://ichef.bbci.co.uk/ace/ws/240/cpsdevpb/testland.jpg.webp 240w, https://ichef.bbci.co.uk/ace/ws/320/cpsdevpb/testland.jpg.webp 320w, https://ichef.bbci.co.uk/ace/ws/480/cpsdevpb/testland.jpg.webp 480w, https://ichef.bbci.co.uk/ace/ws/624/cpsdevpb/testland.jpg.webp 624w, https://ichef.bbci.co.uk/ace/ws/800/cpsdevpb/testland.jpg.webp 800w',
        primaryMimeType: 'image/webp',
        fallbackSrcset:
          'https://ichef.bbci.co.uk/ace/ws/240/cpsdevpb/testland.jpg 240w, https://ichef.bbci.co.uk/ace/ws/320/cpsdevpb/testland.jpg 320w, https://ichef.bbci.co.uk/ace/ws/480/cpsdevpb/testland.jpg 480w, https://ichef.bbci.co.uk/ace/ws/624/cpsdevpb/testland.jpg 624w, https://ichef.bbci.co.uk/ace/ws/800/cpsdevpb/testland.jpg 800w',
        fallbackMimeType: 'image/jpeg',
      },
      summary: 'width of 2048 should return all default srcset values',
    },
    {
      originCode: 'cpsdevpb',
      locator: 'testland.jpg',
      width: 2048,
      expected: {
        primarySrcset:
          'https://ichef.bbci.co.uk/ace/ws/240/cpsdevpb/testland.jpg.webp 240w, https://ichef.bbci.co.uk/ace/ws/320/cpsdevpb/testland.jpg.webp 320w, https://ichef.bbci.co.uk/ace/ws/480/cpsdevpb/testland.jpg.webp 480w, https://ichef.bbci.co.uk/ace/ws/624/cpsdevpb/testland.jpg.webp 624w, https://ichef.bbci.co.uk/ace/ws/800/cpsdevpb/testland.jpg.webp 800w',
        primaryMimeType: 'image/webp',
        fallbackSrcset:
          'https://ichef.bbci.co.uk/ace/ws/240/cpsdevpb/testland.jpg 240w, https://ichef.bbci.co.uk/ace/ws/320/cpsdevpb/testland.jpg 320w, https://ichef.bbci.co.uk/ace/ws/480/cpsdevpb/testland.jpg 480w, https://ichef.bbci.co.uk/ace/ws/624/cpsdevpb/testland.jpg 624w, https://ichef.bbci.co.uk/ace/ws/800/cpsdevpb/testland.jpg 800w',
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
    {
      originCode: 'cpsdevpb',
      locator: 'testland',
      width: 2048,
      expected: {
        primarySrcset:
          'https://ichef.bbci.co.uk/ace/ws/240/cpsdevpb/testland 240w, https://ichef.bbci.co.uk/ace/ws/320/cpsdevpb/testland 320w, https://ichef.bbci.co.uk/ace/ws/480/cpsdevpb/testland 480w, https://ichef.bbci.co.uk/ace/ws/624/cpsdevpb/testland 624w, https://ichef.bbci.co.uk/ace/ws/800/cpsdevpb/testland 800w',
        primaryMimeType: null,
        fallbackSrcset:
          'https://ichef.bbci.co.uk/ace/ws/240/cpsdevpb/testland 240w, https://ichef.bbci.co.uk/ace/ws/320/cpsdevpb/testland 320w, https://ichef.bbci.co.uk/ace/ws/480/cpsdevpb/testland 480w, https://ichef.bbci.co.uk/ace/ws/624/cpsdevpb/testland 624w, https://ichef.bbci.co.uk/ace/ws/800/cpsdevpb/testland 800w',
        fallbackMimeType: null,
      },
      summary:
        'should return no file extension when none on locator and no MIME types',
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
        'https://ichef.test.bbci.co.uk/images/ic/240xn/p01kdbpk.jpg.webp 240w, https://ichef.test.bbci.co.uk/images/ic/320xn/p01kdbpk.jpg.webp 320w, https://ichef.test.bbci.co.uk/images/ic/480xn/p01kdbpk.jpg.webp 480w, https://ichef.test.bbci.co.uk/images/ic/624xn/p01kdbpk.jpg.webp 624w, https://ichef.test.bbci.co.uk/images/ic/800xn/p01kdbpk.jpg.webp 800w',
      summary: 'should placeholder image with srcset',
    },
    {
      locator: 'https://ichef.test.bbci.co.uk/images/ic/1024x576/p01mt2kt.jpg',
      originCode: 'pips',
      expected:
        'https://ichef.test.bbci.co.uk/images/ic/240xn/p01mt2kt.jpg.webp 240w, https://ichef.test.bbci.co.uk/images/ic/320xn/p01mt2kt.jpg.webp 320w, https://ichef.test.bbci.co.uk/images/ic/480xn/p01mt2kt.jpg.webp 480w, https://ichef.test.bbci.co.uk/images/ic/624xn/p01mt2kt.jpg.webp 624w, https://ichef.test.bbci.co.uk/images/ic/800xn/p01mt2kt.jpg.webp 800w',
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
