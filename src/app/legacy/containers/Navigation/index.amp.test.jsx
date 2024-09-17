import React from 'react';
import latin from '#components/ThemeProvider/fontScripts/latin';
import { render } from '#components/react-testing-library-with-providers';
import AmpNavigation from './index.amp';
import {
  dropdownTestId,
  scrollableTestId,
  dropdownListItems,
  scrollableListItems,
} from './testHelpers';

const navigation = (
  <AmpNavigation
    scrollableListItems={scrollableListItems}
    dropdownListItems={dropdownListItems}
    menuAnnouncedText="menu"
    script={latin}
    service="news"
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
      const dropdown = queryByTestId(dropdownTestId).parentElement;
      const scrollableNav = queryByTestId(scrollableTestId);
      expect(scrollableNav.innerHTML).toBe('<li>List Items</li>');
      expect(dropdown).not.toBeVisible();
    });
  });

  // AMP state toggling tested by an e2e.
});
