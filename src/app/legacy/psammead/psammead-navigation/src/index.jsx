import React from 'react';
import styled from '@emotion/styled';
import {
  GEL_SPACING_HLF,
  GEL_SPACING,
  GEL_SPACING_SEXT,
} from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import { getPica } from '#psammead/gel-foundations/src/typography';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import { NAV_BAR_TOP_BOTTOM_SPACING } from './DropdownNavigation';
import { focusIndicatorThickness } from '../../../../components/ThemeProvider/focusIndicator';
import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';

const SPACING_AROUND_NAV_ITEMS = `${NAV_BAR_TOP_BOTTOM_SPACING}rem`; // 12px
const CURRENT_ITEM_HOVER_BORDER = '0.3125rem'; // 5px

const NavWrapper = styled.div`
  position: relative;
  max-width: 63.4rem;
  margin: 0;
  background-color: ${props => props.theme.palette.WHITE};
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin: 0 0.8rem;
  }
  @media (min-width: 66rem) {
    margin: 0 auto;
  }
`;

const StyledUnorderedList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: relative;

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    overflow: hidden;
  }
`;

const ListItemBorder = `
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`;

const StyledLink = styled.a`
  ${({ script }) => script && getPica(script)};
  ${({ service }) => getSansRegular(service)};
  color: ${props => props.theme.palette.GREY_10};
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  padding: ${SPACING_AROUND_NAV_ITEMS} 0.25rem;
  outline: none;

  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    padding: ${SPACING_AROUND_NAV_ITEMS} ${GEL_SPACING};
  }

  &:hover::after {
    ${ListItemBorder}
    border-bottom: ${GEL_SPACING_HLF} solid ${props =>
      props.theme.palette.POSTBOX};
    ${({ currentLink, theme }) =>
      currentLink &&
      `
        border-bottom: ${CURRENT_ITEM_HOVER_BORDER} solid ${theme.palette.POSTBOX};
      `}
  }

  &:focus::after {
    ${ListItemBorder}
    border-bottom: ${GEL_SPACING_HLF} solid ${props =>
      props.theme.palette.POSTBOX};
    top: 0;
    border: ${focusIndicatorThickness} solid
      ${props => props.theme.palette.BLACK};
  }

  /* Custom focus indicator styling applied to pseudo-element. Global focus indicator styling has been removed. */
  &:focus-visible::after {
    ${ListItemBorder}
    border-bottom: ${GEL_SPACING_HLF} solid ${props =>
      props.theme.palette.POSTBOX};
    top: 0;
    border: ${focusIndicatorThickness} solid
      ${props => props.theme.palette.BLACK};
  }
`;

const StyledListItem = styled.li`
  display: inline-block;
  position: relative;
  z-index: 2;
  margin-inline-end: 0.75rem;

  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    &:last-child {
      ${({ dir }) => `
        margin-${dir === 'ltr' ? 'right' : 'left'}: ${GEL_SPACING_SEXT}; 
      `}
    }
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    /* Trick to display a border between the list items when it breaks into multiple lines, which takes the full width */
    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN};
      border-bottom: 0.0625rem solid ${props => props.theme.palette.GREY_3};
      z-index: -1;
    }
  }
`;

const StyledSpan = styled.span`
  &::after {
    ${ListItemBorder}
    border-bottom: ${GEL_SPACING_HLF} solid ${props =>
      props.theme.palette.POSTBOX};
  }
`;

const CurrentLink = ({
  linkId,
  children: link,
  script,
  currentPageText = null,
}) => (
  <StyledSpan
    // eslint-disable-next-line jsx-a11y/aria-role
    role="text"
    script={script}
    // This is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
    id={`NavigationLinks-${linkId}`}
  >
    <VisuallyHiddenText>{`${currentPageText}, `}</VisuallyHiddenText>
    {link}
  </StyledSpan>
);

export const NavigationUl = ({ children, ...props }) => (
  <StyledUnorderedList role="list" {...props}>
    {children}
  </StyledUnorderedList>
);

export const NavigationLi = ({
  children: link,
  url,
  script,
  clickTrackerHandler = null,
  currentPageText = null,
  active = false,
  service,
  dir = 'ltr',
  viewRef = null,
  ...props
}) => {
  return (
    <StyledListItem dir={dir} role="listitem" ref={viewRef}>
      {active && currentPageText ? (
        <StyledLink
          href={url}
          script={script}
          service={service}
          currentLink
          // This is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
          aria-labelledby={`NavigationLinks-${link}`}
          className="focusIndicatorRemove"
          onClick={clickTrackerHandler}
          {...props}
        >
          <CurrentLink
            linkId={link}
            script={script}
            currentPageText={currentPageText}
          >
            {link}
          </CurrentLink>
        </StyledLink>
      ) : (
        <StyledLink
          href={url}
          script={script}
          service={service}
          className="focusIndicatorRemove"
          onClick={clickTrackerHandler}
          {...props}
        >
          {link}
        </StyledLink>
      )}
    </StyledListItem>
  );
};

// ampOpenClass is the class added to the Navigation, and is toggled on tap.
// It indicates whether the menu is open or not. This overrides the background
// color of the Navigation
const StyledNav = styled.nav`
  position: relative;
  background-color: ${({ isOpen }) =>
    props =>
      isOpen ? props.theme.palette.EBON : props.theme.palette.WHITE};
  ${({ ampOpenClass, theme }) =>
    ampOpenClass &&
    `
      &.${ampOpenClass} {
        @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
          background-color: ${theme.palette.EBON};
        }
      }
    `}
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      border-bottom: 0.0625rem solid ${props => props.theme.palette.GREY_3};
    }
  }
  ${StyledListItem} {
    ${({ dir }) => `
      &::after {
        ${dir === 'ltr' ? 'left' : 'right'}: 0;
      }
    `}
  }
`;

const Navigation = ({
  children,
  dir = 'ltr',
  isOpen = false,
  ampOpenClass = null,
  ...props
}) => {
  return (
    <StyledNav
      role="navigation"
      dir={dir}
      isOpen={isOpen}
      ampOpenClass={ampOpenClass}
      {...props}
    >
      <NavWrapper>{children}</NavWrapper>
    </StyledNav>
  );
};

export default Navigation;
