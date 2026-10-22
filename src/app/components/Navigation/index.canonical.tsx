import React, {
  useState,
  use,
  useEffect,
  useRef,
  useCallback,
  useMemo,
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
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { SERVICES_WITH_STICKY_NAV, STICKY_MIN_VIEWPORT_HEIGHT } from './config';
import styles from './index.styles';

const STICKY_TRANSITION_DURATION = 400;
const STICKY_MIN_WIDTH_QUERY = '(min-width: 300px)';
const STICKY_MAX_WIDTH_QUERY = '(max-width: 1007px)';
const STICKY_MIN_HEIGHT_QUERY = `(min-height: ${STICKY_MIN_VIEWPORT_HEIGHT}px)`;
const STICKY_REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const STICKY_LANDSCAPE_QUERY =
  '(orientation: landscape) and (max-height: 500px)';
const DROPDOWN_MAX_WIDTH_QUERY = `(max-width: ${GROUP_2_MAX_WIDTH_BP}rem)`;
// Native focus-driven corrective scrolling (e.g. the browser nudging the
// viewport to reveal a newly Tab-focused element) can span more than one
// animation frame and may fire several 'scroll' events before it settles.
// Ignore upward scroll direction for sticky nav activation for this long
// after a forward Tab press so none of those events are mistaken for the
// user intentionally scrolling up.
const FORWARD_TAB_SCROLL_SUPPRESSION_MS = 400;
// Once the sticky nav is showing, the user has to scroll up this much
// further past the entry point (roughly the bottom of the lead image)
// before it disappears again. Without this gap, scrolling up just enough to
// reveal the bar and then moving the mouse to click it can hide the bar out from under the cursor.
export const STICKY_NAV_EXIT_BUFFER = 500;
// Resizing fires in bursts. Only the bar's measured height can change as a
// result, so the work is deferred until the burst has settled.
const STICKY_RESIZE_DEBOUNCE_MS = 150;
const ARTICLE_START_SELECTOR = 'main [data-sticky-nav-anchor]';
const FOCUSABLE_ITEMS_SELECTOR = 'a[href], button:not([disabled])';
const INITIAL_STICKY_STATE = { fixed: false, visible: false, height: 0 };
const INITIAL_STICKY_MEDIA_QUERY_STATE = {
  isStickyViewport: false,
  isWithinStickyMaxWidth: false,
  isAboveStickyMinHeight: false,
  prefersReducedMotion: false,
  isStickyLandscapeConstrained: false,
};
const INITIAL_STICKY_ANIMATION_STATE = {
  positioned: false,
  visible: false,
  prepared: false,
};

const STICKY_MEDIA_QUERIES: {
  query: string;
  stateKey: keyof typeof INITIAL_STICKY_MEDIA_QUERY_STATE;
  closesMenuWhenMatching: boolean;
}[] = [
  {
    query: STICKY_MIN_WIDTH_QUERY,
    stateKey: 'isStickyViewport',
    closesMenuWhenMatching: false,
  },
  {
    query: STICKY_MAX_WIDTH_QUERY,
    stateKey: 'isWithinStickyMaxWidth',
    closesMenuWhenMatching: false,
  },
  {
    query: STICKY_MIN_HEIGHT_QUERY,
    stateKey: 'isAboveStickyMinHeight',
    closesMenuWhenMatching: false,
  },
  {
    query: STICKY_REDUCED_MOTION_QUERY,
    stateKey: 'prefersReducedMotion',
    closesMenuWhenMatching: true,
  },
  {
    query: STICKY_LANDSCAPE_QUERY,
    stateKey: 'isStickyLandscapeConstrained',
    closesMenuWhenMatching: true,
  },
];

// Walks the document forwards from the navigation and stops at the first
// focusable element outside it, rather than collecting every focusable
// element on what may be a very long article.
const findFirstFocusableAfter = (nav: HTMLElement) => {
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode: node =>
        (node as Element).matches(FOCUSABLE_ITEMS_SELECTOR)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_SKIP,
    },
  );
  walker.currentNode = nav;

  let candidate = walker.nextNode();
  while (candidate && nav.contains(candidate)) {
    candidate = walker.nextNode();
  }
  return candidate as HTMLElement | null;
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
    isAboveStickyMinHeight,
    prefersReducedMotion,
    isStickyLandscapeConstrained,
  } = stickyMediaQuery;
  // Whether sticky navigation could ever apply here. None of these can
  // change without a new page load, so the viewport listeners below are only
  // ever attached on the pages that can actually use them.
  const isStickyNavigationSupported =
    stickyNavigationEnabled &&
    env !== 'live' &&
    pageType === ARTICLE_PAGE &&
    SERVICES_WITH_STICKY_NAV.includes(service) &&
    !isLite;
  const enableStickyNavigation =
    isStickyNavigationSupported &&
    isStickyViewport &&
    isWithinStickyMaxWidth &&
    isAboveStickyMinHeight &&
    !prefersReducedMotion &&
    !isStickyLandscapeConstrained;
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
  const secondaryScrollRef = useRef<HTMLDivElement>(null);
  // Tabbing forward can make the browser nudge the viewport upward to reveal
  // the newly focused element, which otherwise looks identical to a
  // deliberate upward scroll. Holds the timestamp until which that should be
  // ignored for sticky nav activation purposes.
  const suppressForwardTabScrollUntilRef = useRef(0);
  // Read inside the scroll handler below, which only subscribes once and
  // would otherwise see a stale value of isOpen from when it was set up.
  const isOpenRef = useRef(isOpen);
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    if (!isStickyNavigationSupported) return undefined;

    const subscriptions = STICKY_MEDIA_QUERIES.map(
      ({ query, stateKey, closesMenuWhenMatching }) => {
        const mediaQueryList = window.matchMedia(query);
        const handleChange = ({
          matches,
        }: MediaQueryList | MediaQueryListEvent) => {
          setStickyMediaQuery(previous =>
            previous[stateKey] === matches
              ? previous
              : { ...previous, [stateKey]: matches },
          );
          if (matches === closesMenuWhenMatching) setIsOpen(false);
        };

        handleChange(mediaQueryList);

        if (mediaQueryList.addEventListener) {
          mediaQueryList.addEventListener('change', handleChange);
        } else {
          mediaQueryList.addListener(handleChange);
        }
        return { mediaQueryList, handleChange };
      },
    );

    return () =>
      subscriptions.forEach(({ mediaQueryList, handleChange }) => {
        if (mediaQueryList.removeEventListener) {
          mediaQueryList.removeEventListener('change', handleChange);
        } else {
          mediaQueryList.removeListener(handleChange);
        }
      });
  }, [isStickyNavigationSupported]);

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

    if (!stickyState.visible) {
      // The bar is going out of view, whether that's just sliding out of
      // sight while scrolling down (still pinned, ready to reappear), or
      // leaving the pinned state entirely. Either way, reset the secondary
      // row's horizontal scroll position so it shows its first items again
      // next time the bar appears, rather than wherever it was last left.
      const secondaryScroll =
        secondaryScrollRef.current?.querySelector<HTMLElement>(
          '[data-e2e="scrollable-nav-secondary"]',
        );
      if (secondaryScroll) secondaryScroll.scrollLeft = 0;
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
      height: number;
      articleStart: Element | null;
    } = {
      lastScrollY: window.scrollY,
      fixed: false,
      animationFrame: null,
      height: 0,
      articleStart: null,
    };

    // Looked up once and remembered, so that every scroll frame doesn't have
    // to search the whole article for the anchor again.
    const resolveArticleStart = () => {
      if (!scrollState.articleStart?.isConnected) {
        scrollState.articleStart = document.querySelector(
          ARTICLE_START_SELECTOR,
        );
      }
      return scrollState.articleStart;
    };

    // The bar's height only changes when the browser reflows it, so it is
    // measured on those events rather than on every scroll frame. Reading it
    // while scrolling would force the browser to recalculate layout mid-scroll.
    const measureHeight = () => {
      const slot = navSlotRef.current;
      const nav = navRef.current;
      if (!slot || !nav) return;
      scrollState.height =
        nav.getBoundingClientRect().height ||
        slot.getBoundingClientRect().height;
    };
    measureHeight();

    const updateStickyNavigation = () => {
      scrollState.animationFrame = null;
      if (!navSlotRef.current || !navRef.current) return;

      const { scrollY } = window;
      const scrollingUp =
        scrollY < scrollState.lastScrollY &&
        Date.now() >= suppressForwardTabScrollUntilRef.current;
      const scrollingDown = scrollY > scrollState.lastScrollY;
      scrollState.lastScrollY = scrollY;

      const articleStart = resolveArticleStart();
      const anchorTop = articleStart
        ? articleStart.getBoundingClientRect().top
        : null;
      // The point at which the bar first appears while scrolling up.
      const pastEntryPoint = anchorTop !== null && anchorTop <= 0;
      // A more generous version of the same point, used to decide when the
      // bar should disappear again. Scrolling up has to pass this point,
      // not just the entry point, before the bar is hidden.
      const pastExitPoint =
        anchorTop !== null && anchorTop <= STICKY_NAV_EXIT_BUFFER;
      const fixed = scrollState.fixed
        ? pastExitPoint
        : pastEntryPoint && scrollingUp;

      // An open dropdown is only ever closed by leaving the fixed state
      // entirely (scrolling back above the activation point), not by scroll
      // direction, so that scrolling down doesn't interrupt someone using it.
      if (scrollState.fixed && !fixed) setIsOpen(false);
      scrollState.fixed = fixed;

      setStickyState(previous => {
        const visible =
          fixed &&
          (isOpenRef.current ||
            scrollingUp ||
            (!scrollingDown && previous.visible));
        if (
          previous.fixed === fixed &&
          previous.visible === visible &&
          previous.height === scrollState.height
        ) {
          return previous;
        }
        return { fixed, visible, height: scrollState.height };
      });
    };

    const handleScroll = () => {
      if (scrollState.animationFrame === null) {
        scrollState.animationFrame = window.requestAnimationFrame(
          updateStickyNavigation,
        );
      }
    };

    const handleRelayout = () => {
      measureHeight();
      handleScroll();
    };

    let resizeTimeout = 0;
    const handleResize = () => {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(
        handleRelayout,
        STICKY_RESIZE_DEBOUNCE_MS,
      );
    };

    const navObserver = new ResizeObserver(handleRelayout);
    if (navRef.current) navObserver.observe(navRef.current);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      navObserver.disconnect();
      window.clearTimeout(resizeTimeout);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (scrollState.animationFrame !== null) {
        window.cancelAnimationFrame(scrollState.animationFrame);
      }
    };
  }, [enableStickyNavigation]);

  const handleDropdownBreakpointChange = useCallback(
    ({ matches }: MediaQueryList | MediaQueryListEvent) => {
      if (!matches) setIsOpen(false);
    },
    [],
  );
  useMediaQuery(DROPDOWN_MAX_WIDTH_QUERY, handleDropdownBreakpointChange);

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
  // scrollPaddingTop only covers the browser's own "scroll an off-screen
  // element into view" behaviour. Something already on screen when it takes
  // focus is left where it is, which can leave it sitting behind the fixed
  // bar. Scroll back up by whatever part of it the bar covers so the focused
  // element always ends up fully below the navigation.
  useEffect(() => {
    if (!isStickyVisible) return undefined;

    const revealFocusedElement = (event: FocusEvent) => {
      const { target } = event;
      if (
        !(target instanceof HTMLElement) ||
        navRef.current?.contains(target)
      ) {
        return;
      }
      const obscuredBy =
        stickyState.height - target.getBoundingClientRect().top;
      if (obscuredBy > 0) window.scrollBy(0, -obscuredBy);
    };

    document.addEventListener('focusin', revealFocusedElement);
    return () => document.removeEventListener('focusin', revealFocusedElement);
  }, [isStickyVisible, stickyState.height]);

  // The sticky bar is a convenience overlay for mouse/touch users scrolling
  // back up through an article; keyboard users already reach these same
  // links in their normal document-order position before the page is
  // scrolled. While the bar is pinned over the content, take it out of the
  // tab order so keyboard focus can never land on it, while leaving it
  // visible, hoverable and clickable for pointer and touch input.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || !isStickyVisible) return undefined;

    const focusableItems = Array.from(
      nav.querySelectorAll<HTMLElement>(FOCUSABLE_ITEMS_SELECTOR),
    );
    focusableItems.forEach(item => item.setAttribute('tabindex', '-1'));

    return () => {
      focusableItems.forEach(item => item.removeAttribute('tabindex'));
    };
  }, [isStickyVisible]);

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
      setIsOpen(false);
      nextPageItem.focus();
    };

    dropDownNav.addEventListener('keydown', handleDropdownExit);
    return () => dropDownNav.removeEventListener('keydown', handleDropdownExit);
  }, []);

  const toggleMenu = useCallback(() => setIsOpen(previous => !previous), []);

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
          <div css={styles.lowerNavWrapper} ref={secondaryScrollRef}>
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
    ),
    [
      dir,
      isOpen,
      isLite,
      menuAnnouncedText,
      topScrollableListItems,
      bottomScrollableListItems,
      dropdownListItems,
      enableStickyNavigation,
      topBarOJs,
      toggleMenu,
    ],
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
