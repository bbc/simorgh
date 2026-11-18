import { use, type MouseEvent } from 'react';
import clsx from 'clsx';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useHydrationDetection from '#app/hooks/useHydrationDetection';
import useOperaMiniDetection from '#app/hooks/useOperaMiniDetection';
import Heading from '#app/components/Heading';
import Paragraph from '#app/components/Paragraph';
import {
  Chevron,
  ChevronOrientation,
  DownArrowIcon,
} from '#app/components/icons';
import styles from './index.module.scss';
import type { ArticleEndDestination } from './types';

export {
  TOPIC_DISCOVERY_TARGET,
  PORTRAIT_VIDEO_TARGET,
  RELATED_CONTENT_TARGET,
  MOST_READ_TARGET,
  COUNTRY_CURATION_TARGET,
  MEDIA_CURATION_TARGET,
} from './types';

type Props = {
  destinations: ArticleEndDestination[];
  className?: string;
};

const focusDestination = (event: MouseEvent<HTMLAnchorElement>) => {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  )
    return;

  const { hash } = event.currentTarget;
  if (!hash) return;
  const destination = document.getElementById(hash.slice(1));
  if (!destination) return;

  // Keep the real fragment as a no-JS fallback, but do not change the URL or
  // browser history when enhancing the jump with scrolling and keyboard focus.
  event.preventDefault();
  const stickyNavigation = document.querySelector<HTMLElement>(
    '[data-e2e="sticky-nav"]',
  );
  destination.style.setProperty(
    '--article-end-navigation-offset',
    `${stickyNavigation?.getBoundingClientRect().height || 0}px`,
  );
  const heading = destination.querySelector<HTMLElement>('h2');
  const focusTarget = heading || destination;
  if (!focusTarget.hasAttribute('tabindex')) {
    focusTarget.setAttribute('tabindex', '-1');
  }
  focusTarget.focus({ preventScroll: true });
  destination.scrollIntoView({ behavior: 'auto', block: 'start' });
};

const EndOfArticleNavigation = ({ destinations, className }: Props) => {
  const { translations, service, dir } = use(ServiceContext);
  const isHydrated = useHydrationDetection();
  const isOperaMini = useOperaMiniDetection();
  const copy = translations.endOfArticleNavigation;
  if (!copy) return null;

  const availableDestinations = destinations.filter(
    ({ requiresJs, hideInOperaMini }) =>
      (!requiresJs || isHydrated) && (!hideInOperaMini || !isOperaMini),
  );
  const links = [
    ...availableDestinations.map(destination => ({
      ...destination,
      href: `#${destination.id}`,
      inPage: true,
    })),
    ...(availableDestinations.length < 2
      ? [
          {
            ...copy.homepage,
            href: `https://www.bbc.com/${service}`,
            inPage: false,
          },
        ]
      : []),
  ];

  return (
    <section
      id="end-of-article-navigation"
      data-testid="end-of-article-navigation"
      aria-labelledby="end-of-article-navigation-heading"
      className={clsx(styles.section, className)}
    >
      <Paragraph size="greatPrimer" className={styles.endLabel}>
        {copy.endLabel}
      </Paragraph>
      <Heading
        level={2}
        size="doublePica"
        id="end-of-article-navigation-heading"
        className={styles.heading}
      >
        {copy.heading}
      </Heading>
      <Paragraph size="pica" className={styles.introduction}>
        {copy.introduction}
      </Paragraph>
      <ul className={styles.destinations}>
        {links.map(destination => (
          <li key={destination.href} className={styles.destination}>
            <a
              href={destination.href}
              className={styles.link}
              onClick={focusDestination}
            >
              <span className={styles.label}>{destination.label}</span>
              <span className={styles.description}>
                {destination.description}
              </span>
              <span className={styles.direction}>
                {destination.inPage
                  ? copy.onThisPage
                  : copy.homepageDestination}
                <span className={styles.icon}>
                  {destination.inPage ? (
                    <DownArrowIcon />
                  ) : (
                    <Chevron
                      orientation={ChevronOrientation.FORWARD}
                      dir={dir}
                    />
                  )}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default EndOfArticleNavigation;
