import React, { useState, use, useEffect, useRef } from 'react';
import Navigation from '#psammead/psammead-navigation/src';
import { ScrollableNavigation } from '#psammead/psammead-navigation/src/ScrollableNavigation';
import {
  CanonicalDropdown,
  CanonicalMenuButton,
} from '#psammead/psammead-navigation/src/DropdownNavigation';
import { GROUP_2_MAX_WIDTH_BP } from '#app/components/ThemeProvider/mediaQueries';
import useMediaQuery from '#hooks/useMediaQuery';
import { RequestContext } from '#app/contexts/RequestContext';
import TopBarOJs from '#app/components/TopBarOJs';
import useToggle from '#app/hooks/useToggle';
import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import { Direction } from '#app/models/types/global';
import styles from './index.styles';

type CanonicalNavigationContainerProps = {
  dir: Direction;
  menuAnnouncedText: string;
  topScrollableListItems: React.ReactNode;
  bottomScrollableListItems: React.ReactNode;
  dropdownListItems: React.ReactNode;
  blocks?: TopStoryItem[];
};

const CanonicalNavigationContainer: React.FC<
  CanonicalNavigationContainerProps
> = ({
  dir,
  menuAnnouncedText,
  topScrollableListItems,
  bottomScrollableListItems,
  dropdownListItems,
  blocks,
}) => {
  const { isLite } = use(RequestContext);
  const { enabled: topBarOJsEnabled } = useToggle('topBarOJs');
  const [isOpen, setIsOpen] = useState(false);

  const dropDownNavRef = useRef<HTMLDivElement>(null);
  const bottomScrollableNavRef = useRef<HTMLDivElement>(null);

  useMediaQuery(`(max-width: ${GROUP_2_MAX_WIDTH_BP}rem)`, event => {
    if (!event.matches) {
      setIsOpen(false);
    }
  });

  useEffect(() => {
    const handleOnBlur = (event: Event) => {
      const currentTarget = event.currentTarget as HTMLElement | null;
      if (!currentTarget) return;

      const allFocusableItems = Array.from(
        document.querySelectorAll('a[href], button:not([disabled])'),
      );
      const lastDropdownIndex = allFocusableItems.indexOf(currentTarget);
      const itemsAfterDropdown = allFocusableItems.slice(lastDropdownIndex + 1);
      const nextPageItem = itemsAfterDropdown.find(
        item =>
          !currentTarget.contains(item) &&
          !bottomScrollableNavRef.current?.contains(item),
      );
      if (!nextPageItem) return;
      event.preventDefault();
      setIsOpen(false);
      (nextPageItem as HTMLElement).focus();
    };

    const dropDownNav = dropDownNavRef.current;
    const dropdownItems = dropDownNav?.querySelectorAll(
      'a[href], button:not([disabled])',
    );
    const lastDropdownItem = dropdownItems
      ? dropdownItems[dropdownItems.length - 1]
      : null;

    if (lastDropdownItem) {
      lastDropdownItem.addEventListener('blur', handleOnBlur);
    }

    return () => {
      if (lastDropdownItem) {
        lastDropdownItem.removeEventListener('blur', handleOnBlur);
      }
    };
  }, []);

  return (
    <Navigation dir={dir} isOpen={isOpen}>
      <div css={styles.navStack}>
        <div css={{ position: 'relative', width: '100%' }}>
          <div css={styles.topRow}>
            <ScrollableNavigation
              dir={dir}
              css={styles.topRowItems}
              navPosition="primary"
            >
              {topScrollableListItems}
            </ScrollableNavigation>
            {!isLite && (
              <CanonicalMenuButton
                css={styles.menuButton}
                announcedText={menuAnnouncedText}
                isOpen={isOpen}
                onClick={() => setIsOpen(!isOpen)}
                dir={dir}
              />
            )}
          </div>
          <div role="presentation" ref={dropDownNavRef}>
            <CanonicalDropdown isOpen={isOpen} css={styles.dropdown}>
              {dropdownListItems}
            </CanonicalDropdown>
          </div>
        </div>
        <div css={styles.lowerNavWrapper} ref={bottomScrollableNavRef}>
          <ScrollableNavigation
            dir={dir}
            css={styles.bottomRowItems}
            navPosition="secondary"
          >
            {bottomScrollableListItems}
          </ScrollableNavigation>
        </div>
      </div>
      <div css={styles.bottomDivider} />
      {topBarOJsEnabled && <TopBarOJs blocks={blocks ?? []} />}
    </Navigation>
  );
};

export default CanonicalNavigationContainer;
