import { useCallback, useEffect, useRef, useState, use } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { Chevron, ChevronOrientation } from '#app/components/icons';
import styles from './index.styles';

type ScrollableTabsProps = {
  tabs: { id: string; label: string }[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  labelledBy: string;
};

const ScrollableTabs = ({
  tabs,
  activeTabId,
  onTabChange,
  labelledBy,
}: ScrollableTabsProps) => {
  const { dir } = use(ServiceContext);
  const tabListRef = useRef<HTMLDivElement>(null);
  const [canScrollStart, setCanScrollStart] = useState(false);
  const [canScrollEnd, setCanScrollEnd] = useState(false);

  const checkOverflow = useCallback(() => {
    const el = tabListRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const absScroll = Math.abs(scrollLeft);

    setCanScrollStart(absScroll > 0);
    setCanScrollEnd(absScroll + clientWidth + 1 < scrollWidth);
  }, []);

  useEffect(() => {
    const el = tabListRef.current;
    if (!el) return undefined;

    el.addEventListener('scroll', checkOverflow);
    checkOverflow();

    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener('scroll', checkOverflow);
      resizeObserver.disconnect();
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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTabId);
    let nextIndex: number | null = null;

    if (event.key === 'ArrowRight') {
      nextIndex =
        dir === 'ltr'
          ? (currentIndex + 1) % tabs.length
          : (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (event.key === 'ArrowLeft') {
      nextIndex =
        dir === 'ltr'
          ? (currentIndex - 1 + tabs.length) % tabs.length
          : (currentIndex + 1) % tabs.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = tabs.length - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      const nextTab = tabs[nextIndex];
      onTabChange(nextTab.id);

      const tabEl = tabListRef.current?.querySelector(
        `[data-tab-id="${CSS.escape(nextTab.id)}"]`,
      ) as HTMLButtonElement | null;
      tabEl?.focus();
      tabEl?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  };

  return (
    <div css={styles.wrapper}>
      <button
        type="button"
        css={styles.scrollButton}
        onClick={() => scroll('start')}
        disabled={!canScrollStart}
        aria-hidden="true"
        tabIndex={-1}
        data-testid="scroll-start"
      >
        <Chevron orientation={ChevronOrientation.BACKWARD} dir={dir} />
      </button>

      <div
        ref={tabListRef}
        role="tablist"
        aria-labelledby={labelledBy}
        css={styles.tabList}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {tabs.map(tab => {
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              data-tab-id={tab.id}
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              css={[styles.tab, isActive && styles.tabActive]}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        css={styles.scrollButton}
        onClick={() => scroll('end')}
        disabled={!canScrollEnd}
        aria-hidden="true"
        tabIndex={-1}
        data-testid="scroll-end"
      >
        <Chevron orientation={ChevronOrientation.FORWARD} dir={dir} />
      </button>
    </div>
  );
};

export default ScrollableTabs;
