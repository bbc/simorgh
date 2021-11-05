import React from 'react';
import {
  C_POSTBOX,
  C_WHITE,
  C_POSTBOX_30,
  C_GHOST,
} from '@bbc/psammead-styles/colours';
import { latin } from '@bbc/gel-foundations/scripts';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { render } from '@testing-library/react';
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
    brandBackgroundColour={C_POSTBOX}
    brandForegroundColour={C_GHOST}
    brandHighlightColour={C_WHITE}
    brandBorderColour={C_POSTBOX_30}
  />
);

describe('AMP Navigation', () => {
  describe('Snapshots', () => {
    shouldMatchSnapshot('should correctly render AMP navigation', navigation);
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
