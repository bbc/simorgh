import {
  use,
  useRef,
  useState,
  useEffect,
  KeyboardEvent,
  ReactNode,
} from 'react';
import clsx from 'clsx';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { RequestContext } from '#app/contexts/RequestContext';
import { BumpLoader } from '#app/components/MediaLoader';
import { Chevron, ChevronOrientation } from '#app/components/icons';
import Heading from '#app/components/Heading';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import useNearViewport from '#app/hooks/useNearViewport';
import { ArticleEndItem } from './types';
import PromoCard from './PromoCard';
import styles from './index.module.scss';

type Props = {
  items: ArticleEndItem[];
  className?: string;
  isVisible?: boolean;
  children?: ReactNode;
};

const EndOfArticleTreatment = ({
  items,
  className,
  isVisible = true,
  children,
}: Props) => {
  const { translations, dir } = use(ServiceContext);
  const { nonce } = use(RequestContext);
  const copy = translations.endOfArticleTreatment;
  const [activeIndex, setActiveIndex] = useState(0);
  const isNearViewport = useNearViewport({
    elementId: 'end-of-article-treatment',
    rootMargin: '200px 0px',
  });
  const activeIndexRef = useRef(0);
  const scrollPane = useRef<HTMLUListElement>(null);
  const cards = useRef<(HTMLLIElement | null)[]>([]);
  const choices = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeItem = items[activeIndex] || items[0];

  const alignCard = (index: number, smooth = true) => {
    const pane = scrollPane.current;
    const card = cards.current[index];
    if (!pane || !card) return;
    const paneRect = pane.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const delta =
      dir === 'rtl'
        ? cardRect.right - paneRect.right
        : cardRect.left - paneRect.left;
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    pane.scrollTo({
      left: pane.scrollLeft + delta,
      behavior: smooth && !reducedMotion ? 'smooth' : 'instant',
    });
  };

  const select = (index: number, smooth = true) => {
    if (index < 0 || index >= items.length) return;
    if (index !== activeIndexRef.current) {
      activeIndexRef.current = index;
      setActiveIndex(index);
    }
    alignCard(index, smooth);
  };

  // Native scroll provides touch inertia and an actual next-card preview.
  const onScroll = () => {
    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      const pane = scrollPane.current;
      if (!pane) return;
      const paneRect = pane.getBoundingClientRect();
      const distances = cards.current.map(card => {
        if (!card) return Infinity;
        const rect = card.getBoundingClientRect();
        return Math.abs(
          dir === 'rtl'
            ? rect.right - paneRect.right
            : rect.left - paneRect.left,
        );
      });
      const nearest = distances.indexOf(Math.min(...distances));
      if (nearest >= 0 && nearest !== activeIndexRef.current) {
        activeIndexRef.current = nearest;
        setActiveIndex(nearest);
      }
    }, 120);
  };

  useEffect(() => {
    const pane = scrollPane.current;
    if (!pane || typeof ResizeObserver === 'undefined') return undefined;
    let width = pane.clientWidth;
    const observer = new ResizeObserver(() => {
      if (pane.clientWidth !== width) {
        width = pane.clientWidth;
        alignCard(activeIndexRef.current, false);
      }
    });
    observer.observe(pane);
    return () => {
      observer.disconnect();
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    };
    // Selection is read from the ref, avoiding jumps during a swipe.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dir]);

  const navigateChoices = (event: KeyboardEvent, index: number) => {
    const forward = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
    const backward = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
    const next = {
      [forward]: Math.min(index + 1, items.length - 1),
      [backward]: Math.max(index - 1, 0),
      Home: 0,
      End: items.length - 1,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    select(next);
    choices.current[next]?.focus();
  };

  if (!copy || items.length < 2) return null;
  const count = copy.position
    .replace('{current}', String(activeIndex + 1))
    .replace('{total}', String(items.length));

  return (
    <section
      id="end-of-article-treatment"
      data-testid="end-of-article-treatment"
      aria-labelledby="end-of-article-heading"
      className={clsx(styles.section, className)}
    >
      {items.some(item => item.media) && <BumpLoader nonce={nonce} />}
      <p className={styles.endLabel}>{copy.endLabel}</p>
      <Heading level={2} id="end-of-article-heading" className={styles.heading}>
        {copy.heading}
      </Heading>
      <p className={styles.introduction}>{copy.introduction}</p>
      <div className={styles.interactive}>
        <ul
          ref={scrollPane}
          className={styles.rail}
          aria-label={copy.chooseContent}
          onScroll={onScroll}
        >
          {items.map((item, index) => (
            <li
              key={item.id}
              className={styles.slide}
              ref={element => {
                cards.current[index] = element;
              }}
              onFocusCapture={() => {
                if (index !== activeIndexRef.current) select(index, false);
              }}
            >
              <PromoCard
                item={item}
                showPlayer={
                  isVisible && isNearViewport && index === activeIndex
                }
              />
            </li>
          ))}
        </ul>
        <div className={styles.navigation}>
          <span className={styles.count}>{count}</span>
          <div className={styles.arrows}>
            <button
              type="button"
              className={styles.arrow}
              disabled={activeIndex === 0}
              onClick={() => select(activeIndex - 1)}
              aria-label={copy.previous}
            >
              <Chevron
                orientation={ChevronOrientation.BACKWARD}
                dir={dir}
                className={styles.chevron}
              />
            </button>
            <button
              type="button"
              className={styles.arrow}
              disabled={activeIndex === items.length - 1}
              onClick={() => select(activeIndex + 1)}
              aria-label={copy.next}
            >
              <Chevron
                orientation={ChevronOrientation.FORWARD}
                dir={dir}
                className={styles.chevron}
              />
            </button>
          </div>
        </div>
        <ul className={styles.choices} aria-label={copy.chooseContent}>
          {items.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                className={styles.choice}
                aria-pressed={activeIndex === index}
                onClick={() => select(index)}
                onKeyDown={event => navigateChoices(event, index)}
                ref={element => {
                  choices.current[index] = element;
                }}
              >
                <span className={styles.choiceFormat}>
                  {String(index + 1).padStart(2, '0')} /{' '}
                  {copy.formats[item.format]}
                </span>
                {item.title}
              </button>
            </li>
          ))}
        </ul>
        <VisuallyHiddenText aria-live="polite" aria-atomic="true">
          {count}: {activeItem.title}
        </VisuallyHiddenText>
      </div>
      <ul className={styles.noJs}>
        {items.map(item => (
          <li key={item.id}>
            <a href={item.href}>
              {copy.formats[item.format]}: {item.title}
            </a>
          </li>
        ))}
      </ul>
      {children && (
        <div className={styles.onwardJourneys} data-is-dark-ui="true">
          {children}
        </div>
      )}
    </section>
  );
};

export default EndOfArticleTreatment;
