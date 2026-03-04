import AmpNavigation from './index.amp';
import {
  dropdownTestId,
  scrollableTestId,
  dropdownListItems,
  scrollableListItems,
} from './testHelpers';
import { render } from '../react-testing-library-with-providers';

const navigation = (
  <AmpNavigation
    topScrollableListItems={scrollableListItems}
    bottomScrollableListItems={scrollableListItems}
    dropdownListItems={dropdownListItems}
    menuAnnouncedText="menu"
    dir="ltr"
  />
);

describe('AMP Navigation', () => {
  describe('Snapshots', () => {
    it('should correctly render AMP navigation', () => {
      const { container } = render(navigation);
      expect(container).toMatchSnapshot();
    });
  });

  describe('Assertions', () => {
    it('should render scrollable nav and a hidden dropdown', () => {
      const { queryByTestId } = render(navigation);
      const dropdown = queryByTestId(dropdownTestId)?.parentElement;
      const scrollableNav = queryByTestId(scrollableTestId);
      expect(scrollableNav?.innerHTML).toBe('<li>List Items</li>');
      expect(dropdown).not.toBeVisible();
    });
  });
});
