import { Theme } from '@emotion/react';
import {
  PointerEvent as ReactPointerEvent,
  use,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import CurationPromo from '#app/components/Curation/CurationPromo';
import { Chevron, ChevronOrientation } from '#app/components/icons';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { RequestContext } from '#app/contexts/RequestContext';
import useViewTracker from '#app/hooks/useViewTracker';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import { Summary } from '#app/models/types/curationData';
import { COMPONENT_NAME, HEADING_ID } from './constants';
import {
  getEffectiveCutoff,
  getOverridePreviousVisit,
  registerVisit,
} from './lastVisit';
import { filterSummaries } from './filterStories';
import { getDateRangeLabel, getDayKey } from './dateLabels';
import styles from './index.styles';

const SCROLL_TOLERANCE_PX = 1;
const SCROLL_FRACTION = 0.75;

type Props = {
  topStories?: Summary[] | null;
  className?: string;
};

const SinceLastVisited = ({ topStories, className }: Props) => {
  const { dir, translations, datetimeLocale } = use(ServiceContext);
  const { service, pathname } = use(RequestContext);
  const { heading, previous, next } = translations.sinceLastVisited || {};
  const previousLabel = previous || translations.pagination?.previousPage;
  const nextLabel = next || translations.pagination?.nextPage;

  const [summaries, setSummaries] = useState<Summary[]>([]);
  const listRef = useRef<HTMLUListElement>(null);
  const [canScrollStart, setCanScrollStart] = useState(false);
  const [canScrollEnd, setCanScrollEnd] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startX: number; startScroll: number } | null>(null);
  // Fractions of the track: thumb length and its start offset
  const [thumb, setThumb] = useState({ size: 1, offset: 0 });
  // Indexes of the promos in view and where each new day begins, as fractions of the track
  const [visible, setVisible] = useState({ start: 0, end: 0 });
  const [dayMarkers, setDayMarkers] = useState<number[]>([]);

  useEffect(() => {
    if (!heading || !service || !topStories?.length) return;

    const now = Date.now();
    const { SIMORGH_APP_ENV } = getEnvConfig();
    const overrideVisit = getOverridePreviousVisit(
      window.location.search,
      SIMORGH_APP_ENV,
      now,
    );
    const { cutoff } = getEffectiveCutoff(
      overrideVisit ?? registerVisit(service, now),
      now,
    );
    if (cutoff === null) {
      return;
    }
    const filtered = filterSummaries(topStories, {
      cutoff,
      now,
      currentPathname: pathname,
    });

    setSummaries(filtered);
  }, [heading, service, pathname, topStories]);

  const hasStories = summaries.length > 0;
  const summariesRef = useRef(summaries);
  summariesRef.current = summaries;

  const updateScrollState = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const scrolled = Math.abs(scrollLeft);
    const maxScroll = scrollWidth - clientWidth;
    const size = scrollWidth > 0 ? Math.min(1, clientWidth / scrollWidth) : 1;
    setThumb({
      size,
      offset:
        maxScroll > 0
          ? (Math.min(scrolled, maxScroll) / maxScroll) * (1 - size)
          : 0,
    });
    const listRect = el.getBoundingClientRect();
    const items = Array.from(el.children) as HTMLElement[];
    const inView = items.reduce<number[]>((indexes, item, index) => {
      const rect = item.getBoundingClientRect();
      const overlap =
        Math.min(rect.right, listRect.right) -
        Math.max(rect.left, listRect.left);
      if (overlap > rect.width / 2) indexes.push(index);
      return indexes;
    }, []);
    const start = inView.length ? inView[0] : 0;
    const end = inView.length ? inView[inView.length - 1] : 0;
    setVisible(current =>
      current.start === start && current.end === end ? current : { start, end },
    );
    const markers = items.reduce<number[]>((positions, item, index) => {
      const key = getDayKey(summariesRef.current[index]?.firstPublished);
      const previousKey = getDayKey(
        summariesRef.current[index - 1]?.firstPublished,
      );
      if (index > 0 && key !== previousKey) {
        positions.push(
          (dir === 'rtl'
            ? scrollWidth - item.offsetLeft - item.offsetWidth
            : item.offsetLeft) / scrollWidth,
        );
      }
      return positions;
    }, []);
    setDayMarkers(current =>
      current.length === markers.length &&
      current.every((value, i) => Math.abs(value - markers[i]) < 0.001)
        ? current
        : markers,
    );
    setCanScrollStart(scrolled > SCROLL_TOLERANCE_PX);
    setCanScrollEnd(scrolled + clientWidth + SCROLL_TOLERANCE_PX < scrollWidth);
  }, [dir]);

  useEffect(() => {
    const el = listRef.current;
    if (!el || !hasStories) return undefined;

    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(el);
    el.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();

    return () => {
      resizeObserver.disconnect();
      el.removeEventListener('scroll', updateScrollState);
    };
  }, [hasStories, updateScrollState]);

  const viewTracker = useViewTracker({
    componentName: COMPONENT_NAME,
    groupTracker: {
      name: heading ?? '',
      type: COMPONENT_NAME,
      itemCount: summaries.length,
    },
  });

  if (!hasStories || !heading) return null;

  const dateLabel = getDateRangeLabel(
    summaries[visible.start]?.firstPublished,
    summaries[visible.end]?.firstPublished,
    datetimeLocale || 'en',
  );

  const sign = dir === 'rtl' ? -1 : 1;

  const scrollToTrackFraction = (fraction: number, smooth: boolean) => {
    const el = listRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    el.scrollTo({
      left: sign * Math.max(0, Math.min(1, fraction)) * maxScroll,
      behavior: smooth ? 'smooth' : 'instant',
    });
  };

  const onTrackPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || event.target !== track) return;
    const rect = track.getBoundingClientRect();
    const fromStart =
      dir === 'rtl' ? rect.right - event.clientX : event.clientX - rect.left;
    // Centre the thumb on the click point
    const free = 1 - thumb.size;
    if (free <= 0) return;
    scrollToTrackFraction(
      (fromStart / rect.width - thumb.size / 2) / free,
      true,
    );
  };

  const onThumbPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = listRef.current;
    if (!el) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      startX: event.clientX,
      startScroll: Math.abs(el.scrollLeft),
    };
  };

  const onThumbPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = listRef.current;
    const track = trackRef.current;
    const drag = dragRef.current;
    if (!el || !track || !drag) return;
    const trackWidth = track.getBoundingClientRect().width;
    const freePx = trackWidth * (1 - thumb.size);
    if (freePx <= 0) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const deltaPx = (event.clientX - drag.startX) * sign;
    el.scrollTo({
      left: sign * (drag.startScroll + (deltaPx / freePx) * maxScroll),
      behavior: 'instant',
    });
  };

  const onThumbPointerUp = () => {
    dragRef.current = null;
  };

  const scroll = (direction: 'start' | 'end') => {
    const el = listRef.current;
    if (!el) return;
    const amount = el.clientWidth * SCROLL_FRACTION;
    const isForward =
      (direction === 'end' && dir === 'ltr') ||
      (direction === 'start' && dir === 'rtl');

    el.scrollBy({ left: isForward ? amount : -amount });
  };

  return (
    <section
      aria-labelledby={HEADING_ID}
      css={styles.section}
      className={className}
      data-testid="since-last-visited"
      dir={dir}
      {...viewTracker}
    >
      <h2 id={HEADING_ID} css={styles.heading}>
        {heading}
      </h2>
      <div css={styles.viewport}>
        <button
          type="button"
          css={[
            styles.scrollButton,
            !canScrollStart && !canScrollEnd && styles.scrollButtonHidden,
          ]}
          onClick={() => scroll('start')}
          disabled={!canScrollStart}
          aria-label={previousLabel}
          aria-controls={`${HEADING_ID}-list`}
          data-testid="since-last-visited-previous"
        >
          <Chevron orientation={ChevronOrientation.BACKWARD} dir={dir} />
        </button>
        <div css={styles.listWrapper}>
          {canScrollStart && (
            <span
              aria-hidden="true"
              css={(theme: Theme) => styles.fade(theme, 'start', dir)}
            />
          )}
          {canScrollEnd && (
            <span
              aria-hidden="true"
              css={(theme: Theme) => styles.fade(theme, 'end', dir)}
            />
          )}
          <ul
            id={`${HEADING_ID}-list`}
            ref={listRef}
            css={styles.list}
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}
            aria-labelledby={HEADING_ID}
          >
            {summaries.map((summary, index) => (
              <li key={summary.id} css={styles.item}>
                <CurationPromo
                  {...summary}
                  lazy
                  position={index}
                  eventTrackingData={{
                    componentName: COMPONENT_NAME,
                    groupTracker: {
                      name: heading,
                      type: COMPONENT_NAME,
                      itemCount: summaries.length,
                    },
                    itemTracker: {
                      type: `${COMPONENT_NAME}-promo`,
                      text: summary.title,
                      position: index + 1,
                      resourceId: summary.id,
                    },
                  }}
                />
              </li>
            ))}
          </ul>
          {(canScrollStart || canScrollEnd) && (
            <div
              ref={trackRef}
              css={styles.track}
              onPointerDown={onTrackPointerDown}
              data-testid="since-last-visited-scrollbar"
              aria-hidden="true"
            >
              {dayMarkers.map(position => (
                <span
                  key={position}
                  css={styles.dayMarker}
                  style={{ insetInlineStart: `${position * 100}%` }}
                />
              ))}
              <div
                css={styles.thumb}
                style={{
                  width: `${thumb.size * 100}%`,
                  insetInlineStart: `${thumb.offset * 100}%`,
                }}
                onPointerDown={onThumbPointerDown}
                onPointerMove={onThumbPointerMove}
                onPointerUp={onThumbPointerUp}
                onPointerCancel={onThumbPointerUp}
              >
                <span css={styles.thumbLabel}>{dateLabel}</span>
              </div>
            </div>
          )}
        </div>
        <button
          type="button"
          css={[
            styles.scrollButton,
            !canScrollStart && !canScrollEnd && styles.scrollButtonHidden,
          ]}
          onClick={() => scroll('end')}
          disabled={!canScrollEnd}
          aria-label={nextLabel}
          aria-controls={`${HEADING_ID}-list`}
          data-testid="since-last-visited-next"
        >
          <Chevron orientation={ChevronOrientation.FORWARD} dir={dir} />
        </button>
      </div>
    </section>
  );
};

export default SinceLastVisited;
