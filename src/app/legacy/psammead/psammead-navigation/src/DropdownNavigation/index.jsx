import React, { cloneElement, useRef } from 'react';
import styled from '@emotion/styled';
import { navigationIcons } from '#psammead/psammead-assets/src/svgs';
import {
  GEL_SPACING_HLF,
  GEL_SPACING,
  GEL_SPACING_HLF_TRPL,
} from '#psammead/gel-foundations/src/spacings';
import { Helmet } from 'react-helmet';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_B_MIN_WIDTH,
} from '#psammead/gel-foundations/src/breakpoints';
import { getPica } from '#psammead/gel-foundations/src/typography';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import VisuallyHiddenText from '../../../../../components/VisuallyHiddenText';

export const NAV_BAR_TOP_BOTTOM_SPACING = 0.75; // 12px

const getStyles = (dir, theme) => {
  const direction = dir === 'ltr' ? 'left' : 'right';
  return `border-${direction}: ${GEL_SPACING_HLF} solid ${theme.palette.POSTBOX};
          padding-${direction}: ${GEL_SPACING};`;
};

const StyledDropdown = styled.div`
  background-color: ${props => props.theme.palette.WHITE};
  clear: both;
  overflow: hidden;

  height: 0;
  transition: all 0.2s ease-out;
  transition-timing-function: cubic-bezier(0, 0, 0.58, 1);

  ${({ height, isOpen }) =>
    isOpen
      ? `visibility: visible; height: ${height}px;`
      : `visibility: hidden;`}

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    display: none;
    visibility: hidden;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const CanonicalDropdown = ({ isOpen, children }) => {
  const heightRef = useRef(null);

  return (
    <StyledDropdown
      data-e2e="dropdown-nav"
      ref={heightRef}
      height={heightRef.current ? heightRef.current.scrollHeight : 0}
      isOpen={isOpen}
    >
      {children}
    </StyledDropdown>
  );
};

export const AmpDropdown = styled.div`
  background-color: ${props => props.theme.palette.WHITE};
  clear: both;

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    display: none;
    visibility: hidden;
  }
`;

export const DropdownUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0 ${GEL_SPACING};
  border-bottom: 0.0625rem solid ${props => props.theme.palette.GREY_3};
`;

DropdownUl.defaultProps = {
  role: 'list',
};

const StyledDropdownLi = styled.li`
  padding: 0.75rem 0;
  border-bottom: 0.0625rem solid ${props => props.theme.palette.GREY_3};

  &:last-child {
    padding-bottom: ${GEL_SPACING_HLF};
    border: 0;
  }
`;

const StyledDropdownLink = styled.a`
  ${({ script }) => script && getPica(script)};
  ${({ service }) => service && getSansRegular(service)}
  color: ${props => props.theme.palette.GREY_10};
  text-decoration: none;
  padding: ${GEL_SPACING_HLF_TRPL} 0;
  display: inline-block;

  &:hover,
  &:focus {
    text-decoration: underline;
    text-decoration-color: ${props => props.theme.palette.POSTBOX};
  }
`;

const StyledCurrentLink = styled.span`
  ${({ dir, theme }) => getStyles(dir, theme)}
`;

StyledCurrentLink.defaultProps = {
  role: 'text',
};

export const DropdownLi = ({
  children,
  script,
  clickTrackerHandler = null,
  currentPageText = null,
  active = false,
  service,
  url,
  dir = 'ltr',
  viewRef = null,
}) => {
  const ariaId = `dropdownNavigation-${children
    .replace(/\s+/g, '-')
    .toLowerCase()}`;
  return (
    // aria-labelledby is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
    <StyledDropdownLi role="listitem" ref={viewRef}>
      <StyledDropdownLink
        script={script}
        service={service}
        href={url}
        aria-labelledby={ariaId}
        onClick={clickTrackerHandler}
      >
        {active && currentPageText ? (
          // ID is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
          <StyledCurrentLink dir={dir} id={ariaId}>
            <VisuallyHiddenText>{`${currentPageText}, `}</VisuallyHiddenText>
            {children}
          </StyledCurrentLink>
        ) : (
          // ID is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
          <span id={ariaId}>{children}</span>
        )}
      </StyledDropdownLink>
    </StyledDropdownLi>
  );
};

const iconBorderPosition = `
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
`;

// The sideLength of the button should be
//  line height + top padding + bottom padding
const calculateButtonSide = lineHeight =>
  lineHeight / 16 + NAV_BAR_TOP_BOTTOM_SPACING * 2;

const getButtonDimensions = lineHeight =>
  `height: ${calculateButtonSide(lineHeight)}rem;
  width: ${calculateButtonSide(lineHeight)}rem;`;

const Button = ({ script, ...props }) => <button type="button" {...props} />;

const MenuButton = styled(Button)`
  position: relative;
  padding: 0;
  margin: 0;
  background-color: transparent;
  border: 0;

  ${({ dir }) => (dir === 'ltr' ? `float: left;` : `float: right;`)}
  ${({ script }) =>
    script && getButtonDimensions(script.pica.groupA.lineHeight)}

  &:hover,
  &:focus {
    cursor: pointer;
    box-shadow: inset 0 0 0 ${GEL_SPACING_HLF}
      ${props => props.theme.palette.WHITE};
    ::after {
      ${iconBorderPosition};
      border: ${GEL_SPACING_HLF} solid ${props => props.theme.palette.BLACK};
    }
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    display: none;
    visibility: hidden;
  }
  @media (min-width: ${GEL_GROUP_B_MIN_WIDTH}rem) {
    ${({ script }) =>
      script && getButtonDimensions(script.pica.groupB.lineHeight)}
  }

  & svg {
    vertical-align: middle;
  }
`;

export const CanonicalMenuButton = ({
  announcedText,
  isOpen,
  onClick,
  dir = 'ltr',
  script,
}) => (
  <MenuButton
    onClick={onClick}
    aria-expanded={isOpen ? 'true' : 'false'}
    dir={dir}
    script={script}
    className="focusIndicatorRemove"
  >
    {isOpen ? navigationIcons.cross : navigationIcons.hamburger}
    <VisuallyHiddenText>{announcedText}</VisuallyHiddenText>
  </MenuButton>
);

const AmpHead = () => (
  <Helmet>
    <script
      async
      custom-element="amp-bind"
      src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
    />
  </Helmet>
);

const expandedHandler =
  'AMP.setState({ menuState: { expanded: !menuState.expanded }})';

const initialState = { expanded: false };

export const AmpMenuButton = ({
  announcedText,
  onToggle,
  dir = 'ltr',
  script,
}) => (
  <>
    <AmpHead />
    <amp-state id="menuState">
      <script
        type="application/json"
        /* eslint-disable-next-line react/no-danger */
        dangerouslySetInnerHTML={{ __html: JSON.stringify(initialState) }}
      />
    </amp-state>
    <MenuButton
      aria-expanded="false"
      data-amp-bind-aria-expanded='menuState.expanded ? "true" : "false"'
      on={`tap:${expandedHandler},${onToggle}`}
      dir={dir}
      script={script}
      className="focusIndicatorRemove"
    >
      {cloneElement(navigationIcons.hamburger, {
        'data-amp-bind-hidden': 'menuState.expanded',
      })}
      {cloneElement(navigationIcons.cross, {
        hidden: true,
        'data-amp-bind-hidden': '!menuState.expanded',
      })}
      <VisuallyHiddenText>{announcedText}</VisuallyHiddenText>
    </MenuButton>
  </>
);
