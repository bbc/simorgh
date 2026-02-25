import React, { useState, useRef, useEffect, use } from 'react';
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
  const [showSticky, setShowSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isKeyboardNav, setIsKeyboardNav] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const stickyNavRef = useRef<HTMLDivElement>(null);

  useMediaQuery(`(max-width: ${GROUP_2_MAX_WIDTH_BP}rem)`, event => {
    if (!event.matches) {
      setIsOpen(false);
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
          const navRect = navElement.getBoundingClientRect();
          const { scrollY } = window;
          const scrollingUp = scrollY < lastScrollY;
          setLastScrollY(scrollY);
          // Only show sticky nav if nav is fully out of view and user is scrolling up
          // Hide sticky nav before original nav is visible (with threshold)
          const threshold = 65; // px, adjust for seamless merge
          if (navRect.bottom < -threshold && scrollingUp && !isKeyboardNav) {
            setShowSticky(true);
          } else {
            setShowSticky(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastScrollY, isKeyboardNav]);

  // Keyboard navigation detection
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
      isOpen={isOpen}
      ref={navRef}
      aria-hidden={showSticky}
      tabIndex={showSticky ? -1 : 0}
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
                isOpen={isOpen}
                onClick={() => setIsOpen(!isOpen)}
                dir={dir}
              />
            )}
          </div>
          <CanonicalDropdown isOpen={isOpen} css={styles.dropdown}>
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

  // Sticky nav (always rendered, animates in/out)
  const stickyNav =
    !isKeyboardNav && showSticky ? (
      <div
        ref={stickyNavRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 10000,
          background: 'inherit',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          pointerEvents: 'auto',
          transform: 'translateY(0)',
          transition: 'transform 0.4s cubic-bezier(.4,0,.2,1)',
        }}
        aria-label="Sticky navigation"
        role="navigation"
      >
        <Navigation dir={dir} isOpen={isOpen} role="navigation">
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
                    isOpen={isOpen}
                    onClick={() => setIsOpen(!isOpen)}
                    dir={dir}
                  />
                )}
              </div>
              <CanonicalDropdown isOpen={isOpen} css={styles.dropdown}>
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
