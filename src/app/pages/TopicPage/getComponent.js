import { VISUAL_PROMINENCE, VISUAL_STYLE, COMPONENT_NAMES } from './constants';

const { NONE, BANNER } = VISUAL_STYLE;
const { MINIMUM, LOW, NORMAL, HIGH, MAXIMUM } = VISUAL_PROMINENCE;
const {
  MESSAGE_BANNER,
  SIMPLE_CURATION_GRID,
  HIERARCHICAL_CURATION_GRID,
  BILLBOARD,
} = COMPONENT_NAMES;

export default (visualStyle, visualProminence) => {
  const componentsByVisualStyleAndProminence = {
    [`${BANNER}_${MINIMUM}`]: MESSAGE_BANNER,
    [`${BANNER}_${LOW}`]: MESSAGE_BANNER,
    [`${BANNER}_${NORMAL}`]: MESSAGE_BANNER,
    [`${BANNER}_${HIGH}`]: BILLBOARD,
    [`${BANNER}_${MAXIMUM}`]: BILLBOARD,
    [`${NONE}_${NORMAL}`]: SIMPLE_CURATION_GRID,
    [`${NONE}_${HIGH}`]: HIERARCHICAL_CURATION_GRID,
  };

  const visualStyleAndProminence = `${visualStyle}_${visualProminence}`;

  return componentsByVisualStyleAndProminence[visualStyleAndProminence] || null;
};
