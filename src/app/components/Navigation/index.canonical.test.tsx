import CanonicalNavigation from './index.canonical';
import {
  dropdownTestId,
  scrollableTestId,
  dropdownListItems,
  scrollableListItems,
} from './testHelpers';
import { render, fireEvent } from '../react-testing-library-with-providers';

const blocks = [{ id: '1', title: 'Story' }];

const navigationProps = {
  scrollableListItems,
  dropdownListItems,
  menuAnnouncedText: 'menu',
  service: 'pidgin',
  dir: 'ltr',
};

const navigation = (
  <CanonicalNavigation
    scrollableListItems={scrollableListItems}
    dropdownListItems={dropdownListItems}
    menuAnnouncedText="menu"
    service="news"
    dir="ltr"
  />
);

describe('Canonical Navigation', () => {
  describe('snapshots', () => {
    it('should correctly render Canonical navigation', () => {
      const { container } = render(navigation);
      expect(container).toMatchSnapshot();
    });
  });

  describe('assertions', () => {
    it('should render scrollable nav and hide dropdown', () => {
      const { queryByTestId } = render(navigation);
      const dropdown = queryByTestId(dropdownTestId)?.parentElement;
      const scrollableNav = queryByTestId(scrollableTestId);
      expect(scrollableNav?.innerHTML).toBe('<li>List Items</li>');
      expect(dropdown).toHaveAttribute('height', '0');
    });

    it('should render dropdown and no scrollable nav after menu button clicked', () => {
      const { getByRole, getByTestId } = render(navigation);

      fireEvent.click(getByRole('button', { name: 'menu' }));

      const dropdown = getByTestId(dropdownTestId);
      expect(dropdown).toHaveTextContent('Dropdown Items');
    });

    describe('Top Bar OJs', () => {
      it.each([
        [
          'should not render TopBarOJs when toggle is off',
          { ...navigationProps, blocks },
          { topBarOJs: { enabled: false } },
          queryByTestId =>
            expect(queryByTestId('top-bar-onward-journeys')).toBeNull(),
        ],
        [
          'should render TopBarOJs when toggle is on and blocks are provided',
          { ...navigationProps, blocks },
          { topBarOJs: { enabled: true } },
          queryByTestId =>
            expect(queryByTestId('top-bar-onward-journeys')).not.toBeNull(),
        ],
        [
          'should not render TopBarOJs when blocks are empty even if toggle is on',
          { ...navigationProps, blocks: [] },
          { topBarOJs: { enabled: true } },
          queryByTestId =>
            expect(queryByTestId('top-bar-onward-journeys')).toBeNull(),
        ],
      ])('%s', (_, props, toggles, assertion) => {
        // @ts-expect-error partial data for testing purposes
        const { queryByTestId } = render(<CanonicalNavigation {...props} />, {
          toggles,
          service: props.service,
        });
        assertion(queryByTestId);
      });
    });
  });
});
