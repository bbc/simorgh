import {
  Curation,
  VISUAL_PROMINENCE,
  VISUAL_STYLE,
} from '#app/models/types/curationData';
import getNthCurationByStyleAndProminence from '.';

describe('getNthCurationByStyleAndProminence', () => {
  const curations: Curation[] = [
    {
      visualStyle: VISUAL_STYLE.COLLECTION,
      visualProminence: VISUAL_PROMINENCE.HIGH,
      position: 0,
    },
    {
      visualStyle: VISUAL_STYLE.BANNER,
      visualProminence: VISUAL_PROMINENCE.NORMAL,
      position: 1,
    },
    {
      visualStyle: VISUAL_STYLE.COLLECTION,
      visualProminence: VISUAL_PROMINENCE.NORMAL,
      position: 2,
    },
    {
      visualStyle: VISUAL_STYLE.BANNER,
      visualProminence: VISUAL_PROMINENCE.NORMAL,
      position: 3,
    },
  ];

  it.each`
    visualStyle                | visualProminence            | position | expectedResult
    ${VISUAL_STYLE.COLLECTION} | ${VISUAL_PROMINENCE.HIGH}   | ${0}     | ${1}
    ${VISUAL_STYLE.BANNER}     | ${VISUAL_PROMINENCE.NORMAL} | ${1}     | ${1}
    ${VISUAL_STYLE.COLLECTION} | ${VISUAL_PROMINENCE.NORMAL} | ${2}     | ${1}
    ${VISUAL_STYLE.BANNER}     | ${VISUAL_PROMINENCE.NORMAL} | ${3}     | ${2}
  `(
    'should return $expectedResult when visualStyle is $visualStyle, visualProminence is $visualProminence and position is $position',
    ({ visualStyle, visualProminence, position, expectedResult }) => {
      const nthCuration = getNthCurationByStyleAndProminence({
        curations,
        visualStyle,
        visualProminence,
        position,
      });

      expect(nthCuration).toBe(expectedResult);
    },
  );
});
