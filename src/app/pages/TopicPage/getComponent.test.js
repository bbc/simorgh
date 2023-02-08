import getComponent from './getComponent';
import { VISUAL_PROMINENCE, VISUAL_STYLE, COMPONENT_NAMES } from './constants';

/**

When I have a curation with no visual style but visual prominence = HIGH

Then I see a Hierarchical Curation Grid rendered as expected

Future:

When I have a curation with visual style = LINKS

Then I see useful links rendered as expected
 */

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
