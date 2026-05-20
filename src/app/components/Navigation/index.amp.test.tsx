import { render } from '../react-testing-library-with-providers';
import AmpNavigation from './index.amp';
import {
  dropdownListItems,
  dropdownTestId,
  scrollableListItems,
  scrollableTestId,
} from './testHelpers';

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
      const { getByTestId, getAllByTestId } = render(navigation);
      const dropdown = getByTestId(dropdownTestId).parentElement;
      const [scrollableNav] = getAllByTestId(scrollableTestId);
      expect(scrollableNav?.innerHTML).toBe('<li>List Items</li>');
      expect(dropdown).toHaveAttribute('hidden');
    });
  });
});
