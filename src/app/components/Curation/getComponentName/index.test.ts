import {
  VISUAL_STYLE,
  VISUAL_PROMINENCE,
  Curation,
} from '#app/models/types/curationData';
import getComponentName, { COMPONENT_NAMES } from '.';
import afriqueHomePage from '../../../../../data/afrique/homePage/index.json';
import marathiTopic from '../../../../../data/marathi/topics/c1wmk63rjkvt.json';
import dariHomePage from '../../../../../data/dari/homePage/index.json';

const { MINIMUM, LOW, NORMAL, HIGH, MAXIMUM } = VISUAL_PROMINENCE;
const { NONE, BANNER, COLLECTION, RANKED } = VISUAL_STYLE;
const {
  MOST_READ,
  MESSAGE_BANNER,
  SIMPLE_CURATION_GRID,
  HIERARCHICAL_CURATION_GRID,
  NOT_SUPPORTED,
  RADIO_SCHEDULE,
  EMBED,
  BILLBOARD,
  MEDIA_COLLECTION,
} = COMPONENT_NAMES;

describe('getComponentName', () => {
  // originally unmapped combinations would return null, but now they return simple-curation-grid,
  // as this is the set of components that gets used in unmapped cases, and we need a componentName for tracking
  it.each`
    visualStyle     | visualProminence     | expected
    ${BANNER}       | ${MINIMUM}           | ${NOT_SUPPORTED}
    ${BANNER}       | ${LOW}               | ${NOT_SUPPORTED}
    ${BANNER}       | ${NORMAL}            | ${MESSAGE_BANNER}
    ${BANNER}       | ${HIGH}              | ${NOT_SUPPORTED}
    ${BANNER}       | ${MAXIMUM}           | ${BILLBOARD}
    ${NONE}         | ${NORMAL}            | ${SIMPLE_CURATION_GRID}
    ${NONE}         | ${HIGH}              | ${HIERARCHICAL_CURATION_GRID}
    ${COLLECTION}   | ${HIGH}              | ${HIERARCHICAL_CURATION_GRID}
    ${RANKED}       | ${NORMAL}            | ${MOST_READ}
    ${'fake-style'} | ${'fake-prominence'} | ${'simple-curation-grid'}
  `(
    'should return $expected when visual style is $visualStyle and visual prominence is $visualProminence',
    ({ visualStyle, visualProminence, expected }) => {
      expect(
        getComponentName({
          visualStyle,
          visualProminence,
        }),
      ).toBe(expected);
    },
  );
  it('should return RADIO_SCHEDULE when a radio schedule is present', () => {
    const { radioSchedule } = afriqueHomePage.data.curations[4];
    expect(getComponentName({ radioSchedule })).toBe(`${RADIO_SCHEDULE}`);
  });

  it('should return EMBED when an embed is present', () => {
    const { embed } = marathiTopic.data.curations[0];
    expect(getComponentName({ embed })).toBe(`${EMBED}`);
  });

  it('should return MEDIA_COLLECTION when a media collection is present', () => {
    const { mediaCollection } = dariHomePage.data.curations[5] as Curation;
    expect(getComponentName({ mediaCollection })).toBe(`${MEDIA_COLLECTION}`);
  });
});
