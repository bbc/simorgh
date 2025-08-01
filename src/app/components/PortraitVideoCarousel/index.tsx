/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import React, { use, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { PortraitVideoCarouselProps } from '#app/models/types/portraitVideo';
import { RequestContext } from '#app/contexts/RequestContext';
import styles from './index.styles';
import PortraitVideoModal from '../PortraitVideoModal';
import { BumpLoader } from '../MediaLoader';
import PortraitVideoPromo from './PortraitVideoPromo';
import PortraitCarouselNavigation from './PortraitVideoCarouselNavigation';
import Heading from '../Heading';
import PortraitVideoNoJs from './PortraitVideoNoJs';

const PortraitVideoCarousel = ({
  title,
  blocks,
  groupTrackingId,
}: PortraitVideoCarouselProps) => {
  const scrollRef = useRef<HTMLUListElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(
    null,
  );

  const { isLite } = use(RequestContext);

  if (isLite) return null;

  const handlePromoClick = (index: number) => {
    if (blocks[index]?.block?.model?.video) {
      {
        setSelectedVideoIndex(index);
        setIsModalOpen(true);
      }
    }

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
              {blocks.map((item, index) => (
                <PortraitVideoPromo
                  {...item}
                  key={item.id}
                  onClick={() => handlePromoClick(index)}
                  blockPosition={index}
                  groupTracker={{
                    itemCount: blocks.length,
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
                blocks={blocks.map(block => block.block)} // this still mapping but trying to retain the modal props to be as close to bff structure as poss
                selectedVideoIndex={selectedVideoIndex}
                onClose={handleCloseModal}
              />,
              document.body,
            )}
        </section>
      </>
    );
  };
};
export default PortraitVideoCarousel;
