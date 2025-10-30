import React from 'react';
import { ToggleContext } from '#contexts/ToggleContext';
import latin from '../../../components/ThemeProvider/fontScripts/latin';
import CanonicalNavigation from './index.canonical';
import {
  dropdownTestId,
  scrollableTestId,
  dropdownListItems,
  scrollableListItems,
} from './testHelpers';
import {
  render,
  fireEvent,
} from '../../../components/react-testing-library-with-providers';

const blocks = [{ id: '1', title: 'Story' }];

const createToggleContextValue = enabled => ({
  toggleState: {
    topBarOJs: { enabled },
  },
  toggleDispatch: jest.fn(),
});

const renderWithToggle = (ui, enabled) =>
  render(
    <ToggleContext.Provider value={createToggleContextValue(enabled)}>
      {ui}
    </ToggleContext.Provider>,
  );

const navigation = (
  <CanonicalNavigation
    scrollableListItems={scrollableListItems}
    dropdownListItems={dropdownListItems}
    menuAnnouncedText="menu"
    script={latin}
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
      const dropdown = queryByTestId(dropdownTestId).parentElement;
      const scrollableNav = queryByTestId(scrollableTestId);
      expect(scrollableNav.innerHTML).toBe('<li>List Items</li>');
      expect(dropdown).toHaveAttribute('height', '0');
    });

    it('should render dropdown and no scrollable nav after menu button clicked', () => {
      const { queryByTestId, queryByText } = render(navigation);

      fireEvent.click(queryByText('menu'));

      const dropdown = queryByTestId(dropdownTestId);
      const scrollableNav = queryByTestId(scrollableTestId);
      expect(scrollableNav).toBeNull();
      expect(dropdown.innerHTML).toBe('<li>Dropdown Items</li>');
    });

    describe('Top Bar OJs', () => {
      it('should not render TopBarOJs when toggle is off', () => {
        const { queryByTestId } = renderWithToggle(
          <CanonicalNavigation
            scrollableListItems={scrollableListItems}
            dropdownListItems={dropdownListItems}
            menuAnnouncedText="menu"
            script={latin}
            service="pidgin"
            dir="ltr"
            blocks={blocks}
          />,
          false,
        );
        expect(queryByTestId('top-bar-onward-journeys')).toBeNull();
      });

      it('should render TopBarOJs when toggle is on and blocks are provided', () => {
        const { queryByTestId } = renderWithToggle(
          <CanonicalNavigation
            scrollableListItems={scrollableListItems}
            dropdownListItems={dropdownListItems}
            menuAnnouncedText="menu"
            script={latin}
            service="pidgin"
            dir="ltr"
            blocks={blocks}
          />,
          true,
        );
        expect(queryByTestId('top-bar-onward-journeys')).not.toBeNull();
      });

      it('should not render TopBarOJs when blocks are empty even if toggle is on', () => {
        const { queryByTestId } = renderWithToggle(
          <CanonicalNavigation
            scrollableListItems={scrollableListItems}
            dropdownListItems={dropdownListItems}
            menuAnnouncedText="menu"
            script={latin}
            service="pidgin"
            dir="ltr"
            blocks={[]}
          />,
          true,
        );
        expect(queryByTestId('top-bar-onward-journeys')).toBeNull();
      });
    });
  });
});
