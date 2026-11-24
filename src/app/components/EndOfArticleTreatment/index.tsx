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
import { Chevron, ChevronOrientation } from '#app/components/icons';
import Heading from '#app/components/Heading';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import ArticlePreviewCard from '#app/components/ArticlePreviewCard';
import { ArticleEndPreview } from '#app/components/ArticlePreviewCard/types';
import HomepageFallback from './HomepageFallback';
import styles from './index.module.scss';

type Props = {
  previews: ArticleEndPreview[];
  className?: string;
  children?: ReactNode;
};

const EndOfArticleTreatment = ({ previews, className, children }: Props) => {
  const { translations, dir } = use(ServiceContext);
  const copy = translations.endOfArticleTreatment;
  const previewCopy = translations.endOfArticlePreview;
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const scrollPane = useRef<HTMLUListElement>(null);
  const cards = useRef<(HTMLLIElement | null)[]>([]);
  const choices = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activePreview = previews[activeIndex];
  const slideCount = previews.length + 1;
  const showNavigation = previews.length > 0;
  const includeHomepageChoice = previews.length < 4;
  const choiceCount = previews.length + Number(includeHomepageChoice);

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
    if (index < 0 || index >= slideCount) return;
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
      [forward]: Math.min(index + 1, choiceCount - 1),
      [backward]: Math.max(index - 1, 0),
      Home: 0,
      End: choiceCount - 1,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    select(next);
    choices.current[next]?.focus();
  };

  if (!copy || !previewCopy) return null;
  const count = activePreview
    ? copy.position
        .replace('{current}', String(activeIndex + 1))
        .replace('{total}', String(choiceCount))
    : previewCopy.homepage;

  return (
    <section
      id="end-of-article-treatment"
      data-testid="end-of-article-treatment"
      aria-labelledby="end-of-article-heading"
      className={clsx(styles.section, className)}
    >
      <p className={styles.endLabel}>{copy.endLabel}</p>
      <Heading level={2} id="end-of-article-heading" className={styles.heading}>
        {copy.heading}
      </Heading>
      {previews.length > 0 && (
        <p className={styles.introduction}>{copy.introduction}</p>
      )}
      <div className={styles.interactive}>
        <ul
          id="article-end-previews"
          ref={scrollPane}
          className={styles.rail}
          data-single={slideCount === 1}
          aria-label={copy.chooseContent}
          onScroll={onScroll}
        >
          {previews.map((preview, index) => (
            <li
              key={preview.id}
              id={`article-end-slide-${preview.id}`}
              className={styles.slide}
              ref={element => {
                cards.current[index] = element;
              }}
              onFocusCapture={() => {
                if (index !== activeIndexRef.current) select(index, false);
              }}
            >
              <ArticlePreviewCard
                preview={preview}
                id={`article-end-${preview.id}`}
              />
            </li>
          ))}
          <li
            id="article-end-homepage-slide"
            className={styles.slide}
            ref={element => {
              cards.current[previews.length] = element;
            }}
            onFocusCapture={() => {
              if (activeIndexRef.current !== previews.length) {
                select(previews.length, false);
              }
            }}
          >
            <HomepageFallback id="article-end-homepage" />
          </li>
        </ul>
        {showNavigation && (
          <div className={styles.navigation}>
            <span className={styles.count}>{count}</span>
            <div className={styles.arrows}>
              <button
                type="button"
                className={styles.arrow}
                disabled={activeIndex === 0}
                onClick={() => select(activeIndex - 1)}
                aria-label={copy.previous}
                aria-controls="article-end-previews"
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
                disabled={activeIndex === slideCount - 1}
                onClick={() => select(activeIndex + 1)}
                aria-label={
                  activeIndex === previews.length - 1
                    ? previewCopy.homepage
                    : copy.next
                }
                aria-controls="article-end-previews"
              >
                <Chevron
                  orientation={ChevronOrientation.FORWARD}
                  dir={dir}
                  className={styles.chevron}
                />
              </button>
            </div>
          </div>
        )}
        {choiceCount > 1 && (
          <div className={styles.selection}>
            <Heading
              level={3}
              size="pica"
              id="article-end-choices-heading"
              className={styles.choicesHeading}
            >
              {previewCopy.related}
            </Heading>
            <ul
              className={styles.choices}
              aria-labelledby="article-end-choices-heading"
            >
              {previews.map((preview, index) => (
                <li key={preview.id}>
                  <button
                    type="button"
                    className={styles.choice}
                    aria-pressed={activeIndex === index}
                    aria-controls={`article-end-slide-${preview.id}`}
                    onClick={() => select(index)}
                    onKeyDown={event => navigateChoices(event, index)}
                    ref={element => {
                      choices.current[index] = element;
                    }}
                  >
                    {preview.title}
                  </button>
                </li>
              ))}
              {includeHomepageChoice && (
                <li>
                  <button
                    type="button"
                    className={styles.choice}
                    aria-pressed={!activePreview}
                    aria-controls="article-end-homepage-slide"
                    onClick={() => select(previews.length)}
                    onKeyDown={event => navigateChoices(event, previews.length)}
                    ref={element => {
                      choices.current[previews.length] = element;
                    }}
                  >
                    {previewCopy.homepage}
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
        <VisuallyHiddenText aria-live="polite" aria-atomic="true">
          {activePreview
            ? `${count}: ${activePreview.title}`
            : previewCopy.homepage}
        </VisuallyHiddenText>
      </div>
      <div className={styles.noJs}>
        {previews[0] && (
          <ArticlePreviewCard preview={previews[0]} id="article-end-no-js" />
        )}
        {previews.length > 1 && (
          <ul>
            {previews.slice(1).map(preview => (
              <li key={preview.id}>
                <a href={preview.href}>{preview.title}</a>
              </li>
            ))}
          </ul>
        )}
        <HomepageFallback id="article-end-no-js-homepage" />
      </div>
      {children && (
        <div className={styles.onwardJourneys} data-is-dark-ui="true">
          {children}
        </div>
      )}
    </section>
  );
};

export default EndOfArticleTreatment;
