import { VISUAL_PROMINENCE, VISUAL_STYLE, COMPONENT_NAMES } from './constants';

const { NONE, BANNER } = VISUAL_STYLE;
const { NORMAL, HIGH } = VISUAL_PROMINENCE;
const {
  MESSAGE_BANNER,
  SIMPLE_CURATION_GRID,
  HIERARCHICAL_CURATION_GRID,
  BILLBOARD,
} = COMPONENT_NAMES;

export default (visualStyle, visualProminence) => {
  if (visualStyle === BANNER && visualProminence === NORMAL) {
    return MESSAGE_BANNER;
  }
  if (visualStyle === BANNER && visualProminence === HIGH) {
    return BILLBOARD;
  }
  if (visualStyle === NONE && visualProminence === NORMAL) {
    return SIMPLE_CURATION_GRID;
  }
  if (visualStyle === NONE && visualProminence === HIGH) {
    return HIERARCHICAL_CURATION_GRID;
  }

  return null;
};
