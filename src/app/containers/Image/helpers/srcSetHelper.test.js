import createSrcset from './srcSetHelper';

describe('create srcset', () => {
  const srcsetScenarios = [
    {
      originCode: 'test',
      location: 'testland',
      expected:
        'https://ichef.bbci.co.uk/news/240/test/testland 240w, https://ichef.bbci.co.uk/news/320/test/testland 320w, https://ichef.bbci.co.uk/news/480/test/testland 480w, https://ichef.bbci.co.uk/news/624/test/testland 624w, https://ichef.bbci.co.uk/news/800/test/testland 800w',
      summary:
        'should return a srcset with test in originCode and testland in location',
    },
    {
      originCode: 'pips',
      location: 'testland',
      expected: null,
      summary: 'should return null with pips originCode',
    },
  ];

  srcsetScenarios.forEach(({ originCode, location, expected, summary }) => {
    it(summary, () => {
      const srcset = createSrcset(originCode, location);
      expect(srcset).toEqual(expected);
    });
  });
});
