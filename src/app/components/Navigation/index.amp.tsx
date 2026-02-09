/* eslint-disable @typescript-eslint/no-explicit-any */
import Navigation from '#src/app/components/Navigation';
import { ScrollableNavigation } from '#psammead/psammead-navigation/src/ScrollableNavigation';
import {
  AmpDropdown,
  AmpMenuButton,
} from '#psammead/psammead-navigation/src/DropdownNavigation';
import { GEL_GROUP_2_SCREEN_WIDTH_MAX } from '#psammead/gel-foundations/src/breakpoints';
import styled from '@emotion/styled';
import { AmpNavigationContainerProps } from './types';

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
}: AmpNavigationContainerProps) => (
  <Navigation
    script={script}
    service={service}
    dir={dir}
    id={NAVIGATION_ID}
    ampOpenClass={OPEN_CLASS_NAME as any}
    scrollableListItems={
      <StyledAmpScrollableNavigation dir={dir} id={SCROLLABLE_ID}>
        {scrollableListItems}
      </StyledAmpScrollableNavigation>
    }
    dropdownListItems={
      <AmpDropdown id={DROPDOWN_ID} data-e2e="dropdown-nav" hidden>
        {dropdownListItems}
      </AmpDropdown>
    }
    menuAnnouncedText={menuAnnouncedText}
    ampMenuButton={
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
    }
  />
);

export default AmpNavigationContainer;
