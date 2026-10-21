import React, { useState, use, useEffect, useRef, useCallback } from 'react';
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
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { SERVICES_WITH_STICKY_NAV } from './config';
import styles from './index.styles';

const STICKY_NAV_CLEARANCE = 65;
const STICKY_TRANSITION_DURATION = 400;
const STICKY_MIN_WIDTH_QUERY = '(min-width: 300px)';
const STICKY_MAX_WIDTH_QUERY = '(max-width: 1007px)';
const STICKY_REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const STICKY_LANDSCAPE_QUERY =
  '(orientation: landscape) and (max-height: 500px)';
// Native focus-driven corrective scrolling (e.g. the browser nudging the
// viewport to reveal a newly Tab-focused element) can span more than one
// animation frame and may fire several 'scroll' events before it settles.
// Ignore upward scroll direction for sticky nav activation for this long
// after a forward Tab press so none of those events are mistaken for the
// user intentionally scrolling up.
const FORWARD_TAB_SCROLL_SUPPRESSION_MS = 400;
const INITIAL_STICKY_STATE = { fixed: false, visible: false, height: 0 };
const INITIAL_STICKY_MEDIA_QUERY_STATE = {
  isStickyViewport: false,
  isWithinStickyMaxWidth: false,
  prefersReducedMotion: false,
  isStickyLandscapeConstrained: false,
};
const INITIAL_STICKY_ANIMATION_STATE = {
  positioned: false,
  visible: false,
  prepared: false,
};

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
  const { isLite, env, service, pageType } = use(RequestContext);
  const { enabled: topBarOJsEnabled } = useToggle('topBarOJs');
  const { enabled: stickyNavigationEnabled } = useToggle('stickyNavigation');
  const [stickyMediaQuery, setStickyMediaQuery] = useState(
    INITIAL_STICKY_MEDIA_QUERY_STATE,
  );
  const {
    isStickyViewport,
    isWithinStickyMaxWidth,
    prefersReducedMotion,
    isStickyLandscapeConstrained,
  } = stickyMediaQuery;
  const enableStickyNavigation =
    stickyNavigationEnabled &&
    env !== 'live' &&
    SERVICES_WITH_STICKY_NAV.includes(service) &&
    isStickyViewport &&
    isWithinStickyMaxWidth &&
    !prefersReducedMotion &&
    !isStickyLandscapeConstrained &&
    !isLite;
  const [isOpen, setIsOpen] = useState(false);
  const [stickyState, setStickyState] = useState(INITIAL_STICKY_STATE);
  const [stickyAnimation, setStickyAnimation] = useState(
    INITIAL_STICKY_ANIMATION_STATE,
  );
  const {
    positioned: isStickyPositioned,
    visible: isStickyVisible,
    prepared: isStickyPrepared,
  } = stickyAnimation;

  const navSlotRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const dropDownNavRef = useRef<HTMLDivElement>(null);
  const bottomScrollableNavRef = useRef<HTMLDivElement>(null);
  // Tabbing forward can make the browser nudge the viewport upward to reveal
  // the newly focused element, which otherwise looks identical to a
  // deliberate upward scroll. Holds the timestamp until which that should be
  // ignored for sticky nav activation purposes.
  const suppressForwardTabScrollUntilRef = useRef(0);

  const handleStickyViewportChange = useCallback(
    ({ matches }: MediaQueryList | MediaQueryListEvent) => {
      setStickyMediaQuery(previous => ({
        ...previous,
        isStickyViewport: matches,
      }));
      if (!matches) setIsOpen(false);
    },
    [],
  );
  useMediaQuery(STICKY_MIN_WIDTH_QUERY, handleStickyViewportChange);

  const handleStickyMaxWidthChange = useCallback(
    ({ matches }: MediaQueryList | MediaQueryListEvent) => {
      setStickyMediaQuery(previous => ({
        ...previous,
        isWithinStickyMaxWidth: matches,
      }));
      if (!matches) setIsOpen(false);
    },
    [],
  );
  useMediaQuery(STICKY_MAX_WIDTH_QUERY, handleStickyMaxWidthChange);

  const handleReducedMotionChange = useCallback(
    ({ matches }: MediaQueryList | MediaQueryListEvent) => {
      setStickyMediaQuery(previous => ({
        ...previous,
        prefersReducedMotion: matches,
      }));
      if (matches) setIsOpen(false);
    },
    [],
  );
  useMediaQuery(STICKY_REDUCED_MOTION_QUERY, handleReducedMotionChange);

  const handleStickyLandscapeChange = useCallback(
    ({ matches }: MediaQueryList | MediaQueryListEvent) => {
      setStickyMediaQuery(previous => ({
        ...previous,
        isStickyLandscapeConstrained: matches,
      }));
      if (matches) setIsOpen(false);
    },
    [],
  );
  useMediaQuery(STICKY_LANDSCAPE_QUERY, handleStickyLandscapeChange);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || event.shiftKey) return;
      suppressForwardTabScrollUntilRef.current =
        Date.now() + FORWARD_TAB_SCROLL_SUPPRESSION_MS;
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!enableStickyNavigation) {
      setStickyAnimation(INITIAL_STICKY_ANIMATION_STATE);
      return undefined;
    }

    if (!stickyState.fixed) {
      setStickyAnimation(previous => ({ ...previous, visible: false }));
      const timeout = window.setTimeout(
        () =>
          setStickyAnimation(previous => ({
            ...previous,
            positioned: false,
            prepared: false,
          })),
        STICKY_TRANSITION_DURATION,
      );
      return () => window.clearTimeout(timeout);
    }

    if (!stickyState.visible) {
      setStickyAnimation(previous => ({
        ...previous,
        positioned: true,
        prepared: true,
        visible: false,
      }));
      return undefined;
    }

    setStickyAnimation(previous => ({ ...previous, positioned: true }));

    const animationFrames = { first: 0, second: 0 };
    // Paint the fixed, off-screen position before starting the slide-in.
    animationFrames.first = window.requestAnimationFrame(() => {
      setStickyAnimation(previous => ({ ...previous, prepared: true }));
      animationFrames.second = window.requestAnimationFrame(() => {
        setStickyAnimation(previous => ({ ...previous, visible: true }));
      });
    });

    return () => {
      window.cancelAnimationFrame(animationFrames.first);
      window.cancelAnimationFrame(animationFrames.second);
    };
  }, [enableStickyNavigation, stickyState.fixed, stickyState.visible]);

  useEffect(() => {
    setStickyState(INITIAL_STICKY_STATE);
    if (!enableStickyNavigation) return undefined;

    const scrollState: {
      lastScrollY: number;
      fixed: boolean;
      animationFrame: number | null;
    } = {
      lastScrollY: window.scrollY,
      fixed: false,
      animationFrame: null,
    };

    const updateStickyNavigation = () => {
      scrollState.animationFrame = null;
      const slot = navSlotRef.current;
      const nav = navRef.current;
      if (!slot || !nav) return;

      const { scrollY } = window;
      const scrollingUp =
        scrollY < scrollState.lastScrollY &&
        Date.now() >= suppressForwardTabScrollUntilRef.current;
      const scrollingDown = scrollY > scrollState.lastScrollY;
      scrollState.lastScrollY = scrollY;

      const articleStart =
        pageType === ARTICLE_PAGE
          ? document.querySelector('main [data-sticky-nav-anchor]')
          : null;
      const reachedActivationPoint =
        pageType === ARTICLE_PAGE
          ? articleStart !== null &&
            articleStart.getBoundingClientRect().top <= 0
          : slot.getBoundingClientRect().bottom < -STICKY_NAV_CLEARANCE;
      const fixed =
        reachedActivationPoint && (scrollingUp || scrollState.fixed);
      const height =
        nav.getBoundingClientRect().height ||
        slot.getBoundingClientRect().height;

      if (scrollState.fixed && (!fixed || scrollingDown)) setIsOpen(false);
      scrollState.fixed = fixed;

      setStickyState(previous => {
        const visible =
          fixed && (scrollingUp || (!scrollingDown && previous.visible));
        if (
          previous.fixed === fixed &&
          previous.visible === visible &&
          previous.height === height
        ) {
          return previous;
        }
        return { fixed, visible, height };
      });
    };

    const handleScroll = () => {
      if (scrollState.animationFrame === null) {
        scrollState.animationFrame = window.requestAnimationFrame(
          updateStickyNavigation,
        );
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (scrollState.animationFrame !== null) {
        window.cancelAnimationFrame(scrollState.animationFrame);
      }
    };
  }, [enableStickyNavigation, pageType]);

  useMediaQuery(`(max-width: ${GROUP_2_MAX_WIDTH_BP}rem)`, event => {
    if (!event.matches) {
      setIsOpen(false);
    }
  });

  useEffect(() => {
    const { documentElement } = document;
    if (isStickyVisible) {
      documentElement.style.scrollPaddingTop = `${stickyState.height}px`;
    } else {
      documentElement.style.scrollPaddingTop = '';
    }
    return () => {
      documentElement.style.scrollPaddingTop = '';
    };
  }, [isStickyVisible, stickyState.height]);

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
          !dropDownNavRef.current?.contains(item) &&
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

  const topBarOJs = topBarOJsEnabled && <TopBarOJs blocks={blocks ?? []} />;
  const navigation = (
    <Navigation dir={dir} isOpen={isOpen} ref={navRef}>
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
      {!enableStickyNavigation && topBarOJs}
    </Navigation>
  );

  if (!enableStickyNavigation) return navigation;

  const hidden = isStickyPositioned && !isStickyVisible;

  return (
    <>
      <div
        ref={navSlotRef}
        style={isStickyPositioned ? { height: stickyState.height } : undefined}
      >
        <div
          data-e2e="sticky-nav"
          data-sticky-visible={isStickyVisible}
          hidden={isStickyPositioned && !isStickyPrepared}
          css={[
            isStickyPositioned && styles.stickyContainer,
            isStickyVisible && styles.stickyVisible,
          ]}
          onTransitionEnd={event => {
            if (
              event.target === event.currentTarget &&
              event.propertyName === 'transform' &&
              !stickyState.fixed
            ) {
              setStickyAnimation(previous => ({
                ...previous,
                positioned: false,
                prepared: false,
              }));
            }
          }}
          aria-hidden={hidden || undefined}
          inert={hidden || undefined}
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
