import React from 'react';
import { Direction } from '#app/models/types/global';
import NavigationWrapper from './NavigationWrapper';
import ScrollableNavigation from './ScrollableNavigation';
import { AmpDropdown, AmpMenuButton } from './DropdownNavigation';
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
  <NavigationWrapper
    dir={dir}
    id={NAVIGATION_ID}
    ampOpenClass={OPEN_CLASS_NAME}
  >
    <div css={styles.navStack}>
      <div css={{ position: 'relative', width: '100%' }}>
        <div css={styles.topRow}>
          <ScrollableNavigation dir={dir} navPosition="primary">
            {topScrollableListItems}
          </ScrollableNavigation>
          <AmpMenuButton
            announcedText={menuAnnouncedText}
            onToggle={`
              ${DROPDOWN_ID}.toggleVisibility,
              ${SCROLLABLE_ID}.toggleClass(class=${HIDDEN_CLASS_NAME}),
              ${NAVIGATION_ID}.toggleClass(class=${OPEN_CLASS_NAME})
            `}
            dir={dir}
          />
        </div>
        <AmpDropdown id={DROPDOWN_ID} hidden>
          {dropdownListItems}
        </AmpDropdown>
      </div>
      <div css={styles.lowerNavWrapper}>
        <ScrollableNavigation
          id={SCROLLABLE_ID}
          dir={dir}
          navPosition="secondary"
        >
          {bottomScrollableListItems}
        </ScrollableNavigation>
      </div>
    </div>
    <div css={styles.bottomDivider} />
  </NavigationWrapper>
);

export default AmpNavigationContainer;
