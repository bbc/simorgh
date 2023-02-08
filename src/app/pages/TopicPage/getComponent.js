import { VISUAL_PROMINENCE, VISUAL_STYLE, COMPONENT_NAMES } from './constants';

export default (visualStyle, visualProminence) => {
  if (
    visualStyle === VISUAL_STYLE.BANNER &&
    visualProminence === VISUAL_PROMINENCE.NORMAL
  ) {
    return COMPONENT_NAMES.MESSAGE_BANNER;
  }
  if (
    visualStyle === VISUAL_STYLE.NONE &&
    visualProminence === VISUAL_PROMINENCE.NORMAL
  ) {
    return COMPONENT_NAMES.SIMPLE_CURATION_GRID;
  }
  if (
    visualStyle === VISUAL_STYLE.NONE &&
    visualProminence === VISUAL_PROMINENCE.HIGH
  ) {
    return COMPONENT_NAMES.HIERARCHICAL_CURATION_GRID;
  }

  return null;
};
