import getComponent from './getComponent';
import { VISUAL_PROMINENCE, VISUAL_STYLE, COMPONENT_NAMES } from './constants';

describe('getComponent', () => {
  it.each`
    visualStyle            | visualProminence            | expected
    ${VISUAL_STYLE.BANNER} | ${VISUAL_PROMINENCE.NORMAL} | ${COMPONENT_NAMES.MESSAGE_BANNER}
    ${VISUAL_STYLE.NONE}   | ${VISUAL_PROMINENCE.NORMAL} | ${COMPONENT_NAMES.SIMPLE_CURATION_GRID}
    ${VISUAL_STYLE.NONE}   | ${VISUAL_PROMINENCE.HIGH}   | ${COMPONENT_NAMES.HIERARCHICAL_CURATION_GRID}
  `(
    'should render $expected when visual style is $visualStyle and visual prominence is $visualProminence',
    ({ visualStyle, visualProminence, expected }) => {
      expect(getComponent(visualStyle, visualProminence)).toBe(expected);
    },
  );
});
