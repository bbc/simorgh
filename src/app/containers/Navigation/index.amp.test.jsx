import React from 'react';
import { latin } from '@bbc/gel-foundations/scripts';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Navigation from './index.amp';

const dropdownTestId = 'dropdown';
const scrollableTestId = 'scrollable-list';

const scrollableListItems = (
  <ul data-testid={scrollableTestId}>
    <li>List Items</li>
  </ul>
);

const dropdownListItems = <div data-testid={dropdownTestId}>Dropdown</div>;

const navigation = (
  <Navigation
    scrollableListItems={scrollableListItems}
    dropdownListItems={dropdownListItems}
    skipLinkText="skip link"
    menuAnnouncedText="menu"
    script={latin}
    service="news"
    dir="ltr"
    isAmp
  />
);

describe('AMP Navigation', () => {
  describe('Snapshots', () => {
    shouldMatchSnapshot('should correctly render AMP navigation', navigation);
  });

  describe('Assertions', () => {
    it('should render scrollable nav and a hidden dropdown', () => {
      const { queryByTestId } = render(navigation);
      const dropdown = queryByTestId(dropdownTestId);
      const scrollableNav = queryByTestId(scrollableTestId);
      expect(scrollableNav.innerHTML).toBe('<li>List Items</li>');
      expect(dropdown).toHaveAttribute('hidden');
    });
  });

  // AMP state toggling should be tested by an e2e.
});
