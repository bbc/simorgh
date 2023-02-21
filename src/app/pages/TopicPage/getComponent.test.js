import getComponent from './getComponent';
import { VISUAL_PROMINENCE, VISUAL_STYLE, COMPONENT_NAMES } from './constants';

const { MINIMUM, LOW, NORMAL, HIGH, MAXIMUM } = VISUAL_PROMINENCE;
const { NONE, BANNER } = VISUAL_STYLE;
const {
  MESSAGE_BANNER,
  SIMPLE_CURATION_GRID,
  HIERARCHICAL_CURATION_GRID,
  NOT_SUPPORTED,
} = COMPONENT_NAMES;

describe('getComponent', () => {
  it.each`
    visualStyle     | visualProminence     | expected
    ${BANNER}       | ${MINIMUM}           | ${NOT_SUPPORTED}
    ${BANNER}       | ${LOW}               | ${NOT_SUPPORTED}
    ${BANNER}       | ${NORMAL}            | ${MESSAGE_BANNER}
    ${BANNER}       | ${HIGH}              | ${NOT_SUPPORTED}
    ${BANNER}       | ${MAXIMUM}           | ${NOT_SUPPORTED}
    ${NONE}         | ${NORMAL}            | ${SIMPLE_CURATION_GRID}
    ${NONE}         | ${HIGH}              | ${HIERARCHICAL_CURATION_GRID}
    ${'fake-style'} | ${'fake-prominence'} | ${null}
  `(
    'should render $expected when visual style is $visualStyle and visual prominence is $visualProminence',
    ({ visualStyle, visualProminence, expected }) => {
      expect(getComponent(visualStyle, visualProminence)).toBe(expected);
    },
  );
});
