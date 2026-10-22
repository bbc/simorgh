import React, { useState, use, useEffect, useCallback, useMemo } from 'react';
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
import { FOCUSABLE_ITEMS_SELECTOR } from './config';
import useStickyNavigation from './useStickyNavigation';
import styles from './index.styles';

const DROPDOWN_MAX_WIDTH_QUERY = `(max-width: ${GROUP_2_MAX_WIDTH_BP}rem)`;

// Walks the document forwards from the navigation and stops at the first
// focusable element outside it, rather than collecting every focusable
// element on what may be a very long article.
const findFirstFocusableAfter = (nav: HTMLElement) => {
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode: node =>
        node instanceof Element && node.matches(FOCUSABLE_ITEMS_SELECTOR)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_SKIP,
    },
  );
  walker.currentNode = nav;

  let candidate = walker.nextNode();
  while (candidate && nav.contains(candidate)) {
    candidate = walker.nextNode();
  }
  return candidate instanceof HTMLElement ? candidate : null;
};

type CanonicalNavigationContainerProps = {
  dir: Direction;
  menuAnnouncedText: string;
  topScrollableListItems: React.ReactNode;
  bottomScrollableListItems: React.ReactNode;
  dropdownListItems: React.ReactNode;
  blocks?: TopStoryItem[];
};

const CanonicalNavigationContainer = ({
  dir,
  menuAnnouncedText,
  topScrollableListItems,
  bottomScrollableListItems,
  dropdownListItems,
  blocks,
}: CanonicalNavigationContainerProps) => {
  const { isLite } = use(RequestContext);
  const { enabled: topBarOJsEnabled } = useToggle('topBarOJs');
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen(previous => !previous), []);

  const sticky = useStickyNavigation({ isOpen, closeMenu });
  const { navRef, navSlotRef, secondaryScrollRef, dropDownNavRef } = sticky;

  const handleDropdownBreakpointChange = useCallback(
    ({ matches }: MediaQueryList | MediaQueryListEvent) => {
      if (!matches) closeMenu();
    },
    [closeMenu],
  );
  useMediaQuery(DROPDOWN_MAX_WIDTH_QUERY, handleDropdownBreakpointChange);

  useEffect(() => {
    const dropDownNav = dropDownNavRef.current;
    if (!dropDownNav) return undefined;

    // Tabbing forward off the end of the open dropdown should continue into
    // the page content rather than repeating the links already shown in the
    // bar below it. Keyed off Tab rather than blur so that Shift+Tab still
    // walks backwards normally instead of being thrown forwards.
    const handleDropdownExit = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || event.shiftKey) return;

      const dropdownItems = dropDownNav.querySelectorAll(
        FOCUSABLE_ITEMS_SELECTOR,
      );
      const lastDropdownItem = dropdownItems[dropdownItems.length - 1];
      if (!lastDropdownItem || event.target !== lastDropdownItem) return;

      const nextPageItem =
        navRef.current && findFirstFocusableAfter(navRef.current);

      if (!nextPageItem) return;
      event.preventDefault();
      closeMenu();
      nextPageItem.focus();
    };

    dropDownNav.addEventListener('keydown', handleDropdownExit);
    return () => dropDownNav.removeEventListener('keydown', handleDropdownExit);
  }, [dropDownNavRef, navRef, closeMenu]);

  const topBarOJs = useMemo(
    () => topBarOJsEnabled && <TopBarOJs blocks={blocks ?? []} />,
    [topBarOJsEnabled, blocks],
  );
  // Scrolling updates the sticky state several times a second. Nothing in
  // this subtree depends on that state, so it is rebuilt only when something
  // it actually uses changes.
  const navigation = useMemo(
    () => (
      <Navigation dir={dir} isOpen={isOpen} ref={navRef}>
        <div css={styles.navStack}>
          <div css={styles.navRowWrapper}>
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
                  onClick={toggleMenu}
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
          <div css={styles.lowerNavWrapper}>
            <ScrollableNavigation
              ref={secondaryScrollRef}
              dir={dir}
              css={styles.bottomRowItems}
              navPosition="secondary"
            >
              {bottomScrollableListItems}
            </ScrollableNavigation>
          </div>
        </div>
        <div css={styles.bottomDivider} />
        {!sticky.isEnabled && topBarOJs}
      </Navigation>
    ),
    [
      dir,
      isOpen,
      isLite,
      menuAnnouncedText,
      topScrollableListItems,
      bottomScrollableListItems,
      dropdownListItems,
      sticky.isEnabled,
      topBarOJs,
      toggleMenu,
      navRef,
      dropDownNavRef,
      secondaryScrollRef,
    ],
  );

  if (!sticky.isEnabled) return navigation;

  return (
    <>
      <div
        ref={navSlotRef}
        style={sticky.isPinned ? { height: sticky.height } : undefined}
      >
        <div
          data-e2e="sticky-nav"
          data-sticky-visible={sticky.isVisible}
          hidden={sticky.isAwaitingFirstPaint}
          css={[
            sticky.isPinned && styles.stickyContainer,
            sticky.isVisible && styles.stickyVisible,
          ]}
          onTransitionEnd={sticky.onTransitionEnd}
          aria-hidden={sticky.isOffScreen || undefined}
          inert={sticky.isOffScreen || undefined}
        >
          {navigation}
        </div>
      </div>
      {topBarOJs && (
        <Navigation dir={dir} role="presentation">
          {topBarOJs}
        </Navigation>
      )}
    </>
  );
};

export default CanonicalNavigationContainer;
