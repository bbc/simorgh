import React from 'react';
import Navigation from '@bbc/psammead-navigation';
import { node, string, shape } from 'prop-types';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import { ScrollableNavigation } from '@bbc/psammead-navigation/scrollable';
import { AmpDropdown, AmpMenuButton } from '@bbc/psammead-navigation/dropdown';
import { GEL_GROUP_2_SCREEN_WIDTH_MAX } from '@bbc/gel-foundations/breakpoints';
import styled from 'styled-components';

const DROPDOWN_ID = 'si-nav-dropdown-menu';
const NAVIGATION_ID = 'si-nav';
const SCROLLABLE_ID = 'si-nav-scrollable';
const HIDDEN_CLASS_NAME = 'si-nav-scrollable-hidden';
const OPEN_CLASS_NAME = 'si-nav-open';

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
  dir,
  menuAnnouncedText,
  scrollableListItems,
  dropdownListItems,
}) => (
  <Navigation
    script={script}
    service={service}
    dir={dir}
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
    <AmpDropdown id={DROPDOWN_ID} hidden>
      {dropdownListItems}
    </AmpDropdown>
    <StyledAmpScrollableNavigation dir={dir} id={SCROLLABLE_ID}>
      {scrollableListItems}
    </StyledAmpScrollableNavigation>
  </Navigation>
);

AmpNavigationContainer.propTypes = {
  service: string.isRequired,
  dir: string.isRequired,
  script: shape(scriptPropType).isRequired,
  scrollableListItems: node.isRequired,
  dropdownListItems: node.isRequired,
  menuAnnouncedText: string.isRequired,
};

export default AmpNavigationContainer;
