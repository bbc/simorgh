import { VISUAL_STYLE, VISUAL_PROMINENCE, COMPONENT_NAMES } from './constants';

const { NONE, BANNER } = VISUAL_STYLE;
const { NORMAL, HIGH } = VISUAL_PROMINENCE;

const {
  SIMPLE_CURATION_GRID,
  HIERARCHICAL_CURATION_GRID,
  BILLBOARD,
  MESSAGE_BANNER,
} = COMPONENT_NAMES;

export default (visualStyle: string, visualProminence: string) => {
  const componentsByVisualStyleAndProminence = {
    [`${BANNER}_${NORMAL}`]: MESSAGE_BANNER,
    [`${BANNER}_${HIGH}`]: BILLBOARD,
    [`${NONE}_${NORMAL}`]: SIMPLE_CURATION_GRID,
    [`${NONE}_${HIGH}`]: HIERARCHICAL_CURATION_GRID,
  };

  const visualStyleAndProminence = `${visualStyle}_${visualProminence}`;

  return componentsByVisualStyleAndProminence[visualStyleAndProminence] || null;
};
