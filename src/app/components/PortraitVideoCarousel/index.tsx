/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { useContext, useRef, useState, useEffect } from 'react';
import Heading from '../Heading';
import { LeftChevron, RightChevron } from '../icons';
import styles from './index.styles';
import { ServiceContext } from '../../contexts/ServiceContext';

interface PortraitVideoItem {
  id: string;
  images?: { url: string; altText?: string }[];
  headlines?: { promoHeadline?: string };
  link?: { path: string };
}

interface PortraitVideoCarouselProps {
  title: string;
  items: PortraitVideoItem[];
}

const PortraitVideoCarousel = ({
  title,
  items,
}: PortraitVideoCarouselProps) => {
  const theme = useTheme();
  const { dir } = useContext(ServiceContext);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollByAmount = 160;

  const updateScrollButtons = () => {
    const node = scrollRef.current;
    if (!node) return;
    setCanScrollLeft(node.scrollLeft > 0);
    setCanScrollRight(node.scrollLeft + node.clientWidth < node.scrollWidth);
  };

  useEffect(() => {
    updateScrollButtons();
  }, [items]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollByAmount : scrollByAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section
      aria-label={title}
      role="region"
      data-testid="portrait-video-carousel"
      css={styles.section(theme)}
    >
      <Heading level={2} size="doublePica" css={styles.heading(theme)}>
        {title}
      </Heading>

      <div css={styles.scrollContainer}>
        <div
          dir={dir}
          ref={scrollRef}
          css={styles.scrollWrapper(theme)}
          onScroll={updateScrollButtons}
        >
          {items.map(item => {
            const image = item.images?.[0]?.url;
            const alt = item.images?.[0]?.altText || '';
            const headline = item.headlines?.promoHeadline || '';
            const href = item.link?.path || '#';

            return (
              <a key={item.id} href={href} css={styles.promoItem(theme)}>
                {image && (
                  <img
                    src={image}
                    alt={alt}
                    css={styles.image}
                    loading="lazy"
                  />
                )}
                <Heading
                  level={3}
                  size="longPrimer"
                  css={styles.promoHeading(theme)}
                >
                  {headline}
                </Heading>
              </a>
            );
          })}
        </div>

        <div css={styles.buttonGroup}>
          <button
            aria-label="Scroll left"
            onClick={() => scroll('left')}
            css={styles.navButton}
          >
            <LeftChevron />
          </button>
          <button
            aria-label="Scroll right"
            onClick={() => scroll('right')}
            css={styles.navButton}
          >
            <RightChevron />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PortraitVideoCarousel;
