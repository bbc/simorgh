import {
  use,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  PointerEvent,
} from 'react';
import clsx from 'clsx';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { Recommendation } from '#app/models/types/onwardJourney';
import useLocation from '#app/hooks/useLocation';
import subscribeToMediaQuery from '#app/hooks/useMediaQuery/subscribeToMediaQuery';
import Heading from '#app/components/Heading';
import Text from '#app/components/Text';
import InlineLink from '#app/components/InlineLink';
import { UpArrowIcon } from '#app/components/icons';
import RecommendationsImage from '#app/components/Recommendations/RecommendationsPromoImage';
import { getPrototypeHref } from './utilities';
import styles from './index.module.scss';

type Props = {
  recommendations: Recommendation[];
  topic?: { name: string; href: string };
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

const SwipeableArticleRecommendations = ({ recommendations, topic }: Props) => {
  const { translations } = use(ServiceContext);
  const copy = translations.swipeableRecommendations;
  const location = useLocation();
  const headingId = useId();
  const endHeadingId = useId();
  const instructionsId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<'idle' | 'dragging' | Direction>('idle');
  const cardRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const dismissRef = useRef<HTMLButtonElement>(null);
  const endRef = useRef<HTMLElement>(null);
  const topicLinkRef = useRef<HTMLAnchorElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const gestureRef = useRef<Gesture | null>(null);
  const exitRef = useRef<Direction | null>(null);
  const navigatingRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const suppressClickRef = useRef(false);
  const focusEndRef = useRef(false);
  const activeArticle = recommendations[activeIndex];
  const hasArticles = Boolean(activeArticle);
  const topicLinkText = translations.topicDiscovery?.moreAboutTopic;
  const showTopicCta = Boolean(
    !activeArticle && topic && copy?.exploreHeading && topicLinkText,
  );

  useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  useEffect(() => {
    if (!activeArticle && focusEndRef.current) {
      (topicLinkRef.current ?? endRef.current)?.focus();
    }
  }, [activeArticle]);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack || typeof ResizeObserver === 'undefined') return undefined;
    let { width } = stack.getBoundingClientRect();
    const observer = new ResizeObserver(() => {
      const newWidth = stack.getBoundingClientRect().width;
      if (width !== newWidth) {
        width = newWidth;
        stack.style.removeProperty('--stack-min-height');
      }
    });
    observer.observe(stack);
    return () => observer.disconnect();
  }, [hasArticles]);

  const resetDrag = useCallback(() => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    gestureRef.current = null;
    cardRef.current?.style.removeProperty('--drag-progress');
  }, []);

  const finishExit = useCallback(() => {
    const direction = exitRef.current;
    if (!direction || navigatingRef.current) return;

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
  }, [activeArticle, location, resetDrag]);

  useEffect(() => {
    if (phase !== 'left' && phase !== 'right') return undefined;
    const card = cardRef.current;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const unsubscribe = subscribeToMediaQuery(mediaQuery, event => {
      if (event.matches) finishExit();
    });
    const cancelExit = (event: AnimationEvent) => {
      if (event.target !== card || event.animationName !== styles.swipeExit) {
        return;
      }
      if (mediaQuery.matches) {
        finishExit();
      } else {
        exitRef.current = null;
        resetDrag();
        setPhase('idle');
      }
    };
    card?.addEventListener('animationcancel', cancelExit);
    return () => {
      unsubscribe();
      card?.removeEventListener('animationcancel', cancelExit);
    };
  }, [phase, finishExit, resetDrag]);

  const exit = (direction: Direction) => {
    if (exitRef.current || !activeArticle) return;
    const stack = stackRef.current;
    if (stack) {
      stack.style.setProperty(
        '--stack-min-height',
        `${stack.getBoundingClientRect().height}px`,
      );
    }
    focusEndRef.current =
      controlsRef.current?.contains(document.activeElement) ||
      cardRef.current?.contains(document.activeElement) ||
      false;
    exitRef.current = direction;
    setPhase(direction);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finishExit();
    }
  };

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (
      exitRef.current ||
      !event.isPrimary ||
      (event.pointerType === 'mouse' && event.button !== 0)
    ) {
      return;
    }
    suppressClickRef.current = false;
    gestureRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      deltaX: 0,
      width: event.currentTarget.getBoundingClientRect().width,
      horizontal: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
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
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
        return;
      }
      gesture.horizontal = true;
      suppressClickRef.current = true;
      setPhase('dragging');
    }

    event.preventDefault();
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
      aria-labelledby={showTopicCta ? endHeadingId : headingId}
      data-testid="swipeable-recommendations"
    >
      {!showTopicCta && (
        <Heading level={2} size="greatPrimer" id={headingId}>
          {copy.heading}
        </Heading>
      )}
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
            <div ref={stackRef} className={styles.stack}>
              {recommendations
                .slice(activeIndex, activeIndex + 2)
                .map((article, index) => {
                  const isActive = index === 0;
                  return (
                    <article
                      key={article.id}
                      ref={isActive ? cardRef : undefined}
                      inert={!isActive}
                      aria-hidden={!isActive}
                      className={clsx(styles.card, {
                        [styles.active]: isActive,
                        [styles.preview]: !isActive,
                        [styles.promoting]: !isActive && phase === 'left',
                        [styles.dragging]: isActive && phase === 'dragging',
                        [styles.exitLeft]: isActive && phase === 'left',
                        [styles.exitRight]: isActive && phase === 'right',
                      })}
                      aria-describedby={isActive ? instructionsId : undefined}
                      onPointerDown={isActive ? onPointerDown : undefined}
                      onPointerMove={isActive ? onPointerMove : undefined}
                      onPointerUp={isActive ? onPointerUp : undefined}
                      onPointerCancel={event => {
                        if (event.pointerId === gestureRef.current?.pointerId) {
                          cancelDrag();
                        }
                      }}
                      onLostPointerCapture={event => {
                        // Touch capture handover can bubble a loss event from the image.
                        if (
                          event.target === event.currentTarget &&
                          event.pointerId === gestureRef.current?.pointerId &&
                          !event.currentTarget.hasPointerCapture(
                            event.pointerId,
                          )
                        ) {
                          cancelDrag();
                        }
                      }}
                      onDragStart={event => event.preventDefault()}
                      onAnimationEnd={event => {
                        if (
                          isActive &&
                          event.target === event.currentTarget &&
                          event.animationName === styles.swipeExit
                        ) {
                          finishExit();
                        }
                      }}
                    >
                      <RecommendationsImage image={article.image} lazyLoad />
                      {isActive && (
                        <div className={styles.dragFeedback} aria-hidden="true">
                          <span className={styles.dismissFeedback}>
                            {copy.dismiss}
                          </span>
                          <span className={styles.readFeedback}>
                            {copy.read}
                          </span>
                        </div>
                      )}
                      <div className={styles.content}>
                        <Text as="p" size="minion" className={styles.position}>
                          {copy.position
                            .replace(
                              '{current}',
                              String(activeIndex + index + 1),
                            )
                            .replace('{total}', String(recommendations.length))}
                        </Text>
                        <Heading level={3} size="greatPrimer">
                          <InlineLink
                            to={getPrototypeHref(article.href, location.search)}
                            text={article.title}
                            fontVariant="sansBold"
                            size="greatPrimer"
                            tabIndex={isActive ? undefined : -1}
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
                  );
                })}
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
              <span className={styles.leftArrow} aria-hidden="true">
                <UpArrowIcon />
              </span>
              {copy.dismiss}
            </button>
            <a
              href={articleHref}
              className={styles.read}
              aria-disabled={phase === 'left' || phase === 'right'}
              aria-label={`${copy.read}: ${activeArticle.title}`}
              onClick={event => {
                if (
                  event.button !== 0 ||
                  event.metaKey ||
                  event.ctrlKey ||
                  event.shiftKey ||
                  event.altKey
                ) {
                  return;
                }
                event.preventDefault();
                exit('right');
              }}
            >
              {copy.read}
              <span className={styles.rightArrow} aria-hidden="true">
                <UpArrowIcon />
              </span>
            </a>
          </div>
        </>
      ) : null}
      <Text
        as="p"
        role="status"
        id={endHeadingId}
        ref={endRef}
        tabIndex={activeArticle ? undefined : -1}
        size={showTopicCta ? 'greatPrimer' : 'pica'}
        fontVariant={showTopicCta ? 'sansBold' : 'sansRegular'}
        className={clsx(activeArticle ? styles.visuallyHidden : styles.end, {
          [styles.exploreHeading]: showTopicCta,
        })}
      >
        {activeArticle
          ? activeIndex > 0 && `${position}: ${activeArticle.title}`
          : (showTopicCta && copy.exploreHeading) || copy.end}
      </Text>
      {showTopicCta && topic && topicLinkText && (
        <div className={styles.controls}>
          <a
            ref={topicLinkRef}
            href={getPrototypeHref(topic.href, location.search)}
            className={styles.topicLink}
          >
            {topicLinkText.replace('{topic}', topic.name)}
          </a>
        </div>
      )}
    </section>
  );
};

export default SwipeableArticleRecommendations;
