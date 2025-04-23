/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useContext, useRef } from 'react';
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

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -PROMO_ITEM_WIDTH : PROMO_ITEM_WIDTH,
      behavior: 'smooth',
    });
  };

  return (
    <section
      aria-label={title}
      role="region"
      data-testid="portrait-video-carousel"
      css={styles.section}
    >
      <Heading level={2} size="doublePica" css={styles.heading}>
        {title}
      </Heading>

      <div css={styles.scrollContainer}>
        <div dir={dir} ref={scrollRef} css={styles.scrollWrapper}>
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
                <Heading level={3} size="longPrimer" css={styles.promoHeading}>
                  {headline}
                </Heading>
              </a>
            );
          })}
        </div>

        <div css={styles.buttonGroup}>
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scroll('left')}
            css={styles.navButton}
          >
            <LeftChevron />
          </button>
          <button
            type="button"
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
