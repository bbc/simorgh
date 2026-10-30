import React, {
  useState,
  use,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
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
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dropdown = dropDownNavRef.current;
    if (!sticky.isVisible || !isOpen || !dropdown) return undefined;

    const preventPageScroll = (event: WheelEvent | TouchEvent) => {
      event.preventDefault();
    };

    dropdown.addEventListener('wheel', preventPageScroll, {
      passive: false,
    });
    dropdown.addEventListener('touchmove', preventPageScroll, {
      passive: false,
    });

    return () => {
      dropdown.removeEventListener('wheel', preventPageScroll);
      dropdown.removeEventListener('touchmove', preventPageScroll);
    };
  }, [isOpen, sticky.isVisible, dropDownNavRef]);

  const handleDropdownBreakpointChange = useCallback(
    ({ matches }: MediaQueryList | MediaQueryListEvent) => {
      if (!matches) closeMenu();
    },
    [closeMenu],
  );
  useMediaQuery(DROPDOWN_MAX_WIDTH_QUERY, handleDropdownBreakpointChange);

  // Not every browser moves focus to a button when it is clicked, which would
  // leave the reader's next Tab press carrying on from wherever they were
  // before — usually the top of the page — rather than continuing into the
  // dropdown they have just opened. Placing focus on the button explicitly
  // makes that next press land on the first item of the dropdown everywhere.
  useEffect(() => {
    if (isOpen) menuButtonRef.current?.focus();
  }, [isOpen]);

  // Closing the dropdown this way, rather than just letting it lose focus,
  // returns focus to the button that opened it so the reader isn't left
  // without a clear focus position once its contents are no longer reachable.
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      closeMenu();
      menuButtonRef.current?.focus();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeMenu]);

  // While the dropdown is open, Tab walks its items explicitly rather than
  // leaving it to the browser's own sequential navigation. Focus is moved by
  // calling focus() directly, which always works, instead of depending on
  // the items being in the browser's tab order — on macOS, keyboard
  // navigation is restricted to form controls unless the reader has turned
  // "Keyboard navigation" on, under which plain links are skipped entirely
  // and Tab would jump straight past the open dropdown into the article.
  useEffect(() => {
    const dropDownNav = dropDownNavRef.current;
    const nav = navRef.current;
    if (!isOpen || !dropDownNav || !nav) return undefined;

    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const items = Array.from(
        dropDownNav.querySelectorAll<HTMLElement>(FOCUSABLE_ITEMS_SELECTOR),
      );
      if (items.length === 0) return;

      // Focus sits on the menu button just after opening, so a forward Tab
      // from outside the dropdown enters it at the first item.
      const currentIndex = items.findIndex(
        item => item === document.activeElement,
      );
      const isInDropdown = currentIndex !== -1;
      if (!isInDropdown && event.shiftKey) return;

      const nextIndex = isInDropdown
        ? currentIndex + (event.shiftKey ? -1 : 1)
        : 0;

      if (nextIndex < 0) {
        // Back out of the top of the dropdown onto the button that opened it.
        event.preventDefault();
        menuButtonRef.current?.focus();
        return;
      }

      if (nextIndex < items.length) {
        event.preventDefault();
        items[nextIndex].focus();
        return;
      }

      // Past the last item, carry on into the page content rather than
      // repeating the links already shown in the bar below it.
      const nextPageItem = findFirstFocusableAfter(nav);
      if (!nextPageItem) return;
      event.preventDefault();
      closeMenu();
      nextPageItem.focus();
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isOpen, dropDownNavRef, navRef, closeMenu]);

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
                  ref={menuButtonRef}
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
      menuButtonRef,
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
