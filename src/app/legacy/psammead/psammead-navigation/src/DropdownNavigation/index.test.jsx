import React from 'react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { render, fireEvent, getByRole } from '@testing-library/react';
import latin from '../../../../../components/ThemeProvider/fontScripts/latin';
import arabic from '../../../../../components/ThemeProvider/fontScripts/arabic';
import {
  CanonicalDropdown,
  DropdownUl,
  DropdownLi,
  CanonicalMenuButton,
  AmpMenuButton,
} from './index';
import pidginNavData from '../../testHelpers/pidgin';

const dropdownList = (
  <DropdownUl>
    {pidginNavData.map((item, index) => {
      const active = index === 3;
      const { title, url } = item;

      return (
        <DropdownLi
          script={latin}
          service="news"
          url={url}
          key={title}
          active={active}
          currentPageText="Current page"
        >
          {title}
        </DropdownLi>
      );
    })}
  </DropdownUl>
);

describe('Canonical', () => {
  describe('Open menu button', () => {
    it('should call onClick handler when clicked', () => {
      const mockOnClick = jest.fn();
      const { container } = render(
        <CanonicalMenuButton
          announcedText="Menu"
          onClick={mockOnClick}
          isOpen
          script={latin}
        />,
      );
      const menuButton = getByRole(container, 'button');

      fireEvent.click(menuButton);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('should have aria-expanded set as true', () => {
      const { container } = render(
        <CanonicalMenuButton
          announcedText="Menu"
          onClick={() => {}}
          isOpen
          script={latin}
        />,
      );
      const menuButton = getByRole(container, 'button');
      expect(menuButton.getAttribute('aria-expanded')).toBe('true');
    });

    shouldMatchSnapshot(
      'should render correctly',
      <CanonicalMenuButton
        announcedText="Menu"
        onClick={() => {}}
        isOpen
        script={latin}
        dir="ltr"
      />,
    );

    shouldMatchSnapshot(
      'should render rtl correctly',
      <CanonicalMenuButton
        announcedText="Menu"
        onClick={() => {}}
        isOpen
        script={arabic}
        dir="rtl"
      />,
    );
  });

  describe('Closed menu button', () => {
    it('should call onClick handler when clicked', () => {
      const mockOnClick = jest.fn();
      const { container } = render(
        <CanonicalMenuButton
          announcedText="Menu"
          onClick={mockOnClick}
          isOpen={false}
          script={latin}
        />,
      );
      const menuButton = getByRole(container, 'button');

      fireEvent.click(menuButton);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('should have aria-expanded set as false', () => {
      const { container } = render(
        <CanonicalMenuButton
          announcedText="Menu"
          onClick={() => {}}
          isOpen={false}
          script={latin}
        />,
      );
      const menuButton = getByRole(container, 'button');
      expect(menuButton.getAttribute('aria-expanded')).toBe('false');
    });

    shouldMatchSnapshot(
      'should render correctly',
      <CanonicalMenuButton
        announcedText="Menu"
        onClick={() => {}}
        isOpen={false}
        script={latin}
        dir="ltr"
      />,
    );

    shouldMatchSnapshot(
      'should render rtl correctly',
      <CanonicalMenuButton
        announcedText="Menu"
        onClick={() => {}}
        isOpen={false}
        script={arabic}
        dir="rtl"
      />,
    );
  });
});

describe('Dropdown navigation', () => {
  shouldMatchSnapshot(
    'should render correctly when closed',
    <CanonicalDropdown isOpen={false}>{dropdownList}</CanonicalDropdown>,
  );

  shouldMatchSnapshot(
    'should render correctly when open',
    <CanonicalDropdown isOpen>{dropdownList}</CanonicalDropdown>,
  );
});

describe('AMP Menu Button', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <AmpMenuButton
      announcedText="Menu"
      onToggle="other-element.toggleVisibility"
      script={latin}
      dir="ltr"
    />,
  );

  shouldMatchSnapshot(
    'should render rtl correctly',
    <AmpMenuButton
      announcedText="Menu"
      onToggle="other-element.toggleVisibility"
      script={arabic}
      dir="rtl"
    />,
  );
});
