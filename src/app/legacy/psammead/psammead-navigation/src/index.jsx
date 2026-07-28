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
import { NAV_BAR_TOP_BOTTOM_SPACING } from './DropdownNavigation';
import { focusIndicatorThickness } from '../../../../components/ThemeProvider/focusIndicator';
import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';

const SPACING_AROUND_NAV_ITEMS = `${NAV_BAR_TOP_BOTTOM_SPACING}rem`; // 12px
const CURRENT_ITEM_HOVER_BORDER = '0.3125rem'; // 5px

const NavWrapper = styled.div`
  position: relative;
  max-width: 63.4rem;
  margin: 0 auto;
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
  ${({ theme: { fontSizes } }) => fontSizes.pica};
  ${({ theme: { fontVariants } }) => fontVariants.sansRegular};
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

// Always wraps the active link's text in StyledSpan so its visual "active"
// underline (`a[data-active="true"] span::after`) renders whenever the item
// is active, independent of whether the "current page" screen reader
// announcement is made. The hidden announcement text, id and role are only
// added when `announce` is true.
const CurrentLink = ({
  linkId,
  children: link,
  currentPageText = null,
  announce = true,
}) => (
  <StyledSpan
    // eslint-disable-next-line jsx-a11y/aria-role
    role={announce ? 'text' : undefined}
    // This is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
    id={announce ? `NavigationLinks-${linkId}` : undefined}
  >
    {announce && (
      <VisuallyHiddenText>{`${currentPageText}, `}</VisuallyHiddenText>
    )}
    {link}
  </StyledSpan>
);

export const NavigationUl = ({ children, ...props }) => (
  <StyledUnorderedList role="list" {...props}>
    {children}
  </StyledUnorderedList>
);

const getScrollableNavAncestor = element =>
  element.closest('[data-e2e^="scrollable-nav"]');

// Scrolls the focused nav link fully into view within its scrollable container.
// The container reserves space (scroll-padding-inline-end, see ScrollableNavigation)
// at the trailing edge to account for the fade-out gradient overlay, so a focused
// item is never left partially hidden behind it.
//
// We calculate the scroll adjustment manually, rather than relying on
// scrollIntoView's 'nearest' behaviour, since browsers don't always scroll a
// partially visible element fully into view (e.g. tabbing backwards to an item
// left partially obscured at the leading edge from a previous scroll).
const scrollLinkIntoView = event => {
  const link = event.currentTarget;
  const scrollContainer = getScrollableNavAncestor(link);

  if (!scrollContainer) return;

  const containerRect = scrollContainer.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();
  const { direction, scrollPaddingInlineEnd } =
    window.getComputedStyle(scrollContainer);
  const reservedEdgeWidth = parseFloat(scrollPaddingInlineEnd) || 0;

  // The gradient overlay sits on the trailing edge: right in ltr, left in rtl.
  const isRtl = direction === 'rtl';
  const visibleStart = isRtl
    ? containerRect.left + reservedEdgeWidth
    : containerRect.left;
  const visibleEnd = isRtl
    ? containerRect.right
    : containerRect.right - reservedEdgeWidth;

  const scrollAdjustment =
    // eslint-disable-next-line no-nested-ternary
    linkRect.left < visibleStart
      ? linkRect.left - visibleStart
      : linkRect.right > visibleEnd
        ? linkRect.right - visibleEnd
        : 0;

  if (scrollAdjustment !== 0) {
    scrollContainer.scrollBy({ left: scrollAdjustment, behavior: 'auto' });
  }
};

export const NavigationLi = ({
  children: link,
  url,
  clickTracker = null,
  currentPageText = null,
  active = false,
  // Controls whether the "current page" screen reader announcement is added
  // when this item is active. Callers should set this to false when an item
  // is marked active for categorisation purposes only (e.g. a fallback
  // highlight), rather than because the user is genuinely on that page.
  announceCurrentPage = true,
  dir = 'ltr',
  viewTracker = null,
  ...props
}) => {
  const shouldAnnounceCurrentPage =
    Boolean(active && announceCurrentPage && currentPageText);

  return (
    <StyledListItem dir={dir} role="listitem" {...viewTracker}>
      {active ? (
        <StyledLink
          href={url}
          currentLink
          // This is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
          {...(shouldAnnounceCurrentPage && {
            'aria-labelledby': `NavigationLinks-${link}`,
          })}
          aria-current={shouldAnnounceCurrentPage ? 'page' : undefined}
          className="focusIndicatorRemove"
          data-active="true"
          onFocus={scrollLinkIntoView}
          {...clickTracker}
          {...props}
        >
          <CurrentLink
            linkId={link}
            currentPageText={currentPageText}
            announce={shouldAnnounceCurrentPage}
          >
            {link}
          </CurrentLink>
        </StyledLink>
      ) : (
        <StyledLink
          href={url}
          className="focusIndicatorRemove"
          aria-current={undefined}
          onFocus={scrollLinkIntoView}
          {...clickTracker}
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
  ampOpenClass = '',
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
