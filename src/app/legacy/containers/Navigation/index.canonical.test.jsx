import React from 'react';
import { fireEvent } from '@testing-library/react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import latin from '../../../components/ThemeProvider/fontScripts/latin';
import CanonicalNavigation from './index.canonical';
import {
  dropdownTestId,
  scrollableTestId,
  dropdownListItems,
  scrollableListItems,
} from './testHelpers';
import { render } from '../../../components/react-testing-library-with-providers';
import ThemeProvider from '../../../components/ThemeProvider';

const navigation = (
  <ThemeProvider service="news">
    <CanonicalNavigation
      scrollableListItems={scrollableListItems}
      dropdownListItems={dropdownListItems}
      menuAnnouncedText="menu"
      script={latin}
      service="news"
      dir="ltr"
    />
  </ThemeProvider>
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
