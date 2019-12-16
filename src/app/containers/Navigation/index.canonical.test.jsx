import React from 'react';
import { latin } from '@bbc/gel-foundations/scripts';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { render, fireEvent } from '@testing-library/react';
import Navigation from './index.canonical';

const scrollableTestId = 'scrollable-list';
const dropdownTestId = 'dropdown';

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
  />
);

describe('Canonical Navigation', () => {
  window.matchMedia = jest.fn().mockImplementation(query => {
    return {
      matches: true,
      media: query,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  });

  describe('snapshots', () => {
    shouldMatchSnapshot(
      'should correctly render Canonical navigation',
      navigation,
    );
  });

  describe('assertions', () => {
    it('should render scrollable nav and no dropdown', () => {
      const { queryByTestId } = render(navigation);
      const dropdown = queryByTestId(dropdownTestId);
      const scrollableNav = queryByTestId(scrollableTestId);
      expect(scrollableNav.innerHTML).toBe('<li>List Items</li>');
      expect(dropdown).toBeFalsy();
    });

    it('should render dropdown and no scrollable nav after menu button clicked', () => {
      const { queryByTestId, queryByLabelText } = render(navigation);

      fireEvent.click(queryByLabelText('menu'));

      const dropdown = queryByTestId(dropdownTestId);
      const scrollableNav = queryByTestId(scrollableTestId);
      expect(scrollableNav).toBeFalsy();
      expect(dropdown.innerHTML).toBe('Dropdown');
    });
  });
});
