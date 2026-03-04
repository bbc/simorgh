import React from 'react';
import Navigation from '#psammead/psammead-navigation/src';
import { ScrollableNavigation } from '#psammead/psammead-navigation/src/ScrollableNavigation';
import {
  AmpDropdown,
  AmpMenuButton,
} from '#psammead/psammead-navigation/src/DropdownNavigation';
import { GEL_GROUP_2_SCREEN_WIDTH_MAX } from '#psammead/gel-foundations/src/breakpoints';
import styled from '@emotion/styled';
import { Direction } from '#app/models/types/global';
import styles from './index.styles';

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

type AmpNavigationContainerProps = {
  dir: Direction;
  menuAnnouncedText: string;
  topScrollableListItems?: React.ReactNode;
  bottomScrollableListItems: React.ReactNode;
  dropdownListItems: React.ReactNode;
};

const AmpNavigationContainer: React.FC<AmpNavigationContainerProps> = ({
  dir,
  menuAnnouncedText,
  topScrollableListItems,
  bottomScrollableListItems,
  dropdownListItems,
}) => (
  <Navigation dir={dir} id={NAVIGATION_ID} ampOpenClass={OPEN_CLASS_NAME}>
    <div css={styles.navStack}>
      <div style={{ position: 'relative', width: '100%' }}>
        <div css={styles.topRow}>
          <StyledAmpScrollableNavigation
            dir={dir}
            css={styles.topRowItems}
            navPosition="primary"
          >
            {topScrollableListItems}
          </StyledAmpScrollableNavigation>
          <AmpMenuButton
            css={styles.menuButton}
            announcedText={menuAnnouncedText}
            onToggle={`
              ${DROPDOWN_ID}.toggleVisibility,
              ${SCROLLABLE_ID}.toggleClass(class=${HIDDEN_CLASS_NAME}),
              ${NAVIGATION_ID}.toggleClass(class=${OPEN_CLASS_NAME})
            `}
            dir={dir}
          />
        </div>
        <AmpDropdown
          id={DROPDOWN_ID}
          data-e2e="dropdown-nav"
          css={styles.dropdown}
          hidden
        >
          {dropdownListItems}
        </AmpDropdown>
      </div>
      <div css={styles.lowerNavWrapper}>
        <StyledAmpScrollableNavigation
          dir={dir}
          id={SCROLLABLE_ID}
          navPosition={null}
          css={styles.bottomRowItems}
        >
          {bottomScrollableListItems}
        </StyledAmpScrollableNavigation>
      </div>
    </div>
  </Navigation>
);

export default AmpNavigationContainer;
