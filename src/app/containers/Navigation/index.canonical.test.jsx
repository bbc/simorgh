import React from 'react';
import { latin } from '@bbc/gel-foundations/scripts';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
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
    it('should render scrollable nav and hide dropdown', () => {
      const { queryByTestId } = render(navigation);
      const dropdown = queryByTestId(dropdownTestId).parentElement;
      const scrollableNav = queryByTestId(scrollableTestId);
      expect(scrollableNav.innerHTML).toBe('<li>List Items</li>');
      expect(dropdown).toHaveAttribute('height', '0');
    });

    it('should render dropdown and no scrollable nav after menu button clicked', () => {
      const { queryByTestId, queryByLabelText } = render(navigation);

      fireEvent.click(queryByLabelText('menu'));

      const dropdown = queryByTestId(dropdownTestId);
      const scrollableNav = queryByTestId(scrollableTestId);
      expect(scrollableNav).toBeNull();
      expect(dropdown.innerHTML).toBe('<li>Dropdown Items</li>');
    });
  });
});
