import React from 'react';
import {
  render,
  fireEvent,
  getByRole,
} from '../../../../../components/react-testing-library-with-providers';
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
        />,
      );
      const menuButton = getByRole(container, 'button');

      fireEvent.click(menuButton);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('should have aria-expanded set as true', () => {
      const { container } = render(
        <CanonicalMenuButton announcedText="Menu" onClick={() => {}} isOpen />,
      );
      const menuButton = getByRole(container, 'button');
      expect(menuButton.getAttribute('aria-expanded')).toBe('true');
    });

    it('should render correctly', () => {
      const { container } = render(
        <CanonicalMenuButton
          announcedText="Menu"
          onClick={() => {}}
          isOpen
          dir="ltr"
        />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should render rtl correctly', () => {
      const { container } = render(
        <CanonicalMenuButton
          announcedText="Menu"
          onClick={() => {}}
          isOpen
          dir="rtl"
        />,
        { service: 'persian' },
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('Closed menu button', () => {
    it('should call onClick handler when clicked', () => {
      const mockOnClick = jest.fn();
      const { container } = render(
        <CanonicalMenuButton
          announcedText="Menu"
          onClick={mockOnClick}
          isOpen={false}
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
        />,
      );
      const menuButton = getByRole(container, 'button');
      expect(menuButton.getAttribute('aria-expanded')).toBe('false');
    });

    it('should render correctly', () => {
      const { container } = render(
        <CanonicalMenuButton
          announcedText="Menu"
          onClick={() => {}}
          isOpen={false}
          dir="ltr"
        />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should render rtl correctly', () => {
      const { container } = render(
        <CanonicalMenuButton
          announcedText="Menu"
          onClick={() => {}}
          isOpen={false}
          dir="rtl"
        />,
        { service: 'persian' },
      );
      expect(container).toMatchSnapshot();
    });
  });
});

describe('Dropdown navigation', () => {
  it('should render correctly when closer', () => {
    const { container } = render(
      <CanonicalDropdown isOpen={false}>{dropdownList}</CanonicalDropdown>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly when open', () => {
    const { container } = render(
      <CanonicalDropdown isOpen>{dropdownList}</CanonicalDropdown>,
    );
    expect(container).toMatchSnapshot();
  });

  describe('AMP Menu Button', () => {
    it('should render correctly', () => {
      const { container } = render(
        <AmpMenuButton
          announcedText="Menu"
          onToggle="other-element.toggleVisibility"
          dir="ltr"
        />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should render rtl correctly', () => {
      const { container } = render(
        <AmpMenuButton
          announcedText="Menu"
          onToggle="other-element.toggleVisibility"
          dir="rtl"
        />,
        { service: 'persian' },
      );
      expect(container).toMatchSnapshot();
    });
  });
});
