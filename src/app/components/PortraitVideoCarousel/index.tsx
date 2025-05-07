/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Heading from '../Heading';
import { LeftChevron, RightChevron } from '../icons';
import styles, { PROMO_ITEM_WIDTH } from './index.styles';
import { ServiceContext } from '../../contexts/ServiceContext';
import PortraitVideoModal from '../PortraitVideoModal';

export interface PortraitVideoItem {
  id: string;
  headlines?: {
    promoHeadline?: string;
  };
  link?: {
    path: string;
  };
  images?: {
    url: string;
    urlTemplate?: string;
    altText?: string;
  }[];
  video?: {
    id: string;
    isEmbeddingAllowed?: boolean;
    version: {
      id?: string;
      duration: string;
      kind: string;
      territories: string[];
    };
  };
  analytics?: {
    page?: {
      contentId?: string;
    };
  };
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PortraitVideoItem | null>(
    null,
  );

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

  const handlePromoClick = (item: PortraitVideoItem) => {
    if (item.video) {
      setSelectedItem(item);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
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

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handlePromoClick(item)}
                css={styles.promoItemButton}
              >
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
              </button>
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

      {isModalOpen &&
        selectedItem &&
        createPortal(
          <PortraitVideoModal
            items={items.map(item => ({
              id: item.video?.id || '',
              title: item.headlines?.promoHeadline || '',
              versionId: item.video?.version?.id || '',
              duration: item.video?.version?.duration || 'PT0M0S',
              kind: item.video?.version?.kind || 'programme',
              territories: item.video?.version?.territories || [],
              guidance: null,
              isEmbeddingAllowed: item.video?.isEmbeddingAllowed ?? true,
              images: item.images || [],
            }))}
            initialVideoIndex={items.findIndex(i => i.id === selectedItem?.id)}
            onClose={handleCloseModal}
          />,
          document.body,
        )}
    </section>
  );
};

export default PortraitVideoCarousel;
