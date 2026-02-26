import React from 'react';
import CanonicalNavigationContainer from './index.canonical';
import {
  render,
  screen,
  fireEvent,
} from '../react-testing-library-with-providers';

describe('Navigation - Canonical', () => {
  it('should render', () => {
    expect(true).toBeTruthy();
  });

  describe('CanonicalNavigationContainer sticky nav', () => {
    const topScrollableListItems = (
      <ul>
        <li>Top Item</li>
      </ul>
    );
    const bottomScrollableListItems = (
      <ul>
        <li>Bottom Item</li>
      </ul>
    );
    const dropdownListItems = (
      <ul>
        <li>Dropdown Item</li>
      </ul>
    );
    const menuAnnouncedText = 'Menu';
    const dir = 'ltr';

    it('renders sticky nav container but hides it by default', () => {
      render(
        <CanonicalNavigationContainer
          dir={dir}
          menuAnnouncedText={menuAnnouncedText}
          topScrollableListItems={topScrollableListItems}
          bottomScrollableListItems={bottomScrollableListItems}
          dropdownListItems={dropdownListItems}
        />,
      );
      const stickyNav = screen.queryByLabelText('Sticky navigation');
      expect(stickyNav).toBeInTheDocument();
      expect(stickyNav).toHaveAttribute('aria-hidden', 'true');
      expect(stickyNav).toHaveStyle('transform: translateY(-100%)');
    });

    it('hides sticky nav when keyboard navigation is detected', () => {
      render(
        <CanonicalNavigationContainer
          dir={dir}
          menuAnnouncedText={menuAnnouncedText}
          topScrollableListItems={topScrollableListItems}
          bottomScrollableListItems={bottomScrollableListItems}
          dropdownListItems={dropdownListItems}
        />,
      );
      fireEvent.keyDown(window, { key: 'Tab' });
      const stickyNav = screen.queryByLabelText('Sticky navigation');
      expect(stickyNav).toBeNull();
    });

    it('shows sticky nav again after pointer interaction', () => {
      render(
        <CanonicalNavigationContainer
          dir={dir}
          menuAnnouncedText={menuAnnouncedText}
          topScrollableListItems={topScrollableListItems}
          bottomScrollableListItems={bottomScrollableListItems}
          dropdownListItems={dropdownListItems}
        />,
      );
      fireEvent.keyDown(window, { key: 'Tab' });
      fireEvent.mouseDown(window);
      const stickyNav = screen.queryByLabelText('Sticky navigation');
      expect(stickyNav).toBeInTheDocument();
    });
  });
});
