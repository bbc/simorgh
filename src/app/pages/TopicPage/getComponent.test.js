import getComponent from './getComponent';
import { VISUAL_PROMINENCE, VISUAL_STYLE, COMPONENT_NAMES } from './constants';

describe('getComponent', () => {
  it('should render a message banner when visual style is BANNER and visual prominence is NORMAL', () => {
    const component = getComponent(
      VISUAL_STYLE.BANNER,
      VISUAL_PROMINENCE.NORMAL,
    );
    expect(component).toBe(COMPONENT_NAMES.MESSAGE_BANNER);
  });

  it('should render a simple curation grid when visual style is NONE and visual prominence is NORMAL', () => {
    const component = getComponent(VISUAL_STYLE.NONE, VISUAL_PROMINENCE.NORMAL);
    expect(component).toBe(COMPONENT_NAMES.SIMPLE_CURATION_GRID);
  });
  it('should render a hierarchical curation grid when visual style is NONE and visual prominence is HIGH', () => {
    const component = getComponent(VISUAL_STYLE.NONE, VISUAL_PROMINENCE.HIGH);
    expect(component).toBe(COMPONENT_NAMES.HIERARCHICAL_CURATION_GRID);
  });
});
