import {
  VISUAL_STYLE,
  VISUAL_PROMINENCE,
} from '#app/models/types/curationData';
import getComponentName, { COMPONENT_NAMES } from '.';

const { MINIMUM, LOW, NORMAL, HIGH, MAXIMUM } = VISUAL_PROMINENCE;
const { NONE, BANNER, COLLECTION, RANKED } = VISUAL_STYLE;
const {
  MOST_READ,
  MESSAGE_BANNER,
  SIMPLE_CURATION_GRID,
  HIERARCHICAL_CURATION_GRID,
  NOT_SUPPORTED,
  RADIO_SCHEDULE,
} = COMPONENT_NAMES;

describe('getComponentName', () => {
  it.each`
    visualStyle     | visualProminence     | curationType        | expected
    ${BANNER}       | ${MINIMUM}           | ${null}             | ${NOT_SUPPORTED}
    ${BANNER}       | ${LOW}               | ${null}             | ${NOT_SUPPORTED}
    ${BANNER}       | ${NORMAL}            | ${null}             | ${MESSAGE_BANNER}
    ${BANNER}       | ${HIGH}              | ${null}             | ${NOT_SUPPORTED}
    ${BANNER}       | ${MAXIMUM}           | ${null}             | ${NOT_SUPPORTED}
    ${NONE}         | ${NORMAL}            | ${null}             | ${SIMPLE_CURATION_GRID}
    ${NONE}         | ${HIGH}              | ${null}             | ${HIERARCHICAL_CURATION_GRID}
    ${COLLECTION}   | ${HIGH}              | ${null}             | ${HIERARCHICAL_CURATION_GRID}
    ${RANKED}       | ${NORMAL}            | ${null}             | ${MOST_READ}
    ${NONE}         | ${NORMAL}            | ${'radio-schedule'} | ${RADIO_SCHEDULE}
    ${'fake-style'} | ${'fake-prominence'} | ${null}             | ${null}
  `(
    'should return $expected when visual style is $visualStyle and visual prominence is $visualProminence and curation type is $curationType',
    ({ visualStyle, visualProminence, curationType, expected }) => {
      expect(getComponentName({visualStyle, visualProminence, curationType})).toBe(expected);
      
    },
  );
});
