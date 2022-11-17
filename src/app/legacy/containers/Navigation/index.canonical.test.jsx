import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {
  C_POSTBOX,
  C_WHITE,
  C_POSTBOX_30,
  C_GHOST,
} from '#psammead/psammead-styles/src/colours';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import latin from '../../../components/ThemeProvider/fontScripts/latin';
import CanonicalNavigation from './index.canonical';
import {
  dropdownTestId,
  scrollableTestId,
  dropdownListItems,
  scrollableListItems,
} from './testHelpers';

const navigation = (
  <CanonicalNavigation
    scrollableListItems={scrollableListItems}
    dropdownListItems={dropdownListItems}
    menuAnnouncedText="menu"
    script={latin}
    service="news"
    dir="ltr"
    brandBackgroundColour={C_POSTBOX}
    brandForegroundColour={C_GHOST}
    brandHighlightColour={C_WHITE}
    brandBorderColour={C_POSTBOX_30}
  />
);

describe('Canonical Navigation', () => {
  describe('snapshots', () => {
    shouldMatchSnapshot(
      'should correctly render Canonical navigation',
      navigation,
    );
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
  });
});
