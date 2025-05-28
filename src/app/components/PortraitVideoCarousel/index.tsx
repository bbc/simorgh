/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  PortraitVideoCarouselProps,
  PortraitVideoPromoProps,
} from '#app/models/types/portraitVideo';
import styles from './index.styles';
import PortraitVideoModal from '../PortraitVideoModal';
import { BumpLoader } from '../MediaLoader';
import PortraitVideoPromo from './PortraitVideoPromo';
import PortraitCarouselNavigation from './PortraitVideoCarouselNavigation';
import Heading from '../Heading';

const PortraitVideoCarousel = ({
  title,
  items,
}: PortraitVideoCarouselProps) => {
  const scrollRef = useRef<HTMLUListElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] =
    useState<PortraitVideoPromoProps | null>(null);

  const handlePromoClick = (item: PortraitVideoPromoProps) => {
    if (item.video) {
      setSelectedItem(item);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      <BumpLoader />
      <section
        aria-label={title}
        role="region"
        data-testid="portrait-video-carousel"
        css={styles.section}
      >
        <Heading
          level={2}
          size="doublePica"
          fontVariant="sansBold"
          css={styles.heading}
        >
          {title}
        </Heading>
        <div css={styles.carouselContainer}>
          <PortraitCarouselNavigation scrollPaneRef={scrollRef} />
          <ul ref={scrollRef} css={styles.carousel} data-testid="pv-carousel">
            {items.map(item => (
              <PortraitVideoPromo
                {...item}
                key={item.id}
                onClick={() => handlePromoClick(item)}
              />
            ))}
          </ul>
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
