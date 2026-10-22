import {
  use,
  useCallback,
  useEffect,
  useRef,
  useState,
  type TransitionEvent,
} from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
import useToggle from '#app/hooks/useToggle';
import subscribeToMediaQuery from '#hooks/useMediaQuery/subscribeToMediaQuery';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import {
  SERVICES_WITH_STICKY_NAV,
  STICKY_MIN_VIEWPORT_HEIGHT,
  STICKY_NAV_EXIT_BUFFER_PX,
  STICKY_NAV_TAB_STOP_SELECTOR,
  STICKY_TRANSITION_DURATION_MS,
} from './config';

// Resizing fires in bursts, and only the bar's measured height can change as
// a result, so the work is deferred until the burst has settled.
const RESIZE_DEBOUNCE_MS = 150;
// Tabbing forward can make the browser nudge the viewport by a pixel or two,
// in either direction, to reveal the newly focused element, which looks
// identical to a deliberate scroll. Scroll position changes are ignored for
// this long after a forward Tab so that the bar isn't dragged into view, or
// swept away mid-use, by the browser's own correction.
const FORWARD_TAB_SCROLL_SUPPRESSION_MS = 400;
const ARTICLE_START_SELECTOR = 'main [data-sticky-nav-anchor]';

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
}: UseStickyNavigationProps) => {
  const { isLite, env, service, pageType } = use(RequestContext);
  const { enabled: stickyNavigationEnabled } = useToggle('stickyNavigation');

  // None of these can change without a new page load, so the viewport
  // listeners below are only ever attached on pages that could use them.
  const isSupported =
    stickyNavigationEnabled &&
    env !== 'live' &&
    pageType === ARTICLE_PAGE &&
    SERVICES_WITH_STICKY_NAV.includes(service) &&
    !isLite;

  const [isViewportEligible, setIsViewportEligible] = useState(false);
  const isEnabled = isSupported && isViewportEligible;

  const [{ shouldBePinned, shouldBeVisible, height }, setScrollState] =
    useState(INITIAL_SCROLL_STATE);
  const [phase, setPhase] = useState<StickyPhase>('idle');

  const navSlotRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const dropDownNavRef = useRef<HTMLDivElement>(null);
  const secondaryScrollRef = useRef<HTMLDivElement>(null);
  const isOpenRef = useLatestRef(isOpen);
  const closeMenuRef = useLatestRef(closeMenu);
  // Timestamp until which a scroll position change should not count as the
  // reader deliberately scrolling. See FORWARD_TAB_SCROLL_SUPPRESSION_MS.
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
          ARTICLE_START_SELECTOR,
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
      // See FORWARD_TAB_SCROLL_SUPPRESSION_MS: a forward Tab can make the
      // browser nudge the viewport by a pixel or two, in either direction,
      // to reveal the newly focused element. That nudge looks identical to
      // a deliberate scroll, so both the entry check below and the exit
      // check further down ignore scroll position changes for this long
      // after a forward Tab.
      const isWithinForwardTabSuppression =
        Date.now() < suppressScrollUntilRef.current;
      const isScrollingUp =
        scrollY < tracking.lastScrollY && !isWithinForwardTabSuppression;
      const isScrollingDown = scrollY > tracking.lastScrollY;
      tracking.lastScrollY = scrollY;

      const anchorTop =
        resolveArticleStart()?.getBoundingClientRect().top ?? null;
      // The bar only appears once the reader has scrolled back up to the
      // start of the article body...
      const isPastEntryPoint = anchorTop !== null && anchorTop <= 0;
      // ...but has to be scrolled well clear of that point again before it
      // goes away. See STICKY_NAV_EXIT_BUFFER_PX.
      const isPastExitPoint =
        anchorTop !== null && anchorTop <= STICKY_NAV_EXIT_BUFFER_PX;
      // Tabbing through an open dropdown's items is the main place an
      // incidental nudge (see above) could cross the exit threshold and
      // sweep the dropdown away mid-use, so a pinned bar also stays pinned
      // for the suppression window regardless of what the exit check says.
      const isPinned = tracking.isPinned
        ? isPastExitPoint || isWithinForwardTabSuppression
        : isPastEntryPoint && isScrollingUp;

      if (tracking.isPinned && !isPinned) closeMenuRef.current();
      tracking.isPinned = isPinned;

      const isVisible =
        isPinned &&
        (isOpenRef.current ||
          isScrollingUp ||
          (!isScrollingDown && tracking.isVisible));

      // Reset eagerly, in the same tick as the transition that hides the
      // bar, rather than from a separate effect that only runs once React
      // has re-rendered and committed. That gives the row's horizontal
      // scroll nowhere to be read back from mid-transition, so the bar can
      // never be caught showing wherever it was last left.
      if (tracking.isVisible && !isVisible) {
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

    // A forward Tab can carry focus somewhere the suppression window's
    // incidental-nudge allowance was never meant to cover — such as out of
    // the dropdown and onto an element back at the top of the page, which
    // the browser then deliberately scrolls fully into view. That's a
    // genuine scroll, not a pixel-or-two correction, so once the window
    // that was ignoring it elapses, the bar is re-checked against wherever
    // the scroll actually ended up. Without this, a Tab press that is the
    // last scroll event to fire leaves the bar stuck in whatever state the
    // suppression forced it into, since nothing else would ever ask again.
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || event.shiftKey) return;
      suppressScrollUntilRef.current =
        Date.now() + FORWARD_TAB_SCROLL_SUPPRESSION_MS;
      window.clearTimeout(pending.suppressionRecheckTimeout);
      pending.suppressionRecheckTimeout = window.setTimeout(
        scheduleUpdate,
        FORWARD_TAB_SCROLL_SUPPRESSION_MS,
      );
    };

    measureHeight();

    const navObserver = new ResizeObserver(handleRelayout);
    if (navRef.current) navObserver.observe(navRef.current);
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      navObserver.disconnect();
      window.clearTimeout(pending.resizeTimeout);
      window.clearTimeout(pending.suppressionRecheckTimeout);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      if (pending.animationFrame !== null) {
        window.cancelAnimationFrame(pending.animationFrame);
      }
    };
  }, [isEnabled, closeMenuRef, isOpenRef]);

  // ---------------------------------------------------------------------
  // Animation: moving the bar between the page flow and the pinned position.
  // ---------------------------------------------------------------------

  useEffect(() => {
    if (!isEnabled) {
      setPhase('idle');
      return undefined;
    }

    if (!shouldBePinned) {
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
  }, [isEnabled, shouldBePinned, shouldBeVisible]);

  const isVisible = phase === 'onScreen';

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
  // Accessibility: keeping the pinned bar out of the way of everyone who
  // isn't using a pointer.
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

  // The bar is a convenience overlay for pointer and touch readers scrolling
  // back up an article; keyboard users already reach these same links in
  // their normal document-order position. While it is pinned over the
  // content, take it out of the tab order so focus can never land on it.
  // The one exception is the dropdown menu: once the reader has opened it
  // (the hamburger button stays clickable throughout, just not reachable by
  // Tab), its items become the only tab stops in the bar, and are removed
  // again the moment the dropdown closes.
  //
  // Those items are given an explicit `tabindex="0"` rather than simply
  // having the attribute left off. macOS ships with keyboard navigation
  // limited to form controls by default — Safari's "Press Tab to highlight
  // each item on a webpage" — under which a plain `<a href>` is not a tab
  // stop at all, but one carrying an explicit tabindex still is. Setting it
  // outright means the open dropdown can be tabbed through on every
  // platform, rather than only where links happen to be tabbable.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || !isVisible) return undefined;

    const dropDownNav = dropDownNavRef.current;
    const tabStops = Array.from(
      nav.querySelectorAll<HTMLElement>(STICKY_NAV_TAB_STOP_SELECTOR),
    );

    tabStops.forEach(tabStop => {
      const isInOpenDropdown = isOpen && dropDownNav?.contains(tabStop);
      tabStop.setAttribute('tabindex', isInOpenDropdown ? '0' : '-1');
    });

    return () =>
      tabStops.forEach(tabStop => tabStop.removeAttribute('tabindex'));
  }, [isVisible, isOpen]);

  return {
    isEnabled,
    /** Whether the bar is out of the page flow and fixed to the viewport. */
    isPinned: phase !== 'idle',
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
