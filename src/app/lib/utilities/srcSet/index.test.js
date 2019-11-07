import { createSrcset, getPlaceholderSrcSet } from '.';

describe('create srcset', () => {
  const srcsetScenarios = [
    {
      originCode: 'test',
      location: 'testland',
      width: 1024,
      expected:
        'https://ichef.bbci.co.uk/news/240/test/testland 240w, https://ichef.bbci.co.uk/news/320/test/testland 320w, https://ichef.bbci.co.uk/news/480/test/testland 480w, https://ichef.bbci.co.uk/news/624/test/testland 624w, https://ichef.bbci.co.uk/news/800/test/testland 800w',
      summary:
        'should return a srcset with test in originCode and testland in location',
    },
    {
      originCode: 'pips',
      location: 'testland',
      width: 1024,
      expected: null,
      summary: 'should return null with pips originCode',
    },
    {
      originCode: 'test',
      location: 'testland',
      width: 640,
      expected:
        'https://ichef.bbci.co.uk/news/240/test/testland 240w, https://ichef.bbci.co.uk/news/320/test/testland 320w, https://ichef.bbci.co.uk/news/480/test/testland 480w, https://ichef.bbci.co.uk/news/624/test/testland 624w, https://ichef.bbci.co.uk/news/640/test/testland 640w',
      summary:
        'width of 640 should return srcset with maximum allowed size of 640',
    },
    {
      originCode: 'test',
      location: 'testland',
      width: 2048,
      expected:
        'https://ichef.bbci.co.uk/news/240/test/testland 240w, https://ichef.bbci.co.uk/news/320/test/testland 320w, https://ichef.bbci.co.uk/news/480/test/testland 480w, https://ichef.bbci.co.uk/news/624/test/testland 624w, https://ichef.bbci.co.uk/news/800/test/testland 800w',
      summary: 'width of 2048 should return all default srcset values',
    },
  ];

  srcsetScenarios.forEach(
    ({ originCode, location, width, expected, summary }) => {
      it(summary, () => {
        const srcset = createSrcset(originCode, location, width);
        expect(srcset).toEqual(expected);
      });
    },
  );
});

describe('Placeholder srcset', () => {
  const locator = 'ichef.test.bbci.co.uk/images/ic/$widthxn/p01kdbpk.jpg';
  const originCode = 'mpv';
  const expected =
    'https://ichef.test.bbci.co.uk/images/ic/240xn/p01kdbpk.jpg 240w, https://ichef.test.bbci.co.uk/images/ic/320xn/p01kdbpk.jpg 320w, https://ichef.test.bbci.co.uk/images/ic/480xn/p01kdbpk.jpg 480w, https://ichef.test.bbci.co.uk/images/ic/624xn/p01kdbpk.jpg 624w, https://ichef.test.bbci.co.uk/images/ic/800xn/p01kdbpk.jpg 800w';
  it('should placeholder image with srcset', () => {
    const placeholderSrcset = getPlaceholderSrcSet({ locator, originCode });
    expect(placeholderSrcset).toEqual(expected);
  });
});
