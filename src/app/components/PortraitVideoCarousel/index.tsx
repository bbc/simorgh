/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useContext, useEffect, useRef, useState } from 'react';
import Heading from '../Heading';
import { LeftChevron, RightChevron } from '../icons';
import styles, { PROMO_ITEM_WIDTH } from './index.styles';
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
  const { dir } = useContext(ServiceContext);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollButtons = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount =
      direction === 'left' ? -PROMO_ITEM_WIDTH : PROMO_ITEM_WIDTH;
    scrollRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });

    setTimeout(checkScrollButtons, 100);
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScrollButtons);
    }

    checkScrollButtons();

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', checkScrollButtons);
      }
    };
  }, [items]);

  return (
    <section
      aria-label={title}
      role="region"
      data-testid="portrait-video-carousel"
    >
      <h2 css={styles.heading}>{title}</h2>

      <div css={styles.scrollContainer}>
        <div ref={scrollRef} css={styles.scrollWrapper}>
          {items.map(item => {
            const image = item.images?.[0]?.url;
            const alt = item.images?.[0]?.altText || '';
            const headline = item.headlines?.promoHeadline || '';
            const href = item.link?.path || '#';

            return (
              <a key={item.id} href={href} css={styles.promoItem}>
                {image && (
                  <img
                    src={image}
                    alt={alt}
                    css={styles.image}
                    loading="lazy"
                  />
                )}
                <div css={styles.gradientOverlay}>
                  <Heading
                    level={3}
                    size="longPrimer"
                    css={styles.promoHeading}
                  >
                    {headline}
                  </Heading>
                </div>
              </a>
            );
          })}
          <div css={[styles.promoItem, styles.endBlankItem]} />
        </div>
        <div css={styles.buttonGroupOverlay}>
          <div css={styles.buttonGroup}>
            <button
              type="button"
              aria-label="Scroll left"
              onClick={() => scroll(dir === 'ltr' ? 'left' : 'right')}
              disabled={!canScrollLeft}
              css={styles.navButton}
            >
              <LeftChevron />
            </button>
            <button
              type="button"
              aria-label="Scroll right"
              onClick={() => scroll(dir === 'ltr' ? 'right' : 'left')}
              disabled={!canScrollRight}
              css={styles.navButton}
            >
              <RightChevron />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortraitVideoCarousel;
