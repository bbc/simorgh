import getComponent from './getComponent';
import { VISUAL_PROMINENCE, VISUAL_STYLE, COMPONENT_NAMES } from './constants';

const { NORMAL, HIGH } = VISUAL_PROMINENCE;
const { NONE, BANNER } = VISUAL_STYLE;
const { MESSAGE_BANNER, SIMPLE_CURATION_GRID, HIERARCHICAL_CURATION_GRID } =
  COMPONENT_NAMES;

describe('getComponent', () => {
  it.each`
    visualStyle | visualProminence | expected
    ${BANNER}   | ${NORMAL}        | ${MESSAGE_BANNER}
    ${NONE}     | ${NORMAL}        | ${SIMPLE_CURATION_GRID}
    ${NONE}     | ${HIGH}          | ${HIERARCHICAL_CURATION_GRID}
  `(
    'should render $expected when visual style is $visualStyle and visual prominence is $visualProminence',
    ({ visualStyle, visualProminence, expected }) => {
      expect(getComponent(visualStyle, visualProminence)).toBe(expected);
    },
  );
});
