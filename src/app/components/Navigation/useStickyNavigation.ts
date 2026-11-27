import {
  use,
  useCallback,
  useEffect,
  useRef,
  useState,
  type TransitionEvent,
} from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
import subscribeToMediaQuery from '#hooks/useMediaQuery/subscribeToMediaQuery';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import {
  FOCUSABLE_ITEMS_SELECTOR,
  STICKY_MIN_VIEWPORT_HEIGHT,
  STICKY_NAV_ARTICLE_START_SELECTOR,
  STICKY_NAV_EXIT_BUFFER_PX,
  STICKY_NAV_HIDE_SCROLL_DISTANCE_PX,
  STICKY_NAV_TAB_STOP_SELECTOR,
  STICKY_TRANSITION_DURATION_MS,
} from './config';

// Resizing fires in bursts, and only the bar's measured height can change as
// a result, so the work is deferred until the burst has settled.
const RESIZE_DEBOUNCE_MS = 150;
// tabbing forward can make the browser nudge the viewport by a pixel or two
// in either direction to reveal the focused element, which looks identical
// to a deliberate scroll
// assistive technology can cause the same corrections without a tab event
// keep the pinned position briefly while focus settles so the bar is not
// swept away mid-use by the browser's own scrolling
const FOCUS_SCROLL_SUPPRESSION_MS = 400;

// Every one of these has to hold before the bar is allowed to pin. Some
// qualify the viewport by matching ("wide enough to fit the bar"), others by
// not matching ("the reader has not asked for reduced motion"), so each one
// states which result it needs.
const STICKY_MEDIA_QUERIES = [
  { query: '(min-width: 300px)', qualifiesWhen: 'matches' },
  { query: '(max-width: 1007px)', qualifiesWhen: 'matches' },
  {
    query: `(min-height: ${STICKY_MIN_VIEWPORT_HEIGHT}px)`,
    qualifiesWhen: 'matches',
  },
  { query: '(prefers-reduced-motion: reduce)', qualifiesWhen: 'doesNotMatch' },
  {
    query: '(orientation: landscape) and (max-height: 500px)',
    qualifiesWhen: 'doesNotMatch',
  },
] as const;

type StickyMediaQuery = (typeof STICKY_MEDIA_QUERIES)[number];

const qualifies = ({ qualifiesWhen }: StickyMediaQuery, matches: boolean) =>
  qualifiesWhen === 'matches' ? matches : !matches;

/**
 * How far the bar has got through showing or hiding itself.
 *
 * - `idle` — not pinned; sitting in the normal page flow.
 * - `painting` — pinned just above the viewport, waiting for its first paint.
 *   The browser needs to have drawn the bar in its starting position before
 *   the transform changes, otherwise it jumps to the end with no slide.
 * - `offScreen` — pinned, painted and parked out of sight.
 * - `onScreen` — pinned and slid fully into view.
 */
type StickyPhase = 'idle' | 'painting' | 'offScreen' | 'onScreen';

// What the scroll position says the bar *ought* to be doing, as opposed to
// the phase above, which is where its animation has actually got to.
const INITIAL_SCROLL_STATE = {
  shouldBePinned: false,
  shouldBeVisible: false,
  height: 0,
};

/**
 * Keeps a ref in step with a value, so that long-lived listeners — which
 * subscribe once and would otherwise capture whatever the value was when
 * they were set up — can read the current one.
 */
const useLatestRef = <T>(value: T) => {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref;
};

type UseStickyNavigationProps = {
  isOpen: boolean;
  closeMenu: () => void;
  isExperimentEnabled: boolean;
};

/**
 * Drives the navigation bar that re-appears, pinned to the top of the
 * viewport, when the reader scrolls back up through an article.
 *
 * Returns the refs to attach to the markup, the flags describing how the bar
 * should currently be rendered, and the transition handler that retires it
 * once it has slid away.
 */
const useStickyNavigation = ({
  isOpen,
  closeMenu,
  isExperimentEnabled,
}: UseStickyNavigationProps) => {
  const { isLite, pageType } = use(RequestContext);

  // None of these can change without a new page load, so the viewport
  // listeners below are only ever attached on pages that could use them.
  const isSupported =
    isExperimentEnabled && pageType === ARTICLE_PAGE && !isLite;

  const [isViewportEligible, setIsViewportEligible] = useState(false);
  const isEnabled = isSupported && isViewportEligible;

  const [{ shouldBePinned, shouldBeVisible, height }, setScrollState] =
    useState(INITIAL_SCROLL_STATE);
  const [phase, setPhase] = useState<StickyPhase>('idle');
  const isVisibleRef = useLatestRef(phase === 'onScreen');
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  const navSlotRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const dropDownNavRef = useRef<HTMLDivElement>(null);
  const secondaryScrollRef = useRef<HTMLDivElement>(null);
  const isOpenRef = useLatestRef(isOpen);
  const closeMenuRef = useLatestRef(closeMenu);
  // timestamp until which leaving the pinned position is delayed while
  // focus settles after the browser scrolls its target into view
  const suppressScrollUntilRef = useRef(0);

  // ---------------------------------------------------------------------
  // Eligibility: does this viewport qualify for a sticky bar at all?
  // ---------------------------------------------------------------------

  useEffect(() => {
    if (!isSupported) return undefined;

    const mediaQueryLists = STICKY_MEDIA_QUERIES.map(({ query }) =>
      window.matchMedia(query),
    );
    // Mirrors each query's latest result. Updated from the change event
    // rather than re-read from the list, because a list reports its own
    // state rather than the one the event is announcing.
    const results = mediaQueryLists.map(({ matches }) => matches);
    const getIsEligible = () =>
      STICKY_MEDIA_QUERIES.every((mediaQuery, index) =>
        qualifies(mediaQuery, results[index]),
      );

    setIsViewportEligible(getIsEligible());

    const unsubscribes = mediaQueryLists.map((mediaQueryList, index) => {
      const handleChange = ({
        matches,
      }: MediaQueryList | MediaQueryListEvent) => {
        results[index] = matches;
        const isEligible = getIsEligible();
        setIsViewportEligible(isEligible);
        // The dropdown belongs to the sticky bar. If the viewport stops
        // qualifying while it is open, it would otherwise be left hanging
        // open on the normal, non-sticky navigation.
        if (!isEligible) closeMenuRef.current();
      };

      return subscribeToMediaQuery(mediaQueryList, handleChange);
    });

    return () => unsubscribes.forEach(unsubscribe => unsubscribe());
  }, [isSupported, closeMenuRef]);

  // ---------------------------------------------------------------------
  // Scroll tracking: what the reader's scroll position says the bar should
  // be doing.
  // ---------------------------------------------------------------------

  useEffect(() => {
    setScrollState(INITIAL_SCROLL_STATE);
    suppressScrollUntilRef.current = 0;
    if (!isEnabled) return undefined;

    // Cached DOM reads. Measuring these on every frame would force the
    // browser to recalculate layout in the middle of a scroll.
    const measurements = { height: 0, articleStart: null as Element | null };
    // Where the previous frame left off. `isPinned` and `isVisible` mirror
    // the committed state so that the checks below can read them without
    // re-subscribing, and so the scroll reset below has its own ground
    // truth to compare against instead of reaching into React's state from
    // inside an updater function, which must stay a pure calculation.
    const tracking = {
      lastScrollY: window.scrollY,
      isPinned: false,
      isVisible: false,
      downwardScrollStartY: null as number | null,
      isNavigatingByFocus: false,
      deliberateScrollUntil: 0,
    };
    // Outstanding scheduled work, cancelled on teardown.
    const pending = {
      animationFrame: null as number | null,
      resizeTimeout: 0,
      // See handleKeyDown below.
      suppressionRecheckTimeout: 0,
    };

    const resolveArticleStart = () => {
      if (!measurements.articleStart?.isConnected) {
        measurements.articleStart = document.querySelector(
          STICKY_NAV_ARTICLE_START_SELECTOR,
        );
      }
      return measurements.articleStart;
    };

    const measureHeight = () => {
      const slot = navSlotRef.current;
      const nav = navRef.current;
      if (!slot || !nav) return;
      measurements.height =
        nav.getBoundingClientRect().height ||
        slot.getBoundingClientRect().height;
    };

    const update = () => {
      pending.animationFrame = null;
      if (!navSlotRef.current || !navRef.current) return;

      const { scrollY } = window;
      const previousScrollY = tracking.lastScrollY;
      const now = Date.now();
      const hasScrolled = scrollY !== previousScrollY;
      const isDeliberateScroll = now < tracking.deliberateScrollUntil;
      // keep a continuous scroll gesture deliberate through its momentum
      if (hasScrolled && isDeliberateScroll) {
        tracking.deliberateScrollUntil = now + FOCUS_SCROLL_SUPPRESSION_MS;
      }
      // voiceover can move the viewport at the end of a region without
      // another focus event, so ignore direction changes until the reader
      // deliberately scrolls again
      const isWithinFocusSuppression = now < suppressScrollUntilRef.current;
      const isScrollingUp =
        scrollY < previousScrollY && !tracking.isNavigatingByFocus;
      const isScrollingDown =
        scrollY > previousScrollY && !tracking.isNavigatingByFocus;
      tracking.lastScrollY = scrollY;

      if (isScrollingUp) {
        tracking.downwardScrollStartY = null;
      } else if (
        isScrollingDown &&
        tracking.isVisible &&
        tracking.downwardScrollStartY === null
      ) {
        tracking.downwardScrollStartY = previousScrollY;
      }

      const anchorTop =
        resolveArticleStart()?.getBoundingClientRect().top ?? null;
      // The bar only appears once the reader has scrolled back up to the
      // start of the article body...
      const isPastEntryPoint = anchorTop !== null && anchorTop <= 0;
      // ...but has to be scrolled well clear of that point again before it
      // goes away. See STICKY_NAV_EXIT_BUFFER_PX.
      const isPastExitPoint =
        anchorTop !== null && anchorTop <= STICKY_NAV_EXIT_BUFFER_PX;
      // restore normal navigation at the page top even when the article
      // starts less than the exit buffer below the header
      // keep the focused bar available until focus leaves or the reader
      // deliberately scrolls, rather than hiding its controls mid-use
      const isAtPageTop = scrollY <= 0;
      // reading an open dropdown can nudge the viewport across the exit
      // threshold, so keep focused navigation pinned until deliberate
      // scrolling resumes or focus leaves it
      // the short suppression window also lets focus settle before returning
      // to the normal navigation at the page top
      const shouldKeepFocusedNavigationVisible =
        isVisibleRef.current &&
        (isWithinFocusSuppression ||
          (tracking.isNavigatingByFocus &&
            navRef.current.contains(document.activeElement)));
      const isPinned =
        shouldKeepFocusedNavigationVisible ||
        (tracking.isPinned
          ? (!isAtPageTop && isPastExitPoint) || isWithinFocusSuppression
          : isPastEntryPoint && isScrollingUp);

      // safari can commit a scroll before it reports focus on the bar
      // allow the existing focus window before making its controls inert
      // only a new scroll starts this wait so it expires if focus never arrives
      if (
        tracking.isVisible &&
        isVisibleRef.current &&
        !isPinned &&
        hasScrolled &&
        !isDeliberateScroll
      ) {
        suppressScrollUntilRef.current = now + FOCUS_SCROLL_SUPPRESSION_MS;
        window.clearTimeout(pending.suppressionRecheckTimeout);
        pending.suppressionRecheckTimeout = window.setTimeout(() => {
          if (pending.animationFrame === null) {
            pending.animationFrame = window.requestAnimationFrame(update);
          }
        }, FOCUS_SCROLL_SUPPRESSION_MS);
        return;
      }

      if (tracking.isPinned && !isPinned) closeMenuRef.current();
      tracking.isPinned = isPinned;

      const hasPassedHideDistance =
        tracking.downwardScrollStartY !== null &&
        scrollY - tracking.downwardScrollStartY >=
          STICKY_NAV_HIDE_SCROLL_DISTANCE_PX;
      const isVisible =
        isPinned &&
        (shouldKeepFocusedNavigationVisible ||
          isScrollingUp ||
          (tracking.isVisible && !hasPassedHideDistance));

      // The original and sticky navigation share the same menu state. If the
      // original navigation was left open, close it before the sticky copy
      // appears. This keeps the sticky dropdown closed until its own button
      // is clicked, while still allowing that button to open it afterwards.
      if (
        !tracking.isVisible &&
        isVisible &&
        !shouldKeepFocusedNavigationVisible &&
        isOpenRef.current
      ) {
        closeMenuRef.current();
      }

      // Reset eagerly, in the same tick as the transition that hides the
      // bar, rather than from a separate effect that only runs once React
      // has re-rendered and committed. That gives the row's horizontal
      // scroll nowhere to be read back from mid-transition, so the bar can
      // never be caught showing wherever it was last left.
      if (tracking.isVisible && !isVisible) {
        closeMenuRef.current();
        const secondaryScroll = secondaryScrollRef.current;
        if (secondaryScroll) secondaryScroll.scrollLeft = 0;
      }
      tracking.isVisible = isVisible;

      setScrollState(previous => {
        const isUnchanged =
          previous.shouldBePinned === isPinned &&
          previous.shouldBeVisible === isVisible &&
          previous.height === measurements.height;

        return isUnchanged
          ? previous
          : {
              shouldBePinned: isPinned,
              shouldBeVisible: isVisible,
              height: measurements.height,
            };
      });
    };

    const scheduleUpdate = () => {
      if (pending.animationFrame !== null) return;
      pending.animationFrame = window.requestAnimationFrame(update);
    };

    const handleRelayout = () => {
      measureHeight();
      scheduleUpdate();
    };

    const handleResize = () => {
      window.clearTimeout(pending.resizeTimeout);
      pending.resizeTimeout = window.setTimeout(
        handleRelayout,
        RESIZE_DEBOUNCE_MS,
      );
    };

    // a forward tab or assistive technology focus change can move out of
    // the dropdown and back to the page top, where the browser scrolls the
    // target fully into view rather than making a small correction
    // once the suppression window expires, recheck the actual scroll position
    // so the navigation can return to the normal document flow
    // this recheck must run even if no further scroll event arrives, otherwise
    // the bar can stay stuck in the state forced by the suppression window
    const suppressFocusScroll = () => {
      tracking.isNavigatingByFocus = true;
      tracking.downwardScrollStartY = null;
      suppressScrollUntilRef.current = Date.now() + FOCUS_SCROLL_SUPPRESSION_MS;
      window.clearTimeout(pending.suppressionRecheckTimeout);
      pending.suppressionRecheckTimeout = window.setTimeout(
        scheduleUpdate,
        FOCUS_SCROLL_SUPPRESSION_MS,
      );
    };

    const clearScrollSuppression = () => {
      tracking.isNavigatingByFocus = false;
      tracking.deliberateScrollUntil = Date.now() + FOCUS_SCROLL_SUPPRESSION_MS;
      suppressScrollUntilRef.current = 0;
      window.clearTimeout(pending.suppressionRecheckTimeout);
      scheduleUpdate();
    };

    // preserve the existing behaviour of revealing the bar when tabbing
    // backwards, while also protecting focus changes that have no tab event
    let isBackwardTab = false;
    const handleKeyDown = (event: KeyboardEvent) => {
      isBackwardTab = false;
      if (
        event.key !== 'Tab' ||
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey
      ) {
        return;
      }
      isBackwardTab = event.shiftKey;
      if (isBackwardTab) clearScrollSuppression();
      else suppressFocusScroll();
    };
    const handleScrollKeyDown = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.altKey ||
        (event.ctrlKey && !['Home', 'End'].includes(event.key)) ||
        (event.metaKey && !['ArrowUp', 'ArrowDown'].includes(event.key)) ||
        (event.shiftKey && event.key !== ' ') ||
        ![
          'ArrowUp',
          'ArrowDown',
          'PageUp',
          'PageDown',
          'Home',
          'End',
          ' ',
        ].includes(event.key)
      ) {
        return;
      }
      const { target } = event;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.closest('input, textarea, select') ||
          (event.key === ' ' && target.closest('button, [role="button"]')))
      ) {
        return;
      }
      clearScrollSuppression();
    };
    const handleFocusIn = () => {
      if (!isBackwardTab || navRef.current?.contains(document.activeElement)) {
        suppressFocusScroll();
      }
      isBackwardTab = false;
      scheduleUpdate();
    };
    let touchStart: { x: number; y: number } | undefined;
    const handleTouchStart = ({ touches }: TouchEvent) => {
      const [touch] = touches;
      touchStart = touch ? { x: touch.clientX, y: touch.clientY } : undefined;
    };
    // a deliberate gesture must still scroll normally immediately after
    // focusing a control, such as clicking the menu button
    const handlePointerScroll = (event: Event) => {
      const isInsideNavigation =
        event.target instanceof Node && navRef.current?.contains(event.target);
      if (
        event.defaultPrevented ||
        (event.type === 'pointerdown' && isInsideNavigation)
      ) {
        return;
      }
      // horizontal gestures in the navigation rows must not unpin the bar
      if (event.type === 'wheel') {
        const { deltaX, deltaY } = event as WheelEvent;
        if (
          deltaY === 0 ||
          (isInsideNavigation && Math.abs(deltaX) > Math.abs(deltaY))
        ) {
          return;
        }
      }
      if (event.type === 'touchmove' && isInsideNavigation && touchStart) {
        const [touch] = (event as TouchEvent).touches;
        if (
          touch &&
          (touch.clientY === touchStart.y ||
            Math.abs(touch.clientX - touchStart.x) >
              Math.abs(touch.clientY - touchStart.y))
        ) {
          return;
        }
      }
      isBackwardTab = false;
      clearScrollSuppression();
    };

    measureHeight();

    const navObserver = new ResizeObserver(handleRelayout);
    if (navRef.current) navObserver.observe(navRef.current);
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    // run before the dropdown's key handler, which can move focus itself
    window.addEventListener('keydown', handleKeyDown, true);
    // let controls prevent scrolling keys before releasing focus protection
    window.addEventListener('keydown', handleScrollKeyDown);
    document.addEventListener('focusin', handleFocusIn);
    window.addEventListener('wheel', handlePointerScroll, { passive: true });
    window.addEventListener('pointerdown', handlePointerScroll, {
      passive: true,
    });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handlePointerScroll, {
      passive: true,
    });

    return () => {
      navObserver.disconnect();
      window.clearTimeout(pending.resizeTimeout);
      window.clearTimeout(pending.suppressionRecheckTimeout);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('keydown', handleScrollKeyDown);
      document.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('wheel', handlePointerScroll);
      window.removeEventListener('pointerdown', handlePointerScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handlePointerScroll);
      if (pending.animationFrame !== null) {
        window.cancelAnimationFrame(pending.animationFrame);
      }
    };
  }, [isEnabled, isOpenRef, closeMenuRef, isVisibleRef]);

  // ---------------------------------------------------------------------
  // Animation: moving the bar between the page flow and the pinned position.
  // ---------------------------------------------------------------------

  useEffect(() => {
    if (!isEnabled) {
      setPhase('idle');
      return undefined;
    }

    if (!shouldBePinned) {
      // safari can scroll before reporting the newly focused control
      // keep the visible bar in place until the focus update is processed
      if (navRef.current?.contains(document.activeElement)) {
        if (
          isVisibleRef.current &&
          Date.now() < suppressScrollUntilRef.current
        ) {
          const timeout = window.setTimeout(
            () => setPhase('idle'),
            FOCUS_SCROLL_SUPPRESSION_MS,
          );
          return () => window.clearTimeout(timeout);
        }
        setPhase('idle');
        return undefined;
      }
      // Start sliding away. Dropping back out of fixed positioning has to
      // wait for that slide to finish, which is signalled by whichever of
      // these two arrives first:
      //   - onTransitionEnd below, which is the normal case; and
      //   - this timeout, covering the cases where no transition event ever
      //     arrives at all, such as the bar never having been painted on
      //     screen, or the tab sitting in the background.
      // Both settle on the same 'idle' phase, so whichever wins is harmless.
      setPhase(previous => (previous === 'onScreen' ? 'offScreen' : previous));
      const timeout = window.setTimeout(
        () => setPhase('idle'),
        STICKY_TRANSITION_DURATION_MS,
      );
      return () => window.clearTimeout(timeout);
    }

    if (!shouldBeVisible) {
      setPhase('offScreen');
      return undefined;
    }

    // Coming from the normal page flow the bar needs a frame to paint in its
    // starting position before it can animate; a bar that is already pinned
    // has done that already and goes straight to sliding in.
    setPhase(previous => (previous === 'idle' ? 'painting' : previous));
    const frames = { paint: 0, slideIn: 0 };
    frames.paint = window.requestAnimationFrame(() => {
      setPhase(previous => (previous === 'painting' ? 'offScreen' : previous));
      frames.slideIn = window.requestAnimationFrame(() => setPhase('onScreen'));
    });

    return () => {
      window.cancelAnimationFrame(frames.paint);
      window.cancelAnimationFrame(frames.slideIn);
    };
  }, [isEnabled, shouldBePinned, shouldBeVisible, isVisibleRef]);

  const isVisible = phase === 'onScreen';
  const isPinned = phase !== 'idle';

  useEffect(() => {
    if (isVisible) setHasBeenVisible(true);
  }, [isVisible]);

  // Retires the bar from fixed positioning the moment it has finished
  // sliding away, instead of waiting out the fallback timeout above.
  const onTransitionEnd = useCallback(
    (event: TransitionEvent<HTMLDivElement>) => {
      const hasFinishedSlidingAway =
        event.target === event.currentTarget &&
        event.propertyName === 'transform' &&
        !shouldBePinned;
      if (hasFinishedSlidingAway) setPhase('idle');
    },
    [shouldBePinned],
  );

  // ---------------------------------------------------------------------
  // accessibility: keeping focused content visible and the bar reachable
  // ---------------------------------------------------------------------

  useEffect(() => {
    const { documentElement } = document;
    documentElement.style.scrollPaddingTop = isVisible ? `${height}px` : '';
    return () => {
      documentElement.style.scrollPaddingTop = '';
    };
  }, [isVisible, height]);

  // scrollPaddingTop only covers the browser's own "scroll an off-screen
  // element into view" behaviour. Something already on screen when it takes
  // focus is left where it is, which can leave it sitting behind the bar.
  // Scroll back up by however much of it the bar covers.
  useEffect(() => {
    if (!isVisible) return undefined;

    const revealFocusedElement = ({ target }: FocusEvent) => {
      if (
        !(target instanceof HTMLElement) ||
        navRef.current?.contains(target)
      ) {
        return;
      }
      const obscuredBy = height - target.getBoundingClientRect().top;
      if (obscuredBy > 0) window.scrollBy(0, -obscuredBy);
    };

    document.addEventListener('focusin', revealFocusedElement);
    return () => document.removeEventListener('focusin', revealFocusedElement);
  }, [isVisible, height]);

  // visible links and the menu button must remain reachable while the bar
  // is pinned over the article
  // dropdown links become tab stops when the menu opens and are excluded
  // again when it closes, while scrollable row wrappers stay out of tab order
  // use an explicit tabindex="0" rather than leaving the attribute off
  // safari can limit keyboard navigation to form controls depending on the
  // "press tab to highlight each item on a webpage" setting, so plain links
  // may otherwise be skipped
  // setting tabindex explicitly keeps the visible controls reachable without
  // relying on those settings
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || !isVisible) return undefined;

    const dropDownNav = dropDownNavRef.current;
    const tabStops = Array.from(
      nav.querySelectorAll<HTMLElement>(STICKY_NAV_TAB_STOP_SELECTOR),
    );

    tabStops.forEach(tabStop => {
      const isControl = tabStop.matches(FOCUSABLE_ITEMS_SELECTOR);
      const isInClosedDropdown = !isOpen && dropDownNav?.contains(tabStop);
      tabStop.setAttribute(
        'tabindex',
        isControl && !isInClosedDropdown ? '0' : '-1',
      );
    });

    return () =>
      tabStops.forEach(tabStop => tabStop.removeAttribute('tabindex'));
  }, [isVisible, isOpen]);

  return {
    isEnabled,
    hasBeenVisible,
    /** Whether the bar is out of the page flow and fixed to the viewport. */
    isPinned,
    /** Pinned but not yet painted, so it must not be shown to anyone. */
    isAwaitingFirstPaint: phase === 'painting',
    /** Pinned but sitting out of sight above the viewport. */
    isOffScreen: phase === 'painting' || phase === 'offScreen',
    isVisible,
    height,
    navRef,
    navSlotRef,
    dropDownNavRef,
    secondaryScrollRef,
    onTransitionEnd,
  };
};

export default useStickyNavigation;
