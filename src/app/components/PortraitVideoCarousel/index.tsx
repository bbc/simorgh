/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { PortraitVideoCarouselProps } from '#app/models/types/portraitVideo';
import styles from './index.styles';
import PortraitVideoModal from '../PortraitVideoModal';
import { BumpLoader } from '../MediaLoader';
import PortraitVideoPromo from './PortraitVideoPromo';
import PortraitCarouselNavigation from './PortraitVideoCarouselNavigation';
import Heading from '../Heading';
import PortraitVideoNoJs from './PortraitVideoNoJs';

const PortraitVideoCarousel = ({
  title,
  items,
  groupTrackingId,
}: PortraitVideoCarouselProps) => {
  const scrollRef = useRef<HTMLUListElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(
    null,
  );

  const handlePromoClick = (index: number) => {
    if (items[index]?.video) {
      setSelectedVideoIndex(index);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideoIndex(null);
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
        <noscript>
          <PortraitVideoNoJs />
        </noscript>
        <div css={styles.carouselContainer}>
          <PortraitCarouselNavigation scrollPaneRef={scrollRef} />
          <ul
            ref={scrollRef}
            css={styles.carousel}
            data-testid="pv-carousel"
            tabIndex={-1}
            role="list"
          >
            {items.map((item, index) => (
              <PortraitVideoPromo
                {...item}
                key={item.id}
                onClick={() => handlePromoClick(index)}
                itemPosition={index}
                groupTracker={{
                  itemCount: items.length,
                  resourceId: groupTrackingId,
                }}
              />
            ))}
          </ul>
        </div>
        {isModalOpen &&
          selectedVideoIndex !== null &&
          createPortal(
            <PortraitVideoModal
              items={items.map(item => ({
                id: item.video?.id || '',
                title: item.headlines?.promoHeadline || '',
                versionId: item.video?.version?.id || '',
                duration: item.video?.version?.duration || 'PT0M0S',
                kind: item.video?.version?.kind || 'programme',
                territories: item.video?.version?.territories || [],
                guidance: item.video?.version?.guidance || null,
                isEmbeddingAllowed: item.video?.isEmbeddingAllowed ?? true,
                images: item.images || [],
              }))}
              selectedVideoIndex={selectedVideoIndex}
              onClose={handleCloseModal}
            />,
            document.body,
          )}
      </section>
    </>
  );
};

export default PortraitVideoCarousel;
