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
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { SERVICES_WITH_STICKY_NAV } from './config';
import styles from './index.styles';

const STICKY_NAV_CLEARANCE = 65;
const INITIAL_STICKY_STATE = { fixed: false, visible: false, height: 0 };

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
  const enableStickyNavigation =
    stickyNavigationEnabled &&
    (env === 'test' || env === 'local') &&
    SERVICES_WITH_STICKY_NAV.includes(service) &&
    !isLite;
  const [isOpen, setIsOpen] = useState(false);
  const [stickyState, setStickyState] = useState(INITIAL_STICKY_STATE);

  const navSlotRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const dropDownNavRef = useRef<HTMLDivElement>(null);
  const bottomScrollableNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStickyState(INITIAL_STICKY_STATE);
    if (!enableStickyNavigation) return undefined;

    const scrollState: {
      lastScrollY: number;
      keyboardNavigation: boolean;
      fixed: boolean;
      animationFrame: number | null;
    } = {
      lastScrollY: window.scrollY,
      keyboardNavigation: false,
      fixed: false,
      animationFrame: null,
    };

    const updateStickyNavigation = () => {
      scrollState.animationFrame = null;
      const slot = navSlotRef.current;
      const nav = navRef.current;
      if (!slot || !nav) return;

      const { scrollY } = window;
      const scrollingUp = scrollY < scrollState.lastScrollY;
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
      const fixed = reachedActivationPoint && !scrollState.keyboardNavigation;
      const { height } = nav.getBoundingClientRect();

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
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        scrollState.keyboardNavigation = true;
        if (scrollState.fixed) setIsOpen(false);
        scrollState.fixed = false;
        setStickyState(INITIAL_STICKY_STATE);
      }
    };
    const handlePointer = () => {
      scrollState.keyboardNavigation = false;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handlePointer);
    window.addEventListener('touchstart', handlePointer, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handlePointer);
      window.removeEventListener('touchstart', handlePointer);
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

  const hidden = stickyState.fixed && !stickyState.visible;

  return (
    <>
      <div
        ref={navSlotRef}
        style={stickyState.fixed ? { height: stickyState.height } : undefined}
      >
        <div
          data-e2e="sticky-nav"
          data-sticky-visible={stickyState.visible}
          css={[
            stickyState.fixed && styles.stickyContainer,
            stickyState.visible && styles.stickyVisible,
          ]}
          aria-hidden={hidden || undefined}
          inert={hidden || undefined}
        >
          {navigation}
        </div>
      </div>
      {topBarOJs && <Navigation dir={dir}>{topBarOJs}</Navigation>}
    </>
  );
};

export default CanonicalNavigationContainer;
