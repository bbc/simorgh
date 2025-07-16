/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { PortraitVideoCarouselProps } from '#app/models/types/portraitVideo';
import NO_JS_CLASSNAME from '#app/lib/noJs.const';
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
        className="my-8 group-1:my-12 group-3:my-8"
      >
        <Heading
          level={2}
          size="doublePica"
          fontVariant="sansBold"
          className="inline-block text-grey-10 m-0 group-3:mt-8 group-3:mb-0"
        >
          {title}
        </Heading>
        <noscript>
          <PortraitVideoNoJs />
        </noscript>
        <div className={`relative flex items-center ${NO_JS_CLASSNAME}:hidden`}>
          <PortraitCarouselNavigation scrollPaneRef={scrollRef} />
          <ul
            ref={scrollRef}
            className="flex flex-1 overflow-x-auto scroll-smooth touch-pan-x snap-x snap-mandatory gap-4 group-3:gap-8 group-3:py-4 webkit-scrollbar-none scrollbar-none after:content-[''] after:hidden after:grow-0 after:shrink-0 after:group-3:block after:group-3:basis-12 after:group-4:basis-16 after:group-5:basis-20"
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
