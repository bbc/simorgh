import {
  VISUAL_STYLE,
  VISUAL_PROMINENCE,
  CurationProps,
} from '#app/models/types/curationData';

export const COMPONENT_NAMES = {
  MESSAGE_BANNER: 'message-banner',
  SIMPLE_CURATION_GRID: 'simple-curation-grid',
  HIERARCHICAL_CURATION_GRID: 'hierarchical-curation-grid',
  NOT_SUPPORTED: 'not-supported',
  MOST_READ: 'most-read',
  RADIO_SCHEDULE: 'radio-schedule',
} as const;

const { NONE, BANNER, COLLECTION, RANKED } = VISUAL_STYLE;
const { MINIMUM, LOW, NORMAL, HIGH, MAXIMUM } = VISUAL_PROMINENCE;
const {
  MESSAGE_BANNER,
  SIMPLE_CURATION_GRID,
  HIERARCHICAL_CURATION_GRID,
  MOST_READ,
  NOT_SUPPORTED,
  RADIO_SCHEDULE,
} = COMPONENT_NAMES;

export default ({
  visualStyle,
  visualProminence,
  curationType = '',
}: CurationProps) => {
  // There are more combinations possible now that curationType is added.
  // I am thinking about adding more of these for the NOT_SUPPORTED types to
  // make this safer. But as this process of choosing a radio-schedule with a different
  // curation type might change, I am going to hold off until I read the slack
  // messages again

  const componentsByVisualStyleAndProminenceAndCurationType = {
    [`${BANNER}_${MINIMUM}_${null}`]: NOT_SUPPORTED,
    [`${BANNER}_${LOW}_${null}`]: NOT_SUPPORTED,
    [`${BANNER}_${NORMAL}_${null}`]: MESSAGE_BANNER,
    [`${BANNER}_${HIGH}_${null}`]: NOT_SUPPORTED,
    [`${BANNER}_${MAXIMUM}_${null}`]: NOT_SUPPORTED,
    [`${NONE}_${NORMAL}_${null}`]: SIMPLE_CURATION_GRID,
    [`${NONE}_${HIGH}_${null}`]: HIERARCHICAL_CURATION_GRID,
    [`${COLLECTION}_${HIGH}_${null}`]: HIERARCHICAL_CURATION_GRID,
    [`${RANKED}_${NORMAL}_${'most-popular'}`]: MOST_READ,
    [`${NONE}_${NORMAL}_${'radio-schedule'}`]: RADIO_SCHEDULE,
  };

  const visualStyleAndProminenceAndCurationType = `${visualStyle}_${visualProminence}_${curationType}`;

  return (
    componentsByVisualStyleAndProminenceAndCurationType[
      visualStyleAndProminenceAndCurationType
    ] || null
  );
};
