import { useCallback, useEffect, useRef, useState, use } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { Chevron, ChevronOrientation } from '#app/components/icons';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { ComponentExperimentProps } from '#app/models/types/global';

import styles from './index.styles';

type ScrollableTabsProps = {
  tabs: { id: string; label: string }[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  labelledBy: string;
  experimentProps?: ComponentExperimentProps;
};

const ScrollableTabs = ({
  tabs,
  activeTabId,
  onTabChange,
  labelledBy,
  experimentProps,
}: ScrollableTabsProps) => {
  const { dir } = use(ServiceContext);
  const tabListRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [canScrollStart, setCanScrollStart] = useState(false);
  const [canScrollEnd, setCanScrollEnd] = useState(false);

  const getClickTrackerHandler = useClickTrackerHandler;

  const checkOverflow = useCallback(() => {
    const el = tabListRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const absScroll = Math.abs(scrollLeft);
    const isOverflowing = scrollWidth > clientWidth + 1;

    setHasOverflow(isOverflowing);
    setCanScrollStart(isOverflowing && absScroll > 0);
    setCanScrollEnd(isOverflowing && absScroll + clientWidth + 1 < scrollWidth);
  }, []);

  useEffect(() => {
    const el = tabListRef.current;
    if (!el) return undefined;

    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(el);

    const rafId = window.requestAnimationFrame(checkOverflow);

    el.addEventListener('scroll', checkOverflow);
    checkOverflow();

    return () => {
      window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      el.removeEventListener('scroll', checkOverflow);
    };
  }, [checkOverflow]);

  const scroll = (direction: 'start' | 'end') => {
    const el = tabListRef.current;
    if (!el) return;

    const scrollAmount = el.clientWidth * 0.75;
    const isForward =
      (direction === 'end' && dir === 'ltr') ||
      (direction === 'start' && dir === 'rtl');

    el.scrollBy({
      left: isForward ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div css={styles.wrapper}>
      <div
        css={[
          styles.scrollButtonWrapper,
          !hasOverflow && styles.scrollButtonWrapperHidden,
        ]}
      >
        <button
          type="button"
          css={styles.scrollButton}
          onClick={() => scroll('start')}
          disabled={!canScrollStart}
          aria-label="Scroll tabs left"
          data-testid="scroll-start"
        >
          <Chevron orientation={ChevronOrientation.BACKWARD} dir={dir} />
        </button>
        {canScrollStart && (
          <span css={styles.scrollButtonFadeStart} aria-hidden="true" />
        )}
      </div>

      <div
        ref={tabListRef}
        role="tablist"
        aria-labelledby={labelledBy}
        css={styles.tabList}
      >
        {tabs.map(tab => {
          const isActive = tab.id === activeTabId;

          const clickTrackerHandler = getClickTrackerHandler({
            componentName: `topic-discovery-tab-${tab.id}`,
            preventNavigation: true,
            ...(experimentProps && experimentProps),
          });

          return (
            <button
              {...(isActive && { 'aria-controls': `tabpanel-${tab.id}` })}
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              data-tab-id={tab.id}
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              css={[styles.tab, isActive && styles.tabActive]}
              onClick={event => {
                onTabChange(tab.id);
                clickTrackerHandler?.onClick?.(event);
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        css={[
          styles.scrollButtonWrapper,
          !hasOverflow && styles.scrollButtonWrapperHidden,
        ]}
      >
        {canScrollEnd && (
          <span css={styles.scrollButtonFadeEnd} aria-hidden="true" />
        )}
        <button
          type="button"
          css={styles.scrollButton}
          onClick={() => scroll('end')}
          disabled={!canScrollEnd}
          aria-label="Scroll tabs right"
          data-testid="scroll-end"
        >
          <Chevron orientation={ChevronOrientation.FORWARD} dir={dir} />
        </button>
      </div>
    </div>
  );
};

export default ScrollableTabs;
