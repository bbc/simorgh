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
  topScrollableListItems: scrollableListItems,
  bottomScrollableListItems: scrollableListItems,
  dropdownListItems,
  menuAnnouncedText: 'menu',
  dir: 'ltr',
};

const navigation = (
  <CanonicalNavigation
    topScrollableListItems={scrollableListItems}
    bottomScrollableListItems={scrollableListItems}
    dropdownListItems={dropdownListItems}
    menuAnnouncedText="menu"
    dir="ltr"
  />
);

describe('Navigation - Canonical', () => {
  describe('snapshots', () => {
    it('should correctly render Canonical navigation', () => {
      const { container } = render(navigation);
      expect(container).toMatchSnapshot();
    });
  });

  describe('assertions', () => {
    it('should render scrollable nav and hide dropdown', () => {
      const { queryByTestId, getAllByTestId } = render(navigation);
      const dropdown = queryByTestId(dropdownTestId)?.parentElement;
      const [scrollableNavTopRow] = getAllByTestId(scrollableTestId);
      expect(scrollableNavTopRow).toBeInTheDocument();
      expect(dropdown).toHaveAttribute('height', '0');
    });

    it('should render dropdown and no scrollable nav after menu button clicked', () => {
      const { getByRole, getByTestId } = render(navigation);

      const menuButton = getByRole('button', { name: 'menu' });
      fireEvent.click(menuButton);
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');

      const dropdown = getByTestId(dropdownTestId);
      expect(dropdown).toHaveTextContent('Item 1');
    });

    it('should close the menu when Tab is pressed on the last dropdown item', () => {
      const { getByRole } = render(navigation);

      const menuButton = getByRole('button', { name: 'menu' });
      fireEvent.click(menuButton);
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');

      const lastLink = getByRole('link', { name: 'Item 2' });
      lastLink.focus();
      fireEvent.keyDown(lastLink, { key: 'Tab' });

      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
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
        });
        assertion(queryByTestId);
      });
    });
  });
});
