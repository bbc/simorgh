/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { PortraitVideoItemProps as PortraitVideoItemProp } from '#app/models/types/portraitVideoCarousel';
import styles, { PROMO_ITEM_WIDTH } from './index.styles';
import PortraitVideoModal from '../PortraitVideoModal';
import { BumpLoader } from '../MediaLoader';
import PortraitVideoItem from './PortraitVideoItem';
import PortraitCarouselNavigation from './PortraitCarouselNavigation';

interface PortraitVideoCarouselProps {
  title: string;
  items: PortraitVideoItemProp[];
}

const PortraitVideoCarousel = ({
  title,
  items,
}: PortraitVideoCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] =
    useState<PortraitVideoItemProp | null>(null);

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

  const handlePromoClick = (item: PortraitVideoItemProp) => {
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
    <>
      <BumpLoader />
      <section
        aria-label={title}
        role="region"
        data-testid="portrait-video-carousel"
      >
        <h2 css={styles.heading}>{title}</h2>
        <div css={styles.scrollContainer}>
          <div ref={scrollRef} css={styles.scrollWrapper}>
            {items.map(item => (
              <PortraitVideoItem
                {...item}
                onClick={() => handlePromoClick(item)}
              />
            ))}
            <div css={[styles.promoItem, styles.endBlankItem]} />
          </div>
          <PortraitCarouselNavigation
            canScrollLeft={canScrollLeft}
            canScrollRight={canScrollRight}
            scroll={scroll}
          />
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
              initialVideoIndex={items.findIndex(
                i => i.id === selectedItem?.id,
              )}
              onClose={handleCloseModal}
            />,
            document.body,
          )}
      </section>
    </>
  );
};

export default PortraitVideoCarousel;
