import React from 'react';
import Navigation from '#psammead/psammead-navigation/src';
import { bool, node, string, shape } from 'prop-types';
import { scriptPropType } from '#psammead/gel-foundations/src/prop-types';
import { ScrollableNavigation } from '#psammead/psammead-navigation/src/ScrollableNavigation';
import {
  AmpDropdown,
  AmpMenuButton,
} from '#psammead/psammead-navigation/src/DropdownNavigation';
import { GEL_GROUP_2_SCREEN_WIDTH_MAX } from '#psammead/gel-foundations/src/breakpoints';
import styled from '@emotion/styled';

const DROPDOWN_ID = 'si-nav-dropdown-menu';
const NAVIGATION_ID = 'si-nav';
const SCROLLABLE_ID = 'si-nav-scrollable';
const HIDDEN_CLASS_NAME = 'si-nav-scrollable-hidden';
const OPEN_CLASS_NAME = 'si-nav-open';

const StyledNavigation = styled(Navigation)`
  ${({ isLow }) =>
    isLow &&
    `
      > div:first-of-type {
        margin: unset;
      }
    `}
`;

const StyledAmpScrollableNavigation = styled(ScrollableNavigation)`
  &.${HIDDEN_CLASS_NAME} {
    @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
      display: none;
      visibility: hidden;
    }
  }
`;

const AmpNavigationContainer = ({
  script,
  service,
  isLow,
  dir,
  menuAnnouncedText,
  scrollableListItems,
  dropdownListItems,
}) => (
  <StyledNavigation
    script={script}
    service={service}
    dir={dir}
    isLow={isLow}
    id={NAVIGATION_ID}
    ampOpenClass={OPEN_CLASS_NAME}
  >
    <AmpMenuButton
      announcedText={menuAnnouncedText}
      onToggle={`
        ${DROPDOWN_ID}.toggleVisibility,
        ${SCROLLABLE_ID}.toggleClass(class=${HIDDEN_CLASS_NAME}),
        ${NAVIGATION_ID}.toggleClass(class=${OPEN_CLASS_NAME})
      `}
      dir={dir}
      script={script}
    />
    {/* Hidden attribute allows us to toggle visibility on the dropdown
    using AMP actions. */}
    <AmpDropdown id={DROPDOWN_ID} data-e2e="dropdown-nav" hidden>
      {dropdownListItems}
    </AmpDropdown>
    <StyledAmpScrollableNavigation dir={dir} id={SCROLLABLE_ID}>
      {scrollableListItems}
    </StyledAmpScrollableNavigation>
  </StyledNavigation>
);

AmpNavigationContainer.propTypes = {
  service: string.isRequired,
  isLow: bool.isRequired,
  dir: string.isRequired,
  script: shape(scriptPropType).isRequired,
  scrollableListItems: node.isRequired,
  dropdownListItems: node.isRequired,
  menuAnnouncedText: string.isRequired,
};

export default AmpNavigationContainer;
