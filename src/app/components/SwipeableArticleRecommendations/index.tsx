import { use, useEffect, useId, useRef, useState, PointerEvent } from 'react';
import clsx from 'clsx';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { Recommendation } from '#app/models/types/onwardJourney';
import useLocation from '#app/hooks/useLocation';
import Heading from '#app/components/Heading';
import Text from '#app/components/Text';
import InlineLink from '#app/components/InlineLink';
import RecommendationsImage from '#app/components/Recommendations/RecommendationsPromoImage';
import { getPrototypeHref } from './utilities';
import styles from './index.module.scss';

type Props = {
  recommendations: Recommendation[];
};

type Direction = 'left' | 'right';
type Gesture = {
  pointerId: number;
  startX: number;
  startY: number;
  deltaX: number;
  width: number;
  horizontal: boolean;
};

const EXIT_DURATION = 240;

const SwipeableArticleRecommendations = ({ recommendations }: Props) => {
  const { translations } = use(ServiceContext);
  const copy = translations.swipeableRecommendations;
  const location = useLocation();
  const headingId = useId();
  const instructionsId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<'idle' | 'dragging' | Direction>('idle');
  const cardRef = useRef<HTMLElement>(null);
  const dismissRef = useRef<HTMLButtonElement>(null);
  const endRef = useRef<HTMLElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const gestureRef = useRef<Gesture | null>(null);
  const exitRef = useRef<Direction | null>(null);
  const navigatingRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suppressClickRef = useRef(false);
  const focusEndRef = useRef(false);
  const activeArticle = recommendations[activeIndex];
  const nextArticle = recommendations[activeIndex + 1];

  useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    },
    [],
  );

  useEffect(() => {
    if (!activeArticle && focusEndRef.current) endRef.current?.focus();
  }, [activeArticle]);

  const resetDrag = () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    gestureRef.current = null;
    cardRef.current?.style.removeProperty('--drag-progress');
  };

  const finishExit = () => {
    const direction = exitRef.current;
    if (!direction || navigatingRef.current) return;
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    timerRef.current = null;

    if (direction === 'right') {
      navigatingRef.current = true;
      location.assign(getPrototypeHref(activeArticle.href, location.search));
    } else {
      exitRef.current = null;
      resetDrag();
      setPhase('idle');
      if (cardRef.current?.contains(document.activeElement)) {
        dismissRef.current?.focus();
      }
      setActiveIndex(index => index + 1);
    }
  };

  const exit = (direction: Direction) => {
    if (exitRef.current || !activeArticle) return;
    focusEndRef.current =
      controlsRef.current?.contains(document.activeElement) ||
      cardRef.current?.contains(document.activeElement) ||
      false;
    exitRef.current = direction;
    setPhase(direction);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finishExit();
    } else {
      timerRef.current = setTimeout(finishExit, EXIT_DURATION + 80);
    }
  };

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (exitRef.current || !event.isPrimary || event.button !== 0) return;
    suppressClickRef.current = false;
    gestureRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      deltaX: 0,
      width: event.currentTarget.getBoundingClientRect().width,
      horizontal: false,
    };
  };

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const gesture = gestureRef.current;
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - gesture.startX;
    const deltaY = event.clientY - gesture.startY;

    if (!gesture.horizontal) {
      if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 8) return;
      if (Math.abs(deltaY) >= Math.abs(deltaX)) {
        resetDrag();
        return;
      }
      gesture.horizontal = true;
      suppressClickRef.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      setPhase('dragging');
    }

    gesture.deltaX = deltaX;
    if (frameRef.current !== null) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      const currentGesture = gestureRef.current;
      if (currentGesture && currentGesture.width > 0) {
        cardRef.current?.style.setProperty(
          '--drag-progress',
          String(currentGesture.deltaX / currentGesture.width),
        );
      }
    });
  };

  const onPointerUp = (event: PointerEvent<HTMLElement>) => {
    const gesture = gestureRef.current;
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - gesture.startX;
    const committed =
      gesture.horizontal &&
      gesture.width > 0 &&
      Math.abs(deltaX) >= Math.min(gesture.width * 0.25, 100);
    gestureRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (committed) {
      exit(deltaX < 0 ? 'left' : 'right');
    } else {
      resetDrag();
      setPhase('idle');
    }
  };

  const cancelDrag = () => {
    if (exitRef.current) return;
    resetDrag();
    setPhase('idle');
  };

  if (!copy) return null;

  const position = copy.position
    .replace('{current}', String(activeIndex + 1))
    .replace('{total}', String(recommendations.length));
  const articleHref = activeArticle
    ? getPrototypeHref(activeArticle.href, location.search)
    : '';

  return (
    <section
      className={styles.wrapper}
      aria-labelledby={headingId}
      data-testid="swipeable-recommendations"
    >
      <Heading level={2} size="greatPrimer" id={headingId}>
        {copy.heading}
      </Heading>
      {activeArticle ? (
        <>
          <Text
            as="p"
            size="brevier"
            id={instructionsId}
            className={styles.instructions}
          >
            {copy.instructions}
          </Text>
          <div className={styles.viewport}>
            <div className={styles.stack}>
              {nextArticle && (
                <div className={styles.preview} aria-hidden="true">
                  <RecommendationsImage image={nextArticle.image} lazyLoad />
                </div>
              )}
              <article
                key={activeArticle.id}
                ref={cardRef}
                className={clsx(styles.card, {
                  [styles.dragging]: phase === 'dragging',
                  [styles.exitLeft]: phase === 'left',
                  [styles.exitRight]: phase === 'right',
                })}
                aria-describedby={instructionsId}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={cancelDrag}
                onLostPointerCapture={cancelDrag}
                onDragStart={event => event.preventDefault()}
                onTransitionEnd={event => {
                  if (
                    event.target === event.currentTarget &&
                    event.propertyName === 'transform'
                  ) {
                    finishExit();
                  }
                }}
              >
                <RecommendationsImage image={activeArticle.image} lazyLoad />
                <div className={styles.content}>
                  <Text as="p" size="minion" className={styles.position}>
                    {position}
                  </Text>
                  <Heading level={3} size="greatPrimer">
                    <InlineLink
                      to={articleHref}
                      text={activeArticle.title}
                      fontVariant="sansBold"
                      size="greatPrimer"
                      onClick={event => {
                        if (suppressClickRef.current || exitRef.current) {
                          event.preventDefault();
                          suppressClickRef.current = false;
                        }
                      }}
                      onKeyDown={event => {
                        if (event.key === 'Escape') cancelDrag();
                        suppressClickRef.current = false;
                      }}
                    />
                  </Heading>
                </div>
              </article>
            </div>
          </div>
          <div ref={controlsRef} className={styles.controls}>
            <button
              ref={dismissRef}
              type="button"
              className={styles.dismiss}
              aria-disabled={phase === 'left' || phase === 'right'}
              onClick={() => exit('left')}
            >
              {copy.dismiss}
            </button>
            <InlineLink
              to={articleHref}
              text={copy.read}
              size="brevier"
              fontVariant="sansBold"
              className={styles.read}
              aria-disabled={phase === 'left' || phase === 'right'}
              aria-label={`${copy.read}: ${activeArticle.title}`}
              onClick={event => {
                if (exitRef.current) event.preventDefault();
              }}
            />
          </div>
        </>
      ) : null}
      <Text
        as="p"
        role="status"
        ref={endRef}
        tabIndex={activeArticle ? undefined : -1}
        className={activeArticle ? styles.visuallyHidden : styles.end}
      >
        {activeArticle
          ? activeIndex > 0 && `${position}: ${activeArticle.title}`
          : copy.end}
      </Text>
    </section>
  );
};

export default SwipeableArticleRecommendations;
