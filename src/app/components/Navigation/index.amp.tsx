import React from 'react';
import Navigation from '#psammead/psammead-navigation/src';
import { ScrollableNavigation } from '#psammead/psammead-navigation/src/ScrollableNavigation';
import {
  AmpDropdown,
  AmpMenuButton,
} from '#psammead/psammead-navigation/src/DropdownNavigation';
import { Direction } from '#app/models/types/global';
import styles, { HIDDEN_CLASS_NAME } from './index.styles';

const DROPDOWN_ID = 'si-nav-dropdown-menu';
const NAVIGATION_ID = 'si-nav';
const SCROLLABLE_ID = 'si-nav-scrollable';
const OPEN_CLASS_NAME = 'si-nav-open';

type AmpNavigationContainerProps = {
  dir: Direction;
  menuAnnouncedText: string;
  topScrollableListItems: React.ReactNode;
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
          <ScrollableNavigation
            dir={dir}
            css={[styles.topRowItems, styles.ampScrollableNav]}
            navPosition="primary"
          >
            {topScrollableListItems}
          </ScrollableNavigation>
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
        <ScrollableNavigation
          id={SCROLLABLE_ID}
          dir={dir}
          css={[styles.bottomRowItems, styles.ampScrollableNav]}
          navPosition="secondary"
        >
          {bottomScrollableListItems}
        </ScrollableNavigation>
      </div>
    </div>
  </Navigation>
);

export default AmpNavigationContainer;
