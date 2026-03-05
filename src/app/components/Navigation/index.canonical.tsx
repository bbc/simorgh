import React, { useState, useRef, useEffect, use } from 'react';
import { css } from '@emotion/react';
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
  // Track which nav's dropdown is open: 'main', 'sticky', or null
  const [openDropdown, setOpenDropdown] = useState<null | 'main' | 'sticky'>(
    null,
  );
  const [showSticky, setShowSticky] = useState(false);
  // Refs and state for sticky nav
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isKeyboardNav, setIsKeyboardNav] = useState(false); // this is to prevent showing sticky nav when keyboard navigation is detected
  const navRef = useRef<HTMLDivElement>(null);
  const stickyNavRef = useRef<HTMLDivElement>(null);

  useMediaQuery(`(max-width: ${GROUP_2_MAX_WIDTH_BP}rem)`, event => {
    if (!event.matches) {
      setOpenDropdown(null);
    }
  });

  // Sticky nav scroll logic
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!navRef.current) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const navElement = navRef.current;
          if (!navElement) return;
          const mainNavBar = navElement.getBoundingClientRect();
          const { scrollY } = window;
          const scrollingUp = scrollY < lastScrollY; // detects scroll direction
          setLastScrollY(scrollY);
          // Only show sticky nav if nav is fully out of view and user is scrolling up
          // Hide sticky nav before original nav is visible (with threshold)
          const threshold = 70; // px, adjust for not seeing both original and sticky nav at the same time
          if (mainNavBar.bottom < -threshold && scrollingUp && !isKeyboardNav) {
            // do not show sticky nav if keyboard navigation is detected
            setShowSticky(true);
          } else {
            setShowSticky(false);
            setOpenDropdown(null); // Close dropdown when sticky nav hides
          }
          ticking = false; // the ticking flag is used to prevent multiple requestAnimationFrame calls from stacking up and causing performance issues during fast scrolling.
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastScrollY, isKeyboardNav]);

  // Keyboard navigation detection
  // do we need to add other keys?
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsKeyboardNav(true);
      }
    };
    const handlePointer = () => {
      setIsKeyboardNav(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handlePointer);
    window.addEventListener('touchstart', handlePointer);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handlePointer);
      window.removeEventListener('touchstart', handlePointer);
    };
  }, []);

  // Main nav (normal)
  const mainNav = (
    <Navigation
      dir={dir}
      isOpen={openDropdown === 'main'}
      ref={navRef}
      role="navigation"
    >
      <div css={styles.navStack}>
        <div style={{ position: 'relative', width: '100%' }}>
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
                isOpen={openDropdown === 'main'}
                onClick={() =>
                  setOpenDropdown(openDropdown === 'main' ? null : 'main')
                }
                dir={dir}
              />
            )}
          </div>
          <CanonicalDropdown
            isOpen={openDropdown === 'main'}
            css={styles.dropdown}
          >
            {dropdownListItems}
          </CanonicalDropdown>
        </div>
        <div css={styles.lowerNavWrapper}>
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

  // Sticky nav is rendered if it is not the lite site and if keyboard navigation has not been indicated with te tab key
  const stickyNav =
    !isLite && !isKeyboardNav ? (
      <div
        ref={stickyNavRef}
        css={css`
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 10000;
          background: inherit;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          pointer-events: ${showSticky ? 'auto' : 'none'};
          transform: ${showSticky ? 'translateY(0)' : 'translateY(-100%)'};
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          @media (prefers-reduced-motion: reduce) {
            transition: none;
          }
        `}
        aria-label="Sticky navigation"
        aria-hidden="true"
      >
        <Navigation
          dir={dir}
          isOpen={openDropdown === 'sticky'}
          role="navigation"
        >
          <div css={styles.navStack}>
            <div style={{ position: 'relative', width: '100%' }}>
              <div css={styles.topRow}>
                <ScrollableNavigation
                  dir={dir}
                  css={styles.topRowItems}
                  navPosition="primary"
                  isSticky
                >
                  {topScrollableListItems}
                </ScrollableNavigation>
                {!isLite && (
                  <CanonicalMenuButton
                    css={styles.menuButton}
                    announcedText={menuAnnouncedText}
                    isOpen={openDropdown === 'sticky'}
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === 'sticky' ? null : 'sticky',
                      )
                    }
                    dir={dir}
                  />
                )}
              </div>
              <CanonicalDropdown
                isOpen={openDropdown === 'sticky'}
                css={styles.dropdown}
                isSticky
              >
                {dropdownListItems}
              </CanonicalDropdown>
            </div>
            <div css={styles.lowerNavWrapper}>
              <ScrollableNavigation
                dir={dir}
                css={styles.bottomRowItems}
                navPosition="secondary"
                isSticky
              >
                {bottomScrollableListItems}
              </ScrollableNavigation>
            </div>
          </div>
          <div css={styles.bottomDivider} />
        </Navigation>
      </div>
    ) : null;

  return (
    <>
      {mainNav}
      {stickyNav}
    </>
  );
};

export default CanonicalNavigationContainer;
